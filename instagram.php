<?php
include_once 'classes/InstagramFetcher.php';

$ACCESS_TOKEN = "YOURTOKEN";

$fetcher = new InstagramFetcher($ACCESS_TOKEN, "goldensecretsoflettering");
$fetcher->fetch();
echo json_encode($fetcher->getItems(), JSON_PRETTY_PRINT);
die;