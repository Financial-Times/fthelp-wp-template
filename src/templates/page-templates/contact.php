<?php
/**
 * Template Name: Contact Us
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

    <div class="contact-template">

      <div class="breadcrumbs" typeof="BreadcrumbList" vocab="http://schema.org/">
        <div class="o-grid-container">
          <div class="o-grid-row">
            <div data-o-grid-colspan="12">
              <?php if(function_exists('bcn_display'))
              {
                  bcn_display();
              }?>
            </div>
          </div>
        </div>
      </div>

      <div class="o-grid-container">
        <div class="o-grid-row">
          <div data-o-grid-colspan="12">


            <?php get_template_part( 'helpSearchForm' ); ?>


            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

              <div class="o-grid-container primary-action">
                <div class="o-grid-row">
                  <div data-o-grid-colspan="12 S12 M6">
                    <h1><?php the_title(); ?></h1>
                  </div>
                  <div data-o-grid-colspan="12 S12 M6">
                    <?php get_template_part( 'primary-action-chat' ); ?>
                  </div>
                </div>
              </div>

              <p><?php the_content(__('(more...)')); ?></p>
            <?php endwhile; else: ?>
              <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
            <?php endif; ?>

          </div>
        </div>
      </div>
    </div>

<?php get_footer(); ?>