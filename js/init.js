// List of modules to load
var modules_list = ['todos'];

// Create the Application object, Application.setView() will
// place a view inside the {{layout-element}} in
// templates/application.handlebars
var Application = window.Application = new Thorax.LayoutView({
  name: 'application'
});

// Alias the special hashes for naming consistency
Application.templates = Thorax.templates;
Application.Views = Thorax.Views;
Application.Models = Thorax.Models;
Application.Collections = Thorax.Collections;

// Allows load:end and load:start events to propagate
// to the application object
Thorax.setRootObject(Application);

$(function() {
  Application.loader.loadModule(modules_list, function(error){
    // Application and other templates included by the base
    // Application may want to use the link and url helpers
    // which use hasPushstate, etc. so setup history, then
    // render, then dispatch
    Backbone.history.start({
      pushState: true,
      root: '/',
      silent: true
    });
    Application.appendTo('body');
    Backbone.history.loadUrl();
  })
});

// This configures our Application object with values
// from the lumbar config, then sets it as the exported
// value from the base module.
_.extend(Application, module.exports);
module.exports = Application;
