app.views.BookDetail = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {
        let images = this.model.get("volumeInfo").imageLinks;

        this.$el.html(
            '<header class="book-header l-content l-content-constrained l-row">' +
                '<div class="l-column book-img">' +
                    '<img src="' + (images.small || images.thumbnail) + '" alt="">' +
                '</div>'+

                '<div class="l-column">' +
                    '<div class="title">' +
                        '<h1 id="title"></h1>' +
                    '</div>' +

                    '<div>' +
                        '<div class="author details">' +
                            '<a href="#" id="author">Mark B. Andersen</a>' +
                        '</div>' +
                        '<div class="publisher details">Human Kinetics - Publisher</div>' +
                    '</div>' +
                '</div>' +
            '</header>' +
            
            '<div class="book-content l-content l-content-constrained">' +
                '<h1 class="title">About this book</h1>' +
                '<p></p>' +
            '</div>'
        );

        return this;
        
    }
})