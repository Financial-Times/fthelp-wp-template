<?php
/**
 * Template Name: Category Page
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

    <div class="category-template o-grid-container" data-trackable="category">

      <?php get_template_part( 'partials/search-form' ); ?>

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    
        <div class="o-grid-row">
          <div data-o-grid-colspan="12 M6" class="chat-container"><?php get_template_part( 'partials/primary-action-chat' ); ?></div>
          <div data-o-grid-colspan="12 Mhide"><hr/></div>
          <div data-o-grid-colspan="12 M6" class="heading-container">
            <h1><?php the_title(); ?></h1>
          </div>
        </div>
        <div class="o-grid-row">
          <div data-o-grid-colspan="hide M12"><hr/></div>
        </div>
        <div class="o-grid-row">
          <div data-o-grid-colspan="12" class="content-container">
            <?php echo do_shortcode('[subpages sort_column="menu_order" class="category" link_after=" <span class=\'caret\'>&nbsp;</span>"]') ?>
          </div>
        </div>

        <?php get_template_part( 'partials/back-to-top' ); ?>

      <?php endwhile; else: ?>
        <?php get_template_part( 'partials/not-found' ); ?>
      <?php endif; ?>

    </div>
  
<?php get_footer();?>