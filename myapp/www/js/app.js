// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var myApp = angular.module('thelearninggames', ['backand'])

myApp.config(function (BackandProvider) {
      BackandProvider.setAppName('thelearninggames');
      BackandProvider.setSignUpToken('c75cdcdd-6ed5-4039-b26c-d41c28f95b53');
      BackandProvider.setAnonymousToken('8c25f926-034e-49f8-b84f-db5ff66a24ba');
  })

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services', 'thelearninggames', 'ngCookies','pascalprecht.translate','ui.router'])

.config(function($ionicConfigProvider, $sceDelegateProvider, $translateProvider){
  
  $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
  $translateProvider.translations('en', translationsEN);
  $translateProvider.translations('es', translationsES);
  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('en');
  $translateProvider.useLocalStorage();
  $translateProvider.useSanitizeValueStrategy('escape');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
.directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
    return {
        restrict: "A",  
        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

            function stopDrag(){
              $ionicSideMenuDelegate.canDragContent(false);
            }

            function allowDrag(){
              $ionicSideMenuDelegate.canDragContent(true);
            }

            $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
            $element.on('touchstart', stopDrag);
            $element.on('touchend', allowDrag);
            $element.on('mousedown', stopDrag);
            $element.on('mouseup', allowDrag);

        }]
    };
}])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
.directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});

var translationsEN = {
  
  BUTTON_LANG_ES: 'Spanish',
  BUTTON_LANG_EN: 'English',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  LOG_TEACHER: 'Log in as teacher',
  LOG_STUDENT: 'Log in as student',
  FORGOT_PASSWORD: 'Forgot password?',
  DONT_HAVE_ACCOUNT: 'Don\'t have an account?',
  EMAIL_EXAMPLE: 'example@example.com',
  YOUR_PASSWORD: 'Your Password',
  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS:'Settings',
  CLASS:'Class',
  ATTENDANCE:'Attendance',
  TEAMS:'Teams',
  RULES:'Rules',
  MISSIONS: 'Missions',
  ACHIEVEMENT_NAME:'Achievement name',
  ACHIEVEMENT_DESCRIPTION: 'Achievement description',
  REQUIREMENTS: 'Requirements: ',
  ADD_ACHIEVEMENT: 'Add achievement',
  NEW_ACHIEVEMENT: 'New Achievement',
  NAME:'Name ',
  DESCRIPTION:'Description: ',
  CANCEL:'Cancel',
  NEW_BADGE:'New Badge',
  ADD_BADGE:'Add badge',
  NEW_ITEM:'New Item',
  ADD_ITEM:'Add Item',
  ITEM_DESCRIPTION:'Item description',
  ITEM_NAME:'Item name',
  ADD_STUDENTS:'Add students',
  SET_ATTENDANCE_FOR_TODAY:'Set attendance for today',
  BADGE_DESCRIPTION:'Badge description',
  BADGE_NAME:'Badge name',
  ADD_STUDENT: 'Add student',
  DELETE:'Delete',
  UPLOAD_AVATAR: 'Upload avatar',
  ACCEPT:'Accept',
  ADD_MISSION:'Add mission',
  NEW_CLASS:'New Class',
  CLASS_NAME:'Class name',
  IMPORT_PREFERENCES_FROM:'Import preferences from',
  NONE:'none',
  CREATE:'Create',
  NEW_MISSION:'New Mission',
  PHASES:'Phases: ',
  NUMBER_OF_PHASES:'Number of phases',
  SCORES:'Scores: ',
  SCORES_DESCRIPTION:'Score1, Score2, Score3',
  GENERATE:'Generate',
  TAKE_PICTURE:'Take picture',
  SURNAME:'Surname',
  STREET:'Street',
  STUDENT_NAME:'Student name',
  CLASSROOM_NAME:'Classroom name',
  ASSIGN_STUDENT_TO_TEAM:'Assign student to team...S',
  SELECT:'Select',
  COPY_STUDENT_TO_ANOTHER_CLASS:'Copy student to another class',
  FULL_NAME:'Full name',
  CONFIRM_PASSWORD:'Confirm password',
  SIGN_UP:'Sign up',
  ALREADY_HAVE_AN_ACCOUNT:'Already have an account?',
  BADGE:'BADGE',
  VIEW_PROFILE:'View profile',
  LOG_OUT:'Log out',  
  ADRESS:'Adress',
  SAVE_CHANGES:'Save changes',
  CHANGE_AVATAR:'Change avatar',
  EDIT_TEAM:'Edit team',
  EXPORT:'Export',
  IMPORT:'Import',
  ARCHIVE:'Archive',
  SELECT_YOUR_CLASS:'Select your class',
  ADD_CLASS:'Add class',
  ACHIEVEMENTS:'Achievements',
  ITEMS:'Items',
  BADGES:'Badges',
  ADD_TEAM:'Add team',
  ITEM:'Item',
  LANGUAGES:'Languages',
  NEW_STUDENT:'New Student',
  AVATAR:'Avatar',
  EMAIL_ALREADY_USED: 'Email already used',
  CODE:'Code',
  YOUR_CODE:'Your code',
  LOGIN:'login',
};
 
