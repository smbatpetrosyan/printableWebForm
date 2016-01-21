module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
        },
        uglify: {
            compress: {
                files: {
                    'build/compress.js': ['js/*.js']
                }
            }
        },
        cssmin: {
            absolute: {
                files: [{
                    src: ['css/*.css'],
                    dest: 'build/absolute.css'
                }]
            }
        },
        includes: {
            includePath: {
                src: ['main.html'],
                dest: 'build/printableWebForm.html',
                options: {
                    includePath: 'build/'
                }
            }
        },
        clean: ['build/*.css', 'build/*.js']
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'includes', 'clean']);
};
/*
sudo npm install grunt-contrib-jshint --save-dev
sudo npm install grunt-contrib-uglify --save-dev
sudo npm install grunt-contrib-cssmin --save-dev
sudo npm install grunt-includes --save-dev
sudo npm install grunt-contrib-clean --save-dev
*/