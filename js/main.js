/*
The main.js will be responsible for kicking in in application process.
1) We create new router, because before this we have just created constructor function for the router.
So we plays create a new variable router inside of the 'app.data' object, because the 'app.data' is the object that we decided that is going to contain the object created during the life of the application.
*/
$(function() {
    app.data.router = new app.routers.Router();

    
    new app.views.TopBar({
        el: '[data-id=topbar]'
    });

    
    Backbone.history.start();
})

