<?php
/**
 * The next help main template file
 *
 * @package WordPress
 * @subpackage next_help
 * @since next_help 1.0
 */

get_header(); ?>

    <div class="content-template">

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

              <h1><?php the_title(); ?></h1>

              <?php the_content(__('(more...)')); ?>
            <?php endwhile; else: ?>
              <?php _e('Sorry, no posts matched your criteria.'); ?>
            <?php endif; ?>

          </div>
        </div>
      </div>
    </div>

<?php get_footer(); ?>