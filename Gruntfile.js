module.exports = function(grunt) {

  grunt.initConfig({
	pkg : grunt.file.readJSON('package.json'),
	  less: 
	  {
	      development: 
	      {
	        options: 
	        {
	          compress: true,
	          yuicompress: true,
	          optimization: 2
	        },
	        files: 
	        [{
	  				expand: true,
	  				cwd: "bower_components/bootstrap/less",
	  				src: "**/bootstrap.less",
	  				dest: "www/css/",
	  				ext: ".css"
	        },
		{
					expand: true,
	  				cwd: "bower_components/bootstrap/less",
	  				src: "**/local.less",
	  				dest: "www/css/",
	  				ext: ".css"
	  				
	        }
		]
	      }
	  },
	
    // concat configuration
    concat: {
      
      js: {
                src: [
                    'bower_components/knockout/dist/knockout.js','bower_components/jquery/dist/jquery.min.js','bower_components/d3/d3.js'
                ],
                dest: 'www/js/libs.js'
            }
    },
	uglify : {
        js: {
            files: {
                'www/js/libs.js' : [ 'www/js/libs.js' ]
            }
        }
    },
	jshint: {
      
	  // when this task is run, lint the Gruntfile and all js files in src
      files: ['*.js']
    }
  });

  // This will automatically load any grunt plugin you install, such as grunt-contrib-less.
require('load-grunt-tasks')(grunt);
grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('package','concat');
  grunt.registerTask('validate','jshint');
  grunt.registerTask('build_all', ['less','concat','uglify','jshint']);  


};
