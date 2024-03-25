app.views.TopBar = Backbone.View.extend({
    events: {
        'click [data-id=category-toggle]': 'toggleCategories',
        'click [data-id=category]': 'selectCategory'
    },

    toggleCategories: function(evt) {
        evt.preventDefault();
        this.$('[data-id=categories]').toggleClass('is-visible2');
    },

    selectCategory: function(evt) {
        this.$('[data-id=categories]').removeClass('is-visible2');
    }
});