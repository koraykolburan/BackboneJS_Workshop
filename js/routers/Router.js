app.routers.Router = Backbone.Router.extend({
    routers: {
        'category/:id/book/:bookId': 'book', //URL hash fragements: #category/<something>/book/<something>
        'category/:id': 'category',          //URL hash fragements: #category/<something>/book/<something>
        '': 'home',
        '*default': 'unknown'
    },

    home: function() {
        console.log("Home");
    },

    category: function(id) {                // passing the parameter the 'id' of the category
        console.log("category " + id);
    },

    book: function(id, bookId) {            // passing the parameter the 'id' and 'bookId' of the category
        console.log("book " + bookId + " for category" + id);
    },

    unknown: function() {
        console.log("Unknown route...");
    }
})