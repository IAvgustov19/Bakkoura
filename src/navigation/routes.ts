export enum APP_ROUTES {
  //initial screen
  INITIAL_SCREEN = 'InitialScreen',

  FIRST = 'First',
  ONBOARDING = 'Onboarding',

  //public

  AUTH_START = 'AuthStartScreen',
  AUTH_SIGN_IN = 'AuthSignIn',
  AUTH_SIGN_UP = 'AuthSignUp',
  RECOVER_PASSWORD = 'RecoverPassword',
  VERIFICATION_CODE = 'VerificationCode',
  NEW_PASSWORD_SCREEN = 'NewPasswordScreen',
  TERMS_OF_USE = 'TermsOfUse',
  PRIVACY_POLICY = 'PrivacyPolicy',

  // two step auth
  FINGERPRINT = 'FingerprintAuth',
  PASSWORD = 'PasswordPrompt',
  TWO_STEP = 'TwoStepAuth',

  //private
  LANGUAGE_SCREEN = 'LanguageScreen',
  BOTTOM_NAVIGATION = 'AppBottomNavigation',
  MAINSCREEN = 'MainScreen',
  PERSONAL_STACK = 'PersonalStack',
  // nested stack screens
  PERSONAL_AREA = 'PersonalArea',
  MENU = 'Menu',
  PERSON_START_SCREEN = 'PersonStartScreen',
  PERSONAL_DETAILS = 'PersonalDetails',
  SECURE_ENTRY = 'SecureEntry',
  THEME = 'Theme',
  LOGIN_PASSWORD = 'LoginPassword',
  //from menu
  CONTACT_STACK = 'ConstactStack',
  // nested stack screens
  CONTACT_US = 'ContactUs',
  SEND_IDEA = 'SendIdea',
  WATCH_VALUATION = 'WatchValuation',
  CONTACT_THANKS = 'ContactThanks',
  IDEA_THANKS = 'IdeaThanks',
  WATCH_THANKS = 'WatchThanks',
  BTS_NAVIGATION = 'BtsNavigation',
  WALLPAPERS = 'Wallpapers',

  //bottomsheet screens
  HOME_START = 'HomeScreen',
  MARKET = 'MarketScreen',
  MESSENGER = 'MessengerScreen',
  SEARCH_CONTACT = 'SearchContact',
  DIALOG_SCREEN = 'DialogScreen',
  TODOTIMER = 'ToDoTimerScreen',
  TIMER = 'TimerScreen',
  STRESS_TEST = 'StressTest',
  PROJECT_TIMER = 'ProjectTimer',
  WORLD_TIME = 'WorldTime',
  STOP_WATCH = 'StopWatch',
  ALARM_SCREEN = 'AlarmScreen',
  EVENTS_SCREEN = 'EventScreen',
  METRONOM = 'MetronomScreen',
  POMODORO = 'Pomodoro',
  TIME_TOGETHER = 'TimeTogether',
  JIHAD_BAKKOURA = 'JihadBakkura',
  WATCH_CONSTRUCTOR = 'WatchConstructor',
  FAMILY_TREE = 'FamilyTree',
  BAKKOURA_WATCH = 'BakkuraWatch',
  TIME_CLINIC = 'TimeClinic',
  PODCASTS = 'Podcasts',
  H30_LEGEND = 'H30Legend',
  TIME_BIOTIC = 'TimeBiotic',

  //calendar screens
  NEW_EVENT = 'NewEventScreen',
  REPEAT = 'RepeatScreen',
  REPEAT_ETAP = 'RepeatEtap',
  DATE_SCREEN = 'DateScreen',
  TIME_SCREEN = 'TimeScreen',
  ONE_MONTH_AND_EVENTS = 'OneMonthAndEvents',

  //stress test screens
  STRESS_TEST_DURING = 'StressTestDuring',

  //Alarm screens
  NEW_ALARM_SCREEN = 'NewAlarmScreen',
  NAME_ALARM = 'NameAlarm',
  REPEAT_TYPE_SCREEN = 'RepeatTypeScreen',

  //World Time screens
  CITIES_SCREEN = 'CitesScreen',

  //Project Timer screens
  NEW_PROJECT_TIMER = 'NewProjectTimer',
  NEW_PROJECT_TIMER_PRICE = 'NewProjectTimerPrice',
  PROJECT_TIMER_CALCULATOR = 'ProjectTimerCalculator',

  //pomodoro screens
  ADD_TASK_SCREEN = 'AddTaskScreen',

  //Time together
  ADD_ETAP = 'AddEtap',
  FROM_DATE = 'FromDate',
  SYNCHRONYZE = 'Stynchronyze',
  THANKS = 'Thanks',
  LOVER_NAME = 'LoverName',
  DELETE_ETAP = 'DeleteEtap',

  //Bakkoura watch
  CREATE_SECTOR = 'CreateSector',
  SECTOR_NAME = 'SectorName',
  SECTOR_COLOR = 'SectorColor',
  SECTOR_TIME = 'SectorTime',

  //to do timer
  NEW_TASK = 'NewTask',
  TODO_GOAL = 'TodoGoal',
  TASK_NAME = 'TaskName',
  TODO_TIMER_HISTORY = 'TodoTimerHistory',

  //market
  ORDER_SCREEN = 'OrderScreen',
  ORDER_THANKS = 'OrderThanks',
  MARKET_WEB_VIEW = 'MarketWebView',

  //time clinic
  CONSULTATION = 'Consultation',
  TIME_MANAGEMENT = 'TimeManagement',
  CONSULTATION_THANKS = 'ConsultationThanks',
  THE_BOOK = 'TheBook',
  JIHAD_BAKKOURA_TIME_CLINIC = 'JihadBakkouraTimeClinic',
  CONCEPT_30H = 'Concept30h',
  ABOUT_TIME = 'AboutTime',
  ABOUT_TIME_INFO = 'AboutTimeInfo',
  TIME_WEALTH = 'TimeWealth',
  FRANS_VILA = 'FransVila',
}
