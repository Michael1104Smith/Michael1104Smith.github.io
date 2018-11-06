</body>
  <script type="text/javascript">
    var data1 = [], data2 = [], data3 = [], data4 = [];
    <?php
      setJavascriptValue($data1, 'data1');
      setJavascriptValue($data2, 'data2');
      setJavascriptValue($data3, 'data3');
      setJavascriptValue($data4, 'data4');
    ?>
  </script>
	<script src="js/anychart-bundle.min.js"></script>
	<script src="js/dark_turquoise.min.js"></script>
  <script type="text/javascript" src="http://code.jquery.com/jquery-2.2.0.js"></script>
  <script type="text/javascript" src="js/jquery.mmenu.all.js"></script>
	<script src="js/Poc_May17.js"></script>
  <script type="text/javascript">
    $(function() {
      $('nav#menu').mmenu({
        extensions  : [ 'fx-menu-slide', 'shadow-page', 'shadow-panels', 'listview-large', 'pagedim-white' ],
        iconPanels  : true,
        counters  : true,
        keyboardNavigation : {
          enable  : true,
          enhance : true
        },
        searchfield : {
          placeholder : 'Search menu items'
        },
        navbar : {
          title : 'Advanced menu'
        },
        navbars : [
          {
            position  : 'top',
            content   : [ 'searchfield' ]
          }, {
            position  : 'top',
            content   : [ 'breadcrumbs', 'close' ]
          }, {
            position  : 'bottom',
            content   : [ '<a href="http://mmenu.frebsite.nl/wordpress-plugin" target="_blank">WordPress plugin</a>' ]
          }
        ]
      }, {
        searchfield : {
          clear : true
        }
      });
    });
  </script>
	<script text="javascript">
      drawDBStage02();
	</script>
</html>