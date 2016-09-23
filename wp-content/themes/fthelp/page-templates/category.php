<?php
/**
 * Template Name: Category Page
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

    <?php get_template_part( 'breadcrumbs' ); ?>

    <div class="category-template">

      <?php get_template_part( 'helpSearchForm' ); ?>

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    
        <?php get_template_part( 'page-heading-container' ); ?>

        <div class="content">
          <div></div>
          <?php the_content(__('(more...)')); ?>

          <?php get_template_part( 'back-to-top' ); ?>

        </div>

      <?php endwhile; else: ?>
        <?php _e('Sorry, no pages matched your criteria.'); ?>
      <?php endif; ?>

    </div>
  
<?php get_footer();?>