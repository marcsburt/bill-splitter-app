var myApp = angular.module('billSplitter',[]);


var billTotal = function(){

	//boilerplate so method doesn't skip to global object
	var self = this;

	//bill constructor object.
	var Bill = {
		grandTotal:'DEFAULT', 
		tax: 'DEFAULT',
		taxPercent: function(){
			return Math.round(this.tax/this.grandTotal*100).toFixed(1);
		},
		total: function(){
			return this.grandTotal-this.tax;
		}
	}
	
	//variables exposed to scope function
	self.grandTotal;
	self.taxTotal;
	// self.billObject = {}

	//bound to ng-click
	self.submit = function(){
		
		//check if tempBill was already created
		if (tempBill){
			//if it was reinitialize object
			var tempBill = {};
		}

		//create new object from billObject and add new values
		var tempBill = Object.create(Bill);
		tempBill.grandTotal = self.grandTotal;
		tempBill.tax = self.taxTotal;

		//declare billObject as tempBill
		self.billObject = tempBill;

		//reset input values to empty string
		self.grandTotal = '';
		self.taxTotal = '';
	}



}


myApp.component('billTotal', {

	templateUrl: 'templates/billTotal.html',
	controller: billTotal
})

var billDisplay = function(){

}

myApp.component('billDisplay',{
	bindings:{billObj: '<'},
	controller: billDisplay,
	templateUrl: 'templates/billDisplay.html'

})
