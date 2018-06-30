<?php
	//创建SQL语句
	header("Access-Control-Allow-Origin:*");
	include "conn2.php";//引入连接
	$username=$_POST["username"];
	$sql = "SELECT * FROM name WHERE username='$username'";
    $result = mysql_query($sql);
    $row = mysql_fetch_array($result,MYSQL_ASSOC);      
     if ($row) { // 保存成功
		$arr = array("res_code"=>1, "res_message"=>"用户已存在");
		echo json_encode($arr);
	} else { // 失败
		$arr = array("res_code"=>0, "res_message"=>"可以注册");
		echo json_encode($arr);
	}
	mysql_close();
?>