<?

class PageInfo {
	public $slug;
	public $title;
	public $classes;

	static function getPage() {
		$path = $_SERVER['REQUEST_URI'];

		$pageInfo = new self();
		$pageInfo->slug = '404';
		$pageInfo->title = 'Page not found';
		$pageInfo->classes = 'page-404';

		if ($path === '/') {
			$pageInfo->slug = 'home';
			$pageInfo->title = 'Made by Steven';
			$pageInfo->classes = 'page-home container';
		} else if ($path === '/about') {
			$pageInfo->slug = 'about';
			$pageInfo->title = 'Made by Steven | About';
			$pageInfo->classes = 'page-about';
		} else if ($path === '/project') {
			$pageInfo->slug = 'project';
			$pageInfo->title = 'Made by Steven | Project';
			$pageInfo->classes = 'page-project';
		}

		return $pageInfo;
	}
}
