$.datepicker._defaults.onAfterUpdate = null;
var datepicker__updateDatepicker = $.datepicker._updateDatepicker;
$.datepicker._updateDatepicker = function( inst ) {
   datepicker__updateDatepicker.call( this, inst );
   var onAfterUpdate = this._get(inst, 'onAfterUpdate');
   if (onAfterUpdate)
      onAfterUpdate.apply((inst.input ? inst.input[0] : null),
         [(inst.input ? inst.input.val() : ''), inst]);
}
$(function() {
   var cur = -1, prv = -1;
   $('#jrange-appointments div')
      .datepicker({
            //numberOfMonths: 3,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            beforeShowDay: function ( date ) {
                  return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
               },
            onSelect: function ( dateText, inst ) {
                  var d1, d2;
                  prv = cur;
                  cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                  if ( prv == -1 || prv == cur ) {
                     prv = cur;
                     $('#jrange-appointments input').val( dateText );
                  } else {
                     d1 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.min(prv,cur)), {} );
                     d2 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.max(prv,cur)), {} );
                     $('#jrange-appointments input').val( d1+' - '+d2 );
                  }
               },
            onChangeMonthYear: function ( year, month, inst ) {
                  //prv = cur = -1;
               },
            onAfterUpdate: function ( inst ) {
                  $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                     .appendTo($('#jrange-appointments div .ui-datepicker-buttonpane'))
                     .on('click', function () { 
                        $('#jrange-appointments div').hide(); 
                        var d = $('#jrange-appointments input').val().split(' - ');
                        startDate = $.datepicker.parseDate( 'mm/dd/yy', d[0]);
                        endDate = $.datepicker.parseDate( 'mm/dd/yy', d[1] );
                        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                        getAllData(d[0], d[1]);
                        drawGauge('Appointments_House', "IN HOUSE", diffDays, AppointmentsHouse,stopsColors[0],0);
                        drawGauge('Appointments_Phone', "PHONE", diffDays*2, AppointmentsPhone,stopsColors[1],0);
                     });
               }
         })
      .position({
            my: 'left top',
            at: 'left bottom',
            of: $('#jrange-appointments input')
         })
      .hide();
   $('#jrange-appointments input').on('focus', function (e) {
         var v = this.value,
             d;
         try {
            if ( v.indexOf(' - ') > -1 ) {
               d = v.split(' - ');
               prv = $.datepicker.parseDate( 'mm/dd/yy', d[0] ).getTime();
               cur = $.datepicker.parseDate( 'mm/dd/yy', d[1] ).getTime();
            } else if ( v.length > 0 ) {
               prv = cur = $.datepicker.parseDate( 'mm/dd/yy', v ).getTime();
            }
         } catch ( e ) {
            cur = prv = -1;
         }
         if ( cur > -1 )
            $('#jrange-appointments div').datepicker('setDate', new Date(cur));
         $('#jrange-appointments div').datepicker('refresh').show();
      });
});
$(function() {
   var cur = -1, prv = -1;
   $('#jrange-pvh div')
      .datepicker({
            //numberOfMonths: 3,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            beforeShowDay: function ( date ) {
                  return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
               },
            onSelect: function ( dateText, inst ) {
                  var d1, d2;
                  prv = cur;
                  cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                  if ( prv == -1 || prv == cur ) {
                     prv = cur;
                     $('#jrange-pvh input').val( dateText );
                  } else {
                     d1 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.min(prv,cur)), {} );
                     d2 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.max(prv,cur)), {} );
                     $('#jrange-pvh input').val( d1+' - '+d2 );
                  }
               },
            onChangeMonthYear: function ( year, month, inst ) {
                  //prv = cur = -1;
               },
            onAfterUpdate: function ( inst ) {
                  $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                     .appendTo($('#jrange-pvh div .ui-datepicker-buttonpane'))
                     .on('click', function () { 
                        $('#jrange-pvh div').hide(); 
                        var d = $('#jrange-pvh input').val().split(' - ');
                        startDate = $.datepicker.parseDate( 'mm/dd/yy', d[0]);
                        endDate = $.datepicker.parseDate( 'mm/dd/yy', d[1] );
                        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                        getAllData(d[0], d[1]);
                        drawDonut('PvH', 'APPOINTMENTS TOTAL',[['In House', AppointmentsHouse], ['Phone', AppointmentsPhone]]);
                     });
               }
         })
      .position({
            my: 'left top',
            at: 'left bottom',
            of: $('#jrange-pvh input')
         })
      .hide();
   $('#jrange-pvh input').on('focus', function (e) {
         var v = this.value,
             d;
         try {
            if ( v.indexOf(' - ') > -1 ) {
               d = v.split(' - ');
               prv = $.datepicker.parseDate( 'mm/dd/yy', d[0] ).getTime();
               cur = $.datepicker.parseDate( 'mm/dd/yy', d[1] ).getTime();
            } else if ( v.length > 0 ) {
               prv = cur = $.datepicker.parseDate( 'mm/dd/yy', v ).getTime();
            }
         } catch ( e ) {
            cur = prv = -1;
         }
         if ( cur > -1 )
            $('#jrange-pvh div').datepicker('setDate', new Date(cur));
         $('#jrange-pvh div').datepicker('refresh').show();
      });
});
$(function() {
   var cur = -1, prv = -1;
   $('#jrange-cr div')
      .datepicker({
            //numberOfMonths: 3,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            beforeShowDay: function ( date ) {
                  return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
               },
            onSelect: function ( dateText, inst ) {
                  var d1, d2;
                  prv = cur;
                  cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                  if ( prv == -1 || prv == cur ) {
                     prv = cur;
                     $('#jrange-cr input').val( dateText );
                  } else {
                     d1 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.min(prv,cur)), {} );
                     d2 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.max(prv,cur)), {} );
                     $('#jrange-cr input').val( d1+' - '+d2 );
                  }
               },
            onChangeMonthYear: function ( year, month, inst ) {
                  //prv = cur = -1;
               },
            onAfterUpdate: function ( inst ) {
                  $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                     .appendTo($('#jrange-cr div .ui-datepicker-buttonpane'))
                     .on('click', function () { 
                        $('#jrange-cr div').hide(); 
                        var d = $('#jrange-cr input').val().split(' - ');
                        startDate = $.datepicker.parseDate( 'mm/dd/yy', d[0]);
                        endDate = $.datepicker.parseDate( 'mm/dd/yy', d[1] );
                        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                        getAllData(d[0], d[1]);
                        drawGauge('Closed_Ratio_House', "IN HOUSE", AppointmentsHouse, AppointmentsDateHouse,stopsColors[2],1);
                        drawGauge('Closed_Ratio_Phone', "PHONE", AppointmentsPhone, AppointmentsDatePhone,stopsColors[3],1);
                     });
               }
         })
      .position({
            my: 'left top',
            at: 'left bottom',
            of: $('#jrange-cr input')
         })
      .hide();
   $('#jrange-cr input').on('focus', function (e) {
         var v = this.value,
             d;
         try {
            if ( v.indexOf(' - ') > -1 ) {
               d = v.split(' - ');
               prv = $.datepicker.parseDate( 'mm/dd/yy', d[0] ).getTime();
               cur = $.datepicker.parseDate( 'mm/dd/yy', d[1] ).getTime();
            } else if ( v.length > 0 ) {
               prv = cur = $.datepicker.parseDate( 'mm/dd/yy', v ).getTime();
            }
         } catch ( e ) {
            cur = prv = -1;
         }
         if ( cur > -1 )
            $('#jrange-cr div').datepicker('setDate', new Date(cur));
         $('#jrange-cr div').datepicker('refresh').show();
      });
});
$(function() {
   var cur = -1, prv = -1;
   $('#jrange-revenue div')
      .datepicker({
            //numberOfMonths: 3,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            beforeShowDay: function ( date ) {
                  return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
               },
            onSelect: function ( dateText, inst ) {
                  var d1, d2;
                  prv = cur;
                  cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                  if ( prv == -1 || prv == cur ) {
                     prv = cur;
                     $('#jrange-revenue input').val( dateText );
                  } else {
                     d1 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.min(prv,cur)), {} );
                     d2 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.max(prv,cur)), {} );
                     $('#jrange-revenue input').val( d1+' - '+d2 );
                  }
               },
            onChangeMonthYear: function ( year, month, inst ) {
                  //prv = cur = -1;
               },
            onAfterUpdate: function ( inst ) {
                  $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                     .appendTo($('#jrange-revenue div .ui-datepicker-buttonpane'))
                     .on('click', function () { 
                        $('#jrange-revenue div').hide(); 
                        var d = $('#jrange-revenue input').val().split(' - ');
                        startDate = $.datepicker.parseDate( 'mm/dd/yy', d[0]);
                        endDate = $.datepicker.parseDate( 'mm/dd/yy', d[1] );
                        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                        getAllData(d[0], d[1]);
                        drawBarChart('Revenue', TotalRevenueCategories, TotalRevenueValues, '', '', Colors[2], 1);
                     });
               }
         })
      .position({
            my: 'left top',
            at: 'left bottom',
            of: $('#jrange-revenue input')
         })
      .hide();
   $('#jrange-revenue input').on('focus', function (e) {
         var v = this.value,
             d;
         try {
            if ( v.indexOf(' - ') > -1 ) {
               d = v.split(' - ');
               prv = $.datepicker.parseDate( 'mm/dd/yy', d[0] ).getTime();
               cur = $.datepicker.parseDate( 'mm/dd/yy', d[1] ).getTime();
            } else if ( v.length > 0 ) {
               prv = cur = $.datepicker.parseDate( 'mm/dd/yy', v ).getTime();
            }
         } catch ( e ) {
            cur = prv = -1;
         }
         if ( cur > -1 )
            $('#jrange-revenue div').datepicker('setDate', new Date(cur));
         $('#jrange-revenue div').datepicker('refresh').show();
      });
});
$(function() {
   var cur = -1, prv = -1;
   $('#jrange-quoted div')
      .datepicker({
            //numberOfMonths: 3,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            beforeShowDay: function ( date ) {
                  return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
               },
            onSelect: function ( dateText, inst ) {
                  var d1, d2;
                  prv = cur;
                  cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                  if ( prv == -1 || prv == cur ) {
                     prv = cur;
                     $('#jrange-quoted input').val( dateText );
                  } else {
                     d1 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.min(prv,cur)), {} );
                     d2 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.max(prv,cur)), {} );
                     $('#jrange-quoted input').val( d1+' - '+d2 );
                  }
               },
            onChangeMonthYear: function ( year, month, inst ) {
                  //prv = cur = -1;
               },
            onAfterUpdate: function ( inst ) {
                  $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                     .appendTo($('#jrange-quoted div .ui-datepicker-buttonpane'))
                     .on('click', function () { 
                        $('#jrange-quoted div').hide(); 
                        var d = $('#jrange-quoted input').val().split(' - ');
                        startDate = $.datepicker.parseDate( 'mm/dd/yy', d[0]);
                        endDate = $.datepicker.parseDate( 'mm/dd/yy', d[1] );
                        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                        getAllData(d[0], d[1]);
                        drawBarChart('Quoted', TotalQuotedCategories, TotalQuotedValues, '', '', Colors[4], 0);
                     });
               }
         })
      .position({
            my: 'left top',
            at: 'left bottom',
            of: $('#jrange-quoted input')
         })
      .hide();
   $('#jrange-quoted input').on('focus', function (e) {
         var v = this.value,
             d;
         try {
            if ( v.indexOf(' - ') > -1 ) {
               d = v.split(' - ');
               prv = $.datepicker.parseDate( 'mm/dd/yy', d[0] ).getTime();
               cur = $.datepicker.parseDate( 'mm/dd/yy', d[1] ).getTime();
            } else if ( v.length > 0 ) {
               prv = cur = $.datepicker.parseDate( 'mm/dd/yy', v ).getTime();
            }
         } catch ( e ) {
            cur = prv = -1;
         }
         if ( cur > -1 )
            $('#jrange-quoted div').datepicker('setDate', new Date(cur));
         $('#jrange-quoted div').datepicker('refresh').show();
      });
});
$(function() {
   var cur = -1, prv = -1;
   $('#jrange-rvq div')
      .datepicker({
            //numberOfMonths: 3,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            beforeShowDay: function ( date ) {
                  return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
               },
            onSelect: function ( dateText, inst ) {
                  var d1, d2;
                  prv = cur;
                  cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                  if ( prv == -1 || prv == cur ) {
                     prv = cur;
                     $('#jrange-rvq input').val( dateText );
                  } else {
                     d1 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.min(prv,cur)), {} );
                     d2 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.max(prv,cur)), {} );
                     $('#jrange-rvq input').val( d1+' - '+d2 );
                  }
               },
            onChangeMonthYear: function ( year, month, inst ) {
                  //prv = cur = -1;
               },
            onAfterUpdate: function ( inst ) {
                  $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                     .appendTo($('#jrange-rvq div .ui-datepicker-buttonpane'))
                     .on('click', function () { 
                        $('#jrange-rvq div').hide(); 
                        var d = $('#jrange-rvq input').val().split(' - ');
                        startDate = $.datepicker.parseDate( 'mm/dd/yy', d[0]);
                        endDate = $.datepicker.parseDate( 'mm/dd/yy', d[1] );
                        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                        getAllData(d[0], d[1]);
                        createChart('RQ', seriesOptions);
                     });
               }
         })
      .position({
            my: 'left top',
            at: 'left bottom',
            of: $('#jrange-rvq input')
         })
      .hide();
   $('#jrange-rvq input').on('focus', function (e) {
         var v = this.value,
             d;
         try {
            if ( v.indexOf(' - ') > -1 ) {
               d = v.split(' - ');
               prv = $.datepicker.parseDate( 'mm/dd/yy', d[0] ).getTime();
               cur = $.datepicker.parseDate( 'mm/dd/yy', d[1] ).getTime();
            } else if ( v.length > 0 ) {
               prv = cur = $.datepicker.parseDate( 'mm/dd/yy', v ).getTime();
            }
         } catch ( e ) {
            cur = prv = -1;
         }
         if ( cur > -1 )
            $('#jrange-rvq div').datepicker('setDate', new Date(cur));
         $('#jrange-rvq div').datepicker('refresh').show();
      });
});
$(function() {
   var cur = -1, prv = -1;
   $('#jrange-list div')
      .datepicker({
            //numberOfMonths: 3,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            beforeShowDay: function ( date ) {
                  return [true, ( (date.getTime() >= Math.min(prv, cur) && date.getTime() <= Math.max(prv, cur)) ? 'date-range-selected' : '')];
               },
            onSelect: function ( dateText, inst ) {
                  var d1, d2;
                  prv = cur;
                  cur = (new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay)).getTime();
                  if ( prv == -1 || prv == cur ) {
                     prv = cur;
                     $('#jrange-list input').val( dateText );
                  } else {
                     d1 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.min(prv,cur)), {} );
                     d2 = $.datepicker.formatDate( 'mm/dd/yy', new Date(Math.max(prv,cur)), {} );
                     $('#jrange-list input').val( d1+' - '+d2 );
                  }
               },
            onChangeMonthYear: function ( year, month, inst ) {
                  //prv = cur = -1;
               },
            onAfterUpdate: function ( inst ) {
                  $('<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">Done</button>')
                     .appendTo($('#jrange-list div .ui-datepicker-buttonpane'))
                     .on('click', function () { 
                        $('#jrange-list div').hide(); 
                        var d = $('#jrange-list input').val().split(' - ');
                        startDate = $.datepicker.parseDate( 'mm/dd/yy', d[0]);
                        endDate = $.datepicker.parseDate( 'mm/dd/yy', d[1] );
                        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                        getAllData(d[0], d[1]);
                        createTable('List', CustomerName, CustomerDate, CustomerPhoneHome);
                     });
               }
         })
      .position({
            my: 'left top',
            at: 'left bottom',
            of: $('#jrange-list input')
         })
      .hide();
   $('#jrange-list input').on('focus', function (e) {
         var v = this.value,
             d;
         try {
            if ( v.indexOf(' - ') > -1 ) {
               d = v.split(' - ');
               prv = $.datepicker.parseDate( 'mm/dd/yy', d[0] ).getTime();
               cur = $.datepicker.parseDate( 'mm/dd/yy', d[1] ).getTime();
            } else if ( v.length > 0 ) {
               prv = cur = $.datepicker.parseDate( 'mm/dd/yy', v ).getTime();
            }
         } catch ( e ) {
            cur = prv = -1;
         }
         if ( cur > -1 )
            $('#jrange-list div').datepicker('setDate', new Date(cur));
         $('#jrange-list div').datepicker('refresh').show();
      });
});