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
    
    <?php get_template_part( 'helpSearchForm' ); ?>

    <div class="primary-action">
      <div>
        <div>
          <?php get_template_part( 'primary-action-chat' ); ?>
        </div>
        <div>
          <?php get_template_part( 'primary-action-contact' ); ?>
        </div>
      </div>
      <div>
        <div>
          <?php get_template_part( 'primary-action-new-ft' ); ?>
        </div>
        <div>
          <?php get_template_part( 'primary-action-old-ft' ); ?>
        </div>
      </div>
    </div>

    <div class="content">

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        
        <?php the_content(__('(more...)')); ?>

        <?php get_template_part( 'back-to-top' ); ?>

      <?php endwhile; else: ?>
        <?php _e('Sorry, no posts matched your criteria.'); ?>
      <?php endif; ?>
      
    </div>

  </div>
  
<?php get_footer();?>