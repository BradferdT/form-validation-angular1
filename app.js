var app = angular.module('someApp', []);

app.component('priceList', {
  template: `
    <form name="someForm" ng-submit="vm.addItem()" novalidate>
      <p>Title: <input name="title" type="text" ng-model="vm.newItem.title" required="required" minlength="3"></p>
      <p ng-if="someForm.title.$touched && someForm.title.$invalid">This just ain't workin</p>
      <p ng-if="someForm.title.$error.minlength">Not long enough</p>
      <p>Email: <input name="email" type="email" ng-model="vm.newItem.description" required="required"></p>

      <p>Price: <input type="text" ng-model="vm.newItem.price" required="required"></p>
      <button type="submit" ng-disabled="someForm.$invalid">Submit</button>
    </form>
    <h3>Items List</h3>
    <input type="text" ng-model="vm.search">
    <ul>
      <li ng-repeat="item in vm.items | filter: vm.search track by $index">
        <p>Title: {{item.title}}</p>
        <p>Description: {{item.description}}</p>
        <p>Price: {{item.price | currency: $}}</p>
        <button ng-click="vm.removeItem($index)">Delete</button>
      </li>
    </ul>
  `,
  controller: function() {
    var vm = this;

    vm.items = [{
      title: "some item",
      description: 4,
      price: 4
    },
    {
      title: "some other item",
      description: 7,
      price: 7
    }];

    vm.addItem = function() {
      vm.items.push(vm.newItem);
      vm.newItem = null;
    };

    vm.removeItem = function(index) {
      vm.items.splice(index, 1);
    };
  },
  controllerAs: 'vm'
})

app.filter('capitalize', function() {
  return function(input, index) {
    return input[index].toUpperCase() + input.slice(1);
  };
})
