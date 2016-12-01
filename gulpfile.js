
var gulp=require("gulp");
var jshint=require("gulp-jshint");
var uglify=require("gulp-uglify");
var minhtml = require('gulp-htmlmin'); //html压缩
var concat = require('gulp-concat'); // 合并文件
var imagemin=require('gulp-imagemin');
var rename = require('gulp-rename');// 重命名
var minifycss = require('gulp-minify-css');// CSS压缩
var browserSync = require('browser-sync').create();
var spritesmith=require('gulp.spritesmith');//雪碧图
var stylish=require("jshint-stylish");

gulp.task('img', function(argument){
    gulp.src('src/images/*')
        .pipe(imagemin({
            optimizationLevel:7,
            progressive: true
        }))
        .pipe(gulp.dest('dist/imgs'));
});

gulp.task('png',function(){
    gulp.src('src/images/*.png')
        .pipe(spritesmith({
           imgName: 'sprite.png',
           cssName: 'sprite.css',
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate:"src/css/handlebarsStr.css"//注释2
        }))
        .pipe(gulp.dest('dist/sprite'));
});

//压缩css
gulp.task('css', function(argument) {
    gulp.src('src/css/*.css')
        .pipe(concat('te.css'))  //取名用各个名字合并
        .pipe(rename({         //修改后缀名
            suffix:'.min'
        }))
        .pipe(minifycss())   //css压缩
        .pipe(gulp.dest('dist/css/'));   //输出路劲
    console.log('css 完毕');
});


gulp.task("js_jshint",function(){
    gulp.src("src/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});


gulp.task("js",function(){
    gulp.src("src/js/*.js")
        .pipe(concat('merge.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
})

gulp.task("html",function(){
     gulp.src("src/*.html")
         .pipe(minhtml({collapseWhitespace: true}))
         .pipe(gulp.dest("dist"));
})

// 监听任务
gulp.task('watch', function() {
    // 建立浏览器自动刷新服务器
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    // 自动刷新
    gulp.watch('src/**', function() {
        browserSync.reload();
    });

});

gulp.task("taskone",function(){
    console.log("hello task one");
    });

gulp.task("default",function(){
    console.log("hello gulp");
});