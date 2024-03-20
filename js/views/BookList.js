app.views.BooksList = Backbone.View.extend({
    initialize: function(options) {
        this.options = options;
        this.listenTo(this.collection, "change reset", this.render);
    },

    render: function() {
        console.log("BookList:render");

        this.$el.html('<div class="data-book"><ul></ul></div>');
        let $ul = this.$('ul'); //look at ul element 

        let bookPath = '#category/' + this.collection.catId + "/book/";

        this.collection.each(function(model) {
            $ul.append(
                '<li class="thumb">' +
                    '<a  class="thumb-link" href="' + bookPath + model.get("id") + '" >' +
                        '<img src="' + model.get("volumeInfo").imageLinks.thumbnail + '" alt="">' +
                    '</a>' +
                '</li>'
            )
        });



        return this;
    }
});

/* 

When the collection will be completely loaded from the server the VIEW will receive the RESET EVENT and then will be render.
What are we going to render is the LIST of the objects that are store within the collection(this.collection - above).
So the collection is a wrapper around the list of MODELS(Book.js).
Because we didn't tell what type of object are to be stored inside our collection. That's why Backbone will create an object of type Backbone.model for each one of the elements present into the array.
How do we iterate on the collection to the collection. There is a special function a set of functions actually coming from UNDERSCORE LIBRARY.

-- 'this.collection.each(function(model) {
        $ul.append('<li class="thumb">' +
                        '<a href="#" class="thumb-link">' +
                            '<img src="' + model.get() + '" alt="">' +
                        '</a>' +
                    '</li>')})' 
    this variable will be a backbone model that contains each item of the array(in Json).
-- As a image source 'model.get()' we fetch one of the values present inside of the model.
-- For the FETCH -- The model has a "volumeInfo" object we have an "imageLinks" subobject that contains the thumbnail in JSON.

-- Created the bookPath because we need to get ID of books. And added to href from  '<a class="thumb-link"href="' + bookPath + model.get("id") + '" >'> + </a>'.

*/