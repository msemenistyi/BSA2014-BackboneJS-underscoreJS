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
        }
    });

    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('hello', 'Test task', function() {
        grunt.log.write("I'm Grunt.").ok();
    });

    grunt.registerTask('default', ['shell:clear', 'shell:whoami', 'hello']);
};
