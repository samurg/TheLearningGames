angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

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
    url: '/teacherHome/{teacherId}',
    templateUrl: 'templates/teacherHome.html',
    controller: 'teacherHomeCtrl'
  })

  .state('studentHome', {
    url: '/studentHome/{studentFullName}',
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
    url: '/class/{teacherId}/{className}',
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

  .state('teams', {
    url: '/teams/{teacherId}/{className}',
    templateUrl: 'templates/teams.html',
    controller: 'teamsCtrl'
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
    url: '/teacherSettings/{teacherId}',
    templateUrl: 'templates/teacherSettings.html',
    controller: 'teacherSettingsCtrl'
  })

  .state('items', {
    url: '/items',
    templateUrl: 'templates/items.html',
    controller: 'itemsCtrl'
  })

  .state('achievements', {
    url: '/achievements',
    templateUrl: 'templates/achievements.html',
    controller: 'achievementsCtrl'
  })

  .state('badges', {
    url: '/badges',
    templateUrl: 'templates/badges.html',
    controller: 'badgesCtrl'
  })

  .state('missions', {
    url: '/missions/{teacherId}/{className}',
    templateUrl: 'templates/missions.html',
    controller: 'missionsCtrl'
  })

$urlRouterProvider.otherwise('/login')

});