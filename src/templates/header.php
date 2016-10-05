<!DOCTYPE html>
<html lang="en" class="o-hoverable-on core">
<head>
    <meta charset="utf-8">  
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="robots" content="noindex, nofollow">
    <title>Help | FT Help | FT.com <?php the_title(); ?></title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width">

    <!-- Add CTM styles -->
    <style type="text/css">
        /* Hide any enhanced experience content when in core mode, and vice versa. */
        .core .o--if-js,
        .enhanced .o--if-no-js { display: none !important; }
    </style>
    <!-- Add CTM check -->


    <!--
      Perform your cuts the mustard test.
      For information about what features come bundled with other
      features in all browsers, see caniuse.com
    -->
    <script>
      var cutsTheMustard = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window);

      if (cutsTheMustard) {
        // Swap the `core` class on the HTML element for an `enhanced` one
        // We're doing it early in the head to avoid a flash of unstyled content
        document.documentElement.className = document.documentElement.className.replace(/\bcore\b/g, 'enhanced');
      }


      function ctmLoadScript (config, callback) {
        if (cutsTheMustard) {
          var head = document.head || document.getElementsByTagName('head')[0];
          callback = callback || function () {};

          callbackIssued = false;

          var error = function (e) {
            if (!callbackIssued) {
              callbackIssued = true;

              callback(e || new Error("Timeout"));
            }
          };

          var success = function () {
            if (!callbackIssued) {
              callbackIssued = true;

              callback(null);
            }
          };

          script = document.createElement("script");
          script.async = (config.async === false ? false : true);

          if (config.charset) {
            script.charset = config.charset;
          }

          script.src = config.src;

          var destroy = function () {
            if (script) {
              // Handle memory leak in IE
              script.onload = script.onreadystatechange = null;

              // Remove the script
              if ( script.parentNode ) {
                script.parentNode.removeChild( script );
              }

              // Dereference the script
              script = null;
            }
          };

          script.onload = script.onreadystatechange = function( _, isAbort ) {
            if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {
              destroy();

              if (isAbort) {
                error(new Error("Aborted."));
                return;
              }

              success();
            }
          };

          script.onerror = function () {
            destroy();
            error(new Error("Error loading script."));
          };

          head.insertBefore( script, head.firstChild );
        }
      }
    </script>
  
    <!-- Add Polyfil service -->
    <script src="//cdn.polyfill.io/v1/polyfill.min.js"></script> 

    <script src="//origami-build.ft.com/v2/bundles/js?modules=o-footer@^5.0.3,o-header@^6.5.1,o-fonts@^2.0.0,o-icons@^5.0.0,o-buttons@^4.0.2"></script>
    <script src="//registry.origami.ft.com/embedapi?autoload=resize"></script>
    <script>
      (function () {
        ctmLoadScript({
          src: "<?php bloginfo('template_url');?>/js/main.js",
          async: true
        });
      }());
    </script>

    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url');?>">

    <link rel="stylesheet" href="//origami-build.ft.com/v2/bundles/css?modules=o-header@^6.5.1,o-fonts@^2.0.0,o-grid@^4.2.1,o-footer@^5.0.3,o-typography@^4.3.1,o-forms@^3.2.0,o-icons@^5.0.0,o-buttons@^4.4.0">

    <script>
    var cutsTheMustard = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window);
    if (cutsTheMustard) {
      // Swap the 'core' class on the HTML element for an 'enhanced' one
      // We're doing it early in the head to avoid a flash of unstyled content
      document.documentElement.className = document.documentElement.className.replace(/\bcore\b/g, 'enhanced');
    }
    </script>

    <?php wp_head();?>
</head>
<body>
  <!-- Add fallback if browsers don't cut the mustard -->
  <div class="o-tracking o--if-no-js" data-o-component="o-tracking">
      <div style="background:url('https://spoor-api.ft.com/px.gif?data=%7B%22category%22:%22page%22,%20%22action%22:%22view%22,%20%22system%22:%7B%22apiKey%22:%22qUb9maKfKbtpRsdp0p2J7uWxRPGJEP%22,%22source%22:%22o-tracking%22,%22version%22:%221.0.0%22%7D,%22context%22:%7B%22product%22:%22ft.com%22,%22content%22:%7B%22asset_type%22:%22page%22%7D%7D%7D');"></div>
  </div>
  <a name="top"></a>
  
  <header class="o-header o-header--simple" data-o-component="o-header" data-o-header--no-js="">
    <div class="o-header__row o-header__top">
      <div class="o-header__container">
        <div class="o-header__top-wrapper">

          <div class="o-header__top-column o-header__top-column--center">
            <a class="o-header__top-logo" href="//www.ft.com" title="Go to Financial Times homepage" data-trackable="ft-logo">
              <span class="o-header__visually-hidden">Financial Times</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  </header>

  <div class="header-sub-brand-container">
    <div class="header-sub-brand o-grid-container"><h1 class="o-typography-subhead"><a href="/" data-trackable="sub-brand">Help Centre</a></h1></div>
  </div>


