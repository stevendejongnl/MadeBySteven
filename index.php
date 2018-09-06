<?
class PageInfo
{
	public $page;
	public $title;
	public $classes;
}

$path = $_SERVER['REQUEST_URI'];

$pageInfo = new PageInfo();
$pageInfo->page = '404';
$pageInfo->title = 'Page not found';
$pageInfo->classes = 'page-404';

if ($path === '/') {
    $pageInfo->page = 'home';
	$pageInfo->title = 'Made by Steven';
	$pageInfo->classes = 'page-home container';
} else if ($path === '/about') {
	$pageInfo->page = 'about';
	$pageInfo->title = 'Made by Steven | About';
	$pageInfo->classes = 'page-about';
} else if ($path === '/project') {
	$pageInfo->page = 'project';
	$pageInfo->title = 'Made by Steven | Project';
	$pageInfo->classes = 'page-project';
}

include_once 'views/parts/head.php';
include_once 'views/pages/' . $pageInfo->page . '.php';
include_once 'views/parts/footer.php';
