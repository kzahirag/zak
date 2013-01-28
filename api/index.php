<?php

require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/', function () {
	echo "Welcome to Slim ";
});

$app->get('/tests', 'getTests');
$app->post('/tests', 'addTests');

$app->run();


/////////////////////////////////////////////////////

function getTests() {
	$sql = "select * FROM test ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$tests = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"test": ' . json_encode($tests) . '}';
		} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addTests() {

	//http://help.slimframework.com/discussions/problems/848-call-to-a-member-function-request-on-a-non-object
	
	//error_log('addWine\n', 3, '/var/tmp/php.log');
	$request = \Slim\Slim::getInstance()->request();
//	$name = $request->post('name');
//	$desc = $request->post('desc');
	$tests = json_decode($request->getBody());
	$sql = "INSERT INTO test (`name`, `desc`) VALUES (:name, :desc)";
	//$sql = "INSERT INTO test (`name`, `desc`) VALUES ('name9', 'desc9')";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam(":name", $tests->name);
		$stmt->bindParam(":desc", $tests->desc);
		$stmt->execute();
		$tests->id = $db->lastInsertId();
		$db = null;
		echo json_encode($tests); 
		} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="";
	$dbname="zak";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}
