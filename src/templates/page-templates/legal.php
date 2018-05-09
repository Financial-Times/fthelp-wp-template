<?php
/**
 * Template Name: Legal Page
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

  <div class="legal-template o-grid-container" data-trackable="legal">

    <?php get_template_part( 'partials/search-form' ); ?>

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  
      <div class="o-grid-row">
        <div data-o-grid-colspan="12 M4"></div>
        <div data-o-grid-colspan="12 M8" class="content-container">
          <h1><?php the_title(); ?></h1>
          <?php the_content(__('(more...)')); ?>
        </div>
      </div>

      <?php get_template_part( 'partials/back-to-top' ); ?>

    <?php endwhile; else: ?>
      <?php get_template_part( 'partials/not-found' ); ?>
    <?php endif; ?>

  </div>

<?php get_footer(); ?>
