/* 
[FIRST] --
The router recognise this URL Pattern(left-side in the routes) for ex: 'category/:id' and fired our 'category' function(right-side in the routes). Passsing the second part of the URL hash fragment in the ':id' variable of the function.
Example: We can add the URL this: ...html#category/scifi
[SECOND] --
If we want to test that the other oen bookId one just provide any value we want to and we see that are out there is finding the correct function providing the arguments bookId one for category--.
Example: We can add the URL this: ...html#category/scifi/book/ID1

*/

app.routers.Router = Backbone.Router.extend({
    routes: {
        'category/:id/book/:bookId': 'book', //URL hash fragements: #category/<something>/book/<something>
        'category/:id': 'category',          
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
        console.log("book " + bookId + " for category " + id);
    },

    unknown: function() {
        console.log("Unknown route...");
    }
})

/*
When we give the hash fragments to the anchor elements on the index.html like this <a href='#category/all'>All</a>, the router will start to recognize the hash fragments and will fire one of our functions, in this case this is 'category function()' in Router.js providing the value as the 'category/:id' argument of the function.
*/