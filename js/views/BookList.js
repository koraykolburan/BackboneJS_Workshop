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

/* When the collection will be completely loaded from the server the VIEW will receive the RESET EVENT and then will be render.
What are we going to render is the LIST of the objects that are store within the collection(this.collection - above).
So the collection is a wrapper around the list of MODELS(Book.js)

*/