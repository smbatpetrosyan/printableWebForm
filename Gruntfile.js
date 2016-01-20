module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
        },
        uglify: {
            compress: {
                files: {
                    'grunt/compress.js': ['js/*.js']
                }
            }
        },
        cssmin: {
            absolute: {
                files: [{
                    src: ['css/*.css'],
                    dest: 'grunt/absolute.css'
                }]
            }
        },
        includes: {
            includePath: {
                src: ['applicationFormGrunt.html'],
                dest: 'grunt/printableWebForm.html',
                options: {
                    includePath: 'grunt/'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-includes');
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'includes']);
};