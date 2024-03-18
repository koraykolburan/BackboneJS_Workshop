app.views.BooksList = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
        this.listenTo(this.collection, "change reset", this.render);
    },

    render: function() {
        console.log("BookList:render");

        this.$el.html('<h1>BookList</h1>');

        return this;
    }
});
