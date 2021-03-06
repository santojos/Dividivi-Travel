jQuery(document).ready(function ($) {
  var textSync = $('.st_btn_start_sync_price').data('text');
  var textSyncIn = $('.st_btn_start_sync_price').data('text-in');
  var check_click = true;
  var st_sync_log = $('.st_sync_log');
  $('.st_btn_start_sync_price').click(function () {
      st_sync_log.html('');
      st_sync_log.append('<b>Starting Sync Price Data</b><br>');
      if (!check_click) return;
      check_click = false;
      $(this).text(textSyncIn);
      $.ajax({
          url: ajaxurl,
          type: 'POST',
          dataType: 'json',
          data: {
              action: 'st_sync_price_process',
              step: 1
          },
          success: function (json) {
              $.ajax({
                  url: ajaxurl,
                  type: 'POST',
                  data: {
                      action: 'st_sync_price_process',
                      step: 2,
                      post_type: json
                  },
                  success: function (res) {
                      sync_loop(0, res.total, json);
                  }
              });
          },
      });
  });
  function sync_loop(offset, total, post_type, index) {
      var start = new Date().getTime();
      $.ajax({
          url: ajaxurl,
          type: 'POST',
          data: {
              action: 'st_sync_price_process',
              offset: offset,
              total: total,
              step: 3,
              post_type: post_type,
              index: index
          },
          success: function (res) {
              if (parseInt(res.stop)) {
                  check_click = true;
                  st_sync_log.append('<br /><b class="sync-done">Successful all.</b><br>');
                  if(res.last_sync != "undefined"){
                      $('.st-sync-price-note').text('Last Sync: ' + res.last_sync);
                  }
                  $('.st_btn_start_sync_price').text(textSync);
                  return;
              }
              if (parseInt(res.offset) <= parseInt(res.total)) {
                  if (parseInt(res.stop) < 1) {
                      if (parseInt(res.offset) == 0) {
                          if(parseInt(res.index) > 0) {
                              st_sync_log.append('<b class="sync-done">Done</b><br /><br /><b>Start sync ' + res.post_type + '<b><br />');
                          }else{
                              st_sync_log.append('<br /><b>Start sync ' + res.post_type + '</b><br />');
                          }
                      }
                      var end = new Date().getTime();
                      st_sync_log.append('on sync ' + res.offset + '/' + res.total + ' ('+ (end-start)/1000 +'s) ...<br />');
                      sync_loop((parseInt(res.offset) + 10), parseInt(res.total), res.post_type, parseInt(res.index));
                  }
              }
          }
      });
  }
});
// jQuery(document).ready(function ($) {
//   var textSyncPrice = $('.st_btn_start_sync_price').data('text');
//   var textSyncPriceIn = $('.st_btn_start_sync_price').data('text-in');
//   var check_click_sync_price = true;
//   var st_sync_price_log = $('.st_sync_price_log');
//   $('.st_btn_start_sync_price').click(function () {
//     st_sync_price_log.html('');
//     st_sync_price_log.append('<b>Starting Sync Price Data</b><br>');
//     if (!check_click_sync_price) return;
//     check_click_sync_price = false;
//     $(this).text(textSyncPriceIn);
//     $.ajax({
//       url: ajaxurl,
//       type: 'POST',
//       dataType: 'json',
//       data: {
//         action: 'st_sync_price_process',
//         step: 1
//       },
//       success: function (json) {
//         $.ajax({
//           url: ajaxurl,
//           type: 'POST',
//           data: {
//             action: 'st_sync_price_process',
//             step: 2,
//             post_type: json
//           },
//           success: function (res) {
//             sync_price_loop(0, res.total, json);
//           }
//         });
//       },
//     });
//   });
//   function sync_price_loop(offset, total, post_type, index) {
//     var start = new Date().getTime();
//     $.ajax({
//       url: ajaxurl,
//       type: 'POST',
//       data: {
//         action: 'st_sync_price_process',
//         offset: offset,
//         total: total,
//         step: 3,
//         index: index
//       },
//       success: function (res) {
//         if (parseInt(res.stop)) {
//           check_click_sync_price = true;
//           st_sync_price_log.append('<br /><b class="sync-done">Successful all.</b><br>');
//           if(res.last_sync != "undefined"){
//             $('.st-sync-price-note').text('Last Sync: ' + res.last_sync);
//           }
//           $('.st_btn_start_sync_price').text(textSyncPrice);
//           return;
//         }
//         if (parseInt(res.offset) <= parseInt(res.total)) {
//           if (parseInt(res.stop) < 1) {
//             if (parseInt(res.offset) == 0) {
//               if(parseInt(res.index) > 0) {
//                 st_sync_price_log.append('<b class="sync-done">Done</b><br />');
//               }else{
//                 st_sync_price_log.append('<br /><b>Start sync...</b><br />');
//               }
//             }
//             var end = new Date().getTime();
//             st_sync_price_log.append('on sync ' + res.offset + '/' + res.total + ' ('+ (end-start)/1000 +'s) ...<br />');
//             sync_price_loop((parseInt(res.offset) + 2), parseInt(res.total), res.post_type, parseInt(res.index));
//           }
//         }
//       }
//     });
//   }
// });
