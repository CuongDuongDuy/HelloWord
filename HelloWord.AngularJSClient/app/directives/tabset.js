app.directive('tabset', function () {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: './partials/tabset.html',
        bindToController: true,
        controllerAs: 'tabset',
        scope: {},
        controller: function () {
            var self = this;
            self.tabs = [];
            self.addTab = function (tab) {
                self.tabs.push(tab);
                if (self.tabs.length === 1) {
                    tab.selected = true;
                }
            }

            self.selectionChanged = function (selectedTab) {
                angular.forEach(self.tabs, function (tab) {
                    if (tab.selected && tab !== selectedTab) {
                        tab.selected = false;
                    }
                });
                selectedTab.selected = true;
            }
        }
    };
});

app.directive('tab', function () {
    return {
        restrict: 'E',
        require: '^tabset',
        replace: true,
        transclude:true,
        templateUrl: './partials/tab.html',
        scope: {
            title: '@',
            id: '@'
        },
        link: function (scope, elem, attr, tabsetCtrl) {
            scope.selected = false;
            tabsetCtrl.addTab(scope);
        }
    }
})