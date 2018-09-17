// Local DEV context
if (!window._spPageContextInfo) {
    window._spPageContextInfo = {
        webAbsoluteUrl: "https://spjeff.sharepoint.com"
    }
}


function todoCtl($scope) {
    var vm = $scope;
    vm.hello = 'world';


    vm.todos = [{
            name: 'first',
            done: false
        },
        {
            name: 'second',
            done: true
        },
        {
            name: 'third',
            done: false
        }
    ];

    vm.add = function () {
        var t = {
            name: vm.newTodo,
            done: false
        };
        vm.todos.push(t);
    };
    vm.remain = function () {
        var c = 0;
        angular.forEach(vm.todos, function (t) {
            if (!t.done) {
                c++;
            }
        });
        return c;
    };
    vm.archive = function () {
        var oldTodos = vm.todos;
        vm.todos = [];
        angular.forEach(oldTodos, function (t) {
            if (!t.done) {
                vm.todos.push(t);
            }
        });
    };


    vm.save = function () {
        console.log('save');
        var jsonBody = JSON.stringify(vm.todos);

        // PNP save
        // add an item to the list
        $pnp.sp.web.lists.getByTitle("Learn").items.add({
            Title: "Title",
            JSON:  jsonBody
        }).then(function (iar) {
            console.log(iar);
        });
    };
}

angular.module('todoApp', []).controller('todoCtl', todoCtl);