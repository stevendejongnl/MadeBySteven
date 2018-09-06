<?

include_once 'core/config.php';

Config::init();

include_once 'core/functions.php';
$classes = glob('core/classes/*.{php}', GLOB_BRACE);
foreach($classes as $class) {
	include_once $class;
}

$getPage = PageInfo::getPage();

include_once 'views/parts/head.php';
include_once 'views/pages/' . $getPage->slug . '.php';
include_once 'views/parts/footer.php';
