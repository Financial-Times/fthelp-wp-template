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
    <div class="o-grid-container">
      <div class="o-grid-row">
        <div data-o-grid-colspan="12">

          <?php get_template_part( 'helpSearchForm' ); ?>

          <div class="o-grid-container primary-action">
            <div class="o-grid-row">
              <div data-o-grid-colspan="12 S12 M6">
                <?php get_template_part( 'primary-action-chat' ); ?>
              </div>
              <div data-o-grid-colspan="12 S12 M6">
                <?php get_template_part( 'primary-action-contact' ); ?>
              </div>
            </div>
            <div class="o-grid-row">
              <div data-o-grid-colspan="12 S12 M6">
                <?php get_template_part( 'primary-action-new-ft' ); ?>
              </div>
              <div data-o-grid-colspan="12 S12 M6">
                <?php get_template_part( 'primary-action-old-ft' ); ?>
              </div>
            </div>
          </div>

          <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            
            <?php the_content(__('(more...)')); ?>

            <a href="#top" class="back-to-top">Back to the Top</a>

          <?php endwhile; else: ?>
            <?php _e('Sorry, no posts matched your criteria.'); ?>
          <?php endif; ?>

        </div>
      </div>
    </div>
  </div>


<?php get_footer();?>
