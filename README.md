# gulp-anchor-including-block-validator

[![npm version](https://badge.fury.io/js/gulp-anchor-including-block-validator.svg)](https://badge.fury.io/js/gulp-anchor-including-block-validator)

simple strange validator.
if html has anchor tag including block level elements, an error is returned.
like the rules of xhtml.

## target of block level elements

address, article, aside, blockquote, details, dialog, dd, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, li, main, nav, ol, p, pre, section, table, ul

## install

```
$ npm install gulp-anchor-including-block-validator
```

## basic usage

```javascript
'use strict';

var gulp   = require('gulp');
var anchor = require('gulp-anchor-including-block-validator');

gulp.task('default',function(){
  return gulp.src(['sample/*'])
    .pipe(anchor());
});
```

## error of sample

if you check sample.html.

```bash
Message:
    WARNING A TAG : <a href="#"><div class="test">NG</div></a>
```

## options

if you want to add a target elements.

```javascript
gulp.task('default',function(){
  return gulp.src(['sample/*'])
    .pipe(anchor('label|picture'));
});
```
