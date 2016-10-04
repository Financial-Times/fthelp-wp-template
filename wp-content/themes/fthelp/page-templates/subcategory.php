<?php
/**
 * Template Name: Sub Category Page
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

    <?php get_template_part( 'partials/breadcrumbs' ); ?>

    <div class="subcategory-template" data-trackable="subcategory">

      <?php get_template_part( 'partials/search-form' ); ?>

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    
        <?php get_template_part( 'partials/page-heading-container' ); ?>

        <div class="content">
          <hr/>
          <?php the_content(__('(more...)')); ?>
        </div>

        <?php get_template_part( 'partials/back-to-top' ); ?>

      <?php endwhile; else: ?>
        <?php _e('Sorry, no pages matched your criteria.'); ?>
      <?php endif; ?>

    </div>
  
<?php get_footer();?>