<?

class Functions {
	static function getClass($class) {
		include_once $class;
	}

	static function getPage($page) {
		$getPage = PageInfo::getPage();
		include_once Config::$root . '/views/pages/' . $page . '.php';
	}

	static function getPart($part, $project = null) {
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

	static function getImage($image, $type, $extension = '.jpg') {
        $filePath = '/data/projects/images/';
        $fileRootPath = Config::$root . $filePath;
        $file = @file_get_contents("$fileRootPath$image/$type$extension");

        if (!$file)
            return $filePath . 'default.gif';

        return "$filePath$image/$type$extension";
    }

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

    static function getProject()
    {
        $pageInfo = PageInfo::getPage();

        $overviewFile = false;
        if (file_exists(dataPath . "/projects/overview.json"))
            $overviewFile = file_get_contents(dataPath . "/projects/overview.json");

        $overviewData = self::parseJson($overviewFile);

        return self::findProject($overviewData, $pageInfo->slug);
    }

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

    static function findProject($projects, $project) {
        foreach ($projects as $element)
            if ($element->slug === $project)
                return $element;

        return false;
    }
}
