<?php
/**
 * Plugin Name:       Interactive Recipe Block
 * Description:       A WordPress block for recipes with interactive ingredient scaling.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Mikey Arce
 * Author URI:        https://mikeyarce.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       interactive-recipe-block
 * 
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Constants for this plugin.
 */
define( 'MARCE_RECIPE_BLOCK_VERSION', '0.1.0' );
define( 'MARCE_RECIPE_BLOCK_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'MARCE_RECIPE_BLOCK_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Registers the recipe block and its assets.
 */
function marce_interactive_recipe_block_init() {
	// Register the main recipe block and ingredient child block.
	register_block_type_from_metadata( MARCE_RECIPE_BLOCK_PLUGIN_DIR . '/build' );
	register_block_type_from_metadata( MARCE_RECIPE_BLOCK_PLUGIN_DIR . '/build/ingredient' );

	// Register the view script for the interactivity API.
	wp_register_script(
		'interactive-recipe-block-view',
		MARCE_RECIPE_BLOCK_PLUGIN_URL . 'build/view.js',
		array( 'wp-interactivity' ),
		MARCE_RECIPE_BLOCK_VERSION,
		true
	);

	// Enqueue the view script.
	wp_enqueue_script( 'interactive-recipe-block-view' );
}
add_action( 'init', 'marce_interactive_recipe_block_init' );
