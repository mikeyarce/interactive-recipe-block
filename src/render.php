<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content (InnerBlocks).
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$image_url = ! empty( $attributes['imageUrl'] ) ? esc_url( $attributes['imageUrl'] ) : '';
$description = ! empty( $attributes['description'] ) ? $attributes['description'] : '';
?>

<div
	<?php echo get_block_wrapper_attributes(['class' => 'recipe-block']); ?>
	data-wp-interactive="create-block"
>
	<div class="recipe-header">
		<?php if ( $image_url ) : ?>
			<div class="recipe-image">
				<img src="<?php echo $image_url; ?>" alt="<?php esc_attr_e( 'Recipe', 'interactive-recipe-block' ); ?>" />
			</div>
		<?php endif; ?>
		
		<?php if ( $description ) : ?>
			<div class="recipe-description">
				<?php echo wp_kses_post( $description ); ?>
			</div>
		<?php endif; ?>
	</div>

	<div class="recipe-ingredients">
		<div class="recipe-scaling-controls">
			<div class="scaling-buttons">
				<button 
					class="scale-button" 
					data-wp-on--click="actions.setScale"
					<?php echo wp_interactivity_data_wp_context( array( 'scale' => 0.5 ) ); ?>
					data-wp-class--active="state.isButtonActive"
				>
					½×
				</button>
				<button 
					class="scale-button" 
					data-wp-on--click="actions.setScale"
					<?php echo wp_interactivity_data_wp_context( array( 'scale' => 1 ) ); ?>
					data-wp-class--active="state.isButtonActive"
				>
					1×
				</button>
				<button 
					class="scale-button" 
					data-wp-on--click="actions.setScale"
					<?php echo wp_interactivity_data_wp_context( array( 'scale' => 2 ) ); ?>
					data-wp-class--active="state.isButtonActive"
				>
					2×
				</button>
				<button 
					class="scale-button" 
					data-wp-on--click="actions.setScale"
					<?php echo wp_interactivity_data_wp_context( array( 'scale' => 4 ) ); ?>
					data-wp-class--active="state.isButtonActive"
				>
					4×
				</button>
			</div>
		</div>
		<h3><?php esc_html_e( 'Ingredients', 'interactive-recipe-block' ); ?></h3>
		<ul class="ingredients-list">
			<?php 
			// Modify the ingredients HTML to add data attributes for interactivity
			if ( ! empty( $block->inner_blocks ) ) {
				foreach ( $block->inner_blocks as $index => $inner_block ) {
					if ( $inner_block->name === 'create-block/ingredient' ) {
						$amount = isset($inner_block->attributes['amount']) ? esc_html($inner_block->attributes['amount']) : '';
						$unit = isset($inner_block->attributes['unit']) ? esc_html($inner_block->attributes['unit']) : '';
						$name = isset($inner_block->attributes['name']) ? esc_html($inner_block->attributes['name']) : '';
			
						if (!empty($amount) || !empty($unit) || !empty($name)) {
							// Create a data attribute with the original amount for JavaScript to access
							?>
							<li class="recipe-ingredient-item" data-index="<?php echo $index; ?>">
								<span 
									class="ingredient-amount"
									<?php // data-original-amount removed, context is used instead ?>
									<?php
									// Define local context for this span with the original amount
									$ingredient_context = wp_json_encode( array( 'originalAmount' => $amount ) );
									echo 'data-wp-context=\'' . esc_attr( $ingredient_context ) . '\'';
									?>
									data-wp-text="state.scaledAmount"
								>
									<?php echo $amount; ?>	
								</span>
								<span class="ingredient-unit"><?php echo $unit; ?></span>
								<span class="ingredient-name"><?php echo $name; ?></span>
							</li>
							<?php
						}
					}
				}
			}
			?>
		</ul>
	</div>
</div>
