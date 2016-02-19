module.exports = function (grunt) { /*require('jit-grunt')(grunt);*/
    var globalConfig = {
        images: 'images', /* папка для картинок сайта */
        styles: 'css', /* папка для готовый файлов css стилей */
        fonts: 'fonts', /* папка для шрифтов */
        scripts: 'js', /* папка для готовых скриптов js */
        src: 'src', /* папка с исходными кодами js, less , etc. */
        bower_path: 'bower_components' /* папка где хранятся библиотеки jquery, bootstrap, SyntaxHighlighter, etc. */
    };
    /* Project configuration.*/
    grunt.initConfig({
        globalConfig: globalConfig,
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            js: ['<%= globalConfig.scripts %>/*'],
            css: ['<%= globalConfig.styles %>/*'],
            fonts: ['<%= globalConfig.fonts %>/*']
        },
        less: {
            development: {
                options: {
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
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>\n'
            },
            build: {
                src: 'js.src/cv.js',
                dest: 'js/cv.min.js'
            }
        },
        copy: {
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

    // Default task(s).
    // grunt.registerTask('default', [ 'uglify','less', 'watch' ]);
    // grunt.registerTask('default', [ 'uglify','less', 'bower_concat' ]);
    grunt.registerTask('default', ['clean', 'less', 'copy', 'uglify', 'responsive_images']);
    grunt.registerTask('imagetest', ['responsive_images']);
    //grunt.registerTask('serverdeploy', ['default', 'ftp-deploy']);

    // 11

};
