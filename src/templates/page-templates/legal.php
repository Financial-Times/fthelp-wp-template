<?php
/**
 * Template Name: Legal Page
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

  <div class="content-template o-grid-container" data-trackable="legal">

    <?php get_template_part( 'partials/search-form' ); ?>

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  
      <div class="o-grid-row">
        <div data-o-grid-colspan="12 M4" class="chat-container"><?php get_template_part( 'partials/primary-action-chat' ); ?></div>
        <div data-o-grid-colspan="12 Mhide"><hr/></div>
        <div data-o-grid-colspan="12 M8" class="content-container">
          <h1><?php the_title(); ?></h1>
          <?php the_content(__('(more...)')); ?>
        </div>
      </div>

      <?php get_template_part( 'partials/back-to-top' ); ?>

    <?php endwhile; else: ?>
      <div data-o-grid-colspan="12">
        <?php _e('Sorry, no pages matched your criteria.'); ?>
      </div>
    <?php endif; ?>

  </div>

<?php get_footer(); ?>