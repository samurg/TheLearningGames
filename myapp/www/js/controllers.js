angular.module('app.controllers', ['pascalprecht.translate'])
     
.controller('loginCtrl', ['$scope', '$stateParams', '$cookies', '$http', 'Backand', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies, $http, Backand,$state) {
  $scope.getTeacher = function(email, password) {
    $http.get(Backand.getApiUrl()+'/1/query/data/getTeacher'+'?parameters={ "email" : \"'+email+'\" , "password" : \"'+password+'\"}')
        .then(function (response) {
          if (response.data.length > 0) {
            $cookies.put('teacherId', response.data[0].id);
            $cookies.put('teacherName', response.data[0].name);
            $cookies.put('teacherSurname', response.data[0].surname);
            $cookies.put('teacherAvatar', response.data[0].avatar);
            $state.go('teacherHome');
          } else {
            alert('Wrong credentials');
          }
        });
  }
}])
   
.controller('signUpCtrl', ['$scope', '$stateParams', '$cookies',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies, $http, Backand, $state) {

  $scope.createTeacher = function(name, surname, email, password, avatar) {

    var teacher = {
      "name" : name,
      "surname" : surname,
      "email" : email,
      "password" : password,
      "avatar" : avatar
    }

    $http.post(Backand.getApiUrl()+'/1/objects/'+'teachers', teacher)
      .success(function(response){
        $state.go('login');
      })
  }
}])
   
.controller('teacherHomeCtrl', ['$scope', '$stateParams', '$ionicModal', '$http', 'Backand', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $http, Backand, $cookies) {
    $scope.newClassModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 class="teacherHomeH3">{{ \'NEW_CLASS\' | translate }}</h3>'+
    '<form class="list">'+
      '<label class="item item-input">'+
        '<span class="input-label">{{ \'CLASS_NAME\' | translate }}</span>'+
        '<input type="text" placeholder="" ng-model="name">'+
      "</label>"+
    "</form>"+
    "<div>"+
      '<form class="list">'+
        '<label class="item item-select">'+
          '<span class="input-label">{{ \'IMPORT_PREFERENCES_FROM\' | translate }}</span>'+
          '<select>'+
            '<option>{{ \'NONE\' | translate }}</option>'+
            '<option>{classroom.name}</option>'+
          '</select>'+
        '</label>'+
        '<div class="button-bar">'+
          '<button class="button button-calm  button-block" ng-click="closeModal()">{{ \'CANCEL\' | translate }}</button>'+
          '<button class="button button-positive  button-block" ng-disabled="true"></button>'+
          '<button class="button button-calm  button-block" ng-click="createClassroom(name); closeModal()">{{ \'CREATE\' | translate }}</button>'+
        '</div>'+
      '</form>'+
    '</div>'+
    '</ion-content>'+
    '</ion-modal-view>', {
        scope: $scope,
        animation: 'slide-in-up'
    })

    $scope.showModal = function(){
      $scope.newClassModal.show();  
    }
    
    $scope.closeModal = function(){
        $scope.newClassModal.hide();
    }

    $scope.teacherId = $cookies.get('teacherId');
    $scope.classrooms = [];
    
    $scope.getClassrooms = function() {
      $http.get(Backand.getApiUrl()+'/1/query/data/getClassrooms'+'?parameters={ "teacher" : \"'+$scope.teacherId+'\"}')
        .then(function (response) {
          $scope.classrooms = response.data;
          $scope.$apply();
        });
    }

    $scope.createClassroom = function(name) {

      var classroom = {
        "name" : name,
        "description" : " ",
        "teacher" : $scope.teacherId
      }

      $http.post(Backand.getApiUrl()+'/1/objects/'+'classrooms', classroom)
        .then(function (response) {

        });

      $scope.getClassrooms();
    }

    var classroomId;

    $scope.setClassroomId = function(value) {

      classroomId = value;

    }

    $scope.deleteClassroom = function() {
      $http.delete(Backand.getApiUrl()+'/1/objects/'+'classrooms/'+classroomId)
        .then(function (response) {

        });

      $scope.getClassrooms();

    }

}])
   
