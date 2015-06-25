<?php
include_once 'classes/InstagramFetcher.php';

$ACCESS_TOKEN = "31961161.e68fb44.07ddce39983f498489798b87440d3f89";

$fetcher = new InstagramFetcher($ACCESS_TOKEN, "goldensecretsoflettering");
$fetcher->fetch();
echo json_encode($fetcher->getItems(), JSON_PRETTY_PRINT);
die;
