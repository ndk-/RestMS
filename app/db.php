<?php

session_start();

if (!isset($_SESSION['credentials']['a_lvl'])) {

    header("HTTP/1.1 401 Unauthorized");
    echo json_encode(array('error' => 'Unauthorized request'));
    exit();
}

// Change here
$dsn = 'mysql://USER:PASS@HOST/DB/';

$clients = array
(
);

/**
* The MIT License
* http://creativecommons.org/licenses/MIT/
*
* ArrestDB 1.5.0 (github.com/alixaxel/ArrestDB/)
* Copyright (c) 2013 Alix Axel <alix.axel@gmail.com>
**/

if (strcmp('cli', PHP_SAPI) === 0)
{
	exit('Arrest-DB should not be run from CLI.');
}

if ((empty($clients) !== true) && (in_array($_SERVER['REMOTE_ADDR'], (array) $clients) !== true))
{
	$result = array
	(
		'error' => array
		(
			'code' => 403,
			'status' => 'Forbidden',
		),
	);

	exit(ArrestDB::Reply($result));
}

else if (ArrestDB::Query($dsn) === false)
{
	$result = array
	(
		'error' => array
		(
			'code' => 503,
			'status' => 'Service Unavailable',
		),
	);

	exit(ArrestDB::Reply($result));
}

if (array_key_exists('_method', $_GET) === true)
{
	$_SERVER['REQUEST_METHOD'] = strtoupper(trim($_GET['_method']));
}

