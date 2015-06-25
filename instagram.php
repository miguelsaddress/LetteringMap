<?php
include_once '.token';
include_once 'classes/InstagramFetcher.php';

$fetcher = new InstagramFetcher($ACCESS_TOKEN, "goldensecretsoflettering");
$fetcher->fetch();
echo json_encode($fetcher->getItems(), JSON_PRETTY_PRINT);
die;
