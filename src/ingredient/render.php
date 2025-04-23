<?php
/**
 * Ingredient block render callback.
 *
 * @param array $attributes Block attributes.
 * @param string $content Block content.
 * @param WP_Block $block Block instance.
 * @return string Rendered HTML.
 */

$amount = isset( $attributes['amount'] ) ? esc_html( $attributes['amount'] ) : '';
$unit   = isset( $attributes['unit'] ) ? esc_html( $attributes['unit'] ) : '';
$name   = isset( $attributes['name'] ) ? esc_html( $attributes['name'] ) : '';

if ( ! $amount && ! $unit && ! $name ) {
	return '';
}

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes([
	'class' => 'recipe-ingredient-item',
]);

return sprintf(
	'<li %s><span class="ingredient-amount">%s</span> <span class="ingredient-unit">%s</span> <span class="ingredient-name">%s</span></li>',
	$wrapper_attributes,
	$amount,
	$unit,
	$name
);