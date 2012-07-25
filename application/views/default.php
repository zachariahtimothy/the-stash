<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<title>The Stash</title>
		<link rel="stylesheet" type="text/css" href="../css/site.css">
		<link rel="stylesheet" type="text/css" href="../css/mediaQueries.css">
		<link rel="stylesheet" type="text/css" href="../css/jquery.fancybox.css">

		<link rel="stylesheet" type="text/css" href="../css/modules/header.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/footer.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/home.css">
		<link rel="stylesheet" type="text/css" href="../css/modules/getstarted.css">

		<link rel="template" href="../templates/modules/header.html">
		<link rel="template" href="../templates/modules/footer.html">
		<link rel="template" href="../templates/modules/home.html">
		<link rel="template" href="../templates/modules/getstarted.html">
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
			 	echo 'var myself = ' .json_encode($user).';';
			 }
			?>
			if (myself && myself.length > 3){
				stash.currentUser = JSON.parse(myself);
			}
		</script>
		<script src="../js/lib/json2.js"></script>
		<script src="../js/lib/jquery.js"></script>
		<script src="../js/lib/underscore.js"></script>
		<script src="../js/lib/backbone.js"></script>
		<script src="../js/lib/ICanHaz.js"></script>
		<script src="../js/lib/jquery.fancybox.js"></script>

		<script src="../js/helpers.js"></script>
		<script src="../js/models.js"></script>
		<script src="../js/identity.js"></script>
		<script src="../js/controllers.js"></script>
		<script src="../js/router.js"></script>
		<script src="../js/setup.js"></script>

		<script src="../js/modules/header.js"></script>
		<script src="../js/modules/footer.js"></script>
		<script src="../js/modules/home.js"></script>
		<script src="../js/modules/getstarted.js"></script>
	</body>
</html>