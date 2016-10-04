<?php
/**
 * The template for displaying search results pages
 *
 * @package WordPress
 * @subpackage next_help
 * @since next_help 1.0
 */

get_header(); ?>
<div class="search-template-container">

  <div class="search-template">

    <?php get_template_part( 'partials/search-form' ); ?>
    
    <?php if ( have_posts() ) : ?>

      <div class="page-heading-container">
        <div class="heading">
          <div>
            <div class="title-container">
              <h1>Search Results for: <?php echo get_search_query()?></h1>
              <?php
              // Start the loop.
              while ( have_posts() ) : the_post(); ?>
                <div class="content-wrapper">
                  <?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );?>
                  <p><?php the_excerpt(); ?></p> 
                </div>
              <?php
              // Start the loop.
              endwhile; ?>
            </div>
            <div class="chat-container"><?php get_template_part( 'partials/primary-action-chat' ); ?></div>
          </div>
        </div>
        <div class="heading-mobile">
          <h1>Search Results for: <?php echo get_search_query()?></h1>
          <?php
          // Start the loop.
          while ( have_posts() ) : the_post(); ?>
            <div class="content-wrapper">
              <?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );?>
              <p><?php the_excerpt(); ?></p> 
            </div>
          <?php
          // Start the loop.
          endwhile; ?>
        </div>

      </div>

      <?php get_template_part( 'partials/back-to-top' ); ?>

    <?php else : ?>
      <div class="content-wrapper no-result">
        <div class="icon">
          <h1>Search Results for: <?php echo get_search_query()?></h1>
          <h2 class="entry-title"><?php _e('Sorry, but nothing matched your search terms. Please try again with some different keywords'); ?></h2>
        </div>
      </div>
    <?php endif; ?>

  </div>
</div>
<?php get_footer(); ?>
