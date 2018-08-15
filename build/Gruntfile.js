/* global module */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        requirejs: {
            default: {
                options: {
                    name: "main",
                    wrapShim: true,
                    baseUrl: "../webroot/mengniu/assets/js/app",
                    mainConfigFile: "../webroot/mengniu/assets/js/app/config/config.js",
                    out: "../webroot/mengniu/assets/js/_app.js",
                    insertRequire: ['main'],
                    preserveLicenseComments: false
                }
            }

        },

        jst: {
            default: {
                options: {
                    templateSettings: {
                        interpolate: /\{\{(.+?)\}\}/g
                    },
                    prettify: true,
                    processName: function (filepath) {

                        var prefix = '../webroot/mengniu/assets/js/app/views/';
                        var suffix = '.html';

                        if (filepath.indexOf(prefix) == 0) {
                            filepath = filepath.substring(prefix.length);
                        }

                        if (filepath.lastIndexOf(suffix) == filepath.length - suffix.length) {
                            filepath = filepath.substring(0, filepath.length - suffix.length);
                        }

                        return filepath;
                    }
                },
                files: {
                    "../webroot/mengniu/assets/js/_views.js": ["../webroot/mengniu/assets/js/app/views/**/*.html"]
                }
            }
        },

        concat: {
            options: {
                separator: ';\n\n'
            },
            dist: {
                src: ['../webroot/mengniu/assets/js/app/vendor/base/require.js', '../webroot/mengniu/assets/js/_views.js', '../webroot/mengniu/assets/js/_app.js'],
                dest: '../webroot/mengniu/assets/js/app.js'
            }
        },

        less: {
            default: {
                options: {
                    //paths: ["assets/css"],
                    cleancss: true,
                    modifyVars: {
                        //imgPath: '"http://mycdn.com/path/to/images"',
                        //bgColor: 'red'
                    }
                },
                files: {
                    "../webroot/mengniu/assets/css/style.css": "../webroot/mengniu/assets/css/style.less"
                }
            }
        },

        clean: {
            options: { force: true },
            default: ["../webroot/mengniu/assets/js/_app.js", "../webroot/mengniu/assets/js/_views.js"]
        },


        tmtTinyPng: {
            default_options: {
                options: {
                },
                files: [
                    {
                        expand: true,
                        src: ['*.png','*.jpg','*/*.png','*/*.jpg'],
                        cwd: '../webroot/mengniu/assets/images',
                        filter: 'isFile'
                    }
                ]
            }
        },


        ziti: {
            index: {
                options: {
                    font: {
                        pattern: '\\.ttf$',
                        chars: '',
                        charsFilePattern: '\\.txt$'
                    },
                    subset: true,
                    optimize: true,
                    deleteCharsFile: false,
                    convert: false
                },
                files: {
                    '../webroot/mengniu/assets/font/out.ttf': [ '../webroot/mengniu/assets/font/RTWSYueGoG0v1-ExLightCom.ttf', '../webroot/mengniu/assets/font/num.txt' ],
                    //'../webroot/mengniu/assets/font/hyb1gjm_out.ttf': [ '../webroot/mengniu/assets/font/hyb1gjm.ttf', '../webroot/mengniu/assets/font/app_common.txt' ]
                }
            }
        },
        

        jsObfuscate: {
            test: {
                options: {
                    concurrency: 2,
                    keepLinefeeds: false,
                    keepIndentations: false,
                    encodeStrings: true,
                    encodeNumbers: true,
                    moveStrings: true,
                    replaceNames: true,
                    variableExclusions: [ '^_get_', '^_set_', '^_mtd_' ]
                },
                files: {
                    '../webroot/mengniu/assets/js/dest.js': [
                        '../webroot/mengniu/assets/js/app.js'
                    ]
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-css-url-embed');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-tmt-tiny-png');
    grunt.loadNpmTasks('grunt-ziti');
    grunt.loadNpmTasks('js-obfuscator');


    grunt.registerTask('default', ['requirejs', 'jst', 'concat', 'less', 'clean']);

};
