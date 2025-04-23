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
import { Button, TextControl, SelectControl, Flex, FlexItem } from '@wordpress/components';

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
	const { 
		title = '', 
		description = '', 
		imageUrl = '',
		prepTime = '',
		cookTime = '',
		totalTime = '',
		servings = 2,
		difficulty = 'medium',
		notes = ''
	} = attributes;
	
	const blockProps = useBlockProps({
		className: 'interactive-recipe'
	});

	const TEMPLATE = [ [ 'marce/ingredient', {} ] ];

	return (
		<div { ...blockProps }>
			{/* Recipe Title */}
			<RichText
				tagName="h2"
				placeholder={ __( 'Recipe Title…', 'interactive-recipe-block' ) }
				value={ title }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				style={ { marginBottom: '1em' } }
			/>

			{/* Recipe Image */}
			{ imageUrl && (
				<div style={ { marginBottom: '1em' } }>
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

			{/* Recipe Description */}
			<RichText
				tagName="p"
				placeholder={ __( 'Add recipe description…', 'interactive-recipe-block' ) }
				value={ description }
				onChange={ ( value ) => setAttributes( { description: value } ) }
				style={ { marginBottom: '1em' } }
			/>

			{/* Recipe Info Section */}
			<h3>{ __( 'Recipe Info', 'interactive-recipe-block' ) }</h3>
			<div className="recipe-info">
				<Flex gap={4} align="flex-start" justify="flex-start" wrap>
					<FlexItem style={{flexBasis: '200px'}}>
						<TextControl
							label={ __( 'Prep Time', 'interactive-recipe-block' ) }
							value={ prepTime }
							onChange={ ( value ) => setAttributes( { prepTime: value } ) }
							placeholder="30 minutes"
						/>
					</FlexItem>
					
					<FlexItem style={{flexBasis: '200px'}}>
						<TextControl
							label={ __( 'Cook Time', 'interactive-recipe-block' ) }
							value={ cookTime }
							onChange={ ( value ) => setAttributes( { cookTime: value } ) }
							placeholder="45 minutes"
						/>
					</FlexItem>
					
					<FlexItem style={{flexBasis: '200px'}}>
						<TextControl
							label={ __( 'Total Time', 'interactive-recipe-block' ) }
							value={ totalTime }
							onChange={ ( value ) => setAttributes( { totalTime: value } ) }
							placeholder="1 hour 15 minutes"
						/>
					</FlexItem>
				</Flex>
				
				<Flex gap={4} align="flex-start" justify="flex-start" wrap style={{marginTop: '1em'}}>
					<FlexItem style={{flexBasis: '200px'}}>
						<TextControl
							type="number"
							label={ __( 'Servings', 'interactive-recipe-block' ) }
							value={ servings }
							onChange={ ( value ) => setAttributes( { servings: parseInt(value) || 1 } ) }
							min={1}
						/>
					</FlexItem>
					
					<FlexItem style={{flexBasis: '200px'}}>
						<SelectControl
							label={ __( 'Difficulty', 'interactive-recipe-block' ) }
							value={ difficulty }
							options={ [
								{ label: __( 'Easy', 'interactive-recipe-block' ), value: 'easy' },
								{ label: __( 'Medium', 'interactive-recipe-block' ), value: 'medium' },
								{ label: __( 'Hard', 'interactive-recipe-block' ), value: 'hard' },
							] }
							onChange={ ( value ) => setAttributes( { difficulty: value } ) }
						/>
					</FlexItem>
				</Flex>
			</div>

			{/* Ingredients Section */}
			<h3>{ __( 'Ingredients', 'interactive-recipe-block' ) }</h3>
			<div className="recipe-ingredients">
				<InnerBlocks allowedBlocks={ [ 'marce/ingredient' ] } renderAppender={ InnerBlocks.ButtonBlockAppender } template={ TEMPLATE } />
			</div>
			
			{/* Recipe Notes Section */}
			<h3>{ __( 'Recipe Notes', 'interactive-recipe-block' ) }</h3>
			<RichText
				tagName="div"
				className="recipe-notes"
				placeholder={ __( 'Add notes about the recipe (substitutions, tips, etc.)…', 'interactive-recipe-block' ) }
				value={ notes }
				onChange={ ( value ) => setAttributes( { notes: value } ) }
			/>
		</div>
	);
}
