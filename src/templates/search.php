<?php
/**
 * The template for displaying search results pages
 *
 * @package WordPress
 * @subpackage next_help
 * @since next_help 1.0
 */

get_header(); ?>

  <div class="search-template">

    <div class="o-grid-container">
      <div class="o-grid-row">
        <div data-o-grid-colspan="12">

          <?php get_template_part( 'helpSearchForm' ); ?>

          <?php printf( __( 'Search Results for: "%s"', 'twentyfourteen' ), get_search_query() ); ?>

          <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );?>
            
            <p><?php the_content(__('(more...)')); ?></p>
          <?php endwhile; else: ?>
            <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
          <?php endif; ?>

        </div>
      </div>
    </div>
  </div>

<?php get_footer(); ?>
