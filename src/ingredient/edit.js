import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Flex, FlexItem } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { amount = 1, unit = '', name = '' } = attributes;
	const blockProps = useBlockProps({
		className: 'recipe-ingredient-item',
	});

	// Ensure we always have valid attributes
	const updateAmount = (value) => {
		const parsedValue = parseFloat(value);
		setAttributes({ amount: isNaN(parsedValue) ? 0 : parsedValue });
	};

	const updateUnit = (value) => {
		setAttributes({ unit: value || '' });
	};

	const updateName = (value) => {
		setAttributes({ name: value || '' });
	};

	return (
		<div { ...blockProps }>
			<Flex align="center" gap={2} justify="flex-start">
				<FlexItem>
					<RichText
						tagName="span"
						placeholder={ __( '1', 'interactive-recipe-block' ) }
						value={ amount ? String(amount) : '' }
						onChange={ updateAmount }
						allowedFormats={ [] }
						className="ingredient-amount"
					/>
				</FlexItem>
				<FlexItem>
					<RichText
						tagName="span"
						placeholder={ __( 'cup', 'interactive-recipe-block' ) }
						value={ unit }
						onChange={ updateUnit }
						allowedFormats={ [] }
						className="ingredient-unit"
					/>
				</FlexItem>
				<FlexItem>
					<RichText
						tagName="span"
						placeholder={ __( 'ingredient', 'interactive-recipe-block' ) }
						value={ name }
						onChange={ updateName }
						allowedFormats={ [] }
						className="ingredient-name"
					/>
				</FlexItem>
			</Flex>
		</div>
	);
} 