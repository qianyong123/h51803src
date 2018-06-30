<?php
	// 连接
	mysql_connect("localhost:3306", "root", "");
	// 设置读/写编码
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");
	// 选择数据库
    mysql_select_db("h51803");

?>