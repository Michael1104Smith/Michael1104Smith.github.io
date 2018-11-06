<!DOCTYPE html>
<html>
<meta charset="utf-8">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/jquery-ui.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Raleway" />
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
<link href="css/style.css" rel="stylesheet">
<body id="LoginPage">
	<div id="logo"></div>
	<label id="LoginText">Log in to Hatchify</label>
	<div id="loginForm">
		<div class="eachField">
			<label class="title">username</label>
			<input id="user" class="main" type="text"/>
		</div>
		<div class="eachField passwordField">
			<label class="title">password</label>
			<input id="pass" class="main" type="password"/>
		</div>
		<div class="eachField checkField">
			<input type="checkbox"/>
			<label>Remember me for 2 weeks</label>
		</div>
		<div class="clearfix"></div>
		<div class="eachField submitField">
			<input id="loginBtn" type="button" value="Log in" />
		</div>
	</div>
	<form id="dashboard" action="dashboard.php" method="post">
		<input type="hidden" name="gid" id="gid"/>
		<input type="hidden" name="username" id="username" />
	</form>
	<div id="contact">
		<label>Don't have an account yet? <span class="contactUs">Contact Us</span></label>
	</div>
</body>
<script src="js/jquery.js"></script>
<script text="javascript">
	$(document).ready(function(){
		$('#loginBtn').on('click', function(){
			var user = $('#user').val();
			var pass = $('#pass').val();
			$.post("check.php",{user:user, pass:pass}).done(function(result){
				if(result == "Wrong Password"){
					alert('Invalid Password');
				}else if(result == "Wrong Username"){
					alert('Invalid User Name');
				}else{
					$('#gid').val(result);
					$('#username').val(user);
					$('#dashboard').submit();
				}
			});
		});
	});
</script>
</html>