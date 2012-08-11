<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<base href="<?php echo $base_url;?>/index.php">
		<title>The Stash</title>
		<link rel="stylesheet" type="text/css" href="../css/site.css">
		<link rel="stylesheet" type="text/css" href="../css/mediaQueries.css">
		<link rel="stylesheet" type="text/css" href="../css/jquery.fancybox.css">

		<link rel="stylesheet" type="text/css" href="../css/modules/common.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/header.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/footer.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/home.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/stash.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/getstarted.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/aboutus.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/contactus.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/termsofuse.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/privacypolicy.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/login.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/error.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/account.css">

		<link rel="template" href="../templates/modules/common.html">
		<link rel="template" href="../templates/modules/header.html">
		<link rel="template" href="../templates/modules/footer.html">
		<link rel="template" href="../templates/modules/home.html">
		<link rel="template" href="../templates/modules/stash.html">
		<link rel="template" href="../templates/modules/getstarted.html">
		<link rel="template" href="../templates/modules/aboutus.html">
		<link rel="template" href="../templates/modules/contactus.html">
		<link rel="template" href="../templates/modules/termsofuse.html">
		<link rel="template" href="../templates/modules/privacypolicy.html">
		<link rel="template" href="../templates/modules/login.html">
		<link rel="template" href="../templates/modules/error.html">
		<link rel="template" href="../templates/modules/account.html">
	</head>
	<body>
		<header></header>
		<div id="content"></div>
		<footer></footer>
		<div id="fb-root"></div>

		<script>
			var stash = {};
			//Bootstrap this bad boy.
			<?php 
			 if (isset($user)){
			 	echo 'var myself = '.$user.';';
			 }
			?>
		</script>
		<script src="../js/lib/json2.js"></script>
		<script src="../js/lib/jquery.js"></script>
		<script src="../js/lib/underscore.js"></script>
		<script src="../js/lib/backbone.js"></script>
		<script src="../js/lib/ICanHaz.js"></script>
		<script src="../js/lib/jquery.fancybox.js"></script>

		<script>
			var stash = stash || {};
			stash.settings = {
				apiUrl : '/TheStash/index.php/api/'
			}
		</script>
		<script src="../js/helpers.js"></script>
		<script src="../js/models.js"></script>
		<script src="../js/identity.js"></script>
		<script src="../js/controllers.js"></script>
		<script src="../js/router.js"></script>
		<script src="../js/setup.js"></script>

		<script src="../js/modules/common.js"></script>
		<script src="../js/modules/header.js"></script>
		<script src="../js/modules/footer.js"></script>
		<script src="../js/modules/home.js"></script>
		<script src="../js/modules/stash.js"></script>
		<script src="../js/modules/getstarted.js"></script>
		<script src="../js/modules/aboutus.js"></script>
		<script src="../js/modules/contactus.js"></script>
		<script src="../js/modules/termsofuse.js"></script>
		<script src="../js/modules/privacypolicy.js"></script>
		<script src="../js/modules/login.js"></script>
		<script src="../js/modules/error.js"></script>
		<script src="../js/modules/account.js"></script>
	</body>
</html>