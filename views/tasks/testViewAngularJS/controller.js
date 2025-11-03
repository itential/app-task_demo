const variables = {
  incoming: {
    header: null,
    body: null,
    btn_success: null,
    btn_failure: null,
  },
  outgoing: {
  },
};

const finish_state = 'default';


function TaskController(variables, finish_state, $scope, $mdDialog) {

  $scope.body = variables.incoming.body;
  $scope.header = variables.incoming.header;

  $scope.btn_failure = variables.incoming.btn_failure;
  $scope.btn_success = variables.incoming.btn_success;
  if (!$scope.btn_success) {
    $scope.btn_success = 'Success';
  }

  $scope.cancel = function () {
    $mdDialog.cancel();
  };

  $scope.reject = function () {
    finish_state = 'failure';
    $mdDialog.hide({
      finish_state: finish_state,
      variables: variables.outgoing,
    });
  };

  $scope.accept = function () {
    finish_state = 'success';
    $mdDialog.hide({
      finish_state: finish_state,
      variables: variables.outgoing,
    });
  };
}

module.exports = function () {
  this.variables = variables;
  this.finish_state = finish_state;
  this.TaskController = TaskController;
};
