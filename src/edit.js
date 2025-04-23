/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { description = '', imageUrl = '' } = attributes;
	const blockProps = useBlockProps();

	// Define a template with one ingredient block to start with
	const TEMPLATE = [ [ 'create-block/ingredient', {} ] ];

	return (
		<div { ...blockProps }>
			<div className="recipe-header">
				{ imageUrl && (
					<div className="recipe-image" style={ { marginBottom: '1em' } }>
						<img src={ imageUrl } alt={ __( 'Recipe', 'interactive-recipe-block' ) } style={ { maxWidth: '100%' } } />
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => setAttributes( { imageUrl: media.url } ) }
								allowedTypes={ [ 'image' ] }
								value={ imageUrl }
								render={ ( { open } ) => (
									<Button onClick={ open } isSecondary size="small">
										{ __( 'Replace Image', 'interactive-recipe-block' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</div>
				)}
				{ !imageUrl && (
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { imageUrl: media.url } ) }
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<Button onClick={ open } isPrimary>
									{ __( 'Add Image', 'interactive-recipe-block' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				)}

				<RichText
					tagName="p"
					placeholder={ __( 'Add recipe description…', 'interactive-recipe-block' ) }
					value={ description }
					onChange={ ( value ) => setAttributes( { description: value } ) }
					style={ { marginBottom: '1em' } }
				/>
			</div>

			<div className="recipe-ingredients">
				<h3>{ __( 'Ingredients', 'interactive-recipe-block' ) }</h3>
				<div className="ingredients-list">
					<InnerBlocks 
						allowedBlocks={ [ 'create-block/ingredient' ] } 
						renderAppender={ InnerBlocks.ButtonBlockAppender } 
						template={ TEMPLATE }
						orientation="vertical"
					/>
				</div>
			</div>
		</div>
	);
}
