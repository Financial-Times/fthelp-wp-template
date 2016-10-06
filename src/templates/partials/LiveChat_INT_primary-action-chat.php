<!-- INT 03/10/2016 -->
<div class="chat chat-online" id="liveagent_button_online_573260000008OSe">
  <div>Chat with FT Customer Service</div>
  <a href="javascript:liveagent.startChat('573260000008OSe');void(0);" role="button" data-trackable="chat" class="cta chat-online o-buttons o-buttons--b2c">Start chat</a>
</div>

<div class="chat chat-offline" id="liveagent_button_offline_573260000008OSe">
  <div>Chat with FT Customer Service</div>
  <a href="#void" role="button" class="cta chat-offline o-buttons o-buttons--b2c" data-trackable="chat" disabled="disabled">Currently offline</a>
</div>


<!-- chat button code -->
<script type="text/javascript">
  if (!window._laq) { window._laq = []; }
    window._laq.push(function(){
      liveagent.showWhenOnline('573260000008OSe', document.getElementById('liveagent_button_online_573260000008OSe'));
      liveagent.showWhenOffline('573260000008OSe', document.getElementById('liveagent_button_offline_573260000008OSe'));

      var FT_User = document.cookie.indexOf('FT_User');
      var FT_User_map = {};
      if (FT_User > -1) {
        FT_User_value = document.cookie.slice(FT_User).split(';')[0].split(':');
        var v;
        for (var i = 0; i < FT_User_value.length; i++) {
          v = FT_User_value[i].split('=');
          FT_User_map[v[0]] = v[1];
        }
        liveagent.addCustomDetail("erightsId", FT_User_map.ERIGHTSID).map("Contact", "FT_com_Id__c", true, true, true);
        liveagent.addCustomDetail("Primary Email", FT_User_map.EMAIL).map("Contact", "Email", true, true, true);
        liveagent.addCustomDetail("Page Name","<?php echo the_title(); ?>").saveToTranscript("ReferrerUri");  
        liveagent.addCustomDetail("Page Number", 1).saveToTranscript("Page_Number__c");
      }

    });
</script>


<!-- chat deployment code -->
<script type='text/javascript' src='https://c.la1-c2cs-lon.salesforceliveagent.com/content/g/js/38.0/deployment.js'></script>
<script type='text/javascript'>
  liveagent.init('https://d.la1-c2cs-lon.salesforceliveagent.com/chat', '572260000008ONP', '00D260000008cKY');
  liveagent.setChatWindowWidth(494); 
  liveagent.setChatWindowHeight(540);
</script>

