<?

/**
 * Class Config
 *
 * @category Config
 * @package MadeBySteven_Portfolio
 * @author  Steven de Jong <steven@steven-dejong.nl>
 * @license https://www.gnu.org/licenses/agpl-3.0.txt GNU/AGPLv3
 * @link    https://madebysteven.nl
 */
class Config {
	static $root;

    /**
     * Function to initialize core
     *
     * @return string
     */
	static function init() {
		return self::$root = str_replace('/core', '', __DIR__);
	}
}
