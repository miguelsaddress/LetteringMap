<?php

// TODO: Firebase it
// https://github.com/ktamas77/firebase-php
// Guardarlo en firebase y el javascript que lea de ahi READ ONLY

class InstagramFetcher {
	private static $URL_TEMPLATE = "https://api.instagram.com/v1/tags/%s/media/recent?access_token=%s";

	private $accessToken;
	private $hashtag;
	private $items;
	private $visited_urls;

	public function __construct($accessToken, $hashtag){
		$this->accessToken = $accessToken;
		$this->hashtag = $hashtag;
		$this->items = array();
		$this->visited_urls = array();
	}

	public function fetch() {
		$url = $this->getUrl();
		do {
			$this->visited_urls[] = $url;
			$response = $this->fetchResponseFromUrl($url);
			$responseItems = $response->data;
			foreach ($responseItems as $item) {
				$this->items[] = $this->transformItemFormat($item);
			}
			$url = isset($response->pagination->next_url)
						? $response->pagination->next_url
						: null;

		} while($url);
	}

	public function getItems() {
		return $this->items;
	}


	private function getUrl() {
		return sprintf(self::$URL_TEMPLATE, $this->hashtag, $this->accessToken);
	}

	private function fetchResponseFromUrl($url) {
		// echo "Fetching: ", $url, PHP_EOL;
		$response = file_get_contents($url);
		$response = json_decode($response);
		return $response;
	}

	private function transformItemFormat($item) {
		$f = [];
		$f['custom'] = array();
		$f['custom']['date'] = $item->created_time;
		$f['custom']['location'] = $item->location;
		$f['custom']['link'] = $item->link;
		$f['custom']['text'] = $item->caption->text;
		$f['custom']['image'] = [
			'low_resolution' => [
				'url' => $item->images->low_resolution->url,
				'width' => $item->images->low_resolution->width,
				'height' => $item->images->low_resolution->height,
			],
			'thumbnail' => [
				'url' => $item->images->thumbnail->url,
				'width' => $item->images->thumbnail->width,
				'height' => $item->images->thumbnail->height,
			],
			'standard_resolution' => [
				'url' => $item->images->standard_resolution->url,
				'width' => $item->images->standard_resolution->width,
				'height' => $item->images->standard_resolution->height,
			],
		];
		$f['custom']['author'] = [
			'username' => $item->user->username,
			'full_name' => $item->user->full_name,
		];
		$f['raw'] = $item;

	return $f;
	}

}