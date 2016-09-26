<?php
/**
 * The template for displaying search results pages
 *
 * @package WordPress
 * @subpackage next_help
 * @since next_help 1.0
 */

get_header(); ?>

  <?php get_template_part( 'breadcrumbs' ); ?>

  <div class="search-template">

    <?php get_template_part( 'helpSearchForm' ); ?>
    
    <div class="page-heading-container">

      <div class="heading">
        <div>
          <div class="title-container"><h1>Search Results for: <?php echo get_search_query()?></h1></div>
          <div class="chat-container"><?php get_template_part( 'primary-action-chat' ); ?></div>
        </div>
      </div>
      
      <div class="heading-mobile">
        <h1>Search Results for: <?php echo get_search_query()?></h1>
      </div>
      
    </div>

    <div class="content">
      <hr/>
      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
          <div class="content-wrap">
            <?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );?>
            <p><?php the_excerpt(); ?></p> 
          </div>
      <?php endwhile; else: ?>
          <div class="icon">
            <h2 class="entry-title"><?php _e('Sorry, but nothing matched your search terms. Please try again with some different keywords'); ?></h2>
          </div>
      <?php endif; ?>

      <?php if (have_posts()) : 
        echo get_template_part( 'back-to-top' );
      endif; ?>

    </div>
  </div>

<?php get_footer(); ?>
