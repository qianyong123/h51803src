//引入模块
const gulp=require("gulp"),
	minifyCss=require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	babel = require("gulp-babel"),
	connect = require("gulp-connect"),
	sass=require("gulp-sass");
//定制gulp任务：压缩CSS
gulp.task("css",function(){
	gulp.src("src/css/*.css")//愿
		.pipe(minifyCss())//处理
		.pipe(gulp.dest("src/dist/css/"));//目标
});
//定制gulp任务：压缩js
gulp.task("js", function(){
	gulp.src("src/js/*.js") // 源
		   .pipe(babel({		 // 将ES6代码转换为ES5代码
	            presets: ['env']
	        }))
		   .pipe(uglify()) // 处理
		   .pipe(gulp.dest("src/dist/js/")); // 目标
});
// 定制gulp任务：启动服务器
gulp.task("connect", function(){
	connect.server({
		root: 'src'
	});
});
//定制gulp任务：sass
gulp.task("sass-task",function(){
	gulp.src("src/sass/*.scss")//愿
		.pipe(sass({outputStyle: "expanded"}))//处理
		.pipe(gulp.dest("src/css"));//目标
});
// 监视
gulp.task("watch", function(){
	// 监视*.scss的修改，自动执行编译sass任务
	gulp.watch("src/sass/*.scss", ["sass-task"]);
});
