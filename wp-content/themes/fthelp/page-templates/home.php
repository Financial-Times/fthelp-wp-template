<?php
/**
 * Template Name: Home Page
 *
 * @package WordPress
 * @subpackage ft_help
 * @since ft_help 1.0
 */

get_header(); ?>

  <div class="home-template">
    <div class="o-grid-container">
      <div class="o-grid-row">
        <div data-o-grid-colspan="12">

          <?php get_template_part( 'helpSearchForm' ); ?>

          <div class="o-grid-container primary-action">
            <div class="o-grid-row">
              <div data-o-grid-colspan="6">
                <div class="chat">
                  <div>Welcome to Live FT Chat</div>
                  <a href="#void" role="button" class="o-buttons o-buttons--big">Ask a Question</a>
                </div>
              </div>
              <div data-o-grid-colspan="6">
                <div class="contact">
                  <div>Contact our Customer Service</div>
                  <a href="#void" role="button" class="o-buttons o-buttons--big">Contact Us</a>
                </div>
              </div>
            </div>
            <div class="o-grid-row">
              <div data-o-grid-colspan="6">
                <div class="new-ft">
                  <div>Check out the new FT</div>
                  <a href="#void" role="button" class="o-buttons o-buttons--big">Take a Tour</a>
                </div>
              </div>
              <div data-o-grid-colspan="6">
                <div class="old-ft">
                  <div>Not a big fan of the new look & feel?</div>
                  <a href="#void" role="button" class="o-buttons o-buttons--big">Return to the Old FT.com</a>
                </div>
              </div>
            </div>
          </div>

          <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <p><?php the_content(__('(more...)')); ?></p>
          <?php endwhile; else: ?>
            <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
          <?php endif; ?>

        </div>
      </div>
    </div>
  </div>


<?php get_footer();?>
