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

//Testing the View - A)Initialize and B)Render

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
            let model = new app.models.Book(modelTemplate);
            let view = new app.views.BookDetail({
                model: model
            });

            view.render();

            expect(view.$('[data-id=authors]').text()).to.equal("Author's Name");
            });
        
        it("it renders the publish date", function() {
            let model = new app.models.Book(modelTemplate);
            let view =  new app.views.BookDetail({
                model: model
            });

            view.render();

            expect(view.$('[data-id=publish-date]').html()).to.equal("01-01-2024");

            });


    });
});

//Testing the Router
describe("routers/Router.js", function() {

    let router;

    beforeEach(function(){
        let MockRouter = app.routers.Router.extend({
            home: sinon.spy(),
            category: sinon.spy(),
            book: sinon.spy(),
            unknown: sinon.spy()
        });
        router = new MockRouter();

        if(Backbone.History.started !== true) {
            Backbone.history.start();
        }
    });

    //resetting URL
    afterEach(function(){
        router.navigate("", {trigger:true});
    });

    it("routes to home if no hash fragment is present", function() {
        router.navigate("", {trigger:true});
        expect(router.home.called).to.be.true;
    });

    it("routes to category if hash fragment contains 'category/<catid>'", function() {
        router.navigate("category/categoryId", {trigger:true});
        expect(router.category.called).to.be.true;
    });

    it("routes to book if hash fragment contains 'category/id/book/id'", function() {
        router.navigate("category/id/book/id", {trigger:true});
        expect(router.book.called).to.be.true;
    });

    it("routes to unknown if has fragment is not recognized", function() {
        router.navigate("something/different", {trigger:true});
        expect(router.unknown.called).to.be.true;
    });
})