var translationsES= {
  
  BUTTON_LANG_ES: 'Español',
  BUTTON_LANG_EN: 'Inglés',
  EMAIL: 'Correo',
  PASSWORD: 'Contraseña',
  LOG_TEACHER: 'Ingresar como profesor',
  LOG_STUDENT: 'Iniciar sesión como estudiante',
  FORGOT_PASSWORD: '¿Se te olvidó tu contraseña?',
  DONT_HAVE_ACCOUNT: '¿No tienes una cuenta?',
  EMAIL_EXAMPLE: 'ejemplo@ejemplo.com',
  YOUR_PASSWORD: 'Tu contraseña',
  HOME: 'Inicio',
  PROFILE: 'Perfil',
  SETTINGS:'Ajustes',
  CLASS:'Clase',
  ATTENDANCE:'Asistencia',
  TEAMS:'Equipos',
  RULES:'Reglas',
  MISSIONS: 'Misiones',
  ACHIEVEMENT_NAME:'Nombre del logro',
  ACHIEVEMENT_DESCRIPTION: 'Descripción del logro',
  REQUIREMENTS: 'Requisitos: ',
  ADD_ACHIEVEMENT: 'Añadir logro',
  NEW_ACHIEVEMENT: 'Nuevo logro',
  NAME:'Nombre ',
  DESCRIPTION:'Descripción: ',
  CANCEL:'Cancelar',
  NEW_BADGE:'Nueva medalla',
  ADD_BADGE:'Añadir medalla',
  NEW_ITEM:'Nuevo item',
  ADD_ITEM:'Añadir item',
  ITEM_DESCRIPTION:'Descripción del item',
  ITEM_NAME:'Nombre del item',
  ADD_STUDENTS:'Añadir estudiantes',
  SET_ATTENDANCE_FOR_TODAY:'Fijar la asistencia para hoy',
  BADGE_DESCRIPTION:'Descripción de medalla',
  BADGE_NAME:'Nombre de la medalla',
  ADD_STUDENT: 'Añadir estudiante',
  DELETE:'Eliminar',
  UPLOAD_AVATAR: 'Subir avatar',
  ACCEPT:'Aceptar',
  ADD_MISSION:'Añadir misión',
  NEW_CLASS:'Nueva clase',
  CLASS_NAME:'Nombre de la clase',
  IMPORT_PREFERENCES_FROM:'Importar preferencias de',
  NONE:'ninguna',
  CREATE:'Crear',
  NEW_MISSION:'Nueva Misión',
  PHASES:'Fases: ',
  NUMBER_OF_PHASES:'Numero de fases',
  SCORES:'Puntuaciones: ',
  SCORES_DESCRIPTION:'Puntuación1, Puntuación2, Puntuación3',
  GENERATE:'Generar',
  TAKE_PICTURE:'Seleccionar foto',
  SURNAME:'Apellido',
  STREET:'Calle',
  STUDENT_NAME:'Nombre estudiante',
  CLASSROOM_NAME:'Nombre de clase',
  ASSIGN_STUDENT_TO_TEAM:'Asignar a un estudiante al equipo...',
  SELECT:'Seleccionar',
  COPY_STUDENT_TO_ANOTHER_CLASS:'Copiar estudiante a otra clase',
  FULL_NAME:'Nombre entero',
  CONFIRM_PASSWORD:'Confirmar contraseña',
  SIGN_UP:'Registrarse',
  ALREADY_HAVE_AN_ACCOUNT:'¿Ya tienes cuenta?',
  BADGE:'Medalla',
  VIEW_PROFILE:'Ver perfil',
  LOG_OUT:'Cerrar sesión',  
  ADRESS:'Dirección',
  SAVE_CHANGES:'Salvar cambios',
  CHANGE_AVATAR:'Cambiar avatar',
  EDIT_TEAM:'Editar equipo',
  EXPORT:'Exportar',
  IMPORT:'Importar',
  ARCHIVE:'Archivar',
  SELECT_YOUR_CLASS:'Selecciona tu clase',
  ADD_CLASS:'Crear clase',
  ACHIEVEMENTS:'Logros',
  BADGES:'Medallas',
  ITEMS:'Items',
  ADD_TEAM:'Añadir equipo',
  ITEM:'Item',
  LANGUAGES:'Idiomas',
  NEW_STUDENT:'Nuevo Estudiante',
  AVATAR:'Avatar',
  EMAIL_ALREADY_USED: 'Email already used',
  CODE:'Código',
  YOUR_CODE:'Tu código',
  LOGIN:'Entrar',
};