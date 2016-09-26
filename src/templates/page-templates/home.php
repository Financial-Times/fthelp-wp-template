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
    
    <?php get_template_part( 'helpSearchForm' ); ?>

    <div class="primary-action">
      <div>
        <div>
          <?php get_template_part( 'primary-action-chat' ); ?>
        </div>
        <div>
          <div class="contact">
            <div>Contact our Customer Service</div>
            <a href="<?php echo site_url('/help/contact-us/'); ?>" role="button" class="o-buttons o-buttons--b2c">Contact Us</a>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div class="new-ft">
            <div>Check out the new FT</div>
            <a href="//www.ft.com/tour" role="button" class="o-buttons o-buttons--b2c">View Tips</a>
          </div>
        </div>
        <div>
          <div class="old-ft">
            <div>Return to the Old FT.com</div>
            <a href="//www.ft.com/opt-out-confirm?location=help" role="button" class="o-buttons o-buttons--b2c">Go Back</a>
          </div>
        </div>
      </div>
    </div>

    <div class="content">

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        
        <?php the_content(__('(more...)')); ?>

      <?php endwhile; else: ?>
        <?php _e('Sorry, no posts matched your criteria.'); ?>
      <?php endif; ?>
      
    </div>

    <?php get_template_part( 'back-to-top' ); ?>

  </div>
  
<?php get_footer();?>