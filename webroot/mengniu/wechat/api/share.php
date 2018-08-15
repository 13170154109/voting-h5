<?php
require_once "jssdk.php";

$url = $_GET["url"];

$jssdk = new JSSDK("wx6e812cbbb9f23cc3", "c4263674a065a5283539e0d56dbf1e75");
$signPackage = $jssdk->GetSignPackage($url);

@header('Content-Type: application/json; charset=UTF-8');

echo json_encode($signPackage);
exit;


?>