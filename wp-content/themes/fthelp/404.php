<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage next_help
 * @since next_help 1.0
 */

get_header(); ?>
      
<?php get_template_part( 'partials/breadcrumbs' ); ?>

<div class="content-template">

  <?php get_template_part( 'partials/search-form' ); ?>

  <div class="page-heading-container">

    <div class="heading">
      <div>
        <div class="title-container">
          <h1>Sorry</h1>
          <div class="content-wrapper">
            <p>The page you are trying to access does not exist.<br>
            This might be because you have entered the web address incorrectly or the page has moved.</p>
            <p>For help please contact <a class="error-page__link" href="mailto:help@ft.com">help@ft.com</a>.<br/>
            We apologise for any inconvenience.</p>
          </div>
        </div>
        <div class="chat-container"><?php get_template_part( 'partials/primary-action-chat' ); ?></div>
      </div>
    </div>
    
    <div class="heading-mobile">
      <h1>Sorry</h1>
      <div class="content-wrapper">
        <p>The page you are trying to access does not exist.<br>
        This might be because you have entered the web address incorrectly or the page has moved.</p>
        <p>For help please contact <a class="error-page__link" href="mailto:help@ft.com">help@ft.com</a>.<br/>
        We apologise for any inconvenience.</p>
      </div>
    </div>
    
  </div>

</div>

<?php get_footer(); ?>