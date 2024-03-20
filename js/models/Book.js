app.models.Book = Backbone.Model.extend({
    url: function() {
        return "api/book_" + this.get("id") + ".json";
    }
});

// We need this object just for wrapping around the URL end point and we want to contact