<?
/**
 * Functions
 *
 * All functions for the portfolio§
 *
 * @package MadeBySteven_Portfolio
 * @author  Steven de Jong <steven@steven-dejong.nl>
 * @version 7.2
 * @link    https://madebysteven.nl
 * @license https://www.gnu.org/licenses/agpl-3.0.txt GNU/AGPLv3
 */

/**
 * Class Functions
 *
 * @category Functions
 * @package MadeBySteven_Portfolio
 * @author  Steven de Jong <steven@steven-dejong.nl>
 * @license https://www.gnu.org/licenses/agpl-3.0.txt GNU/AGPLv3
 * @version 7.2
 * @link    https://madebysteven.nl
 */
class Functions
{
    /**
     * Get page class
     *
     * @param string $class getting class
     *
     * @return string $class
     */
    static function getClass($class)
    {
        include_once $class;
        return $class;
    }

    /**
     * Get page
     *
     * @param string $page getting page
     *
     * @return object $getPage
     */
    static function getPage($page)
    {
        $getPage = PageInfo::getPage();
        include_once Config::$root . '/views/pages/' . $page . '.php';
        return $getPage;
    }

    /**
     * Get part
     *
     * @param string $part    getting part
     * @param object $project getting project info
     *
     * @return object $getPage
     */
    static function getPart($part, $project = null)
    {
        $getPage = PageInfo::getPage();
        include_once Config::$root . '/views/parts/' . $part . '.php';

        return $getPage;
    }

    /**
     * Get svg
     *
     * @param string $name getting svg
     *
     * @return null
     */
    static function getSVG($name)
    {
        $file = @file_get_contents(Config::$root . '/src/images/svg/' . $name . '.svg');

        if (!$file) {
            echo '<span style="color: red; font-weight: bold;">SVG File not found!</span>';
            $file = null;
        }

        echo $file;
        return null;
    }

    /**
     * Get image
     *
     * @param string $image     getting image
     * @param string $type      image type
     * @param string $extension extension
     *
     * @return string file
     */
    static function getImage($image, $type, $extension = '.jpg')
    {
        $filePath = '/data/projects/images/';
        $fileRootPath = Config::$root . $filePath;
        $file = @file_get_contents("$fileRootPath$image/$type$extension");

        if (!$file)
            return $filePath . 'default.gif';

        return "$filePath$image/$type$extension";
    }

    /**
     * Get project data
     *
     * @param bool $featured featured projects or not
     *
     * @return array
     */
    static function getProjects($featured = true)
    {
        $overviewFile = false;
        $homeFile = false;
        if (file_exists(dataPath . "/projects/overview.json"))
            $overviewFile = file_get_contents(dataPath . "/projects/overview.json");

        $overviewData = self::parseJson($overviewFile);

        if ($featured) {
            if (file_exists(dataPath . "/projects/home.json"))
                $homeFile = file_get_contents(dataPath . "/projects/home.json");

            $homeData = self::parseJson($homeFile);
            $generateHomeData = [];
            foreach ($homeData as $project)
                if (self::findProject($overviewData, $project))
                    $generateHomeData[] = self::findProject($overviewData, $project);

            return $generateHomeData;
        }

        return $overviewData;
    }

    /**
     * get current project
     *
     * @return string
     */
    static function getProject()
    {
        $pageInfo = PageInfo::getPage();

        $overviewFile = false;
        if (file_exists(dataPath . "/projects/overview.json"))
            $overviewFile = file_get_contents(dataPath . "/projects/overview.json");

        $overviewData = self::parseJson($overviewFile);

        return self::findProject($overviewData, $pageInfo->slug);
    }

    /**
     * Parse json data
     *
     * @param array $data parsing data
     *
     * @return mixed|null|string
     */
    static function parseJson($data)
    {
        json_decode($data);

        $error = null;
        switch (json_last_error()) {
            case JSON_ERROR_NONE:
                break;
            case JSON_ERROR_DEPTH:
                $error = 'Maximum stack depth exceeded';
                break;
            case JSON_ERROR_STATE_MISMATCH:
                $error = 'Underflow or the modes mismatch';
                break;
            case JSON_ERROR_CTRL_CHAR:
                $error = 'Unexpected control character found';
                break;
            case JSON_ERROR_SYNTAX:
                $error = 'Syntax error, malformed JSON';
                break;
            case JSON_ERROR_UTF8:
                $error = 'Malformed UTF-8 characters, possibly incorrectly encoded';
                break;
            default:
                $error = 'Unknown error';
                break;
        }

        if (!is_null($error))
            return $error;

        return json_decode($data, false);
    }

    /**
     * Function to find project in array
     *
     * @param array  $projects all projects
     * @param string $project  current project
     *
     * @return bool
     */
    static function findProject($projects, $project)
    {
        foreach ($projects as $element)
            if ($element->slug === $project)
                return $element;

        return false;
    }
}
