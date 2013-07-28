var Doco.Web.Root.View.AddressInputView = Backbone.View.extend({

	initialize: function(el) {

        this.el = el;
        this.geocoder = new google.maps.Geocoder();

	},
	
    events: {
        "click":          "search",
    },

	search: function() {
	    alert("hoge");

//      var address = $.('#addressInput').value;
//      this.geocoder.geocode({"address": address}, function(results, status) {
//        if (status == google.maps.GeocoderStatus.OK) {
//          this.map.setCenter(results[0].geometry.location);
//        } else {}
//      });

	}

});


