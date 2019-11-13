"use strict";

var gulp = require("gulp");
var scp2 = require("gulp-scp2");
var sequence = require("run-sequence");

gulp.task("dev", function() {
  return gulp
    .src("dist/**")
    .pipe(
      scp2({
        host: "106.14.184.214",
        username: "root",
        password: "jlink_2019@#11",
        dest: "/usr/local/tomcat/suji/sys-admin/pc"
      })
    )
    .on("error", function(err) {
      throw err;
    });
});

gulp.task("default", function(done) {
  sequence("dev", done);
});
