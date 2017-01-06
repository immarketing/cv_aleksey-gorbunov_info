module.exports = function (grunt) { /*require('jit-grunt')(grunt);*/
    var globalConfig = {
        releaseNo: '00.00.' + (Date.now()).toString(16).toLocaleUpperCase(),
        releaseDate: '' + (new Date()).toString().toLocaleUpperCase(),
        images: 'images', /* папка для картинок сайта */
        styles: 'css', /* папка для готовый файлов css стилей */
        fonts: 'fonts', /* папка для шрифтов */
        scripts: 'js', /* папка для готовых скриптов js */
        src: 'src', /* папка с исходными кодами js, less , etc. */
        distr: 'distr.tmp', /* папка для формирования дистрибутива. */
        bower_path: 'bower_components' /* папка где хранятся библиотеки jquery, bootstrap, SyntaxHighlighter, etc. */
    };
    /* Project configuration.*/
    grunt.initConfig({
        globalConfig: globalConfig,
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: ['<%= globalConfig.scripts %>/*'],
            css: ['<%= globalConfig.styles %>/*'],
            distr: ['<%= globalConfig.distr %>/**/*'],
            fonts: ['<%= globalConfig.fonts %>/*']
        },
        less: {
            development: {
                options: {
                    paths: ['assets/css', 'bower_components/bootstrap/less'],
                    compress: false,
                    yuicompress: false,
                    optimization: 2
                },
                files: {
                    "css/cv.css": "less.src/cv.less"
                }
            }
        },
        image_resize: {
            resize: {
                options: {
                    width: 200,
                    //height: 100,
                    overwrite: true
                },
                src: 'images.src/*.png',
                dest: 'images/'
            }
        },

        responsive_images: {
            myTask: {
                options: {
                    engine: 'gm',
                    sizes: [{
                        name: 'nrm',
                        width: 180,
                        suffix: "",
                        //height: 240
                    }]
                },
                files: [{
                    expand: true,
                    src: ['**.{jpg,gif,png}'],
                    cwd: 'images.src/',
                    dest: 'images/'
                }]
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.scripts %>',
                    src: ['*.js', '!*.min.js'],
                    //src: ['school.js', '!*.min.js'],
                    dest: '<%= globalConfig.distr %>/<%= globalConfig.scripts %>'
                }]
            },
            build: {
                src: 'js.src/cv.js',
                dest: 'js/cv.min.js'
            }
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.styles %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= globalConfig.distr %>/<%= globalConfig.styles %>'
                }]
            }
        },

        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    '<%= globalConfig.distr %>/index.html': 'index.html' // 'destination': 'source'
                }
            },
            dev: {                                       // Another target
                files: {
                    //'dist/index.html': 'src/index.html',
                    //'dist/contact.html': 'src/contact.html'
                }
            }
        },
        ftp_push: {
            dist_cv_gorbunov_aleksey_ru: {
                options: {
                    //authKey: "serverA",
                    username: "ftpcvalexeygorb",
                    password: "o25Q45e34V22O68v",
                    host: "cv.aleksey-gorbunov.info",
                    dest: "/",
                    port: 21
                },
                files: [
                    {
                        expand: true,
                        //cwd: '.',
                        cwd: '<%= globalConfig.distr %>/',
                        src: [
                            "index.html",
                            '*.ver',
                            '.ver',
                            "css/**",
                            "fonts/**",
                            "images/**",
                            "js/**"
                        ]
                    }
                ]
            },
            dist_www_gorbunov_aleksey_ru: {
                options: {
                    //authKey: "serverA",
                    username: "ftpwwwalgouser",
                    password: "I60r22i29P58i38sFG",
                    host: "www.aleksey-gorbunov.info",
                    debug: true,
                    incrementalUpdates: false,
                    dest: "/",
                    port: 21
                },
                files: [
                    {
                        expand: true,
                        //cwd: '.',
                        cwd: '<%= globalConfig.distr %>/',
                        src: [
                            "index.html",
                            '*.ver',
                            '.ver',
                            "css/**",
                            "fonts/**",
                            "images/**",
                            "js/**"
                        ]
                    }
                ]
            }

        }
        ,

        gittag: {
            dist: {
                options: {
                    // Target-specific options go here.
                    force: true,
                    annotated: true,
                    tag: globalConfig.releaseNo,
                    message: 'distr ' + globalConfig.releaseDate
                }
            }
        },


        "file-creator": {
            dist: {
                files: [
                    {
                        //file: "<%= globalConfig.distr %>/" + '<%= globalConfig.releaseNo  %>' + '.ver',
                        file: "<%= globalConfig.distr %>/" + '.ver',
                        method: function (fs, fd, done) {
                            fs.writeSync(fd, globalConfig.releaseNo + '|' + globalConfig.releaseDate);
                            done();
                        }
                    }
                ]
            }
        },

        copy: {
            dist: {
                files: [
                    /*
                     {
                     expand: true,
                     flatten: true,
                     cwd: '<%= globalConfig.scripts %>/',
                     src: '*',
                     dest: '<%= globalConfig.distr %>/<%= globalConfig.scripts %>/',
                     filter: 'isFile'
                     },
                     {
                     expand: true,
                     flatten: true,
                     cwd: '<%= globalConfig.styles %>/',
                     src: '*',
                     dest: '<%= globalConfig.distr %>/<%= globalConfig.styles %>/',
                     filter: 'isFile'
                     },
                     */
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= globalConfig.fonts %>/',
                        src: '*',
                        dest: '<%= globalConfig.distr %>/<%= globalConfig.fonts %>/',
                        filter: 'isFile'
                    }
                    ,
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= globalConfig.images %>/',
                        src: '*',
                        dest: '<%= globalConfig.distr %>/<%= globalConfig.images %>/',
                        filter: 'isFile'
                    }
                ]
            },
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/jquery/dist/jquery.<%= globalConfig.minified %>js',
                    dest: '<%= globalConfig.scripts %>/',
                    filter: 'isFile'
                }, /* { expand : true, flatten : true, src : '<%= globalConfig.bower_path %>/html5shiv/dist/html5shiv.min.js', dest : '<%= globalConfig.scripts %>/', filter : 'isFile' }, */ {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/bootstrap/dist/js/bootstrap.<%= globalConfig.minified %>js',
                    dest: '<%= globalConfig.scripts %>/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: 'js.src/*.js',
                    dest: 'js/',
                    filter: 'isFile'
                }, /* { expand : true, flatten : true, src : '<%= globalConfig.bower_path %>/html5shiv/dist/html5shiv.min.js', dest : '<%= globalConfig.scripts %>/', filter : 'isFile' }, */ {
                    expand: true,
                    flatten: true,
                    src: 'css.src/*.css',
                    dest: 'css/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: 'images.src/*',
                    dest: 'images/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/bootstrap/dist/css/bootstrap.<%= globalConfig.minified %>css',
                    dest: '<%= globalConfig.styles %>/',
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    src: '<%= globalConfig.bower_path %>/bootstrap/dist/fonts/*',
                    dest: '<%= globalConfig.fonts %>/',
                    filter: 'isFile'
                }]
            }
        } /* less : { development : { options : {
         compress : false,
         yuicompress : false,
         optimization : 2
         },
         files : {
         "css/algo.css" : "less/algo.less",
         "css/main.css" : "less/main.less"

         // destination
         // file and
         // source file
         }
         }
         },
         */
        /*
         uglify : {
         options : {
         banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */
        /* \n'
         },
         build : {
         src : 'src/<%= pkg.name %>.js',
         dest : 'build/<%= pkg.name %>.min.js'
         }
         },
         */
        /*
         'ftp_upload': {
         build: {
         auth: {
         host: 'school.auditbezopasnosti.ru',
         port: 21,
         authKey: 'school.auditbezopasnosti.ru'
         },
         src: ['<%= globalConfig.wwwroot %>/**/
        /* *'],
         dest: '/www/school.auditbezopasnosti.ru',
         exclusions: []
         }
         },
         'ftp-deploy': {
         build: {
         auth: {
         host: 'school.auditbezopasnosti.ru',
         port: 21,
         authKey: 'school.auditbezopasnosti.ru'
         },
         src: '<%= globalConfig.wwwroot %>',
         dest: '/www/school.auditbezopasnosti.ru',
         exclusions: [],
         forceVerbose: false
         }
         }
         */
    });

    // Load the plugin that provides the "uglify" task.
    /*
     grunt.loadNpmTasks('grunt-bower-concat');
     grunt.loadNpmTasks('grunt-contrib-clean');
     grunt.loadNpmTasks('grunt-ftp-upload');
     grunt.loadNpmTasks('grunt-ftp-deploy');
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-image-resize');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-ftp-push');


    grunt.loadNpmTasks('grunt-git');

    grunt.loadNpmTasks('grunt-file-creator');

    // Default task(s).
    // grunt.registerTask('default', [ 'uglify','less', 'watch' ]);
    // grunt.registerTask('default', [ 'uglify','less', 'bower_concat' ]);
    grunt.registerTask('default', ['clean', 'less', 'copy', 'uglify', 'responsive_images']);
    grunt.registerTask('imagetest', ['responsive_images']);
    //grunt.registerTask('serverdeploy', ['default', 'ftp-deploy']);
    grunt.registerTask('prepareserverdeploy', ['default', 'copy:dist', 'htmlmin:dist', 'cssmin:dist', 'uglify:dist', 'file-creator:dist'
        //, 'file-creator:dist'
    ]);

    grunt.registerTask('serverdeploy', ['prepareserverdeploy', 'gittag:dist', 'ftp_push:dist_www_gorbunov_aleksey_ru']);



    // 11

};




