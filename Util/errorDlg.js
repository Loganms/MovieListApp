// Declare a service that allows an error message.
app.service("errorDlg", 
["$uibModal", "$rootScope", 
function(uibM, root) {
   return {
      show: function(errObj) {
         root.errObj = errObj.data ? errObj.data : errObj;

         return uibM.open({
            templateUrl: 'Util/errorDlg.template.html',
            scope: root,
            size: 'sm'
         }).result
         .then(function () {
            delete root.errObj;
         });
      }
   };
}]);
