
var oTracking = require('o-tracking');

function otrackinginit() {

  var config_data = {
    server: 'https://spoor-api.ft.com/px.gif',
    context: {
      product: 'next',
      app: 'help'
    },
    user: {
      ft_session: oTracking.utils.getValueFromCookie(/FTSession=([^;]+)/)
    }
  };
  oTracking.init(config_data);
}

function addTrackingEvent(selector, callback) {
  var collection = document.querySelectorAll(selector);
  collection.forEach(function(item, index){
    item.addEventListener('click', callback(item, index));
  });
}

function getTrackingEventConfig(action, category, pos, context) {
  var trackingEventConfig = { 
    detail: { 
      category: category, 
      action: action, 
      context: {} 
    }, 
    bubbles: true
  };
  if(pos){
    trackingEventConfig.detail.pos = pos;
  }
  if (context) {
    if (context.anything) {
      trackingEventConfig.detail.context.anything = context.anything;
    }
    if (context.url) {
      trackingEventConfig.detail.context.url = context.url;
    }
  }

}

function getLinkTrackingEvent(category, pos, context){
  var track = (event) => {
    var trackingEventConfig = getTrackingEventConfig('click', category, pos, context);
    document.body.dispatchEvent(new CustomEvent('oTracking.event', trackingEventConfig));
  };
  return track;
}

document.addEventListener("o.DOMContentLoaded", function() {

  otrackinginit();

  // track visit to any page
  oTracking.page({
    content: {
      asset_type: 'page'
    }
  });

  oTracking.click.init('cta');

  //  track click from the cta button 
  addTrackingEvent('.cta', function(item, index){
    var callback = getLinkTrackingEvent('help-cta', 0, {url:item.getAttribute('href')});
    if (item.className.indexOf('chat')>-1) {
      if (item.className.indexOf('chat-online') > -1) {
        callback = getLinkTrackingEvent('help-cta', null, {anything:'chat-online', url:document.location.pathname});
      } else if (item.className.indexOf('chat-offline') > -1) {
        callback = getLinkTrackingEvent('help-cta', null, {anything:'chat-offline', url:document.location.pathname});
      }
    }
    return callback;
  });

  // // track click on the sub brand link 
  // addTrackingEvent('.header-sub-brand a', function (item, index) {
  //   return getLinkTrackingEvent('help-subBrand', null, {url:item.getAttribute('href')});
  // });

  // // track click on the breadcrumbs link
  // addTrackingEvent('.breadcrumbs a', function (item, index) {
  //   return getLinkTrackingEvent('help-breadcumbs', index+1, {url:item.getAttribute('href')});
  // });

  // // track click on category link from the help topic homepage
  // addTrackingEvent('.help-topic a', function (item, index) {
  //   return getLinkTrackingEvent('help-topic', index+1, {url:item.getAttribute('href')});
  // });

  // // track click from top answered links on homepage
  // addTrackingEvent('.top-answer a', function (item, index) {
  //   return getLinkTrackingEvent('help-top-answer', index+1, {url:item.getAttribute('href')});
  // });

  // // track click from related question links on qa pages
  // addTrackingEvent('.related-question a', function (item, index) {
  //   return getLinkTrackingEvent('help-related-question', index+1, {url:item.getAttribute('href')});
  // });

  // // track click on search results page
  // addTrackingEvent('.search-template h2.entry-title a', function (item, index) {
  //   return getLinkTrackingEvent('help-search-result', index+1, {url:item.getAttribute('href')});
  // });

  // // track click from any link on the footer
  // addTrackingEvent('.o-footer a', function (item, index) {
  //   return getLinkTrackingEvent('help-footer-link', null, {url:item.getAttribute('href')});
  // });

  // // track click to subcategory heading and qa page from catgory page links
  // document.querySelectorAll('.category-template ul.category li.page_item_has_children').forEach(function(item, subIndex){
  //   addTrackingEvent('.' + item.className.split(' ')[1] + ' > a', function (item) {
  //     return getLinkTrackingEvent('help-category-link', subIndex+1, {url:item.getAttribute('href'), anything:'subcategory'});
  //   });

  //   addTrackingEvent('.' + item.className.split(' ')[1] + ' ul.children a', function (item, index) {
  //     return getLinkTrackingEvent('help-category-link', index+1, {url:item.getAttribute('href'), anything:'qa'});
  //   });
  // });

  // // track click to qa from subcategory page links
  // addTrackingEvent('.subcategory-template ul.category li a', function (item, index) {
  //   return getLinkTrackingEvent('help-subcategory-link', index+1, {url:item.getAttribute('href'), anything:'qa'});
  // });

  // // track search by clicking on the button
  // document.querySelectorAll('#searchsubmit').forEach(function(item, index){
  //   item.addEventListener('click', function(event){
  //     var trackingEventConfig = getTrackingEventConfig('click', 'help-search', null, {anything:'q:' + encodeUri(document.getElementById('s').value)});
  //     document.body.dispatchEvent(new CustomEvent('oTracking.event', trackingEventConfig));
  //   });
  // });

  // track search by submitting the form
  document.querySelectorAll('#searchform').forEach(function(item, index){
    item.addEventListener('submit', function(event){
      var trackingEventConfig = getTrackingEventConfig('submit', 'help-search', null, {anything:'q:' + encodeUri(document.getElementById('s').value)});
      document.body.dispatchEvent(new CustomEvent('oTracking.event', trackingEventConfig));
    });
  });

  // // track click on the contact us links
  // addTrackingEvent('.contact-template contact a', function (item, index) {
  //   return getLinkTrackingEvent('help-contact-link', index+1, {url:item.getAttribute('href')});
  // });


  // hide related content if it's empty 
  // <!-- no pages to show -->

  document.querySelectorAll('.content-template .content').forEach(function (item) {
    if(item.innerHTML.indexOf('<!-- no pages to show -->') > -1){
      item.style.display = 'none'
    }
  });
  


});

require('o-autoinit');