else if (array_key_exists('HTTP_X_HTTP_METHOD_OVERRIDE', $_SERVER) === true)
{
	$_SERVER['REQUEST_METHOD'] = strtoupper(trim($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE']));
}

ArrestDB::Serve('GET', '/(#any)/(#any)/(#any)', function ($table, $id, $data)
{
	$query = array
	(
		sprintf('SELECT * FROM `%s`', $table),
		sprintf('WHERE `%s` LIKE ?', $id),
	);

	if (isset($_GET['by']) === true)
	{
		if (isset($_GET['order']) !== true)
		{
			$_GET['order'] = 'ASC';
		}

		$query[] = sprintf('ORDER BY `%s` %s', $_GET['by'], $_GET['order']);
	}

	if (isset($_GET['limit']) === true)
	{
		$query[] = sprintf('LIMIT %u', $_GET['limit']);

		if (isset($_GET['offset']) === true)
		{
			$query[] = sprintf('OFFSET %u', $_GET['offset']);
		}
	}

	$query = sprintf('%s;', implode(' ', $query));
	$result = ArrestDB::Query($query, $data);

	if ($result === false)
	{
		$result = array
		(
			'error' => array
			(
				'code' => 404,
				'status' => 'Not Found',
			),
		);
	}

	else if (empty($result) === true)
	{
		$result = array
		(
			'error' => array
			(
				'code' => 204,
				'status' => 'No Content',
			),
		);
	}

	return ArrestDB::Reply($result);
});

ArrestDB::Serve('GET', '/(#any)/(#num)?', function ($table, $id = null)
{
	$query = array
	(
		sprintf('SELECT * FROM `%s`', $table),
	);

	if (isset($id) === true)
	{
		$query[] = sprintf('WHERE `%s` = ? LIMIT 1', 'id');
	}

	else
	{
		if (isset($_GET['by']) === true)
		{
			if (isset($_GET['order']) !== true)
			{
				$_GET['order'] = 'ASC';
			}

			$query[] = sprintf('ORDER BY `%s` %s', $_GET['by'], $_GET['order']);
		}

		if (isset($_GET['limit']) === true)
		{
			$query[] = sprintf('LIMIT %u', $_GET['limit']);

			if (isset($_GET['offset']) === true)
			{
				$query[] = sprintf('OFFSET %u', $_GET['offset']);
			}
		}
	}

	$query = sprintf('%s;', implode(' ', $query));
	$result = (isset($id) === true) ? ArrestDB::Query($query, $id) : ArrestDB::Query($query);

	if ($result === false)
	{
		$result = array
		(
			'error' => array
			(
				'code' => 404,
				'status' => 'Not Found',
			),
		);
	}

	else if (empty($result) === true)
	{
		$result = array
		(
			'error' => array
			(
				'code' => 204,
				'status' => 'No Content',
			),
		);
	}

	else if (isset($id) === true)
	{
		$result = array_shift($result);
	}

	return ArrestDB::Reply($result);
});

ArrestDB::Serve('DELETE', '/(#any)/(#num)?', function ($table, $id = null)
{

	if ($id === null) {
		$query = array ( sprintf('DELETE FROM `%s`', $table) );
		$query = sprintf('%s;', implode(' ', $query));
		$result = ArrestDB::Query($query);
	}

	else {
		$query = array ( sprintf('DELETE FROM `%s` WHERE `%s` = ?', $table, 'id') );
		$query = sprintf('%s;', implode(' ', $query));
		$result = ArrestDB::Query($query, $id);
	}

	if ($result === false)
	{
		$result = array
		(
			'error' => array
			(
				'code' => 404,
				'status' => 'Not Found',
			),
		);
	}

	else if (empty($result) === true)
	{
		$result = array
		(
			'error' => array
			(
				'code' => 204,
				'status' => 'No Content',
			),
		);
	}

	else
	{
		$result = array
		(
			'success' => array
			(
				'code' => 200,
				'status' => 'OK',
			),
		);
	}

	return ArrestDB::Reply($result);
});

if (in_array($http = strtoupper($_SERVER['REQUEST_METHOD']), array('POST', 'PUT')) === true)
{
	if (preg_match('~^\x78[\x01\x5E\x9C\xDA]~', $data = file_get_contents('php://input')) > 0)
	{
		$data = gzuncompress($data);
	}

	if ((array_key_exists('CONTENT_TYPE', $_SERVER) === true) && (empty($data) !== true))
	{
		if (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== FALSE)
		{
			$GLOBALS['_' . $http] = json_decode($data, true);
		}

		else if ((strcasecmp($_SERVER['CONTENT_TYPE'], 'application/x-www-form-urlencoded') === 0) && (strcasecmp($_SERVER['REQUEST_METHOD'], 'PUT') === 0))
		{
			parse_str($data, $GLOBALS['_' . $http]);
		}
	}

	if ((isset($GLOBALS['_' . $http]) !== true) || (is_array($GLOBALS['_' . $http]) !== true))
	{
		$GLOBALS['_' . $http] = array();
	}

	unset($data);
}

ArrestDB::Serve('POST', '/(#any)', function ($table)
{
	if (empty($_POST) === true)
	{
		$result = array
		(
			'error' => array
			(
				'code' => 204,
				'status' => 'No Content',
			),
		);
	}

	else if (is_array($_POST) === true)
	{
		$queries = array();

		if (count($_POST) == count($_POST, COUNT_RECURSIVE))
		{
			$_POST = array($_POST);
		}

		foreach ($_POST as $row)
		{
			$data = array();
			$adata = array();

			foreach ($row as $key => $value)
			{
				$data[sprintf('`%s`', $key)] = '?';
			}

			foreach ($row as $key => $value)
			{
				$adata[sprintf('`%s`', $key)] = $value;
			}

			$query = array
			(
				sprintf('INSERT INTO `%s` (%s) VALUES (%s)', $table, implode(', ', array_keys($data)), implode(', ', $data)),
			);

			$queries[] = array
			(
				sprintf('%s;', implode(' ', $query)),
				$adata,
			);
		}

		if (count($queries) > 1)
		{
			ArrestDB::Query()->beginTransaction();

			while (is_null($query = array_shift($queries)) !== true)
			{
				if (($result = ArrestDB::Query($query[0], $query[1])) === false)
				{
					ArrestDB::Query()->rollBack(); break;
				}
			}

			if ($result !== false)// && (ArrestDB::Query()->inTransaction() === true))
			{
				$result = ArrestDB::Query()->commit();
			}
		}

		else if (is_null($query = array_shift($queries)) !== true)
		{
			$result = ArrestDB::Query($query[0], $query[1]);
		}

		if ($result === false)
		{
			$result = array
			(
				'error' => array
				(
					'code' => 409,
					'status' => 'Conflict',
				),
			);
		}

		else
		{
		$ourid = $result;
			$result = array
			(
				'success' => array
				(
					'code' => 201,
					'status' => 'Created',
					'id' => $ourid
				),
			);
		}
	}

	return ArrestDB::Reply($result);
});

ArrestDB::Serve('PUT', '/(#any)/(#num)?', function ($table, $id = null)
{
	$_PUT = $GLOBALS['_PUT'];

	if (empty($GLOBALS['_PUT']) === true)
	{
		$result = array
		(
			'error' => array
			(
				'code' => 204,
				'status' => 'No Content',
			),
		);
	}

	else if (is_array($GLOBALS['_PUT']) === true) {

		$data = array();
		$adata = array();

		if (count($_PUT) == count($_PUT, COUNT_RECURSIVE)) {
			$_PUT = array($_PUT);
		}

		foreach ($_PUT as $row) {

			if ($id === null && $row['id'] !== null )
				$o_id = $row['id'];
			else
				$o_id = $id;

			foreach ($row as $key => $value) {
				if ($key != 'id') {
					$data[$key] = sprintf('`%s` = ?', $key);
					$adata[$key] = sprintf ('%s', $value);
				}
			}

			$query = array (
				sprintf('UPDATE `%s` SET %s WHERE `%s` = %s', $table, implode(', ', $data), 'id', $o_id),
			);

			$query = sprintf('%s;', implode(' ', $query));
			$result = ArrestDB::Query($query, $adata);

			if ($result === false) {
				$result = array (
					'error' => array (
						'code' => 409,
						'status' => 'Conflict',
					),
				);
				break;
			}
			else {
				$result = array (
					'success' => array (
						'code' => 200,
						'status' => 'OK',
					),
				);
			}
		}
	}

	return ArrestDB::Reply($result);
});

$result = array
(
	'error' => array
	(
		'code' => 400,
		'status' => 'Bad Request',
	),
);

exit(ArrestDB::Reply($result));

class ArrestDB
{
	public static function Query($query = null)
	{
		static $db = null;
		static $result = array();

		try
		{
			if (isset($db, $query) === true)
			{
				if (empty($result[$hash = crc32($query)]) === true)
				{
					$result[$hash] = $db->prepare($query);
				}

				$data = array_slice(func_get_args(), 1);

				if (count($data, COUNT_RECURSIVE) > count($data))
				{
					$data = iterator_to_array(new \RecursiveIteratorIterator(new \RecursiveArrayIterator($data)), false);
				}

				if ($result[$hash]->execute($data) === true)
				{
					switch (strstr($query, ' ', true))
					{
						case 'INSERT':
						case 'REPLACE':
							return $db->lastInsertId();

						case 'UPDATE':
						case 'DELETE':
							return $result[$hash]->rowCount();

						case 'SELECT':
						case 'EXPLAIN':
						case 'PRAGMA':
						case 'SHOW':
							return $result[$hash]->fetchAll();
					}

					return true;
				}

				return false;
			}

			else if (isset($query) === true)
			{
				$options = array
				(
					\PDO::ATTR_CASE => \PDO::CASE_NATURAL,
					\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
					\PDO::ATTR_EMULATE_PREPARES => false,
					\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
					\PDO::ATTR_ORACLE_NULLS => \PDO::NULL_NATURAL,
					\PDO::ATTR_STRINGIFY_FETCHES => false,
				);

				if (preg_match('~^sqlite://([[:print:]]++)$~i', $query, $dsn) > 0)
				{
					$options += array
					(
						\PDO::ATTR_TIMEOUT => 0,
					);

					$db = new \PDO(sprintf('sqlite:%s', $dsn[1]), null, null, $options);
					$pragmas = array
					(
						'busy_timeout' => '0',
						'cache_size' => '8192',
						'encoding' => '"UTF-8"',
						'foreign_keys' => 'ON',
						'journal_size_limit' => '67110000',
						'legacy_file_format' => 'OFF',
						'page_size' => '4096',
						'recursive_triggers' => 'ON',
						'secure_delete' => 'ON',
						'synchronous' => 'NORMAL',
						'temp_store' => 'MEMORY',
						'journal_mode' => 'WAL',
						'wal_autocheckpoint' => '4096',
					);

					if (strncasecmp('WIN', PHP_OS, 3) !== 0)
					{
						if (($page = intval(shell_exec('getconf PAGESIZE'))) > 0)
						{
							$pragmas['page_size'] = $page;
						}

						if ((is_file('/proc/meminfo') === true) && (is_readable('/proc/meminfo') === true))
						{
							$memory = 131072;

							if (is_resource($handle = fopen('/proc/meminfo', 'rb')) === true)
							{
								while (($line = fgets($handle, 1024)) !== false)
								{
									if (sscanf($line, 'MemTotal: %d kB', $memory) == 1)
									{
										$memory = round($memory / 131072) * 131072; break;
									}
								}

								fclose($handle);
							}

							$pragmas['cache_size'] = intval($memory * 0.25 / ($pragmas['page_size'] / 1024));
							$pragmas['wal_autocheckpoint'] = $pragmas['cache_size'] / 2;
						}
					}

					foreach ($pragmas as $key => $value)
					{
						$db->exec(sprintf('PRAGMA %s=%s;', $key, $value));
					}
				}

				else if (preg_match('~^mysql://(?:(.+?)(?::(.+?))?@)?([^/:@]++)(?::(\d++))?/(\w++)/?$~i', $query, $dsn) > 0)
				{
					$options += array
					(
						\PDO::ATTR_AUTOCOMMIT => true,
						\PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES "utf8" COLLATE "utf8_general_ci", time_zone = "+00:00";',
						\PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
					);

					$db = new \PDO(sprintf('mysql:host=%s;port=%s;dbname=%s', $dsn[3], $dsn[4], $dsn[5]), $dsn[1], $dsn[2], $options);
				}
			}
		}

		catch (\Exception $e)
		{
			return false;
		}

		return (isset($db) === true) ? $db : false;
	}

	public static function Reply($data)
	{
		if (($result = json_encode($data, 448)) !== false)
		{
			$callback = null;

			if (array_key_exists('callback', $_GET) === true)
			{
				$callback = trim(preg_replace('~[^[:alnum:]\[\]_.]~', '', $_GET['callback']));

				if (empty($callback) !== true)
				{
					$result = sprintf('%s(%s);', $callback, $result);
				}
			}

			if (headers_sent() !== true)
			{
				header(sprintf('Content-Type: application/%s; charset=utf-8', (empty($callback) === true) ? 'json' : 'javascript'));
			}
		}

		return $result;
	}

	public static function Serve($on = null, $route = null, $callback = null)
	{
		static $root = null;

		if (isset($_SERVER['REQUEST_METHOD']) !== true)
		{
			$_SERVER['REQUEST_METHOD'] = 'CLI';
		}

		if ((empty($on) === true) || (strcasecmp($on, $_SERVER['REQUEST_METHOD']) === 0))
		{
			if (is_null($root) === true)
			{
				$root = preg_replace('~/++~', '/', substr($_SERVER['PHP_SELF'], strlen($_SERVER['SCRIPT_NAME'])) . '/');
			}

			if (preg_match('~^' . str_replace(array('#any', '#num'), array('[^/]++', '[0-9]++'), $route) . '~i', $root, $parts) > 0)
			{
				return (empty($callback) === true) ? true : exit(call_user_func_array($callback, array_slice($parts, 1)));
			}
		}

		return false;
	}
}
