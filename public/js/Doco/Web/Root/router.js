var Doco.Web.Root.Router = Backbone.Router.extend({

	initialize: function() {

        this.addressInputView = new Doco.Web.Root.View.AddressInputView('#addressInput');
        this.addressView = new Doco.Root.View.AddressView('#address');
	}
});

