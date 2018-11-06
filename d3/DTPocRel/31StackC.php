<!doctype html>
<html>
  <head>
    <?php
    header("Cache-Control: no-cache, must-revalidate");
    header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
    $cache = '?'.time();
    ?>

    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Expires" content="-1">
    <meta http-equiv="refresh" content="10">
    <!--
    <link rel="stylesheet" href="css/anychart-ui.css" />
-->
        <link rel="stylesheet" href="https://cdn.anychart.com/css/7.13.1/anychart-ui.min.css" />
    <link rel="stylesheet" href="css/DBStage02.css" />
  </head>
  <body>
    <div id="container"></div>
  </body>
	<script src="js/d3.min.js"></script>
  	<script src="js/jquery.js"></script>
    <!--
	<script src="js/anychart-bundle.min.js"></script>
-->
      <script src="https://cdn.anychart.com/js/7.13.1/anychart-bundle.min.js"></script>
	<script src="js/dark_turquoise.min.js"></script>
  <script src="js/v6.min.js"></script>
	<script src="js/3in1StackC.js"></script>
	<script text="javascript">
     $(document).ready(function(){
              window.history.forward(1);
        drawDBStage02();
     });
	</script>
</html>
