/*
-- The collection is a wrapper around the list of MODELS(Book.js)
-- That's why Backbone will create an object of type Backbone.model for each one of the elements present into the array.
*/

//To sum up: this function is a constructor function for the collection
app.models.Books = Backbone.Collection.extend ({
    initialize: function(models, options ) {  //the first one will ignore(null) is the list of our models.
            this.options = options;           //the second it's the option that we additionally provide.
            
    },      
    
    url: function() {
        return 'api/books_' + this.options.catId + '.json';
    }
})


/* -- Creating STEP TO STEP --
1) Our Books Constructor function will be a Backbone COLLECTION instead of a Backbone MODEL.

    Some Notes: There are no major differences between the MODEL and the COLLECTION.
                The difference is that the COLLECTION is just a container for one or more backbone MODELs.

2) So wee need to provide a URL that will be dynamically built depending on the category that you have choosen. So we cannot provide a static string for the URL because it changes depending on the category.

3) In this case we can use a function instead of a string as the value of the URL property.
4) And this function will return the address of the server that needs to be contacted in order the FETCH the DATA.

initialize: function(){}
5) So when you create a COLLECTION object with the new operator whatever arguments you passed to the new operator gets passed to the initialize function of your Backbone MODEL or COLLECTION or VIEW all of them share the same behvaviour.
For example: in the category: function(id){} on the Router.js file, this 'app.data.books = new app.model.Book(null, {});' we can provide an object with all of the arguments that we want to provide to the COLLECTION. And the COLLECTION can use later.

6) 
A) The COLLECTION OBJECT require a list of MODELS that you want to provide to the COLLECTION, so you can create a new MODEL object with already the MODELS inside of it.
B) If you have it and then an object that is a set of options that you want to pass to the COLLECTION whatever you feel the collection object needs to do its work.

For ex: new Backbone.Collection([A)models], [B)options])

7) Add the json file '.json'.
*/