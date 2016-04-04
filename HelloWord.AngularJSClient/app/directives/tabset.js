app.directive('tabset', function () {
    var controller = ['$scope', '$sce', 'tabStorageService', function ($scope, $sce, tabStorageService) {
        var self = this;

        function saveDataToService() {
            tabStorageService.tabs = self.tabs;
            tabStorageService.newTabId = self.newTabId;
            tabStorageService.selectedTab = self.selectedTab;
        };

        $scope.loadFromService = function () {
            self.tabs = tabStorageService.tabs === undefined ? [] : tabStorageService.tabs;
            self.newTabId = tabStorageService.newTabId === undefined ? 1 : tabStorageService.newTabId;
            self.selectedTab = tabStorageService.selectedTab === undefined ? undefined : tabStorageService.selectedTab;
        };

        $scope.$on('tabIdChanged', function (event, tabId) {
            var found = undefined;
            for (var i = 0, len = self.tabs.length; i < len; i++) {
                if (self.tabs[i].id === tabId) {
                    found = self.tabs[i];
                    break;
                }
            }
            if (found) {
                self.selectedTab = found;
            }
            else {
                self.tabAdd({
                    id: tabId
                })
            }
        });

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

        function setNewTabId(newTab) {
            if (newTab.id === self.newTabId) {
                self.newTabId++;
            }
        }

        self.tabAdd = function (tab) {
            tab = tab === undefined ? {} : tab;
            tab.content = tab.content === undefined ? 'Tab content ' + self.newTabId : tab.content;
            tab.id = tab.id === undefined ? self.newTabId : tab.id;
            tab.title = tab.title === undefined ? 'Tab ' + self.newTabId : tab.title;
            self.tabs.push(tab);
            setSelectedTab(tab, true);
            setNewTabId(tab);
            saveDataToService();
        };

        self.tabClose = function (selectedTab) {
            setSelectedTab(selectedTab, false);
            var index = self.tabs.indexOf(selectedTab);
            self.tabs.splice(index, 1);
            saveDataToService();
        };

        self.selectionChanged = function (selectedTab) {
            self.selectedTab = selectedTab;
        };

        self.trustAsHtml = function (tabContent) {
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
        controller: controller,
        link: function (scope, elem, attr) {
            scope.loadFromService();
        }
    };
});

app.directive('tab', function () {
    var controller = ['tabStorageService','$scope', function(tabStorageService, $scope){
        $scope.tabAdd(tab, tabsetCtrl)
        {
            if(tabStorageService.tabs !== undefined)
            {
                tabsetCtrl.tabAdd(tab);
            }
        }
    }];
    return {
        restrict: 'E',
        require: '^tabset',
        replace: true,
        transclude: true,
        templateUrl: './partials/tab.html',
        scope: {},
        link: function (scope, elem, attr, tabsetCtrl) {
            scope.content = elem.html();
            scope.tabAdd(scope, tabsetCtrl);
        },
        controller : controller
    }
})