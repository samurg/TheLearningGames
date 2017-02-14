angular.module('app.controllers', ['pascalprecht.translate'])
     
.controller('loginCtrl', ['$scope', '$stateParams', '$cookies', '$http', 'Backand', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies, $http, Backand,$state) {
	
	$scope.clearForm1 = function(){
    var form = document.getElementById("login-form1");
    form.reset();
  }

  $scope.clearForm2 = function(){
    var form = document.getElementById("login-form2");
    form.reset();
  }

  $scope.loginType=false;
  $scope.loginType2=false;

  $scope.teacherForm = function(){
      $scope.loginType=true;
      $scope.loginType2=false;
      $scope.clearForm2();
  }
  $scope.studentForm = function(){
      $scope.loginType=false;
      $scope.loginType2=true;
      $scope.clearForm1();
  }

  $scope.getTeacher = function(email, password) {
    $http.get(Backand.getApiUrl()+'/1/query/data/getTeacher'+'?parameters={ "email" : \"'+CryptoJS.SHA256(email).toString()+'\" , "password" : \"'+CryptoJS.SHA256(password).toString()+'\"}')
        .then(function (response) {
          if (response.data.length > 0) {
            $cookies.put('teacherId', response.data[0].id);
            $cookies.put('teacherName', CryptoJS.AES.decrypt(response.data[0].name, email).toString(CryptoJS.enc.Utf8));
            $cookies.put('teacherSurname', CryptoJS.AES.decrypt(response.data[0].surname, email).toString(CryptoJS.enc.Utf8));
            $cookies.put('teacherAvatar', response.data[0].avatar);
            $cookies.put('teacherEmail', email);
            $cookies.put('teacherPassword', password);
            $scope.teacherId = $cookies.get('teacherId');
            $state.go('teacherHome', {teacherId: $scope.teacherId});
          } else {
            alert('Wrong credentials');
          }
        });
  }


  /*
    This function returns the student's data when it is logged, 
    decrypts personal data, saves personal data in cookies 
    and goes to studentHome.
  */
  $scope.getStudent = function(hashCode) {
    $http.get(Backand.getApiUrl()+'/1/query/data/getStudentData'+'?parameters={ "hashCode" : \"'+hashCode+'\"}')
        .then(function (response) {
          if (response.data.length > 0) {
            $cookies.put('studentId', response.data[0].id);
            $cookies.put('studentName', CryptoJS.AES.decrypt(response.data[0].name, hashCode).toString(CryptoJS.enc.Utf8));
            $cookies.put('studentSurname', CryptoJS.AES.decrypt(response.data[0].surname, hashCode).toString(CryptoJS.enc.Utf8));
            $cookies.put('studentAvatar', response.data[0].avatar);
            $scope.studentId = $cookies.get('studentId');
            $state.go('studentHome', {studentId: $scope.studentId});
          } else {
            alert('Wrong credentials');
          }
        });
  }

}])
   
.controller('signUpCtrl', ['$scope', '$stateParams', '$cookies', '$http', 'Backand', '$state',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies, $http, Backand, $state) {

	$scope.clearForm = function(){
    var form = document.getElementById("signUp-form2");
    form.reset();
  }

  $scope.checkTeacherEmail = function(name, surname, email, password, avatar) {
    $http.get(Backand.getApiUrl()+'/1/query/data/checkTeacherEmail'+'?parameters={ "email" : \"'+CryptoJS.SHA256(email).toString()+'\"}')
        .success(function (response) {
          if (response.length > 0) {
            $scope.permission = false;
            alert('Email already used');
          } else {
            $scope.permission = true;
            $scope.createTeacher(name, surname, email, password, avatar);
          }
        });
  }

  $scope.createTeacher = function(name, surname, email, password, avatar) {

    if (avatar == null) {
      avatar = 'https://easyeda.com/assets/static/images/avatar-default.png';
    }

    var teacher = {
      "name" : CryptoJS.AES.encrypt(name,email).toString(),
      "surname" : CryptoJS.AES.encrypt(surname,email).toString(),
      "email" : CryptoJS.SHA256(email).toString(),
      "password" : CryptoJS.SHA256(password).toString(),
      "avatar" : avatar
    }

    $http.post(Backand.getApiUrl()+'/1/objects/'+'teachers', teacher)
      .success(function(response){
        $state.go('login');
      })
    
  }

}])
   
