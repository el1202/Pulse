// gulp говорит что установлены два пакета gulp и sync
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// задаем задачи - task
// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src" /* server будет запускаться из папки src */
        }
    });
});

gulp.task('styles', function() { /* то что возвращет задача */
    return gulp.src("src/sass/*.+(scss|sass)") /* взяли файлы по опред адресу */
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) /* компилируем код из прописанного пути src/sass/*.+(scss|sass) */
        .pipe(rename({ prefix: "", suffix: ".min", /* файл пройдя компилирование сохр с расширением .min */ }))
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
        .pipe(cleanCSS({ compatibility: 'ie8' })) /* после автопрефикс файл будет очищаться */
        .pipe(gulp.dest("src/css")) /* кладем полученные файлы по опред адресу */
        .pipe(browserSync.stream()); /* после изменений и сохранений опять перезапускаем браузер-синк */
});

// задача, которая будет следить за изменениями и обновления файлов стилей и html
gulp.task('watch', function() {
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("styles")); /* и после нахождения изменений и обновлений запускаем компилицию файла */
    gulp.watch("src/*.html").on("change", browserSync.reload);
});

// запускаем задачи
gulp.task('default', gulp.parallel('watch', 'server', 'styles')); /* 'default'- по умолчанию и параллел запуск команд, gulp.parallel('server', 'styles' */