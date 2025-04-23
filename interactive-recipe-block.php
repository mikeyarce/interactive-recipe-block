<?php
/**
 * Plugin Name:       Interactive Recipe Block
 * Description:       An interactive block with the Interactivity API.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       interactive-recipe-block
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_interactive_recipe_block_block_init() {
	register_block_type_from_metadata( __DIR__ . '/build' );
	register_block_type_from_metadata( __DIR__ . '/build/ingredient' );

	// Register the view script for the interactivity API
	wp_register_script(
		'interactive-recipe-block-view',
		plugins_url( 'build/view.js', __FILE__ ),
		array( 'wp-interactivity' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/view.js' ),
		true
	);

	// Enqueue the view script
	wp_enqueue_script( 'interactive-recipe-block-view' );
}
add_action( 'init', 'create_block_interactive_recipe_block_block_init' );
