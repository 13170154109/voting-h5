<!DOCTYPE html>
<html>
<head>
    <?php

    $ts = time();

    ?>
    <meta charset="utf-8"/>
    <meta name="format-detection" content="telephone=no"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!--<link rel="shortcut icon" href="assets/images/favicon.ico">-->
    <title>传递暖心圣诞</title>

    <link type="text/css" rel="stylesheet" href="assets/css/style.css?v=<?= $ts ?>"/>
</head>
<body>

<div id="main">
</div>

<div class="photo" id="clone" style="display: none">
    <img src="" alt="">
    <div class="magic">
        <img src="" alt="">
    </div>
</div>
<script src="assets/js/wx-redirect.js"></script>

<script src="assets/js/app/vendor/html2canvas.js"></script>
<script src="assets/js/app/vendor/moment.js"></script>
<script src="assets/js/app/vendor/pikaday.js"></script>
<script src="assets/js/app/vendor/blender.js"></script>
<!--<script data-main="assets/js/app/config/config" src="assets/js/app/vendor/base/require.js"></script>-->

<script src="assets/js/app.js?v=<?= $ts ?>"></script>
</body>
</html>