.controller('teacherHomeCtrl', ['$scope', '$stateParams', '$ionicModal', '$http', 'Backand', '$cookies',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $http, Backand, $cookies) {

    $scope.clearForm = function(){
      var form = document.getElementById("dataClassForm");
      form.reset();
      document.getElementById("selectClass").selectedIndex = 0;
    }

    $scope.newClassModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 style="color:#FFFFFF;text-align:center;">{{ \'NEW_CLASS\' | translate }}</h3>'+
    '<form id="dataClassForm" class="list">'+
      '<label class="item item-input">'+
        '<span class="input-label">{{ \'CLASS_NAME\' | translate }}</span>'+
        '<input type="text" placeholder="" ng-model="name">'+
      "</label>"+
    "</form>"+
    "<div>"+
      '<form class="list">'+
        '<label class="item item-select">'+
          '<span class="input-label">{{ \'IMPORT_PREFERENCES_FROM\' | translate }}</span>'+
          '<select id="selectClass">'+
            '<option>{{ \'NONE\' | translate }}</option>'+
            '<option>{classroom.name}</option>'+
          '</select>'+
        '</label>'+
        '<div class="button-bar">'+
          '<button class="button button-calm  button-block" ng-click="closeModal() ; clearForm()">{{ \'CANCEL\' | translate }}</button>'+
          '<button class="button button-positive  button-block" ng-disabled="true"></button>'+
          '<button class="button button-calm  button-block" ng-click="createClassroom(name) ; closeModal() ; clearForm()">{{ \'CREATE\' | translate }}</button>'+
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
          $cookies.put('classrooms', response.data);
        });
    }

    $scope.createClassroom = function(name) {

      var classroom = {
        "name" : name,
        "description" : " ",
        "teacher" : $scope.teacherId
      }

      $http.post(Backand.getApiUrl()+'/1/objects/'+'classrooms', classroom)
        .success(function(response){
          $scope.getClassrooms();
        })
    }

    $scope.classroomId;

    $scope.setClassroomId = function(value) {
      $scope.classroomId = value;
      $cookies.put('classroomId', value);
    }

    $scope.setClassroomName = function(value) {
      $cookies.put('classroomName', value);
    }

    $scope.deleteClassroom = function() {
      $http.delete(Backand.getApiUrl()+'/1/objects/'+'classrooms/' + $scope.classroomId)
        .success(function(response){
          $scope.getClassrooms()
        })
    }

}])
   
