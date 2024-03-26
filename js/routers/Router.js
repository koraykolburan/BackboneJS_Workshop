/*
[FIRST] --
The router recognise this URL Pattern(left-side in the routes) for ex: 'category/:id' and fired our 'category' function(right-side in the routes). Passsing the second part of the URL hash fragment in the ':id' variable of the function.
Example: We can add the URL this: ...html#category/scifi

[SECOND] --
If we want to test that the other oen bookId one just provide any value we want to and we see that are out there is finding the correct function providing the arguments bookId one for category--.
Example: We can add the URL this: ...html#category/scifi/book/ID1
To sum up of SECOND is we built Books Collection with the Constructor function from the Server.

[THIRD] --
We built the right URL for each file.
Then we added the hash fragments to index.html for each one of them, like #category/all, #category/scifi, #category/romance, #category/horror, #category/sport.
So our book collection object is ready to be use by Backbone because it provides the right URL property.

[FOURTH] --
How do we retrieve the informations from the json file?
We just call fetch on our object.    'app.data.books.fetch()';
But this load doesn't go anywhere if we don't display the information on the screen.
That's we are going to create the VIEW that will display this information.

[FIFTH] --
We create the 'app.data.currentView = new app.data.views.BookList();'.
The currentView is the main area of the screen is this block. So we can have only ONE 'currentView' either the least or the detail.
The CONSTRUCTOR 'app.data.currentView = new app.data.views.BookList();' will receive the collection that we just created. ''
This collection 'collection: app.data.books' will provide the data that the view is going to display because if you remember the view is only responsible for displaying a model or a collection.

[SIXTH] --
We created the BookList.js in the views file. 
We created 'app.views.BooksList = Backbone.View.extend({initialize: function(options) {}});'
And we need to 'render: function(){}' that will render the view
*/

app.routers.Router = Backbone.Router.extend({
    routes: {
        'category/:id/book/:bookId': 'book', //URL hash fragements: #category/<something>/book/<something>
        'category/:id': 'category',          
        '': 'home',
        '*default': 'unknown'
    },

    home: function() {
        console.log("Home" + app.data.bookId);
    },

    category: function(id) {                
        console.log("category " + id);

        app.data.books = new app.models.Books(null, {catId: id}); // COLLECTION & MODEL --- the coll. as the cat. ID
        console.log(app.data.books.url()); 
        
        this._cleanupCurrentView();
        app.data.currentView = new app.views.BooksList({ // VIEW
            collection: app.data.books
        }); 

        this._activateBooksListPanel(); // ACTIVATE the books list panel
        $('[data-id=books-list]').empty().append(app.data.currentView.$el);

        app.data.books.fetch({reset:true}); // FETCH -- We load the collection

//When you call the FETCH -- Backbone contact the server using the URL property that we specified in the Books.js. and later on the data comes back from the server and only then give us to render.

    },

    book: function(id, bookId) {            // passing the parameter the 'id' and 'bookId' of the category
        console.log("book " + bookId + " for category " + id);

        app.data.book = new app.models.Book({id: bookId}); // Using Constructor for book-details

        this._cleanupCurrentView(); // For book-details
        app.data.currentView = new app.views.BookDetail({ // Created VIEW for book-details
            model: app.data.book // View will be able to listen to render the content of this model when data availb.
        });  

        this._activateBookDetailPanel();    // For book-details
        $('[data-id=book]').empty().append(app.data.currentView.$el) // For book-details

        app.data.book.fetch();
    },

    unknown: function() {
        console.log("Unknown route...");
    },

// ---------------------------------------------- UTILITY FUNCTIONS ---------------------------------------------

    _activateBooksListPanel: function() {
        $('[data-id="books-wrapper] .is-visible').removeClass('is-visible');
        $('[data-id=books-list]').addClass('is-visible');
    },

    _activateBookDetailPanel: function() {
        $('[data-id="books-wrapper] .is-visible').removeClass('is-visible');
        $('[data-id=book]').addClass('is-visible');
    },

    _cleanupCurrentView: function(){
        if(app.data.currentView) {
            app.data.currentView.remove();
            app.data.currentView = null;
        }
    }
})


/*
TO SUM UP ----------------------------------------------------------------------------------------------------------
A) When we click the book list elements for the hash fragments -- All, Scifi, Romance etc., the category function is fired.
B) A new collection object is created(with constructor) providing the id of the category as an optional parameter.
C) Then we create a new view of types book list. Providing the collection as a property in the constructor.
D) And then we called the fetch on the collection.
E) Fetch will trigger the loading of the data from the server.
F) And when the server is ready and the data comes back the collection will emit a reset event because of our view since it has been built is listening(with ListenTo()) on any event updating on the collection.
G) The view will render itself into it's own '$el' element when the data is ready.
H) We created 'data-id="books-list"' on the index.html. To render the view into the block.
I) Selected in the category function and append to the currentView to render.'$('[data-id=books-list]').append(app.data.currentView.$el);'.
J) And our List is 'display:none' which means 'hidden'. That's why we created an UTILITY FUNCTION-- '_activateBooksListPanel: function(selector) {},' and '_activateBookDetailPanel: function(selector) {}'
Each one of these two function will activate the corresponding panel on the page.
K) We .addClass(is-visible) for two functions. They shouldn't be visible at the same time. That's why we added data-id="books-wrapper" of their container on the index.html.
L) That's why we added 'data-id="books-wrapper'.removeClass(is-visible);
M) We can add 'reset:true' property to FETCH. If we do so backbone will still generate the add events for each one of the of the model that gets loaded from the server but at the end it will also generate a reset event and because our VIEW is LISTENING TO this event. And we will finally render.
N) Added '_cleanupCurrentView: function(){}' -- This function will take care of ensuring that if there is something already displayed in the web page, we are going to clean it up. And it will reinitialize 'app.data.currentView = null;'
O) We chained with the empty() the this $('[data-id=books-list]').empty().append(app.data.currentView.$el); (Also $el is create a new Div.)
P) So we need to create a model for the book because we need to contact the server in order to retrieve in order to information for the book. That' why we created 'Book.js' under the models file.  
Q) We created new object in our data object 'app.data.book = new app.models.Book();' (So if you remember the DATA object is the one where we store all of the objects that we create using the constructor functions.)
R) Let's create the 'BookDetail.js' in the VIEW file. And we set up the render of the BookDetail.js.

-------------------------------------------------------------------------------------------------------------------- 
*/