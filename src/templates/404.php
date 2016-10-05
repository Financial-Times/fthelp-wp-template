<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 * @subpackage next_help
 * @since next_help 1.0
 */

get_header(); ?>

  <div class="content-template o-grid-container" data-trackable="not-found">

    <?php get_template_part( 'partials/search-form' ); ?>

    <div class="o-grid-row">
      <div data-o-grid-colspan="12 M4" class="chat-container"><?php get_template_part( 'partials/primary-action-chat' ); ?></div>
      <div data-o-grid-colspan="12 Mhide"><hr/></div>
      <div data-o-grid-colspan="12 M8" class="content-container">
        <h1>Sorry</h1>
        <p>The page you are trying to access does not exist.<br>
        This might be because you have entered the web address incorrectly or the page has moved.</p>
        <p>For help please contact <a class="error-page__link" href="mailto:help@ft.com">help@ft.com</a>.<br/>
        We apologise for any inconvenience.</p>
      </div>
    </div>

  </div>

<?php get_footer(); ?>