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

  <div class="content-template" data-trackable="content">

    <?php get_template_part( 'partials/search-form' ); ?>

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  
      <div class="page-heading-container">

        <div class="heading">
          <div>
            <div class="title-container">
              <h1><?php the_title(); ?></h1>
              <div class="content-wrapper">
                <?php the_content(__('(more...)')); ?>
              </div>
            </div>
            <div class="chat-container"><?php get_template_part( 'partials/primary-action-chat' ); ?></div>
          </div>
        </div>
        
        <div class="heading-mobile">
          <h1><?php the_title(); ?></h1>
          <div class="content-wrapper">
            <?php the_content(__('(more...)')); ?>
          </div>
        </div>
        
      </div>

      <div class="content">

        <h2 class="o-typography-subhead--crosshead">RELATED QUESTIONS</h2>
        <div class="related-question-container" data-trackable="related-question">
          <div>
            <div>
              <?php echo do_shortcode('[siblings depth="1" exclude="current" sort_column="menu_order" class="related-question" link_after=" <span class=\'caret\'>&nbsp;</span>"]') ?>
            </div>
          </div>
        </div>

      </div>
      
      <?php get_template_part( 'partials/back-to-top' ); ?>

    <?php endwhile; else: ?>
      <?php _e('Sorry, no pages matched your criteria.'); ?>
    <?php endif; ?>

  </div>

<?php get_footer(); ?>