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

$title = ! empty( $attributes['title'] ) ? wp_kses_post( $attributes['title'] ) : '';
$image_url = ! empty( $attributes['imageUrl'] ) ? esc_url( $attributes['imageUrl'] ) : '';
$description = ! empty( $attributes['description'] ) ? wp_kses_post( $attributes['description'] ) : '';
$prep_time = ! empty( $attributes['prepTime'] ) ? esc_html( $attributes['prepTime'] ) : '';
$cook_time = ! empty( $attributes['cookTime'] ) ? esc_html( $attributes['cookTime'] ) : '';
$total_time = ! empty( $attributes['totalTime'] ) ? esc_html( $attributes['totalTime'] ) : '';
$servings = isset( $attributes['servings'] ) ? (int) $attributes['servings'] : 2;
$difficulty = isset( $attributes['difficulty'] ) ? esc_html( $attributes['difficulty'] ) : 'medium';
$notes = ! empty( $attributes['notes'] ) ? wp_kses_post( $attributes['notes'] ) : '';

// Initial state for the interactivity API
wp_interactivity_state(
    'marce-recipe',
    array(
        'scale' => 1, // Default scale is 1x
        'baseServings' => (int) $servings, // Store the base number of servings
    )
);

// Translate difficulty level
$difficulty_label = '';
switch ( $difficulty ) {
    case 'easy':
        $difficulty_label = __( 'Easy', 'interactive-recipe-block' );
        break;
    case 'medium':
        $difficulty_label = __( 'Medium', 'interactive-recipe-block' );
        break;
    case 'hard':
        $difficulty_label = __( 'Hard', 'interactive-recipe-block' );
        break;
    default:
        $difficulty_label = __( 'Medium', 'interactive-recipe-block' );
}
?>

<div <?php echo get_block_wrapper_attributes( array( 'class' => 'interactive-recipe' ) ); ?> data-wp-interactive="marce-recipe">
	<?php if ( $title ) : ?>
		<h2 class="recipe-title"><?php echo $title; ?></h2>
	<?php endif; ?>
	
	<?php if ( $image_url ) : ?>
		<img src="<?php echo $image_url; ?>" alt="<?php echo esc_attr( $title ); ?>" class="recipe-image" />
	<?php endif; ?>
	
	<?php if ( $description ) : ?>
		<div class="recipe-description"><?php echo $description; ?></div>
	<?php endif; ?>

    <?php if ( $prep_time || $cook_time || $total_time || $servings || $difficulty ) : ?>
        <h3><?php esc_html_e( 'Recipe Info', 'interactive-recipe-block' ); ?></h3>
        <div class="recipe-info">
            <div class="recipe-meta">
                <?php if ( $prep_time ) : ?>
                    <div class="recipe-meta-item">
                        <span class="recipe-meta-label"><?php esc_html_e( 'Prep Time:', 'interactive-recipe-block' ); ?></span>
                        <span class="recipe-meta-value"><?php echo $prep_time; ?></span>
                    </div>
                <?php endif; ?>
                
                <?php if ( $cook_time ) : ?>
                    <div class="recipe-meta-item">
                        <span class="recipe-meta-label"><?php esc_html_e( 'Cook Time:', 'interactive-recipe-block' ); ?></span>
                        <span class="recipe-meta-value"><?php echo $cook_time; ?></span>
                    </div>
                <?php endif; ?>
                
                <?php if ( $total_time ) : ?>
                    <div class="recipe-meta-item">
                        <span class="recipe-meta-label"><?php esc_html_e( 'Total Time:', 'interactive-recipe-block' ); ?></span>
                        <span class="recipe-meta-value"><?php echo $total_time; ?></span>
                    </div>
                <?php endif; ?>
                
                <?php if ( $servings ) : ?>
                    <div class="recipe-meta-item">
                        <span class="recipe-meta-label"><?php esc_html_e( 'Servings:', 'interactive-recipe-block' ); ?></span>
                        <span class="recipe-meta-value">
                            <span data-wp-text="state.adjustedServings"><?php echo $servings; ?></span>
                        </span>
                    </div>
                <?php endif; ?>
                
                <?php if ( $difficulty ) : ?>
                    <div class="recipe-meta-item">
                        <span class="recipe-meta-label"><?php esc_html_e( 'Difficulty:', 'interactive-recipe-block' ); ?></span>
                        <span class="recipe-meta-value"><?php echo $difficulty_label; ?></span>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    <?php endif; ?>

    <h3><?php esc_html_e( 'Ingredients', 'interactive-recipe-block' ); ?></h3>
	<div class="recipe-ingredients">
		<div class="recipe-scaling-controls">
			<span class="scaling-label"><?php esc_html_e( 'Adjust Servings:', 'interactive-recipe-block' ); ?></span>
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
		
		<?php
		// Check if we have inner blocks
		if ( ! empty( $block->inner_blocks ) ) {
			echo '<div class="ingredients-list">';
			foreach ( $block->inner_blocks as $inner_block ) {
				if ( $inner_block->name === 'marce/ingredient' ) {
					$amount = isset( $inner_block->attributes['amount'] ) ? esc_html( $inner_block->attributes['amount'] ) : '';
					$unit = isset( $inner_block->attributes['unit'] ) ? esc_html( $inner_block->attributes['unit'] ) : '';
					$name = isset( $inner_block->attributes['name'] ) ? esc_html( $inner_block->attributes['name'] ) : '';
					
					if ( ! empty( $amount ) || ! empty( $unit ) || ! empty( $name ) ) {
						?>
						<div class="ingredient">
							<span 
								class="ingredient-amount"
								<?php echo wp_interactivity_data_wp_context( array( 'originalAmount' => $amount ) ); ?>
								data-wp-text="state.scaledAmount"
							>
								<?php echo $amount; ?>
							</span>
							<span class="ingredient-unit"><?php echo $unit; ?></span>
							<span class="ingredient-name"><?php echo $name; ?></span>
						</div>
						<?php
					}
				}
			}
			echo '</div>';
		} else {
			// No ingredients, show the inner blocks content directly
			echo $content;
		}
		?>
	</div>

    <?php if ( $notes ) : ?>
        <h3><?php esc_html_e( 'Recipe Notes', 'interactive-recipe-block' ); ?></h3>
        <div class="recipe-notes">
            <div class="recipe-notes-content"><?php echo $notes; ?></div>
        </div>
    <?php endif; ?>
</div>
