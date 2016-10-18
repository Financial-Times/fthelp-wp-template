<?php
/**
 * Template Name: Home Page
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

  <div class="home-template o-grid-container" data-trackable="home">
    
    <?php get_template_part( 'partials/search-form' ); ?>

    <?php get_template_part( 'partials/primary-action' ); ?>

    <div class="o-grid-row">

      <div data-o-grid-colspan="12"><hr/></div>
      <div data-o-grid-colspan="12">
        <h2 class="o-typography-subhead--crosshead">HELP TOPICS</h2>
        <?php echo do_shortcode('[subpages depth="1" sort_column="menu_order" class="help-topic" link_after=" <span class=\'caret\'>&nbsp;</span>" exclude="' . get_post_meta(get_the_ID(), 'help-topic-exclude', true) . '"]') ?>
      </div>

      <?php get_template_part( 'partials/top-answered' ); ?>

    </div>
    
    <?php get_template_part( 'partials/back-to-top' ); ?>

  </div>
  
<?php get_footer();?>