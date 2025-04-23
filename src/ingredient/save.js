import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { amount, unit, name } = attributes;
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<span className="ingredient-amount">{ amount ? String(amount) : '' }</span>
			<span className="ingredient-unit">{ unit }</span>
			<span className="ingredient-name">{ name }</span>
		</div>
	);
}
