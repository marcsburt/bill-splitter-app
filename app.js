var myApp = angular.module('billSplitter', ['ui.router']);


//config

myApp.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/billTotal');

	var billState = {

		name: 'billTotal',
		url: '/billTotal',
		component: 'billTotal',

	}


	$stateProvider.state(billState);

});


var billTotal = function($scope, $rootScope){

	//boilerplate so method doesn't skip to global object
	var self = this;

	//bill constructor object.
	var Bill = {
		grandTotal:'DEFAULT', 
		tax: 'DEFAULT',
		taxPercent: function(){
			return Math.round(this.tax/this.grandTotal*100).toFixed(1);
		}
	}
	
	//variables exposed to scope function
	self.grandTotal;
	self.taxTotal;
	self.billObj = {}

	//bound to ng-click
	self.submit = function(){
		
		//check if newBill was already created
		if (newBill){
			//if it was reinitialize object
			var newBill = {};
		}

		//create new object from billObj and add new values
		var newBill = Object.create(Bill);
		newBill.grandTotal = self.grandTotal;
		newBill.tax = self.taxTotal;

		self.grandTotal = '';
		self.taxTotal = '';
		self.billObj = newBill;
	}



}


myApp.component('billTotal', {
	bindings:{
		//billObj: '<',
		//grandTotal: '=',
		//taxTotal: '=',
		//formSubmit: '@'
	},
	templateUrl: 'templates/billTotal.html',
	controller: billTotal
})

