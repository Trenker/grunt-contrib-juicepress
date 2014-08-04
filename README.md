
This is a [grunt](http://gruntjs.com/) task for blog generation using [juicepress](https://github.com/trenker/juicepress)

## Installation

Have the `grunt` package already installed and write

```bash
npm install --save grunt-contrib-juicepress
```

Now you have the `juicepress` task available.

## Usage

Use a simple grunt config to load markdown posts.

```js
grunt.task.loadNpmTasks("grunt-contrib-juicepress");

grunt.config.init({
  juicepress: {
  	test: {
  	  options: {
  	    baseUrl: "http://localhost:8000/",
  	    layoutsDirectory: "./src/templates/**.*",
  	    buildDirectory: "./_build/"
  	  },
  	  files: [
        {
          cwd: "./posts",
          src: "**/*.md",
          expand: true
        }
  	  ]
  	}
  }
})

```

This example sets up the task `juicepress:test` and the generated pages will contain the default [grunt-connect](https://github.com/gruntjs/grunt-contrib-connect) url as base so you can start right away.

For a full list of supported options, please see <https://github.com/trenker/juicepress>

:bangbang: IMPORTANT: juicepress ignores the "dest" setting of grunt. Instead it will create pages and directories inside the `buildDirectory` based on categories and title of the post.

## License

Copyright (c) 2014 Georg Großberger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
