<?

class PageInfo {
	public $template;
	public $slug;
	public $title;
	public $classes;

	static function getPage() {
		$path = $_SERVER['REQUEST_URI'];

		$pageInfo = new self();
		$pageInfo->template = '404';
		$pageInfo->title = 'Page not found';
		$pageInfo->classes = 'page-404';

		$pathArray = explode('/', $path);
        array_shift($pathArray);

		if ($pathArray[0] === '') {
            $pageInfo->template = 'home';
            $pageInfo->title = 'Made by Steven';
            $pageInfo->classes = 'page-home container';
        } else if ($pathArray[0] === 'about') {
            $pageInfo->template = 'about';
            $pageInfo->title = 'Made by Steven | About';
            $pageInfo->classes = 'page-about';
        } else if ($pathArray[0] === 'project' && !empty($pathArray[1])) {
            $pageInfo->template = 'project';
            $pageInfo->slug = $pathArray[1];
            $pageInfo->title = 'Made by Steven | Project';
            $pageInfo->classes = 'page-project';
        }

		return $pageInfo;
	}
}
