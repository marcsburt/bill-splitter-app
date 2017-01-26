var makeGroups = function($scope, $element, $attrs){

	var self = this;

	self.groupList = []
	//array to hold objects to loop over
	//in makeGroups.html view 'track by group.name' to avoid hashkey

	//group name prototype to create a new object from
	var Group = {
		name: "DEFAULT",
		menuList:[]
	}

	var MenuList = {
		name: "DEFAULT",
		quant: "NUM",
		price: "NUM"
	}


	//input from user
	self.groupName = '';

	self.submit = function(){
		//create a temporary object and add name from user input
		var tempGroup = Object.create(Group);
		tempGroup.name = self.groupName;

		//push tempGroup to grouplist array
		self.groupList.push(tempGroup);

		//clear tempgroup
		tempGroup = {};
		
		//clear input field
		self.groupName = '';
	}

}

myApp.component('makeGroups',{
	transclude: true,
	controller: makeGroups,
	templateUrl: 'templates/makeGroups.html'
})



self.listGroups = function(){

	var self = this;

	//pull groupList from parent and initialize it.
	self.$onInit = function(){
		self.groupList = self.makeGroups.groupList;

	}

	self.delGroup = function(array, index){
		array.splice(index, 1)
	}
}

myApp.component('listGroups', {
	require:{
		makeGroups: '^^makeGroups'
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


myApp.component('test',{
	bindings: {
		item: '='
	},
	template:"<h4>{{$ctrl.item}}</h4>"
})
