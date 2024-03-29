app.views.BookDetail = Backbone.View.extend({

    template: _.template($('script[data-id=book-detail-view]').html()), //-- UNDERSCORE --

    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {
        let info = this.model.get("volumeInfo");
        let images = info.imageLinks;

        let publisher = "";

        if(info.publisher) {
            publisher = ' ・ Sold by ' + info.publisher;
        }
        /*
        this.$el.html(
            '<header class="book-header">' +

                '<div class=" subtitle">' +
                    '<div class="title">' +
                        '<h1 id="title">' +  
                            info.title +
                        '</h1>'+
                    '</div>' +

                    '<div class="sub-info">' +
                        '<div class="author details">' +
                            (info.authors ? '<a href="#" id="author">' + info.authors.join(" - ") : "") + 
                            '</a>' +
                        '</div>' +
                        '<span class="publish-date">' + info.publishedDate + '</span>' + 
                        '<span class="publisher-details">' + publisher + '</span>' +
                    '</div>' +
                '</div>' +

                '<div class="book-img">' +
                    '<img src="' + (images.small || images.thumbnail) + '" alt="">' +
                '</div>'+

                '<div class="buttons">' + 
                    '<div class="sub-buttons">' + 
                        '<button class="purchase">' +
                            '<span>($00.00) Ebook</span>' +
                        '</button>' +
                    '</div>' +
                    '<div class="sub-buttons">' + 
                        '<button class="free-sample">Free Sample</button>' +
                    '</div>' +
                '</div>' +
                

            '</header>' +
            
            '<div class="book-content">' +
                '<h2 class="title">About this e-book</h2>' +
                '<p>' + 
                    info.description + 
                '</p>' +
            '</div>'

        );
        */

        this.$el.html( this.template({ //-- UNDERSCORE --
            info: info,
            publisher: publisher,
            images: images, 
        }) );

        return this;
        
    }
})