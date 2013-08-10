module.exports = function(grunt) {
  var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

  var port = 8000,
      publicDir = './public',
      jsDir = publicDir + '/modules',
      lumbarFile = './lumbar.json',
      hostname = 'localhost';

  grunt.file.mkdir(publicDir);
  grunt.file.mkdir(jsDir);

  grunt.initConfig({
    // create a static webserver
    connect: {
      server: {
        options: {
          hostname: hostname,
          base: publicDir,
          port: port,
          middleware: function (connect) {
            return [
              rewriteRulesSnippet, // RewriteRules support
              connect.static(require('path').resolve(publicDir)) // mount filesystem
            ];
          }
        }
      },
      rules: {
        '^/todos$': '/'
      }
    },
    lumbar: {
      // performs an initial build so when tests
      // and initial open are run, code is built
      init: {
        build: lumbarFile,
        output: jsDir
      },
      // a long running process that will watch
      // for updates, to include another long
      // running task such as "watch", set
      // background: true
      watch: {
        background: false,
        watch: lumbarFile,
        output: jsDir
      }
    },
    // allows files to be opened when the
    // Thorax Inspector Chrome extension
    // is installed
    thorax: {
      inspector: {
        background: true,
        editor: "subl",
        paths: {
          views: "./js/views",
          models: "./js/models",
          collections: "./js/collections",
          templates: "./templates"
        }
      }
    }
  });

  grunt.registerTask('open-browser', function() {
    var open = require('open');
    open('http://' + hostname + ':' + port);
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('thorax-inspector');
  grunt.loadNpmTasks('lumbar');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-rewrite');

  grunt.registerTask('default', [
    'ensure-installed',
    'thorax:inspector',
    'lumbar:init',
    'configureRewriteRules',
    'connect:server',
    'open-browser',
    'lumbar:watch'
  ]);
};