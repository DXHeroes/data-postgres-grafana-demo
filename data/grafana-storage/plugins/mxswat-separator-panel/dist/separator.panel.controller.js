System.register(["app/plugins/sdk"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var sdk_1, TablePanelCtrl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }
        ],
        execute: function () {
            TablePanelCtrl = (function (_super) {
                __extends(TablePanelCtrl, _super);
                function TablePanelCtrl($scope, $injector) {
                    return _super.call(this, $scope, $injector) || this;
                }
                TablePanelCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    elem[0].classList.add('opacity-remover');
                };
                TablePanelCtrl.templateUrl = 'public/plugins/mxswat-separator-panel/module.html';
                return TablePanelCtrl;
            }(sdk_1.PanelCtrl));
            exports_1("TablePanelCtrl", TablePanelCtrl);
            exports_1("PanelCtrl", TablePanelCtrl);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VwYXJhdG9yLnBhbmVsLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc2VwYXJhdG9yLnBhbmVsLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFJNkIsa0NBQVM7Z0JBSXBDLHdCQUFZLE1BQU0sRUFBRSxTQUFTOzJCQUMzQixrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDO2dCQUMxQixDQUFDO2dCQUVELDZCQUFJLEdBQUosVUFBSyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJO29CQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2dCQVRNLDBCQUFXLEdBQUcsbURBQW1ELENBQUM7Z0JBVzNFLHFCQUFDO2FBQUEsQUFaRCxDQUE2QixlQUFTOzs7UUFldEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgeyBQYW5lbEN0cmwgfSBmcm9tICdhcHAvcGx1Z2lucy9zZGsnO1xyXG5cclxuY2xhc3MgVGFibGVQYW5lbEN0cmwgZXh0ZW5kcyBQYW5lbEN0cmwge1xyXG4gIHN0YXRpYyB0ZW1wbGF0ZVVybCA9ICdwdWJsaWMvcGx1Z2lucy9teHN3YXQtc2VwYXJhdG9yLXBhbmVsL21vZHVsZS5odG1sJztcclxuXHJcbiAgLyoqIEBuZ0luamVjdCAqL1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgfVxyXG5cclxuICBsaW5rKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xyXG4gICAgZWxlbVswXS5jbGFzc0xpc3QuYWRkKCdvcGFjaXR5LXJlbW92ZXInKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBUYWJsZVBhbmVsQ3RybCwgVGFibGVQYW5lbEN0cmwgYXMgUGFuZWxDdHJsIH07XHJcbiJdfQ==