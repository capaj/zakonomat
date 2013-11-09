module.exports = function(grunt) {
    // Project Configuration
    var concatJSFile = 'public/built/<%= pkg.name %>-<%= pkg.version %>.js';
    var annJSFile = 'public/built/<%= pkg.name %>-<%= pkg.version %>.annotated.js';
    var pkgJSON = grunt.file.readJSON('package.json');
	//Load all NPM tasks
	require('load-grunt-tasks')(grunt);

    var env = pkgJSON.env;
    var SM = require('./public/script-manifest.js');
    var mainFileName = 'main-' + env + '-<%= pkg.version %>.js';
    var appScripts = 'public/js/**/*.js';

    var mainReplacement = [{
        from: '<--built script manifest-->',
        to: '/built/' + mainFileName
    }];

    var gCfg = {
        pkg: pkgJSON,
        watch: {
            options: {
                port: 35729,
                livereload: true
            },
            files: ['public/**/*.html', '!public/index.html', '!public/index_build_template.html'],
            JSSources: {
                files: [appScripts, '!public/lib'],
                tasks: []
            },
            less: {
                files: 'public/less/**/*.less',
                tasks: ['less:' + env]
            },
            replace: {
                files: 'public/index_build_template.html',
                tasks: ['replace:' + env]
            },
            manifest: {
                files: 'public/script-manifest.js',
                tasks: ['smg']
            },
            JSfileAddedDeleted: {
                files: appScripts,
                tasks: ['smg'],
                options: {
                    event: ['added', 'deleted']
                }
            },
            bower: {
                files: 'bower.json',
                tasks: []
            }
        },
        smg:{   //generates main.js
            mainInit: {
                steps: SM[env],
                relativeTo: 'public',  // this path will be omitted from all url paths,
                dest: 'public/built/' + mainFileName
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        concat: {
            app: {
                src: SM.concat,
                dest: concatJSFile
            }
        },
        ngAnnotate: {
            app: {
                src: concatJSFile,
                dest: annJSFile
            }
        },
        uglify: {
            dist: {
                files: {
                    'public/built/<%= pkg.name %>-<%= pkg.version %>.min.js': annJSFile
                }
            }
        },
        replace: {
            production: {
                src: 'public/index_build_template.html',
                dest: 'public/index.html',
                replacements: mainReplacement.concat([
                    {
                        from: '<--built css-->',
                        to: '<%= pkg.name %>-<%= pkg.version %>.min.css'
                    },
                    {
                        from: '<script src="http://localhost:35729/livereload.js"></script>',
                        to: ''
                    }
                ])
            },
            dev: {
                src: 'public/index_build_template.html',
                dest: 'public/index.html',
                replacements: mainReplacement.concat([
                    {
                        from: '<--built css-->',
                        to: '<%= pkg.name %>-<%= pkg.version %>.css'
                    },
                    {
                        from: '<--built script manifest-->',
                        to: mainFileName
                    }
                ])
            }
        },
        less: {
            dev: {
                src:  './public/less/bootstrap.less',
                dest: './public/built/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    report: 'min'
                },
                src:  './public/less/bootstrap.less',
                dest: './public/built/<%= pkg.name %>-<%= pkg.version %>.min.css'
            }
        },
		ngtemplates:  {
			app:        {
				options:{
					module: 'ngTemplates',
					prefix: '/',
					standalone: true
				},
				cwd: 'public',
				src: ['templates/directives/**.html'],
				dest: 'public/built/ng-templates.js'
			}
		},
        nodemon: {
            production: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 2,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    };
    //compile task customization
    var compile = ['less', 'replace'];

    compile = compile.map(function (step) {
        return step + ':' + env;
    });
    if (env == 'production') {
        compile = compile.concat(['concat', 'ngAnnotate', 'uglify'])
    }
    compile.push('smg');
    // compile task end

	grunt.registerTask('test', [
		'ngtemplates',
		'karma:unit'
	]);
    //Making grunt default to force in order not to break the project.
//    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('compile', compile);

    if (env == 'dev') {
        grunt.registerTask('default', ['compile', 'watch']);
    }
    if (env == 'production') {
        grunt.registerTask('default', ['compile', 'nodemon']);
        gCfg.watch.JSSources.tasks = ['compile'];
    }
    grunt.initConfig(gCfg);

};
