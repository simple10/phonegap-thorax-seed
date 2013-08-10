new (Backbone.Router.extend({
  routes: module.routes,
  index: function() {
    var view = new Application.Views["todos/index"]();
    Application.setView(view);
  }
}));