<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage next_help
 * @since next_help 1.0
 */

get_header(); ?>

  <div class="content-template o-grid-container" data-trackable="not-found">

    <?php get_template_part( 'partials/search-form' ); ?>


    <?php get_template_part( 'partials/not-found' ); ?>


  </div>


<?php get_footer(); ?>