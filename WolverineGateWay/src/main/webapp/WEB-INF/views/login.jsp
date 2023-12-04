<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ page isELIgnored="false" %> 
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
 <%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
 <%@ taglib uri="http://www.springframework.org/tags/form" prefix="frm" %>  
<!DOCTYPE html>
<html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://code.jquery.com/jquery-3.7.0.min.js"> </script>
<link rel="stylesheet" type="text/css" href="../css/login.css">
<script src="../js/login.js"></script>
</html>
<head>
<meta charset="UTF-8">
<title>Login</title>
</head>
<body>
<div class='container'>
	<div class="row">
		<div class="col-md-4 col-md-offset-4">
			<form class="form-horizontal" action="/action_page.php">
				<div class="form-group">
					<label class="control-label col-sm-4 text-right" for="username">Username:</label>
					<div class="col-sm-8">
						<input type="text" class="form-control" id="username" placeholder="Enter Username" required>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4 text-right" for="pwd">Password:</label>
					<div class="col-sm-8">
						<input type="password" class="form-control" id="pwd" placeholder="Enter password" required>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4 text-right" for="email">Email:</label>
					<div class="col-sm-8">
						<input type="email" class="form-control" id="email" placeholder="Enter email" required>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4 text-right" for="role">Role:</label>
					<div class="col-sm-8">
						<select class="form-select form-select-lg form-control" id = "role">
							<option value="USER">USER</option>
							<option value="ADMIN">ADMIN</option>
						</select>
					</div>
				</div>
				<br/>
				<div class="form-group">
					<div class="col-sm-offset-4 col-sm-8">
						<!-- Log In Button -->
						<input type="button" class="btn btn-default" id="loginBtn" value="Log In"/>
						<!-- Space between buttons -->
						<span style="margin-right: 10px;"></span>
						<!-- Register Button -->
						<input type="button" class="btn btn-default" id="registerBtn" value="Register"/>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

</body>
</html>