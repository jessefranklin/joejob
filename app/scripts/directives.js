'use strict';

app.directive('userRating', function () {
		return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };

        scope.$watch('ratingValue', function(oldVal, newVal) {
          if (newVal) {
            updateStars();
          }
        });
      }
    };
	})

.constant('uiDateConfig', {})

.directive('uiDate', ['uiDateConfig', function (uiDateConfig) {

  var options;
  options = {};
  angular.extend(options, uiDateConfig);
  return {
    require:'?ngModel',
    link:function (scope, element, attrs, controller) {
      var getOptions = function () {
        return angular.extend({}, uiDateConfig, scope.$eval(attrs.uiDate));
      };
      var initDateWidget = function () {
        var showing = false;
        var opts = getOptions();

        // If we have a controller (i.e. ngModelController) then wire it up
        if (controller) {

          // Set the view value in a $apply block when users selects
          // (calling directive user's function too if provided)
          var _onSelect = opts.onSelect || angular.noop;
          opts.onSelect = function (value, picker) {
            scope.$apply(function() {
              showing = true;
              controller.$setViewValue(element.datepicker("getDate"));
              _onSelect(value, picker);
              element.blur();
            });
          };
          opts.beforeShow = function() {
            showing = true;
          };
          opts.onClose = function(value, picker) {
            showing = false;
          };
          element.on('blur', function() {
            if ( !showing ) {
              scope.$apply(function() {
                element.datepicker("setDate", element.datepicker("getDate"));
                controller.$setViewValue(element.datepicker("getDate"));
              });
            }
          });

          // Update the date picker when the model changes
          controller.$render = function () {
            var date = controller.$viewValue;
            if ( angular.isDefined(date) && date !== null && !angular.isDate(date) ) {
              throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
            }
            element.datepicker("setDate", date);
          };
        }
        // If we don't destroy the old one it doesn't update properly when the config changes
        element.datepicker('destroy');
        // Create the new datepicker widget
        element.datepicker(opts);
        if ( controller ) {
          // Force a render to override whatever is in the input text box
          controller.$render();
        }
      };
      // Watch for changes to the directives options
      scope.$watch(getOptions, initDateWidget, true);
    }
  };
}
])

.constant('uiDateFormatConfig', '')

.directive('uiDateFormat', ['uiDateFormatConfig', function(uiDateFormatConfig) {
  var directive = {
    require:'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      var dateFormat = attrs.uiDateFormat || uiDateFormatConfig;
      if ( dateFormat ) {
        // Use the datepicker with the attribute value as the dateFormat string to convert to and from a string
        modelCtrl.$formatters.push(function(value) {
          if (angular.isString(value) ) {
            return jQuery.datepicker.parseDate(dateFormat, value);
          }
          return null;
        });
        modelCtrl.$parsers.push(function(value){
          if (value) {
            return jQuery.datepicker.formatDate(dateFormat, value);
          }
          return null;
        });
      } else {
        // Default to ISO formatting
        modelCtrl.$formatters.push(function(value) {
          if (angular.isString(value) ) {
            return new Date(value);
          }
          return null;
        });
        modelCtrl.$parsers.push(function(value){
          if (value) {
            return value.toISOString();
          }
          return null;
        });
      }
    }
  };
  return directive;
}]);