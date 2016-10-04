<?php
/**
 * Template Name: Home Page
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

  <div class="home-template">
    
    <?php get_template_part( 'partials/search-form' ); ?>

    <?php get_template_part( 'partials/primary-action' ); ?>

    <div class="content">

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        
        <?php the_content(__('(more...)')); ?>

      <?php endwhile; else: ?>
        <?php _e('Sorry, no posts matched your criteria.'); ?>
      <?php endif; ?>
      
    </div>

    <?php get_template_part( 'partials/back-to-top' ); ?>

  </div>
  
<?php get_footer();?>