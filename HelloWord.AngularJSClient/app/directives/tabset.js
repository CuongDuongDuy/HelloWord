app.directive('tabset', function () {
    var controller = ['$sce', function($sce) {
        var self = this;
        self.tabs = [];
        self.newTabId = 1;
        self.selectedTab = undefined;

        function setSelectedTab(tab, addMore) {
            if (addMore === true) {
                self.selectedTab = tab;
                return;
            }
            if (self.selectedTab === tab) {
                var index = self.tabs.indexOf(tab);
                if (index + 1 === self.tabs.length) {
                    self.selectedTab = self.tabs[index - 1];
                } else {
                    self.selectedTab = self.tabs[index + 1];
                }
            }
        }

        self.tabAdd = function(tab) {
            if (tab === undefined) {
                tab = {};
                tab.content = 'Tab content ' + self.newTabId;
            }
            tab.id = 'Tab' + self.newTabId;
            tab.title = 'Tab ' + self.newTabId;
            self.tabs.push(tab);
            setSelectedTab(tab, true);
            self.newTabId++;
        };

        self.tabClose = function(selectedTab) {
            setSelectedTab(selectedTab, false);
            var index = self.tabs.indexOf(selectedTab);
            self.tabs.splice(index, 1);
        };

        self.selectionChanged = function(selectedTab) {
            self.selectedTab = selectedTab;
        };

        self.trustAsHtml = function(tabContent) {
            return $sce.trustAsHtml(tabContent);
        };
    }];
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: './partials/tabset.html',
        bindToController: true,
        controllerAs: 'tabset',
        scope: {},
        controller: controller
    };
});

app.directive('tab', function () {
    return {
        restrict: 'E',
        require: '^tabset',
        replace: true,
        transclude: true,
        templateUrl: './partials/tab.html',
        scope: {},
        link: function (scope, elem, attr, tabsetCtrl) {
            scope.content = elem.html();
            tabsetCtrl.tabAdd(scope);
        }
    }
})