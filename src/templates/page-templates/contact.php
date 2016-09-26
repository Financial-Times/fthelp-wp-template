<?php
/**
 * Template Name: Contact Us
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

    <?php get_template_part( 'breadcrumbs' ); ?>

    <div class="contact-template">

      <?php get_template_part( 'helpSearchForm' ); ?>

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    
        <?php get_template_part( 'page-heading-container' ); ?>

        <div class="content">
          <hr/>
          <?php the_content(__('(more...)')); ?>
        </div>

        <?php get_template_part( 'back-to-top' ); ?>

        <div class="feedback-banner">
          <div>
            <div>
              <div class="msg">
                <H4>Help us improve</H4>
                <p>We're constantly improving and would like to hear from you</p>
              </div>
              <div class="action"><a href="https://www.ft.com/nps-feedback" class="o-buttons o-buttons--standout">PROVIDE FEEDBACK</a></div>
            </div>          
          </div>
        </div>

      <?php endwhile; else: ?>
        <?php _e('Sorry, no pages matched your criteria.'); ?>
      <?php endif; ?>

    </div>

<?php get_footer(); ?>