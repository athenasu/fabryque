<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Index</title>
</head>
<body>

	<fb:login-button scope="public_profile,email"
		onlogin="checkLoginState();">
	</fb:login-button>
	<script>
		window.fbAsyncInit = function() {
			FB.init({
				appId : '219469793703408',
				cookie : true,
				xfbml : true,
				version : 'v12.0'
			});

			FB.AppEvents.logPageView();

			FB.getLoginStatus(function(response) {
				statusChangeCallback(response);
			});
			
		};

		function checkLoginState() {
			FB.getLoginStatus(function(response) {
				statusChangeCallback(response);
			});
		}

		

		function statusChangeCallback(response) {
			console.log(response);
		}
		
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	</script>
</body>
</html>
