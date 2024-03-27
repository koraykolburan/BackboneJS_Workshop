/*
1) We have only two Model to test: the Book.js and Books.js
2) These models are doing is to build a "URL" that will be used to contact the server and "GET" the information out of the SERVER SIDE and we can TEST this.
3) MochaJS always star with a "describe" function.
☉    describe(statement, function(){})
4) When you call the describe function that means you are describing what you are TESTING.
5) For BDD - We need to use GIVEN, WHEN and THEN.
6) So we are testing that when creating a new model, the model will configure it's own rest-end points using the "id" property that we passed to the MODEL.
7) So we are implementing the WHEN and THEN.
8) We can verify the this expectation is met. >>>> "//the URL should now be: api/book_ID.json"
9) The "expect();" function is one of those function that is provided by ChaiJS . "expect = chai.expect;" in the HTML.
☉ The "expect();" requires a condition.
10) Then we need to test also the Collection.
*/

describe("models/Book", function() {
    
    //When
    describe("When building a new model", function() {
        //Then
        it("it builds the REST endpoint URL using the ID Property", function() {
            let book = new app.models.Book({id: 'ID'});

            //the URL should now be: api/book_ID.json
            expect(book.url()).to.equal("api/book_ID.json");
        });
    });
});

describe("models/Books_details", function() {
    it("it builds the REST endpoint with the categoryId passed in the constructor option 'catId'", function() {
        let books = new app.models.Books(null, {catId: "categoryId"});
        expect(books.url()).to.equal("api/books_categoryId.json");
    });
});