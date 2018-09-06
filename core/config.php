<?

class Config {
	static $root;

	static function init() {
		self::$root = str_replace('/core', '', __DIR__);
	}
}
