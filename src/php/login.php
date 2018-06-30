<?php
	//创建SQL语句
	header("Access-Control-Allow-Origin:*");
	include "conn2.php";//引入连接
	$username = $_POST["username"];
	$password = $_POST["password"];

	$sql = "SELECT * FROM name WHERE username='$username' AND password='$password'";
    $result = mysql_query($sql);
    
    $row = mysql_fetch_array($result,MYSQL_ASSOC);
//  判断
     if ($row) { // 保存成功
		$arr = array("res_code"=>1, "res_message"=>"登录成功");
		echo json_encode($arr);
	} else { // 失败
		$arr = array("res_code"=>0, "res_message"=>"登录失败");
		echo json_encode($arr);
	}
	mysql_close();
?>