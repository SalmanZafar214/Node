//gruntfile.js
module.exports = function (grunt) {
    grunt.initConfig({
        nodemon: {
            script: 'server.js',
            options: {
                watchedExtensions: ['js']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.registerTask('default', ['nodemon']);
};
