/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import gulp from 'gulp';
import inlinesource from 'gulp-inline-source';
import replace from 'gulp-replace';

gulp.task('default', () => gulp
  .src('./build/*.html')
  .pipe(replace('.js"></script>', '.js" inline></script>'))
  .pipe(replace('rel="stylesheet">', 'rel="stylesheet" inline>'))
  .pipe(
    inlinesource({
      compress: false,
      ignore: ['png'],
    }),
  )
  .pipe(gulp.dest('./build')));
