// console.log('main.js');

var FT_User = document.cookie.indexOf('FT_User');
var FT_User_map = {};
if (FT_User > -1) {
  FT_User_value = document.cookie.slice(FT_User).split(';')[0].split(':');
  var v;
  for (var i = 0; i < FT_User_value.length; i++) {
    v = FT_User_value[i].split('=');
    FT_User_map[v[0]] = v[1];
  }

} else {
  FT_User = false;
}


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

var DOMContentLoaded = false;
document.addEventListener("o.DOMContentLoaded", function() {
  if (DOMContentLoaded) {
    return;
  }
  DOMContentLoaded = true;

  // console.log('DOMContentLoaded');

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

  // track search by submitting the form
  document.querySelectorAll('#searchform').forEach(function(item, index){
    item.addEventListener('submit', function(event){
      var trackingEventConfig = getTrackingEventConfig('submit', 'help-search', null, {anything:'q:' + encodeUri(document.getElementById('s').value)});
      document.body.dispatchEvent(new CustomEvent('oTracking.event', trackingEventConfig));
    });
  });

  // hide related content if it's empty 
  // <!-- no pages to show -->

  document.querySelectorAll('.content-template .related-container').forEach(function (item) {
    if(item.innerHTML.indexOf('<!-- no pages to show -->') > -1){
      // item.style.display = 'none';
      document.querySelectorAll('.related').forEach(function (item) {
        item.style.display = 'none'
      });
    }
  });
  
  function widowsFormatting(item) {
    var caret = '<span class="caret">&nbsp;</span>';
    var text = item.innerHTML.split(caret)[0].trim().split(' ');
    var lastword = '<nobr>' + text.splice(text.length-3).join(' ') + ' ' + caret + '</nobr>';
    text.push(lastword);
    // console.log(text.join(' '));
    item.innerHTML = text.join(' ');
  }


  document.querySelectorAll('.category-template ul.children a').forEach(widowsFormatting);
  document.querySelectorAll('.subcategory-template ul.category a').forEach(widowsFormatting);

  document.querySelectorAll('.content-template .related-question a').forEach(function(item, index, collection) {
    if (index < 5) {
      widowsFormatting(item);
    } else {
      item.parentNode.style.display = 'none';
    }
  });


  var IOS_DEVICE_REGEX = /OS (7|8|9|10).* like Mac OS X.*/i;
  var ANDROID_DEVICE_REGEX = /Android (4\.[3-9]|[5-9])/i;

  function isWebAppCapableDevice (userAgent) {
    return IOS_DEVICE_REGEX.test(userAgent);
  }

  function isModernAndroidDevice (userAgent) {
    return ANDROID_DEVICE_REGEX.test(userAgent);
  }

  function showWebAppLink () {
    document.querySelectorAll('.js-webapp-link').forEach(function (a) {
      a.pathname = location.pathname;
      a.search = location.search;
      a.hidden = false;
    });
  }

  function showAndroidLink () {
    document.querySelectorAll('.js-android-link').forEach(function (a) {
      var param = 'location=' + encodeURIComponent(location.pathname + location.search);
      a.search = a.search + (a.search.length ? '&' : '?') + param;
      a.hidden = false;
    });
  }

  function showOptoutLink () {
    document.querySelectorAll('.js-optout-link').forEach(function (a) {
      var param = encodeURIComponent(location.href);
      a.search = '?location=' + param;
      a.hidden = false;
    });
  }

  // console.log('FT_User:', FT_User)


  if (isWebAppCapableDevice(navigator.userAgent)) {
    showWebAppLink();
  } else if (isModernAndroidDevice(navigator.userAgent)) {
    showAndroidLink();
  } else if(FT_User) {
    showOptoutLink();
  }

});

require('o-autoinit');
