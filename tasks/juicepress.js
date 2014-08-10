/*                                                                       *
 * Copyright 2014 Georg Großberger <contact@grossberger-ge.org>          *
 *                                                                       *
 * This is free software; you can redistribute it and/or modify it under *
 * the terms of the MIT- / X11 - License                                 *
 *                                                                       */

'use strict';

module.exports = function(grunt) {

	grunt.registerMultiTask('juicepress', 'Generate a blog with juicepress', function() {

		var options = this.options({
			linksPerPage: 10,
			baseUrl: "/",
			minimize: true,
			paginationSuffix: "/page-{{ PAGE }}",
			tagPagePrefix: "tags/",
			categoryPagePrefix: "categories/",
			layouts: "./layouts/**.*",
			defaultLayout: "default",
			listLayout: "list",
			partials: "./partials/*",
			helpers: "./helpers/*",
			buildDirectory: "./_build/",
			generateSitemap: true,
			sitemap: {
				frequency: {
					list: "monthly",
					index: "weekly",
					post: "yearly"
				},
				priority: {
					list: 0.8,
					index: 0.9,
					post: 1
				},
				target: "sitemap.xml"
			}
		});
		var files = [];

		this.files.forEach(function(file) {

			file = {
				from: file.src.shift()
			};

			if (/\.(md|markdown)$/.test(file.from)) {
				files.push(file);
			} else {
				grunt.fail.warn("Found file '" + file.from + "' which is not a valid post file suffix. Only 'md' and 'markdown' are allowed");
			}
		});

		var done = this.async();
		var juicepress = require("juicepress");

		juicepress(options, files, function(err, htmls) {
			if (err) {
				done(false, err.toString());
			} else {

				var path  = require("path");
				var mkdir = require("mkdirp");
				var fs    = require("fs");

				require("async").parallel(
					htmls.map(function(file) {
						return function(cb) {
							var targetFile = path.resolve(process.cwd(), options.buildDirectory, file.file);
							var parts = targetFile.split(path.sep);
							parts.pop();

							mkdir(parts.join(path.sep), function(err) {
								if (err) {
									cb(err);
								} else {
									fs.writeFile(targetFile, file.content, cb);
								}
							});
						}
					}),
					function(err) {
						if (err) {
							done(false, err.toString());
						} else {
							grunt.log.ok("Created " + htmls.length + " html files from " + files.length + " posts");
							done(true);
						}
					}
				);
			}
		});
	});
};
