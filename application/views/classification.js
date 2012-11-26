define(['backbone'], function(Backbone) {
	"use strict";

	// Classification View
	// --------------

	// The DOM element for a group...
	var ClassificationView = Backbone.View.extend({

		name: 'ClassificationView',

		// The DOM events specific to an item.
		events: {
			"click .toggle"   : "togglecompleted"
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function() {
		},

		// Re-render the titles of the todo item.
		render: function() {
			return this;
		},
		
		// Destroy the model.
		destroy: function() {
			this.model.destroy();
		}
	});

	return ClassificationView;

});