//引入模块
const gulp=require("gulp"),
	minifyCss=require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	babel = require("gulp-babel"),
	connect = require("gulp-connect"),
	sass=require("gulp-sass");
//定制gulp任务：压缩CSS
gulp.task("css-ya",function(){
	gulp.src("src/css/*.css")//愿
		.pipe(minifyCss())//处理
		.pipe(gulp.dest("dist/css/"));//目标
});
//定制gulp任务：压缩js
gulp.task("js-ya", function(){
	gulp.src("src/js/*.js") // 源
		   .pipe(babel({		 // 将ES6代码转换为ES5代码
	            presets: ['env']
	        }))
		   .pipe(uglify()) // 处理
		   .pipe(gulp.dest("dist/js/")); // 目标
});
// 定制gulp任务：启动服务器
gulp.task("connect", function(){
	connect.server({
		root: 'dist',
		livereload:true
	});
});

gulp.task("copy-lib",function(){
	gulp.src("src/lib/**/*.*")
		.pipe(gulp.dest("dist/lib"))
});
gulp.task("copy-img",function(){
	gulp.src("src/img/**/*.*")
		.pipe(gulp.dest("dist/img"))
});
gulp.task("copy-mock",function(){
	gulp.src("src/mock/**/*.*")
		.pipe(gulp.dest("dist/mock"))
});
//复制HTML文件到dist目录下面，让html页面修改后能够重新加载
gulp.task("html",function(){
	gulp.src("src/**/*.html")
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
});
//复制js文件到dist目录下面，让js修改后能够重新加载
gulp.task("js",function(){
	gulp.src("src/js/**/*.js")
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});
// 编译 *.scss 文件为 *.css 文件 ，放到dist目录下面，让css修改后能够重新加载
gulp.task("sass",function(){
	gulp.src("src/sass/*.scss")//愿
		.pipe(sass({outputStyle: "expanded"}))//处理
		.pipe(gulp.dest("dist/css"))//目标
		.pipe(connect.reload());
});
// 监视
gulp.task("watch", function(){
	// 监视*.scss的修改，自动执行编译sass任务
	gulp.watch("src/sass/*.scss", ["sass"]);
	gulp.watch("src/**/*.html",["html"]);
	gulp.watch("src/js/**/*.js",["js"]);
	gulp.watch("src/img/**/*.*",["copy-img"]);
	gulp.watch("src/mock/**/*.*",["copy-mock"]);
});
gulp.task("copy",["copy-lib","copy-img","copy-mock"]);
gulp.task("default",["html","sass","connect","watch","copy","js"]);
