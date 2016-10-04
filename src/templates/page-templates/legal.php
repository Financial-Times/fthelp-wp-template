<?php
/**
 * Template Name: Legal Page
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>
  <div class="content-template-container">
      
    <?php get_template_part( 'partials/breadcrumbs' ); ?>

    <div class="content-template">

      <?php get_template_part( 'partials/search-form' ); ?>

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    
        <?php get_template_part( 'partials/page-heading-container' ); ?>

        <div class="content">

          <div class="content-wrapper">
            <?php the_content(__('(more...)')); ?>
          </div>
  
        </div>
        
        <?php get_template_part( 'partials/back-to-top' ); ?>

      <?php endwhile; else: ?>
        <?php _e('Sorry, no pages matched your criteria.'); ?>
      <?php endif; ?>

    </div>
  </div>

<?php get_footer(); ?>