.controller('studentHomeCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('studentAchievementsCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('studentBadgesCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('classCtrl', ['$scope', '$stateParams', '$ionicModal', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $cookies) {
    var modalFirst;
    
      $scope.secundaryMenuModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 class="classH3">{{ \'ASSIGN_STUDENT_TO_TEAM\' | translate }}</h3>'+
    '<form class="list">'+
      '<label class="item item-select">'+
        '<span class="input-label">{{ \'SELECT\' | translate }}</span>'+
        '<select></select>'+
      '</label>'+
      '<h3 class="classH3">{{ \'COPY_STUDENT_TO_ANOTHER_CLASS\' | translate }}</h3>'+
      '<label class="item item-select">'+
        '<span class="input-label">{{ \'SELECT\' | translate }}</span>'+
        '<select></select>'+
      '</label>'+
    '</form>'+
    '<div class="button-bar">'+
      '<button class="button button-calm  button-block" ng-click="closeModalSecundary()">{{ \'CANCEL\' | translate }}</button>'+
      '<button class="button button-positive  button-block" ng-disabled="true"></button>'+
      '<button class="button button-calm  button-block" ng-click="closeModalSecundary()">{{ \'ACCEPT\' | translate }}</button>'+
    '</div>'+
  '</ion-content>'+
    '</ion-modal-view>', {
     scope: $scope,
     animation: 'slide-in-up'
 });
 
    $scope.showModalSecundary = function(){
        if ($scope.studentDialogModal.isShown()){
            $scope.studentDialogModal.hide();
            modalFirst = 1;
        }
        if ($scope.newStudentModal.isShown()){
            $scope.newStudentModal.hide();
            modalFirst = 2;
        }
      $scope.secundaryMenuModal.show();  
    }
    
    $scope.closeModalSecundary = function(){
        $scope.secundaryMenuModal.hide();
        if(modalFirst == 1)
            $scope.studentDialogModal.show(); 
        if(modalFirst == 2)
            $scope.newStudentModal.show();
    }
    
    $scope.studentDialogModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 class="studentDialogH3">{student.name}</h3>'+
    '<div class="list-student">'+
      '<div class="divstudentDialog">'+
        '<i class="icon ion-image" class="studentDialogIcon"></i>'+
      '</div>'+
      '<button id="studentDialog-btn001" class="button button-light  button-block button-outline">{{ \'TAKE_PICTURE\' | translate }}</button>'+
      '<button id="studentDialog-btn002" class="button button-light  button-block button-outline">{{ \'VIEW_PROFILE\' | translate }}</button>'+
      '<button ng-click="closeModalStudentDialog()" class="button button-positive  button-block icon ion-arrow-return-left"></button>'+
    '</div>'+
    '<div class="list-student list-elements">'+
      '<ion-list>'+
        '<ion-item class="list-student-dialog">'+
          '<i class="icon ion-clipboard"></i>&nbsp;&nbsp;{{ \'ATTENDANCE\' | translate }}'+
          '<span class="item-note">{??}%</span>'+
          '<ion-option-button class="button-assertive">'+
            '<i class="icon ion-minus-round"></i>'+
          '</ion-option-button>'+
          '<ion-option-button class="button-calm">'+
            '<i class="icon ion-plus-round"></i>'+
          '</ion-option-button>'+
        '</ion-item>'+
        '<ion-item class="list-student-dialog">'+
          '<i class="icon ion-help"></i>&nbsp;&nbsp;??????:'+
          '<ion-option-button class="button-assertive">'+
            '<i class="icon ion-minus-round"></i>'+
          '</ion-option-button>'+
          '<ion-option-button class="button-calm">'+
            '<i class="icon ion-plus-round"></i>'+
          '</ion-option-button>'+
        '</ion-item>'+
        '<ion-item class="list-student-dialog">'+
          '<i class="icon ion-help"></i>&nbsp;&nbsp;??????:'+
          '<ion-option-button class="button-assertive">'+
            '<i class="icon ion-minus-round"></i>'+
          '</ion-option-button>'+
          '<ion-option-button class="button-calm">'+
            '<i class="icon ion-plus-round"></i>'+
          '</ion-option-button>'+
        '</ion-item>'+
        '<ion-item class="list-student-dialog">'+
          '<i class="icon ion-help"></i>&nbsp;&nbsp;??????:'+
          '<ion-option-button class="button-assertive">'+
            '<i class="icon ion-minus-round"></i>'+
          '</ion-option-button>'+
          '<ion-option-button class="button-calm">'+
            '<i class="icon ion-plus-round"></i>'+
          '</ion-option-button>'+
        '</ion-item>'+
      '</ion-list>'+
      '<button ng-click="showModalSecundary()" class="button button-positive  button-block icon ion-android-more-horizontal"></button>'+
    '</div>'+
  '</ion-content>'+
'</ion-modal-view>', {
     scope: $scope,
     animation: 'slide-in-up'
 });
 
    $scope.showModalStudentDialog = function(){
      $scope.studentDialogModal.show();  
    }
    
    $scope.closeModalStudentDialog = function(){
        $scope.studentDialogModal.hide();
    }
    
    $scope.newStudentModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 class="newStudentH3">{{ \'NEW_STUDENT\' | translate }}</h3>'+
    '<div class="list-student list-elements">'+
      '<div style="margin: 0px; line-height: 250px; background-color: rgb(232, 235, 239); text-align: center;">'+
        '<i class="icon ion-image" class="imageNewStudent"></i>'+
      '</div>'+
      '<button id="newStudent-btn003" class="button button-light  button-block button-outline">{{ \'TAKE_PICTURE\' | translate }}</button>'+
      '<form class="list">'+
        '<div class="button-bar">'+
          '<button class="button button-calm  button-block" ng-click="closeModalNewStudentDialog()">{{ \'CANCEL\' | translate }}</button>'+
          '<button class="button button-calm  button-block" ng-click="closeModalNewStudentDialog()">{{ \'GENERATE\' | translate }}</button>'+
        '</div>'+
      '</form>'+
    '</div>'+
    '<div class="list-team list-elements">'+
      '<ion-list>'+
        '<form class="list">'+
          '<label class="item item-input">'+
            '<input type="text" placeholder="{{ \'NAME\' | translate }}">'+
          '</label>'+
          '<label class="item item-input">'+
            '<input type="text" placeholder="{{ \'SURNAME\' | translate }}">'+
          '</label>'+
          '<label class="item item-input">'+
            '<input type="text" placeholder="{{ \'STREET\' | translate }}">'+
          '</label>'+
          '<label class="item item-input">'+
            '<input type="email" placeholder="{{ \'EMAIL\' | translate }}" ng-model="email">'+
          '</label>'+
          '<label class="item item-input">'+
            '<input type="password" placeholder="{{ \'PASSWORD\' | translate }}" ng-model="password" ng-minlenght="3">'+
          '</label>'+
        '</form>'+
      '</ion-list>'+
      '<button class="button button-positive  button-block icon ion-android-more-horizontal" ng-click="showModalSecundary()"></button>'+
    '</div>'+
  '</ion-content>'+
'</ion-modal-view>);', {
    scope: $scope,
    animation: 'slide-in-up'
});
    $scope.showModalNewStudentDialog = function(){
      $scope.newStudentModal.show();  
    }
    
    $scope.closeModalNewStudentDialog = function(){
        $scope.newStudentModal.hide();
    }
    
}])
   
