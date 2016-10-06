<?php
/**
 * The next help main template file
 *
 * @package WordPress
 * @subpackage next_help
 * @since next_help 1.0
 */

get_header(); ?>

  <?php get_template_part( 'partials/breadcrumbs' ); ?>

  <div class="content-template o-grid-container" data-trackable="content">

    <?php get_template_part( 'partials/search-form' ); ?>

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  
      <div class="o-grid-row">
        <div data-o-grid-colspan="12 M4" class="chat-container"><?php get_template_part( 'partials/primary-action-chat' ); ?></div>
        <div data-o-grid-colspan="12 Mhide"><hr/></div>
        <div data-o-grid-colspan="12 M8" class="content-container">
          <h1><?php the_title(); ?></h1>
          <?php the_content(__('(more...)')); ?>
        </div>
      </div>

      <div class="o-grid-row related">
        <div data-o-grid-colspan="hide M12"><hr/></div>
      </div>

      <div class="o-grid-row related">
        <div data-o-grid-colspan="12 M8" class="related-container" data-trackable="related-question">
          <h2 class="o-typography-subhead--crosshead">RELATED QUESTIONS</h2>
          <?php echo do_shortcode('[siblings depth="1" exclude="current" sort_column="menu_order" class="related-question" link_after=" <span class=\'caret\'>&nbsp;</span>"]') ?>
        </div>
      </div>

      <?php get_template_part( 'partials/back-to-top' ); ?>

    <?php endwhile; else: ?>
      <div data-o-grid-colspan="12">
        <?php _e('Sorry, no pages matched your criteria.'); ?>
      </div>
    <?php endif; ?>

  </div>
      
<?php get_footer(); ?>