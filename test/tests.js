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
11) We need to check if the render function is called. Line 45.
12) Sinon.js provide a functionality that is called "stub()" that let's you redefine a function.
13) So if we call this function "sinon.stub()" nothing will happen but we are able to know if this function has been called. So that we would do that is to change the original render function in our view.
14) So if we want to redefine the render function we need to that at prototype level. That's why redefine their function that is now stored in the prototype of the book detail constructor function. Because that is the place where the render function is stored.
15) 
*/

//Testing the Models and Collection
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

//Testing the View - Initialization: we are testing two different situations with a view. A)Initialize and B)Render
describe("views/BookDetail", function() {
    describe("When initializing", function() {
        it("It re-renders itself when the model changes", function() {
            let model = new app.models.Book({id: "id1"});
             
            let render = sinon.stub(app.views.BookDetail.prototype, "render"); //render
            let view = new app.views.BookDetail({   //view
                model: model
            })

            model.set("property", "value");

            expect(render.called).to.be.true;

            app.views.BookDetail.prototype.render.restore();
        });
    });
    describe("When rendering", function() {

    });
});