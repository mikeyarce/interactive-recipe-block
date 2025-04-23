<?php
/**
 * Render the Ingredient block
 *
 * @package marce-interactive-recipe-block
 */

$block_wrapper_attributes = get_block_wrapper_attributes();
$amount = isset( $attributes['amount'] ) ? $attributes['amount'] : '';
$unit = isset( $attributes['unit'] ) ? $attributes['unit'] : '';
$name = isset( $attributes['name'] ) ? $attributes['name'] : '';

?>
<div <?php echo $block_wrapper_attributes; ?>>
    <div class="ingredient-item" data-amount="<?php echo esc_attr( $amount ); ?>">
        <span
            class="ingredient-amount"
            <?php echo wp_interactivity_data_wp_context( array( 'originalAmount' => $amount ) ); ?>
            data-wp-text="state.scaledAmount"
        >
            <?php echo esc_html( $amount ); ?>
        </span>
        <?php if ( ! empty( $unit ) ) : ?>
            <span class="ingredient-unit"><?php echo esc_html( $unit ); ?></span>
        <?php endif; ?>
        <span class="ingredient-name"><?php echo esc_html( $name ); ?></span>
    </div>
</div>