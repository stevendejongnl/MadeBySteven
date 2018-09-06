<?

class Functions {
	static function getSVG($name) {
		$file = @file_get_contents(Config::$root . '/src/images/svg/' . $name . '.svg');

		if (!$file) {
			echo '<span style="color: red; font-weight: bold;">SVG File not found!</span>';
			return;
		}

		echo $file;
	}
}
