<?

class Functions {
	static function getClass($class) {
		include_once $class;
	}

	static function getPage($page) {
		$getPage = PageInfo::getPage();
		include_once Config::$root . '/views/pages/' . $page . '.php';
	}

	static function getPart($part) {
		$getPage = PageInfo::getPage();
		include_once Config::$root . '/views/parts/' . $part . '.php';
	}

	static function getSVG($name) {
		$file = @file_get_contents(Config::$root . '/src/images/svg/' . $name . '.svg');

		if (!$file) {
			echo '<span style="color: red; font-weight: bold;">SVG File not found!</span>';
			return;
		}

		echo $file;
	}
}
