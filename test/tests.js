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
    describe("When initializing", function() { // A) testing the "initialize:"
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
    describe("When rendering", function() { //B) testing the "render:"

        /* 
        Whatever we create at this level, will be visible for both of the, so we can create one single model and use the same model in both function.
        I chose only one section that volumeInfo because this is the section that we are working with it.
    -   I will check the, the titles, authors, publish date, description, and image links.
        (So these are the information our viewer needs to render if we remove one of these information, probably the view will give us an error because we are expecting to have all of this information.)
        At this time we provide the constructor function with the Json data with all of the attributes that we want to be set immediately on the model. So what may more that will be created and all of the attributes would be set up automatically.
        Firstly I create the model providing the modelTemplate.
        And I create the view of type BookDetail providing as usual model.

        There is no FETCHING in here, I'm not testing the communication between the client and the server.
        Because this is a unit test. And unit tests you're code in isolation.
        I'm not interested the verifying when In said sth on the model it triggers a change event and the change event triggers surrender because this is sth that I already did it.
        */
        let modelTemplate = {
            "volumeInfo": {
                "title": "Book Name",
                "authors": [
                 "Author's Name"
                ],
                "publisher": "Publisher Name",
                "publishedDate": "01-01-2024",
                "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin Eu mi bibendum neque egestas congue Mattis aliquam faucibus purus in Id neque aliquam vestibulum morbi Nec ultrices dui sapien eget mi proin sed libero Iaculis at erat pellentesque adipiscing commodo elit Montes nascetur ridiculus mus. Mauris vitae ultricies leo integer Ut tellus elementum sagittis vitae et leo duis ut Leo vel orci porta non pulvinar neque, Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua Aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin Eu mi bibendum neque egestas congue. Mattis aliquam faucibus purus in Id neque aliquam vestibulum morbi Nec ultrices dui sapien eget mi proin sed libero Iaculis at erat pellentesque adipiscing commodo elit Montes nascetur ridiculus mus mauris vitae ultricies leo integer Ut tellus elementum sagittis vitae et leo duis ut Leo vel orci porta non pulvinar neque, Tristique senectus et netus et Ut ornare lectus sit amet Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi Nullam vehicula ipsum a arcu Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat Laoreet non curabitur gravida arcu Id consectetur purus ut faucibus pulvinar Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing",
                
                "printType": "BOOK",
                "categories": [
                 "ABC / DEFG",
                 "ABC / DEFG2",
                 "ABC / DEFG3"
                ],
                "imageLinks": {
                 "smallThumbnail": "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg",
                 "thumbnail": "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg",
                 "small": "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg",
                 "medium": "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg",
                 "large": "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg",
                 "extraLarge": "https://images.pexels.com/photos/6373305/pexels-photo-6373305.jpeg"
                }
               }
        }

        it("it doesn't display the publisher if not present in the JSON data", function() {
            let model = new app.models.Book(modelTemplate);
            let view = new app.views.BookDetail({
                model: model
            });

            view.render();

            expect(view.$('[data-id=publisher]').html()).to.equal(" ・ Sold by Publisher Name");
        });

        it("it renders the author", function() {
            // let model = new app.models.Book(modelTemplate);
            // let view = new app.views.BookDetail({
            //     model: model
            // });

            // view.render();

            // expect(view.$('[data-id=authors]').text()).to.equal("Author\'s Name");
        });
    })
});