.controller('studentHomeCtrl', ['$scope', '$stateParams', '$cookies', '$http', 'Backand',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies, $http, Backand) {

  $scope.studentId = $cookies.get('studentId');
  $scope.studentAvatar = $cookies.get('studentAvatar');
  $scope.studentName = $cookies.get('studentName');
  $scope.studentSurname = $cookies.get('studentSurname');

  $scope.getStudentData = function(){}

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
   
.controller('classCtrl', ['$scope', '$stateParams', '$ionicModal', '$cookies', '$http', 'Backand', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicModal, $cookies, $http, Backand) {
    var modalFirst;
    
    $scope.clearFormModal = function(){
      var selectTeam = document.getElementById("selectTeam").selectedIndex = 0;
      var selectCopy = document.getElementById("selectCopy").selectedIndex = 0;
    }

      $scope.secundaryMenuModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 style="color:#FFFFFF;text-align:center;">{{ \'ASSIGN_STUDENT_TO_TEAM\' | translate }}</h3>'+
    '<form class="list">'+
      '<label class="item item-select">'+
        '<span class="input-label">{{ \'SELECT\' | translate }}</span>'+
        '<select id="selectTeam">'+
            '<option>{{ \'NONE\' | translate }}</option>'+
        '</select>'+
      '</label>'+
      '<h3 style="color:#FFFFFF;text-align:center;">{{ \'COPY_STUDENT_TO_ANOTHER_CLASS\' | translate }}</h3>'+
      '<label class="item item-select">'+
        '<span class="input-label">{{ \'SELECT\' | translate }}</span>'+
        '<select id="selectCopy">'+
            '<option>{{ \'NONE\' | translate }}</option>'+
            '<option>{classroom.name}</option>'+
        '</select>'+
      '</label>'+
    '</form>'+
    '<div class="button-bar">'+
      '<button class="button button-calm  button-block" ng-click="closeModalSecundary() ; clearFormModal()">{{ \'CANCEL\' | translate }}</button>'+
      '<button class="button button-positive  button-block" ng-disabled="true"></button>'+
      '<button class="button button-calm  button-block" ng-click="closeModalSecundary() ; clearFormModal()">{{ \'ACCEPT\' | translate }}</button>'+
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
    '<h2 style="color:#FFFFFF;text-align:center;">{{studentName}} {{studentSurname}}</h2>'+
    '<h3 style="color:#FFFFFF;text-align:center;">{{studentHashCode}}</h3>'+
    '<div class="list-student">'+
      '<div style="margin: 0px; line-height: 250px; background-color: rgb(232, 235, 239); text-align: center;">'+
        '<i class="icon ion-image" style="font-size: 64px; color: rgb(136, 136, 136); vertical-align: middle;"></i>'+
      '</div>'+
      '<button style="font-weight:500;" class="button button-light  button-block button-outline">{{ \'TAKE_PICTURE\' | translate }}</button>'+
      '<button style="font-weight:500;" class="button button-light  button-block button-outline">{{ \'VIEW_PROFILE\' | translate }}</button>'+
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

    $scope.clearFormStudent = function(){
      var form = document.getElementById("nameStudentForm");
      form.reset();
    }
    
    $scope.newStudentModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" class="fondo" >'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 style="color:#FFFFFF;text-align:center;">{{ \'NEW_STUDENT\' | translate }}</h3>'+
    '<div class="list-student list-elements">'+
      '<div style="margin: 0px; line-height: 250px; background-color: rgb(232, 235, 239); text-align: center;">'+
        '<i class="icon ion-image" style="font-size: 64px; color: rgb(136, 136, 136); vertical-align: middle;"></i>'+
      '</div>'+
      '<button style="font-weight:500;" class="button button-light  button-block button-outline">{{ \'TAKE_PICTURE\' | translate }}</button>'+
      '<form class="list">'+
        '<div class="button-bar">'+
          '<button class="button button-calm  button-block" ng-click="closeModalNewStudentDialog() ; clearFormStudent()">{{ \'CANCEL\' | translate }}</button>'+
          '<button class="button button-calm  button-block" ng-click="createStudent(name, surname) ; closeModalNewStudentDialog() ; clearFormStudent()">{{ \'GENERATE\' | translate }}</button>'+
        '</div>'+
      '</form>'+
    '</div>'+
    '<div class="list-team list-elements">'+
      '<ion-list>'+
        '<form id="nameStudentForm" class="list">'+
          '<label class="item item-input">'+
            '<input type="text" ng-model="name" placeholder="{{ \'NAME\' | translate }}">'+
          '</label>'+
          '<label class="item item-input">'+
            '<input type="text" ng-model="surname" placeholder="{{ \'SURNAME\' | translate }}">'+
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

    $scope.classrooms = $cookies.get('classrooms');

    $scope.classroomName = $cookies.get('classroomName');

    $scope.classroomId = $cookies.get('classroomId');
    $scope.students = [];
    
    $scope.getStudents = function() {
      $http.get(Backand.getApiUrl()+'/1/query/data/getStudents'+'?parameters={ "classroomId" : \"'+$scope.classroomId+'\"}')
        .then(function (response) {
          $scope.students = response.data;
        });
    }

    $scope.createStudent = function(name, surname) {
      var a = CryptoJS.SHA1($scope.studentName + $scope.classroomId + Date.now().toString()).toString();
      var hash = a.substr(0, 10).toUpperCase();

      var teacherStudent = { 
        "name" : name,
        "surname" : surname,
        "classroom" : $scope.classroomId,
        "hashCode" : hash,
        "avatar" : 'https://easyeda.com/assets/static/images/avatar-default.png'
      }

      var student = {
        "name" : CryptoJS.AES.encrypt(name,hash).toString(),
        "surname": CryptoJS.AES.encrypt(surname,hash).toString(),
        "hashCode" : hash,
        "avatar" : 'https://easyeda.com/assets/static/images/avatar-default.png'
      }

      $http.post(Backand.getApiUrl()+'/1/objects/'+'teacherStudents', teacherStudent)
        .success(function(response){
          $scope.getStudents();
      })

      $http.post(Backand.getApiUrl()+'/1/objects/'+'students', student)
        .success(function(response){
      })

    }

    $scope.studentId;
    $scope.studentName;

    $scope.setStudent = function(value) {
      $scope.studentId = value.id;
      $scope.studentHashCode = value.hashCode;
      $cookies.put('studentId', value.id);
      $cookies.put('studentHashCode', value.hashCode);
    }

    $scope.setStudentName = function(name, surname, hashCode) {
      $scope.studentName = name;
      $scope.studentSurname = surname;
      $scope.studentHashCode = hashCode;
      $cookies.put('studentName', name);
      $cookies.put('studentSurname', surname);
      $cookies.put('studentHashCode', hashCode);
    }

    $scope.deleteStudent = function() {
      $http.delete(Backand.getApiUrl()+'/1/objects/'+'teacherStudents/'+$scope.studentId)
        .success(function(response){
          $scope.getStudents();
        })

      $http.get(Backand.getApiUrl()+'/1/query/data/getStudentsByHashCode'+'?parameters={ "hashCode" : \"'+$scope.studentHashCode+'\"}')
        .then(function (response) {
          $scope.studentForDelete = response.data[0].id;

          $http.delete(Backand.getApiUrl()+'/1/objects/'+'students/'+$scope.studentForDelete)
            .success(function(response){
          
          })
        });
    }
    
}])
   
.controller('newClassCtrl', ['$scope', '$stateParams', '$cookies', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies) {
}])
   
.controller('attendanceCtrl', ['$scope', '$stateParams', '$cookies', '$http', 'Backand',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies, $http, Backand) {


  $scope.classroomName = $cookies.get('classroomName');
  $scope.classroomId = $cookies.get('classroomId');
  $scope.studentsAttendance = [];
    
    $scope.getStudentsAttendance = function() {
      $http.get(Backand.getApiUrl()+'/1/query/data/getStudents'+'?parameters={ "classroomId" : \"'+$scope.classroomId+'\"}')
        .then(function (response) {
          $scope.studentsAttendance = response.data;
          $cookies.put('studentsAttendance',response.data);
        });
    }

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
      '<div style="margin: 0px; line-height: 250px; background-color: rgb(232, 235, 239); text-align: center;">'+
        '<i class="icon ion-image" style="font-size: 64px; color: rgb(136, 136, 136); vertical-align: middle;"></i>'+
      '</div>'+
      '<button style="font-weight:500;" class="button button-light  button-block button-outline">{{ \'CHANGE_AVATAR\' | translate }}</button>'+
      '<button style="font-weight:500;" class="button button-light  button-block button-outline" ng-click="showModalEditTeam()">{{ \'EDIT_TEAM\' | translate }}</button>'+
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

    $scope.clearFormNewTeam = function(){
      var form = document.getElementById("teamNameForm");
      form.reset();
    }
    
    $scope.newTeamDialogModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 style="color:#FFFFFF;text-align:center;">New Team</h3>'+
    '<div class="list-student">'+
      '<div style="margin: 0px; line-height: 250px; background-color: rgb(232, 235, 239); text-align: center;">'+
        '<i class="icon ion-image" style="font-size: 64px; color: rgb(136, 136, 136); vertical-align: middle;"></i>'+
      '</div>'+
      '<button style="font-weight:500;" class="button button-light  button-block button-outline">{{ \'UPLOAD_AVATAR\' | translate }}</button>'+
      '<form id="teamNameForm" class="list">'+
        '<label class="item item-input list-elements">'+
          '<input type="text" placeholder="{{ \'NAME\' | translate }}">'+
        '</label>'+
        '<div class="button-bar">'+
          '<button class="button button-calm  button-block" ng-click="closeModalNewTeamDialog() ; clearFormNewTeam()">{{ \'CANCEL\' | translate }}</button>'+
          '<button class="button button-calm  button-block" ng-click="closeModalNewTeamDialog() ; clearFormNewTeam()">{{ \'ACCEPT\' | translate }}</button>'+
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
    '<h3 style="color:#FFFFFF;text-align:center;">Add Students</h3>'+
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

    $scope.clearFormEditTeam = function(){
      var form = document.getElementById("teamNameForm");
      form.reset();
    }
    
    $scope.editTeamModal = $ionicModal.fromTemplate('<ion-modal-view title="Edit Team" hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="true" class="manual-ios-statusbar-padding">'+
    '<h3 style="color:#FFFFFF;text-align:center;">{team.name}</h3>'+
    '<div class="list-student">'+
      '<div style="margin: 0px; line-height: 250px; background-color: rgb(232, 235, 239); text-align: center;">'+
        '<i class="icon ion-image" style="font-size: 64px; color: rgb(136, 136, 136); vertical-align: middle;"></i>'+
      '</div>'+
      '<button style="font-weight:500;" class="button button-light  button-block button-outline">{{ \'UPLOAD_AVATAR\' | translate }}</button>'+
      '<form id="teamNameForm" class="list">'+
        '<label class="item item-input list-elements">'+
          '<input type="text" placeholder="{{ \'NAME\' | translate }}">'+
        '</label>'+
        '<div class="button-bar">'+
          '<button class="button button-calm  button-block" ng-click="closeModalEditTeam() ; clearFormEditTeam()">{{ \'CANCEL\' | translate }}</button>'+
          '<button class="button button-calm  button-block" ng-click="closeModalEditTeam() ; clearFormEditTeam()">{{ \'ACCEPT\' | translate }}</button>'+
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
   
.controller('teacherProfileCtrl', ['$scope', '$stateParams', '$cookies', '$http', 'Backand', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cookies, $http, Backand, $state) {

  $scope.initData = function(){
    $scope.teacherId = $cookies.get('teacherId');
    $scope.teacherAvatar = $cookies.get('teacherAvatar');
    $scope.teacherName = $cookies.get('teacherName');
    $scope.teacherSurname = $cookies.get('teacherSurname');
    $scope.teacherEmail = $cookies.get('teacherEmail');
    $scope.teacherPassword = $cookies.get('teacherPassword');

    //Getting all the inputs for change their placeholders
    var input1 = document.getElementById ("inputName");
    input1.placeholder = $scope.teacherName;

    var input2 = document.getElementById ("inputSurname");
    input2.placeholder = $scope.teacherSurname;

    var input3 = document.getElementById ("inputEmail");
    input3.placeholder = $scope.teacherEmail;

    var input4 = document.getElementById ("inputPassword");
    input4.placeholder = $scope.teacherPassword;

    var input5 = document.getElementById ("inputRepeatpassword");
    input5.placeholder = $scope.teacherPassword;

    var input6 = document.getElementById ("inputAvatar");
    input6.placeholder = $scope.teacherAvatar;
  }
  

  $scope.clearForm  = function(){
    var form = document.getElementById('teacherProfile-form1');
    form.reset();
    $state.go('teacherProfile', {teacherName: $scope.teacherName});
  }

  $scope.getTeacherData = function() {
      $http.get(Backand.getApiUrl()+'/1/query/data/getStudents'+'/'+$scope.teacherId)
        .then(function (response) {
          $scope.teacherAvatar = response.data[0].avatar;
          $scope.teacherName = response.data[0].name;
          $scope.teacherSurname = response.data[0].surname;
          $scope.teacherEmail = response.data[0].email;
          $scope.teacherPassword = response.data[0].password;
          $cookies.put('teacherName', CryptoJS.AES.decrypt(response.data[0].name, email).toString(CryptoJS.enc.Utf8));
          $cookies.put('teacherSurname', CryptoJS.AES.decrypt(response.data[0].surname, email).toString(CryptoJS.enc.Utf8));
          $cookies.put('teacherAvatar', response.data[0].Avatar);
        });
  }

  $scope.checkTeacherEmail = function(name, surname, email, password, avatar) {

    if (email == null || email == $cookies.get('teacherEmail')) {
      email = $cookies.get('teacherEmail');
      $scope.editTeacher(name, surname, email, password, avatar);
      $scope.getTeacherData();
    } else {
      $http.get(Backand.getApiUrl()+'/1/query/data/checkTeacherEmail'+'?parameters={ "email" : \"'+CryptoJS.SHA256(email).toString()+'\"}')
        .success(function (response) {
          if (response.length > 0) {
            $scope.permission = false;
            alert('Email already used');
          } else {
            $scope.permission = true;
            $scope.editTeacher(name, surname, email, password, avatar);
            $scope.getTeacherData();
          }
        });
    }
  }

  $scope.editTeacher = function(name, surname, email, password, avatar) {

    $scope.teacherId = $cookies.get('teacherId');

    if (avatar == null) {
      avatar = $cookies.get('teacherAvatar');
    }

    var teacher = {
      "name" : CryptoJS.AES.encrypt(name,email).toString(),
      "surname" : CryptoJS.AES.encrypt(surname,email).toString(),
      "email" : CryptoJS.SHA256(email).toString(),
      "password" : CryptoJS.SHA256(password).toString(),
      "avatar" : avatar
    }
    
    $http.put(Backand.getApiUrl()+'/1/objects/'+'teachers/'+$scope.teacherId, teacher)
      .success(function(response) {
        $cookies.put('teacherEmail', email);
        $cookies.put('teacherPassword', password);
        $cookies.put('teacherName', name);
        $cookies.put('teacherSurname', surname);
        $cookies.put('teacherAvatar', avatar);
        $scope.getTeacherData();
        $scope.clearForm();
      })

  }

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

  $scope.clearForm = function(){
      var form = document.getElementById("itemDataForm");
      form.reset();
    }

    $scope.classroomId = $cookies.get('classroomId');


    
    $scope.newItemModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
   '<h3 style="color:#FFFFFF;text-align:center;">{{ \'NEW_ITEM\' | translate }}</h3>'+
    '<form id="itemDataForm" class="list list-student">'+
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
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'SCORE\' | translate }}</span>'+
          '<input type="text" placeholder="{item.name}">'+
        '</label>'+
        '<label class="item item-input list-elements">'+
          '<span class="input-label">{{ \'MAX_SCORE\' | translate }}</span>'+
          '<input type="text" placeholder="{item.name}">'+
        '</label>'+
      '</ion-list>'+
    '</form>'+
    '<div class="list-student">'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewItem() ; clearForm()">{{ \'ADD_ITEM\' | translate }}</button>'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewItem() ; clearForm()">{{ \'CANCEL\' | translate }}</button>'+
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

    $scope.clearForm = function(){
      var form = document.getElementById("achievementDataForm");
      form.reset();
    }
    
    $scope.newAchievementModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 style="color:#FFFFFF;text-align:center;">{{ \'NEW_ACHIEVEMENT\' | translate }}</h3>'+
    '<form id="achievementDataForm" class="list list-student">'+
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
      '<button class="button button-calm  button-block" ng-click="closeModalNewAchievement() ; clearForm()">{{ \'ADD_ACHIEVEMENT\' | translate }}</button>'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewAchievement() ; clearForm()">{{ \'CANCEL\' | translate }}</button>'+
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

    $scope.clearForm = function(){
      var form = document.getElementById("badgeDataForm");
      form.reset();
    }
    
    $scope.newBadgeModal = $ionicModal.fromTemplate('<ion-modal-view hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<h3 style="color:#FFFFFF;text-align:center;">{{ \'NEW_BADGE\' | translate }}</h3>'+
    '<form id="badgeDataForm" class="list list-student">'+
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
      '<button class="button button-calm  button-block" ng-click="closeModalNewBadge() ; clearForm()">{{ \'ADD_BADGE\' | translate }}</button>'+
      '<button class="button button-calm  button-block" ng-click="closeModalNewBadge() ; clearForm()">{{ \'CANCEL\' | translate }}</button>'+
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

    $scope.clearForm = function(){
      var form = document.getElementById("missionDataForm");
      form.reset();
    }
    
    $scope.newMissionModal = $ionicModal.fromTemplate('<ion-modal-view title="New Mission" hide-nav-bar="true" style="background-color:#387EF5;">'+
  '<ion-content padding="false" class="manual-ios-statusbar-padding">'+
    '<form id="missionDataForm" class="list">'+
      '<h3 style="color:#FFFFFF;text-align:center;">{{ \'NEW_MISSION\' | translate }}</h3>'+
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
      '<button ng-click="closeModalNewMission() ; clearForm()" class="button button-calm  button-block">{{ \'CANCEL\' | translate }}</button>'+
      '<button ng-disabled="true" class="button button-positive  button-block"></button>'+
      '<button ng-click="closeModalNewMission() ; clearForm()" class="button button-calm  button-block">{{ \'ACCEPT\' | translate }}</button>'+
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
 