.controller('newClassCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {
}])
   
.controller('attendanceCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('studentDialogCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('teamsCtrl', ['$scope', '$stateParams', '$ionicModal', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $cookies) {
    
    $scope.teamDialogModal = $ionicModal.fromTemplate('<ion-modal-view title="Team Dialog" hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 style="color:#FFFFFF;text-align:center;">{team.name}</h3>'+
    '<div class="list-student">'+
      '<div class="divteamDialog">'+
        '<i class="icon ion-image" class="imageteamDialog"></i>'+
      '</div>'+
      '<button id="teamDialog-btn005" class="button button-light  button-block button-outline">{{ \'CHANGE_AVATAR\' | translate }}</button>'+
      '<button id="teamDialog-btn006" class="button button-light  button-block button-outline" ng-click="showModalEditTeam()">{{ \'EDIT_TEAM\' | translate }}</button>'+
      '<button ng-click="closeModalTeamDialog()" class="button button-positive  button-block icon ion-arrow-return-left"></button>'+
    '</div>'+
    '<div class="list-team">'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
        '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
        '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
      '</ion-list>'+
      '<button ng-click="showModalAddStudent()" class="button button-calm  button-block">{{ \'ADD_STUDENTS\' | translate }}</button>'+
    '</div>'+
  '</ion-content>'+
'</ion-modal-view>', {
    scope: $scope,
    animation: 'slide-in-up'
});
    $scope.showModalTeamDialog = function(){
      $scope.teamDialogModal.show();  
    }
    
    $scope.closeModalTeamDialog = function(){
        $scope.teamDialogModal.hide();
    }
    
    $scope.newTeamDialogModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 class="newTeamDialogH3">New Team</h3>'+
    '<div class="list-student">'+
      '<div class="newTeamDialogDiv">'+
        '<i class="icon ion-image" class="imageNewTeamDialog"></i>'+
      '</div>'+
      '<button id="newTeamDialog-btn007" class="button button-light  button-block button-outline">{{ \'UPLOAD_AVATAR\' | translate }}</button>'+
      '<form class="list">'+
        '<label class="item item-input list-elements">'+
          '<input type="text" placeholder="{{ \'NAME\' | translate }}">'+
        '</label>'+
        '<div class="button-bar">'+
          '<button class="button button-calm  button-block" ng-click="closeModalNewTeamDialog()">{{ \'CANCEL\' | translate }}</button>'+
          '<button class="button button-calm  button-block" ng-click="closeModalNewTeamDialog()">{{ \'ACCEPT\' | translate }}</button>'+
        '</div>'+
      '</form>'+
    '</div>'+
    '<div class="list-team">'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
        '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
        '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
      '</ion-list>'+
    '</div>'+
  '</ion-content>'+
'</ion-modal-view>', {
    scope: $scope,
    animation: 'slide-in-up'
});

    $scope.showModalNewTeamDialog = function(){
      $scope.newTeamDialogModal.show();  
    }
    
    $scope.closeModalNewTeamDialog = function(){
        $scope.newTeamDialogModal.hide();
    }
    
    $scope.addStudentModal = $ionicModal.fromTemplate('<ion-modal-view title="Add Student" hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
    '<h3 class="addStudentH3">Add Students</h3>'+
    '<ion-list>'+
      '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
      '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
      '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
    '</ion-list>'+
    '<button ng-click="closeModalAddStudent()" class="button button-calm  button-block">{{ \'ADD_STUDENTS\' | translate }}</button>'+
  '</ion-content>'+
'</ion-modal-view>', {
    scope: $scope,
    animation: 'slide-in-up'
});
    
    $scope.showModalAddStudent = function(){
      $scope.addStudentModal.show();  
    }
    
    $scope.closeModalAddStudent = function(){
        $scope.addStudentModal.hide();
    }
    
    $scope.editTeamModal = $ionicModal.fromTemplate('<ion-modal-view title="Edit Team" hide-nav-bar="true" class="editTeamBack">'+
  '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
    '<h3 class="editTeamH3">{team.name}</h3>'+
    '<div class="list-student">'+
      '<div class="editTeamDiv">'+
        '<i class="icon ion-image" class="editTeamImage"></i>'+
      '</div>'+
      '<button id="editTeam-btn011" class="button button-light  button-block button-outline">{{ \'UPLOAD_AVATAR\' | translate }}</button>'+
      '<form class="list">'+
        '<label class="item item-input list-elements">'+
          '<input type="text" placeholder="{{ \'NAME\' | translate }}">'+
        '</label>'+
        '<div class="button-bar">'+
          '<button class="button button-calm  button-block" ng-click="closeModalEditTeam()">{{ \'CANCEL\' | translate }}</button>'+
          '<button class="button button-calm  button-block" ng-click="closeModalEditTeam()">{{ \'ACCEPT\' | translate }}</button>'+
        '</div>'+
      '</form>'+
    '</div>'+
    '<div class="list-team">'+
      '<ion-list>'+
        '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
        '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
        '<ion-checkbox class="list-student-team">{student.name}</ion-checkbox>'+
      '</ion-list>'+
    '</div>'+
  '</ion-content>'+
'</ion-modal-view>', {
    scope: $scope,
    animation: 'slide-in-up'
});

    $scope.showModalEditTeam = function(){
      $scope.editTeamModal.show();  
    }
    
    $scope.closeModalEditTeam = function(){
        $scope.editTeamModal.hide();
    }
}])
   
