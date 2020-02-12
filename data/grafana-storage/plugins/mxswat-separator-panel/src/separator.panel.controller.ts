///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import { PanelCtrl } from 'app/plugins/sdk';

class TablePanelCtrl extends PanelCtrl {
  static templateUrl = 'public/plugins/mxswat-separator-panel/module.html';

  /** @ngInject */
  constructor($scope, $injector) {
    super($scope, $injector);
  }

  link(scope, elem, attrs, ctrl) {
    elem[0].classList.add('opacity-remover');
  }

}

export { TablePanelCtrl, TablePanelCtrl as PanelCtrl };
