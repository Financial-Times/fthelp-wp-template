<div data-o-grid-colspan="12"><hr/></div>
<div data-o-grid-colspan="12 M8">
  <h2 class="o-typography-subhead--crosshead top-answer">TOP ANSWERED QUESTIONS</h2>


  <div class="page-list page-list-ext top-answer">
  <?php 
  	$ids = explode(",", get_post_meta(157, 'top-answer-include', true));
    $count = 1;
  	foreach ($ids as $id) {
  		$page = get_page($id);

  		$title = $page->post_title;
  		$link = get_page_link($id);
  		$excerpt = wp_trim_words( wp_strip_all_tags( $page->post_content ), intval(get_post_meta(157, 'top-answer-include-limit', true)), ' ...');

  		echo '<div class="page-list-ext-item">
  					<h3 class="page-list-ext-title"><a href="' . $link . '" title="' . $title . '" data-trackable="top-answer-' . $count . '">' . $title . '</a></h3>
  					<div class="page-list-ext-item-content">' . $excerpt . '</div>
  					</div>';

      $count = $count+1;
  	}
  ?>
	</div>

</div>
