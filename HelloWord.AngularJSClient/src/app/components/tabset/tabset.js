(function () {
    'use strict';


    app.directive('tabset', function () {
        var controller = ['$routeParams', '$scope', '$sce', 'tabStore', function ($routeParams, $scope, $sce, tabStore) {
            var self = this;

            function saveDataToService() {
                tabStore.tabs = self.tabs;
                tabStore.newTabId = self.newTabId;
                tabStore.selectedTab = self.selectedTab;
            };

            $scope.loadFromService = function () {
                self.tabs = tabStore.tabs;
                self.newTabId = tabStore.newTabId;
                self.selectedTab = tabStore.selectedTab;
            };

            $scope.idChanged = function () {
                var tabId = parseInt($routeParams.tabId);
                if (!isNaN(tabId)) {
                    var found = undefined;
                    for (var i = 0, len = self.tabs.length; i < len; i++) {
                        if (self.tabs[i].id === tabId) {
                            found = self.tabs[i];
                            break;
                        }
                    }
                    if (found) {
                        self.selectedTab = found;
                    } else {
                        self.tabAdd({
                            id: tabId
                        });
                    }
                }
            };

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
                self.newTabId = Math.max(newTab.id, self.newTabId) + 1;
            }

            self.tabAdd = function (tab) {
                tab = tab === undefined ? {} : tab;
                tab.id = tab.id === undefined ? self.newTabId : tab.id;
                tab.title = tab.title === undefined ? 'Tab ' + tab.id : tab.title;
                tab.content = tab.content === undefined ? 'Tab content ' + tab.id : tab.content;
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
            templateUrl: 'src/app/components/tabset/tabset.html',
            bindToController: true,
            controllerAs: 'tabset',
            scope: {},
            controller: controller,
            link: function (scope, elem, attr) {
                scope.loadFromService();
                scope.idChanged();
            }
        };
    });
}());