var app = angular.module('slides', []);

app.controller('TabsController', function () {

  this.tabs = [];

  this.addTab = function (tab) {
    if (this.tabs.length === 0) {
      this.selectTab(tab);
    }
    this.tabs.push(tab);
  };

  this.selectTab = function (tab) {
    this.tabs.forEach(function (tab) {
      tab.active = false;
    });
    tab.active = true;
  };
});

app.directive('tabs', function () {
    return {
      scope: {},
      restrict: 'E',
      transclude: true,
      replace: true,
      controller: 'TabsController',
      controllerAs: 'ctrl',
      bindToController: true,
      template: [
        '<div class="tabs">',
          '<ul class="tabs-list">',
            '<li ng-repeat="tab in ctrl.tabs" ng-class="{ active: tab.active }">',
              '<button ng-click="ctrl.selectTab(tab)">',
                '{{tab.tabTitle}}',
              '</button>',
            '</li>',
          '</ul>',
          '<div ng-transclude>',
          '</div>',
        '</div>'
      ].join('')
    };
});

app.directive('tab', function () {
    return {
      scope: {
        tabTitle: '@'
      },
      restrict: 'E',
      replace: true,
      transclude: true,
      require: '^tabs',
      link: function (scope, element, attrs, TabsController) {
        TabsController.addTab(scope);
      },
      template: [
        '<div class="tab" ng-class="{ active: active }">',
          '<div class="tab-container" ng-transclude>',
          '</div>',
        '</div>'
      ].join('')
    }
});

