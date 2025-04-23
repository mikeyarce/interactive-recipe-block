import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Flex, FlexItem } from '@wordpress/components';
import { dragHandle } from '@wordpress/icons';
import { useState } from '@wordpress/element';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { amount = 1, unit = '', name = '' } = attributes;
	
	const blockProps = useBlockProps({
		className: `recipe-ingredient-item`,
	});

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
			<Flex align="center" gap={2} justify="flex-start" wrap>
				<FlexItem className="ingredient-drag-handle">
					<span className="drag-handle">
						{dragHandle}
					</span>
				</FlexItem>
			
				<FlexItem className="ingredient-amount-wrapper">
					<RichText
						tagName="span"
						placeholder={ __( '1', 'interactive-recipe-block' ) }
						value={ amount ? String(amount) : '' }
						onChange={ updateAmount }
						allowedFormats={ [] }
						className="ingredient-amount"
					/>
				</FlexItem>
				
				<FlexItem className="ingredient-unit-wrapper">
					<RichText
						tagName="span"
						placeholder={ __( 'unit', 'interactive-recipe-block' ) }
						value={ unit }
						onChange={ updateUnit }
						allowedFormats={ [] }
						className="ingredient-unit"
					/>
				</FlexItem>
				
				<FlexItem className="ingredient-name-wrapper" style={{ flexGrow: 1 }}>
					<RichText
						tagName="span"
						placeholder={ __( 'ingredient name', 'interactive-recipe-block' ) }
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