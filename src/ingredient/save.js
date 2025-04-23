import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * Even though we use server-side rendering, we need to save the attributes
 * to ensure they're properly stored in the database.
 */
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
