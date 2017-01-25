var billTotal = function(){

	//boilerplate so object methods don't skip to global object
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
	bindings:{
		billObj: '<'
	},
	controller: billDisplay,
	templateUrl: 'templates/billDisplay.html'

})

var makeGroups = function($scope, $element, $attrs){

	var self = this;

	var Group = {
		name: "DEFAULT"
	}

	//array to hold objects to loop over
	//in makeGroups.html view 'track by group.name' to avoid hashkey
	self.groupList = [];

	//input from user
	self.groupName = '';

	self.submit = function(){
		//create a temporary object and add name from user input
		var tempGroup = Object.create(Group);
		tempGroup.name = self.groupName;

		//push tempGroup to grouplist array
		self.groupList.push(tempGroup);
		tempGroup = {};

		
		//clear input field
		self.groupName = '';
	}

	self.deleteGroup = function(group){
		var idx = self.groupList.indexOf(group);
		if (idx >= 0){
			self.groupList.splice(idx, 1);
		}
	}
}

myApp.component('makeGroups',{
	controller: makeGroups,
	templateUrl: 'templates/makeGroups.html'
})



self.listGroups = function(){

	var self = this;

	//object match to send through binding (self.deleteGroup) to parent ($ctrl.deleteGroup(group))
	//makeGroups.html
	self.delete = function(){

		self.deleteGroup({group: self.group});

	}

}

myApp.component('listGroups', {
	bindings: {
		group: "<",
		deleteGroup: "&",

	},
	controller: listGroups,
	templateUrl: 'templates/listGroups.html'
})

var inputBillItems = function(){

	var self = this;
	//prototype object used to make other objects for the list
	var GroupItem ={

		name: "DEFAULT",
		quant: "DEFAULT",
		price: "DEFAULT",
		totalItem: function(){
			return self.quant + self.price;
		}
	
	}

	self.groupItemList = [];
	self.name = '';
	self.quant = '';
	self.price = '';
	self.submit = function(){
			//create a temporary object and add name from user input
			var tempItem = Object.create(GroupItem);
			tempItem.name = self.name;
			tempItem.quant = self.quant;
			tempItem.price = self.price;

			//push tempGroup to grouplist array
			self.groupItemList.push(tempItem);
			tempItem = {};

			
			//clear input field
			self.name = '';
			self.quant = '';
			self.price = '';
		}
	

}

myApp.component('inputBillItems',{

	controller: inputBillItems,
	templateUrl: 'templates/inputBillItems.html'

})

