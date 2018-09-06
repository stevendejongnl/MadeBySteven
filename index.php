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
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= $pageInfo->title; ?></title>

    <link rel="stylesheet" href="./dist/styles/main.css">
</head>
<body class="<?= $pageInfo->classes; ?>">

<main role="main" class="main-container">
    <? include_once 'views/parts/header.php'; ?>
    <? include_once 'views/pages/' . $pageInfo->page . '.php'; ?>
</main>

<script src="./src/scripts/main.js" type="module"></script>
</body>
</html>
