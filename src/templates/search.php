<?php
/**
 * The template for displaying search results pages
 *
 * @package WordPress
 * @subpackage next_help
 * @since next_help 1.0
 */

get_header(); ?>

  <div class="search-template o-grid-container" data-trackable="search">

    <?php get_template_part( 'partials/search-form' ); ?>

    <?php if (have_posts()) :  ?>
  
      <div class="o-grid-row">
        <div data-o-grid-colspan="12 M4" class="chat-container"><?php get_template_part( 'partials/primary-action-chat' ); ?></div>
        <div data-o-grid-colspan="12 Mhide"><hr/></div>
        <div data-o-grid-colspan="12 M8" class="content-container">
          <h1>Search Results for: <?php echo get_search_query()?></h1>
          <?php
          // Start the loop.
          while ( have_posts() ) : the_post(); ?>
            <div class="result">
              <?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark" data-trackable="result">', '</a></h2>' );?>
              <p><?php the_excerpt(); ?></p> 
            </div>
          <?php
          // Start the loop.
          endwhile; 
          ?>

        </div>
      </div>

      <?php get_template_part( 'partials/back-to-top' ); ?>

    <?php else : ?>

      <div class="o-grid-row o-grid-row--compact">
        <div data-o-grid-colspan="12" class="no-result">
          <div class="icon">
            <h1>Search Results for: <?php echo get_search_query()?></h1>
            <h2 class="entry-title"><?php _e('Sorry, but nothing matched your search terms. Please try again with some different keywords'); ?></h2>
          </div>
        </div>
      </div>

    <?php endif; ?>

  </div>

<?php get_footer(); ?>
