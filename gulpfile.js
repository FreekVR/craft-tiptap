var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

var tiptapPath = 'node_modules/tiptap';
var libPath = 'lib';
var fieldPath = 'src/assets/field/dist';

gulp.task('tiptap', function() {
    return gulp.src(tiptapPath+'/dist/*')
        .pipe(gulp.dest(libPath+'/tiptap/dist'));
});

gulp.task('craft-sass', function() {
    return gulp.src('node_modules/craftcms-sass/src/_mixins.scss')
        .pipe(gulp.dest('lib/craftcms-sass'));
});

// gulp.task('field-css', function() {
//     return gulp.src(fieldPath + '/css/ckeditor-field.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(cleanCSS())
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest(fieldPath+'/css'));
// });

gulp.task('ckeditor', gulp.series(['tiptap']));
//gulp.task('field', gulp.series(['field-css']));
gulp.task('default', gulp.series(['ckeditor']));
