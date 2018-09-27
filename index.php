<?

error_reporting(E_ALL);
ini_set('display_errors', 'on');

define('rootPath', realpath($_SERVER['DOCUMENT_ROOT']));
define('corePath', rootPath . "/core");
define('dataPath', rootPath . "/data");
define('urlPath', basename(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)));

include_once 'core/Config.php';

Config::init();

include_once 'core/functions.php';
$classes = glob('core/classes/*.{php}', GLOB_BRACE);

foreach($classes as $class)
	Functions::getClass($class);

Functions::getProjects(false);

$getPage = PageInfo::getPage();

Functions::getPart('head');
Functions::getPage($getPage->template);
Functions::getPart('footer');