.controller('teamDialogCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('newStudentDialogCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('newTeamCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('rulesCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('teacherProfileCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('teacherSettingsCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('itemsCtrl', ['$scope', '$stateParams', '$ionicModal', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $cookies) {
    
    $scope.newItemModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
   '<h3 class="newItemH3">{{ \'NEW_ITEM\' | translate }}</h3>'+
    '<form class="list list-student">'+
      '<ion-list>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'NAME\' | translate }}</span>'+
          '<input type="text" placeholder="{item.name}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
          '<input type="text" placeholder="{item.description}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'REQUIREMENTS\' | translate }}</span>'+
          '<input type="text" placeholder="{item.requirements}">'+
        '</label>'+
      '</ion-list>'+
    '</form>'+
    '<div class="list-student">'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewItem()">{{ \'ADD_ITEM\' | translate }}</button>'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewItem()">{{ \'CANCEL\' | translate }}</button>'+
    '</div>'+
  '</ion-content>'+
'</ion-modal-view>', {
    scope: $scope,
    animation: 'slide-in-up'
});

    $scope.showModalNewItem = function(){
      $scope.newItemModal.show();  
    }
    
    $scope.closeModalNewItem = function(){
        $scope.newItemModal.hide();
    }
    
}])
   
.controller('addItemCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('achievementsCtrl', ['$scope', '$stateParams', '$ionicModal', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $cookies) {
    
    $scope.newAchievementModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 class="newAchievementH3">{{ \'NEW_ACHIEVEMENT\' | translate }}</h3>'+
    '<form class="list list-student">'+
      '<ion-list>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'NAME\' | translate }} </span>'+
          '<input type="text" placeholder="{achievement.name}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
          '<input type="text" placeholder="{achievement.description}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'REQUIREMENTS\' | translate }}</span>'+
          '<input type="text" placeholder="{achievement.requirements}">'+
        '</label>'+
      '</ion-list>'+
    '</form>'+
    '<div class="list-student">'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewAchievement()">{{ \'ADD_ACHIEVEMENT\' | translate }}</button>'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewAchievement()">{{ \'CANCEL\' | translate }}</button>'+
    '</div>'+
  '</ion-content>'+
'</ion-modal-view>', {
    scope: $scope,
    animation: 'slide-in-up'
});

    $scope.showModalNewAchievement = function(){
      $scope.newAchievementModal.show();  
    }
    
    $scope.closeModalNewAchievement = function(){
        $scope.newAchievementModal.hide();
    }

}])
   
.controller('addAchievementCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('badgesCtrl', ['$scope', '$stateParams', '$ionicModal', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $cookies) {
    
    $scope.newBadgeModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 class="newBadgeH3">{{ \'NEW_BADGE\' | translate }}</h3>'+
    '<form class="list list-student">'+
      '<ion-list>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'NAME\' | translate }} </span>'+
          '<input type="text" placeholder="{badge.name}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
          '<input type="text" placeholder="{badge.description}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'REQUIREMENTS\' | translate }}</span>'+
          '<input type="text" placeholder="{badge.requirements}">'+
        '</label>'+
      '</ion-list>'+
    '</form>'+
    '<div class="list-student">'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewBadge()">{{ \'ADD_BADGE\' | translate }}</button>'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewBadge()">{{ \'CANCEL\' | translate }}</button>'+
    '</div>'+
  '</ion-content>'+
'</ion-modal-view>', {
    scope: $scope,
    animation: 'slide-in-up'
});

    $scope.showModalNewBadge = function(){
      $scope.newBadgeModal.show();  
    }
    
    $scope.closeModalNewBadge = function(){
        $scope.newBadgeModal.hide();
    }

}])
   
.controller('addBadgeCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('missionsCtrl', ['$scope', '$stateParams', '$ionicModal', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $cookies) {
    
    $scope.newMissionModal = $ionicModal.fromTemplate('<ion-modal-view title="New Mission" hide-nav-bar="true" class="newMissionBack">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<form class="list">'+
      '<h3 class="newMissionH3">{{ \'NEW_MISSION\' | translate }}</h3>'+
      '<ion-list>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'NAME\' | translate }} </span>'+
          '<input type="text" placeholder="{{ \'NAME\' | translate }}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'DESCRIPTION\' | translate }}</span>'+
          '<input type="text" placeholder="{{ \'DESCRIPTION\' | translate }}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'PHASES\' | translate }}</span>'+
          '<input type="text" placeholder="{{ \'NUMBER_OF_PHASES\' | translate }}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'SCORES\' | translate }}</span>'+
          '<input type="text" placeholder="{{ \'SCORES_DESCRIPTION\' | translate }}">'+
        '</label>'+
      '</ion-list>'+
    '</form>'+
    '<div class="button-bar">'+
      '<button ng-click="closeModalNewMission()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
      '<button ng-disabled="true" class="button button-positive  button-block"></button>'+
      '<button ng-click="closeModalNewMission()" class="button button-calm  button-block">{{ \'ACCEPT\' | translate }}</button>'+
    '</div>'+
  '</ion-content>'+
'</ion-modal-view>',  {
    scope: $scope,
    animation: 'slide-in-up'
});

    $scope.showModalNewMission = function(){
      $scope.newMissionModal.show();  
    }
    
    $scope.closeModalNewMission = function(){
        $scope.newMissionModal.hide();
    }

}])
   
.controller('newMissionCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('editTeamCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('addStudentCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])
   
.controller('secundaryMenuCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {


}])

.controller('changeLanguageCtrl', ['$translate', '$scope', '$cookies', 
  function ($translate, $scope, $cookies) {
 
      $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
      };
}])
 