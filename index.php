<?

include_once 'core/config.php';

Config::init();

include_once 'core/functions.php';
$classes = glob('core/classes/*.{php}', GLOB_BRACE);
foreach($classes as $class) {
	Functions::getClass($class);
}

$getPage = PageInfo::getPage();

Functions::getPart('head');
Functions::getPage($getPage->slug);
Functions::getPart('footer');
