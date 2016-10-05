<?php
/**
 * Template Name: Contact Us
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

    <div class="contact-template o-grid-container" data-trackable="contact">

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
            <?php the_content(__('(more...)')); ?>
          </div>
        </div>

        <?php get_template_part( 'partials/back-to-top' ); ?>

        <div class="o-grid-row">
          <div data-o-grid-colspan="12">
            <div class="o-grid-container o-grid-container--bleed feedback-container">
              <div class="o-grid-row o-grid-row--compact">

                <div data-o-grid-colspan="12 M8" class="msg">
                  <H4>Help us improve.</H4>
                  <p>We're constantly improving and would like to hear from you.</p>
                </div>
                <div data-o-grid-colspan="12 M4" class="action"><a href="https://www.ft.com/nps-feedback" data-trackable="feedback-banner" class="o-buttons o-buttons--standout o-buttons--big">PROVIDE FEEDBACK</a></div>
                
              </div>
            </div>
          </div>
        </div>

      <?php endwhile; else: ?>
        <div data-o-grid-colspan="12">
          <?php _e('Sorry, no pages matched your criteria.'); ?>
        </div>
      <?php endif; ?>

    </div>

<?php get_footer(); ?>