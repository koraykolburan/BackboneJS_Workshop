/*
1) Our Books Constructor function will be a Backbone COLLECTION instead of a Backbone MODEL.

    Some Notes: There are no major differences between the MODEL and the COLLECTION.
                The difference is that the COLLECTION is just a container for one or more backbone MODELs.

2) So wee need to provide a URL that will be dynamically built depending on the category that you have choosen. So we cannot provide a static string for the URL because it changes depending on the category.

3) In this case we can use a function instead of a string as the value of the URL property.
4) And this function will return the address of the server that needs to be contacted in order the FETCH the DATA.
*/

app.model.Books = Backbone.Collection.extend ({
    // initialize: function() {

    // },
    
    // url: function() {
    //     return 'api/books_' + 
    // };
})