angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signUp', {
    url: '/signUp',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })

  .state('teacherHome', {
    url: '/teacherHome',
    templateUrl: 'templates/teacherHome.html',
    controller: 'teacherHomeCtrl'
  })

  .state('studentHome', {
    url: '/studentHome',
    templateUrl: 'templates/studentHome.html',
    controller: 'studentHomeCtrl'
  })

  .state('studentAchievements', {
    url: '/studentAchievements',
    templateUrl: 'templates/studentAchievements.html',
    controller: 'studentAchievementsCtrl'
  })

  .state('studentBadges', {
    url: '/studentBadges',
    templateUrl: 'templates/studentBadges.html',
    controller: 'studentBadgesCtrl'
  })

  .state('class', {
    url: '/class',
    templateUrl: 'templates/class.html',
    controller: 'classCtrl'
  })

  .state('newClass', {
    url: '/newClass',
    templateUrl: 'templates/newClass.html',
    controller: 'newClassCtrl'
  })

  .state('attendance', {
    url: '/attendance',
    templateUrl: 'templates/attendance.html',
    controller: 'attendanceCtrl'
  })

  .state('studentDialog', {
    url: '/studentDialog',
    templateUrl: 'templates/studentDialog.html',
    controller: 'studentDialogCtrl'
  })

  .state('teams', {
    url: '/teams',
    templateUrl: 'templates/teams.html',
    controller: 'teamsCtrl'
  })

  .state('teamDialog', {
    url: '/teamDialog',
    templateUrl: 'templates/teamDialog.html',
    controller: 'teamDialogCtrl'
  })

  .state('newStudentDialog', {
    url: '/newStudentDialog',
    templateUrl: 'templates/newStudentDialog.html',
    controller: 'newStudentDialogCtrl'
  })

  .state('newTeam', {
    url: '/newTeam',
    templateUrl: 'templates/newTeam.html',
    controller: 'newTeamCtrl'
  })

  .state('rules', {
    url: '/rules',
    templateUrl: 'templates/rules.html',
    controller: 'rulesCtrl'
  })

  .state('teacherProfile', {
    url: '/teacherProfile',
    templateUrl: 'templates/teacherProfile.html',
    controller: 'teacherProfileCtrl'
  })

  .state('teacherSettings', {
    url: '/teacherSettings',
    templateUrl: 'templates/teacherSettings.html',
    controller: 'teacherSettingsCtrl'
  })

  .state('items', {
    url: '/items',
    templateUrl: 'templates/items.html',
    controller: 'itemsCtrl'
  })

  .state('addItem', {
    url: '/addItem',
    templateUrl: 'templates/addItem.html',
    controller: 'addItemCtrl'
  })

  .state('achievements', {
    url: '/achievements',
    templateUrl: 'templates/achievements.html',
    controller: 'achievementsCtrl'
  })

  .state('addAchievement', {
    url: '/addAchievement',
    templateUrl: 'templates/addAchievement.html',
    controller: 'addAchievementCtrl'
  })

  .state('badges', {
    url: '/badges',
    templateUrl: 'templates/badges.html',
    controller: 'badgesCtrl'
  })

  .state('addBadge', {
    url: '/addBadge',
    templateUrl: 'templates/addBadge.html',
    controller: 'addBadgeCtrl'
  })

  .state('missions', {
    url: '/missions',
    templateUrl: 'templates/missions.html',
    controller: 'missionsCtrl'
  })

  .state('newMission', {
    url: '/newMission',
    templateUrl: 'templates/newMission.html',
    controller: 'newMissionCtrl'
  })

  .state('editTeam', {
    url: '/editTeam',
    templateUrl: 'templates/editTeam.html',
    controller: 'editTeamCtrl'
  })

  .state('addStudent', {
    url: '/addStudent',
    templateUrl: 'templates/addStudent.html',
    controller: 'addStudentCtrl'
  })

  .state('secundaryMenu', {
    url: '/secundaryMenu',
    templateUrl: 'templates/secundaryMenu.html',
    controller: 'secundaryMenuCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});