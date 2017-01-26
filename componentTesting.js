//testing transclusion and require for group projects

myApp.component('parentComponent',{

	transclude: true,
	template: ['<h1> This is before </h1>',
	'<div ng-transclude></div>',
	'<h1>this is after</h1>'].join(''),
	controller: function(){
		this.foo = function(){
			return 'Foo from parent';
		}

		this.parentObject = {
			name:'Parent',
			age: 'Old',
			arr: [{
				name: 'Marc'
			},
			{	
				name: 'Burt'
			}]
		}
	}

});

myApp.component('childComponent', {

	require: {
		parent: '^parentComponent'
	},
	controller: function(){
		this.$onInit = function(){
			this.state = this.parent.foo();
		}
		this.logParent = function(){
			console.log(this.parent.foo);
		}

	},
	template: ['<div> Component! {{$ctrl.state}} </div>',
		'<div>{{$ctrl.parent.parentObject}}</div>',
		'{{$ctrl.logParent()}}'
	].join('')
})