module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            clear: {
                command: 'clear'
            },
            whoami: {
                command: 'echo Hi, `whoami`!'
            }
        },

        clean: ["build"],

        requirejs: {
            compile: {
                options: {
                    removeCombined: true,
                    mainConfigFile: "public/app/js/main.js",
                    findNestedDependencies: true,
                    fileExclusionRegExp: /^\./,
                    out: "build/js/app.build.js",
                    name: 'main',
                    wrapShim: true // for manage non-AMD plugins deps
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "public/app",
                        src: [
                            'index.html'
                        ],
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: "public/app/css",
                        src: [
                            '*.css'
                        ],
                        dest: 'build/css'
                    },
                    {
                        expand: true,
                        cwd: "public/app/js/libs",
                        src: [
                            'require.js'
                        ],
                        dest: 'build/js'
                    }
                ]
            }
        },

        cssmin: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'build/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css/',
                    ext: '.min.css'
                }]
            }
        },

        replace: {
            appbuild: {
                src: ['build/index.html'],
                overwrite: true,
                replacements: [
                    {
                        from: 'js/main',
                        to: "js/app.build"
                    },
                    {
                        from: 'bootstrap.css',
                        to: 'bootstrap.min.css'
                    },
                    {
                        from: 'js/libs/require.js',
                        to: 'js/require.js'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/index.html': 'build/index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('hello', 'Test task', function() {
        grunt.log.write("I'm Grunt.").ok();
    });

    grunt.registerTask('default', [
        'shell:clear',
        'shell:whoami',
        'clean',
        'requirejs',
        'copy',
        'cssmin',
        'replace',
        'htmlmin'
    ]);
};
