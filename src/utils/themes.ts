import {Image} from 'react-native-svg';
import {BG, Images} from '../assets';
import {Lotties} from '../lotties/lottie';
import {COLORS} from './colors';
import {ConstructorSvgs} from '../assets/constructor';

export const ThemeTypes = ['dark', 'light'];
export const Themes = {
  light: {
    loadingScreen: ['#D2D2D2', '#D2D2D2', '#F7F7F7', '#D2D2D2', '#D2D2D2'],
    linearBackground: ['#D2D2D2', '#D2D2D2', '#F7F7F7', '#D2D2D2', '#D2D2D2'],
    button: ['#BDBDBD', '#E0E0E0'],
    dateList: [
      'rgba(207, 207, 207,0.2)',
      '#F7F7F7',
      '#F7F7F7',
      'rgba(207, 207, 207,0.2)',
    ],
    alarmActiveList: ['#EEEEEE', '#EEEEEE', '#79B5F6', '#007AFF', '#007AFF'],
    alarmList: ['#EEEEEE', '#EEEEEE'],
    timer: ['#B5C7D4', '#007AFF', '#21C004'],
    eventItem: [COLORS.green, '#12946D', '#9CCDBE', COLORS.white],
    eventActiveItem: ['#EEEEEE', '#EEEEEE'],
    alarmText: COLORS.black,
    dateText: '#787878',
    mainBack: '#EEEEEE',
    bottomSheetBg: BG.bottomSheetLightBg,
    inputBaack: '#CBCFD2',
    radioback: '#CBCFD2',
    inputBorder: '#BDBDBD',
    line: '#DDE0E1',
    listBak: '#EEEEEE',
    input2: '#CBCFD2',
    buttonYellow: '#7F642E',
    calendarText: '#979DA1',
    green: COLORS.greenDark,
    selectYellow: COLORS.black,
    title: COLORS.black,
    darkGrayText: COLORS.darkGreyText,
    yellow: COLORS.inActiveYellow,
    gray: COLORS.darkGrey,
    stopWatch: COLORS.blue,
    messengerHeader: ['#D2D2D2', '#D2D2D2'],
    messageBack: '#D2D2D2',
    rightMessageBack: '#97C4E8',
    messengerFooter: '#CBCFD2',
    pickBack: 'rgba(179, 176, 176, 0.7)',
    homeWatchs: {
      home24: Images.Img.lightHomeWatch24,
      home30: Images.Img.lightHomeWatch30,
      home24and30: Images.Img.lightHomeWatch24and30,
    },
    bakkouraWatchs: {
      watchBack: Images.Img.lightWatchBack,
      watchMain: Images.Img.lightBakkouraWatchMain,
      watchFront: Images.Img.lightBakkouraWatchFront,
    },
    timeLogo: Images.Svg.lightTimerLogo,
    eventAndTime: Images.Svg.lightEventAndTime,
    userIcon: Images.Svg.lightUser,
    profileBackIcon: Images.Svg.lightProfileBack,
    arrowRight: Images.Svg.lightArrowRight,
    arrowLeft: Images.Svg.lightArrowLeft,
    delete: Images.Svg.lightDelete,
    checkbox: Images.Svg.lightCheckbox,
    uploadFile: Images.Svg.lightUpload,
    ellipse: Images.Svg.lightEllipse,
    substrack: Images.Svg.lightSubstrack,
    metronom: Images.Svg.lightMetronom,
    smallSubtrack: Images.Svg.lightSmallSubtrack,
    metronomType: COLORS.darkRed,
    todoTimerBack: Images.Svg.lightTodoTimerBack,
    timerBg: BG.lightDuringTimerBg,
    dollar: Images.Svg.lightDollar,
    worldWatch30: Images.Svg.lightWorldWatch30,
    worldWatch24: Images.Svg.lightWorldWatch24,
    stopWatchBg: Images.Img.lightStopwatchBg,
    panda: Images.Svg.lightPanda,
    yellowPanda: Images.Svg.lightYellowPanda,
    betweenLine: Images.Svg.lightBetweenLine,
    outlineSubtrack: Images.Svg.lightOutlineSubtrack,
    alarmFront24: Images.Svg.lightAlarmFront24,
    alarmFront30: Images.Svg.lightAlarmFront30,
    lotties: {
      clock: Lotties.whiteClock,
      tomato: Lotties.whiteTomato,
      panda: Lotties.whitePanda,
      timer: Lotties.whiteShape,
      heart: Lotties.whiteHeart,
      goldHeart: Lotties.goldHeart,
    },
    watchConstructor: {
      faceBack: ConstructorSvgs.lightFaceBack,
    },
    messageIcon: Images.Svg.lightMessageIcon,
    searchBtn: Images.Svg.lightSearchButton,
    bottomSheetIcons: {
      home: Images.Svg.lightBottomSheetLogo.lightHomeIcon,
      market: Images.Svg.lightBottomSheetLogo.lightMarketIcon,
      messenger: Images.Svg.lightBottomSheetLogo.lightMessengerIcon,
      todoTimer: Images.Svg.lightBottomSheetLogo.lightToDoTimerIcon,
      timers: Images.Svg.lightBottomSheetLogo.lightTimersIcon,
      prTimers: Images.Svg.lightBottomSheetLogo.lightProjectTimersIcon,
      wrTime: Images.Svg.lightBottomSheetLogo.lightWorldTimeIcon,
      stWatch: Images.Svg.lightBottomSheetLogo.lightStopWatchIcon,
      metoronom: Images.Svg.lightBottomSheetLogo.lightMetronomIcon,
      stressTest: Images.Svg.lightBottomSheetLogo.lightStressTestIcon,
      pomodoro: Images.Svg.lightBottomSheetLogo.lightPomodoroIcon,
      alarm: Images.Svg.lightBottomSheetLogo.lightAlarmIcon,
      calendar: Images.Svg.lightBottomSheetLogo.lightCalendarIcon,
      timeTogether: Images.Svg.lightBottomSheetLogo.lightTimeTogetherIcon,
      jihadBakkoura: Images.Svg.lightBottomSheetLogo.lightJihadBakkouraIcon,
      familyTree: Images.Svg.lightBottomSheetLogo.lightFamilyTreeIcon,
      bakkouraWatch: Images.Svg.lightBottomSheetLogo.lightBakkouraWatchIcon,
      timeClinic: Images.Svg.lightBottomSheetLogo.lightTimeClinicIcon,
      podcasts: Images.Svg.lightBottomSheetLogo.lightPodcastsIcon,
      h30Legend: Images.Svg.lightBottomSheetLogo.lightH30LegendIcon,
      assessmentWatch: Images.Svg.lightBottomSheetLogo.lightAssestmentWatchIcon,
      timeManagement: Images.Svg.lightBottomSheetLogo.lightTimeManagementIcon,
      watchConstructor:
        Images.Svg.lightBottomSheetLogo.lightWatchConstructorIcon,
      watchAtelier: Images.Svg.lightBottomSheetLogo.lightWatchAtelierIcon,
      sendYourIdea: Images.Svg.lightBottomSheetLogo.lightSendYourIdeaIcon,
      timeBiotic: Images.Svg.lightBottomSheetLogo.lightTimeBioticIcon,
      aboutTime: Images.Svg.lightBottomSheetLogo.lightAboutTimeIcon,
      francWillaWatch: Images.Svg.lightBottomSheetLogo.lightFrancvillaWatchIcon,
      wallpaper: Images.Svg.lightBottomSheetLogo.lightWallpapersIcon,
      contactUs: Images.Svg.lightBottomSheetLogo.lightContactUsIcon,
      btsNavigations: Images.Svg.lightBottomSheetLogo.lightBtsNavigationIcon,
      timeWealth: Images.Svg.lightBottomSheetLogo.lightTimeWealthIcon,
      recommendations: Images.Svg.lightBottomSheetLogo.lightRecommendationsIcon,
      menu: Images.Svg.lightBottomSheetLogo.lightMenuIcon,
    },
    watchConstrctorData: {
      bodyTypes: [
        ConstructorSvgs.lightBodyType1,
        ConstructorSvgs.lightBodyType3,
        ConstructorSvgs.lightBodyType4,
        ConstructorSvgs.lightBodyType5,
        ConstructorSvgs.lightBodyType6,
        ConstructorSvgs.lightBodyType7,
        ConstructorSvgs.lightBodyType8,
        ConstructorSvgs.lightBodyType9,
        ConstructorSvgs.lightBodyType10,
        ConstructorSvgs.lightBodyType11,
        ConstructorSvgs.lightBodyType12,
      ],
      backStyles: [
        ConstructorSvgs.lightBackStyle1,
        ConstructorSvgs.lightBackStyle2,
        ConstructorSvgs.lightBackStyle3,
        ConstructorSvgs.lightBackStyle4,
        ConstructorSvgs.lightBackStyle5,
        ConstructorSvgs.lightBackStyle6,
        ConstructorSvgs.lightBackStyle7,
        ConstructorSvgs.lightBackStyle8,
        ConstructorSvgs.lightBackStyle9,
        ConstructorSvgs.lightBackStyle10,
        ConstructorSvgs.lightBackStyle11,
        ConstructorSvgs.lightBackStyle12,
        ConstructorSvgs.lightBackStyle13,
        ConstructorSvgs.lightBackStyle14,
      ],
      faceTypes: [
        ConstructorSvgs.face1,
        ConstructorSvgs.face2,
        ConstructorSvgs.face3,
        ConstructorSvgs.face4,
        ConstructorSvgs.face5,
        ConstructorSvgs.face6,
        ConstructorSvgs.face7,
        ConstructorSvgs.face8,
        ConstructorSvgs.face9,
        ConstructorSvgs.face10,
        ConstructorSvgs.face11,
        ConstructorSvgs.face12,
      ],
      options: [
        ConstructorSvgs.option1,
        ConstructorSvgs.option2,
        ConstructorSvgs.option3,
        ConstructorSvgs.option4,
        ConstructorSvgs.option5,
        ConstructorSvgs.option6,
        ConstructorSvgs.option7,
        ConstructorSvgs.option8,
        ConstructorSvgs.option9,
        ConstructorSvgs.option10,
        ConstructorSvgs.option11,
        ConstructorSvgs.option12,
      ],
      numbers: [
        ConstructorSvgs.number1,
        ConstructorSvgs.number2,
        ConstructorSvgs.number3,
        ConstructorSvgs.number4,
        ConstructorSvgs.number5,
        ConstructorSvgs.number6,
        ConstructorSvgs.number7,
        ConstructorSvgs.number8,
        ConstructorSvgs.number9,
        ConstructorSvgs.number10,
        ConstructorSvgs.number11,
        ConstructorSvgs.number12,
      ],
      arrows: [
        ConstructorSvgs.arrows1,
        ConstructorSvgs.arrows2,
        ConstructorSvgs.arrows3,
        ConstructorSvgs.arrows4,
        ConstructorSvgs.arrows5,
        ConstructorSvgs.arrows6,
        ConstructorSvgs.arrows7,
        ConstructorSvgs.arrows8,
        ConstructorSvgs.arrows9,
        ConstructorSvgs.arrows10,
        ConstructorSvgs.arrows11,
        ConstructorSvgs.arrows12,
        ConstructorSvgs.arrows13,
      ],
    },
  },
  dark: {
    loadingScreen: ['#485661', '#090A0A'],
    linearBackground: ['#323D45', '#1B2024', '#020202'],
    button: ['#1c252f', '#0b0d10'],
    dateList: [
      'transparent',
      'rgba(13,13,13,.3)',
      '#0D0D0D',
      'rgba(13,13,13,.3)',
      'transparent',
    ],
    alarmActiveList: ['#0D0D0D', '#051222', '#00448E'],
    eventItem: [
      COLORS.green,
      COLORS.listGreen,
      COLORS.listCenterGreen,
      COLORS.listDarkGreen,
      COLORS.black2,
    ],
    eventActiveItem: [COLORS.black, COLORS.black],
    timer: [COLORS.black, COLORS.darkGreyText, COLORS.lightGreen],
    buttonYellow: '#46330d',
    alarmList: [COLORS.black, COLORS.black],
    alarmText: COLORS.white,
    dateText: '#787878',
    mainBack: '#0D0D0D',
    bottomSheetBg: BG.bottomSheetBg,
    inputBaack: '#0D0D0D',
    inputBorder: '#304A66',
    radioback: '#141414',
    line: '#131F28',
    listBak: '#0D0D0D',
    gray: COLORS.grey,
    green: COLORS.greenLight,
    selectYellow: COLORS.inActiveYellow,
    title: COLORS.white,
    yellow: COLORS.yellow,
    darkGrayText: COLORS.grey,
    input2: '#141414',
    stopWatch: COLORS.white,
    messengerHeader: ['#323D45', '#1B2024'],
    messageBack: COLORS.darkGrey,
    rightMessageBack: '#313131',
    messengerFooter: '#1C1C1D',
    pickBack: 'rgba(0,0,0,0.7)',
    homeWatchs: {
      home24: Images.Img.homeWatch24,
      home30: Images.Img.homeWatch30,
      home24and30: Images.Img.homeWatch24and30,
    },
    bakkouraWatchs: {
      watchBack: Images.Img.watchBack,
      watchMain: Images.Img.bakkouraWatchMain,
      watchFront: Images.Img.bakkouraWatchLines,
    },
    messageIcon: Images.Svg.messageIcon,
    searchBtn: Images.Svg.searchButton,
    timeLogo: Images.Svg.timerLogo,
    eventAndTime: Images.Svg.eventAndTime,
    userIcon: Images.Svg.userIcon,
    profileBackIcon: Images.Svg.profileBackground,
    arrowRight: Images.Svg.arrowRight,
    arrowLeft: Images.Svg.arrowLeft,
    delete: Images.Svg.deleteIcon,
    checkbox: Images.Svg.checkbox,
    uploadFile: Images.Svg.darkUpArrow,
    ellipse: Images.Svg.ellipseOut,
    substrack: Images.Svg.subtrackOut,
    metronom: Images.Svg.metronom,
    smallSubtrack: Images.Svg.bottonEllipse,
    metronomType: COLORS.inActiveYellow,
    todoTimerBack: Images.Svg.todoTaskBack,
    timerBg: BG.duringTimerBg,
    dollar: Images.Svg.circleDollar,
    worldWatch30: Images.Svg.worldWatch30,
    worldWatch24: Images.Svg.worldWatch,
    stopWatchBg: Images.Img.stopwatchBg,
    panda: Images.Svg.panda,
    yellowPanda: Images.Svg.yellowPanda,
    calendarText: COLORS.white,
    betweenLine: Images.Svg.betweenTimesLine,
    outlineSubtrack: Images.Svg.outlineSubstrack,
    alarmFront24: Images.Svg.alarmClockFront24,
    alarmFront30: Images.Svg.alarmClockFront30,
    lotties: {
      clock: Lotties.clock,
      tomato: Lotties.pomodoro,
      panda: Lotties.stressTest,
      timer: Lotties.timer,
      heart: Lotties.timeTogether,
      goldHeart: Lotties.timeTogether,
    },
    watchConstructor: {
      faceBack: ConstructorSvgs.faceBack,
    },
    bottomSheetIcons: {
      home: Images.Svg.homeIcon,
      market: Images.Svg.marketIcon,
      messenger: Images.Svg.messengerIcon,
      todoTimer: Images.Svg.todoIcon,
      timers: Images.Svg.timerIcon,
      prTimers: Images.Svg.projectTimerIcon,
      wrTime: Images.Svg.worldTimeIcon,
      stWatch: Images.Svg.stopWatchIcon,
      metoronom: Images.Svg.metronomIcon,
      stressTest: Images.Svg.stressTest,
      pomodoro: Images.Svg.pomodoroIcon,
      alarm: Images.Svg.alarmIcon,
      calendar: Images.Svg.calendarIcon,
      timeTogether: Images.Svg.timeTogetherIcon,
      jihadBakkoura: Images.Svg.jihadBakkuraIcon,
      familyTree: Images.Svg.familyTreeIcon,
      bakkouraWatch: Images.Svg.bakkuraWatchIcon,
      timeClinic: Images.Svg.timeClinicIcon,
      podcasts: Images.Svg.podcastIcon,
      h30Legend: Images.Svg.h30Icon,
      assessmentWatch: Images.Svg.assessmentWatchIcon,
      timeManagement: Images.Svg.timeManagementIcon,
      watchConstructor: Images.Svg.watchConstructorLogo,
      watchAtelier: Images.Svg.watchAtelierIcon,
      sendYourIdea: Images.Svg.sendIdeaIcon,
      timeBiotic: Images.Svg.timeBioticIcon,
      aboutTime: Images.Svg.aboutTimeIcon,
      francWillaWatch: Images.Svg.francvilaWatchIcon,
      wallpaper: Images.Svg.wallpapersIcon,
      contactUs: Images.Svg.contactIcon,
      btsNavigations: Images.Svg.btsNavigationIcon,
      timeWealth: Images.Svg.timeWealthIcon,
      recommendations: Images.Svg.recommendationsIcon,
      menu: Images.Svg.menuIcon,
    },
    watchConstrctorData: {
      bodyTypes: [
        ConstructorSvgs.bodyType1,
        ConstructorSvgs.bodyType3,
        ConstructorSvgs.bodyType4,
        ConstructorSvgs.bodyType5,
        ConstructorSvgs.bodyType6,
        ConstructorSvgs.bodyType7,
        ConstructorSvgs.bodyType8,
        ConstructorSvgs.bodyType9,
        ConstructorSvgs.bodyType10,
        ConstructorSvgs.bodyType11,
        ConstructorSvgs.bodyType12,
        ConstructorSvgs.bodyType13,
      ],
      backStyles: [
        ConstructorSvgs.backStyle1,
        ConstructorSvgs.backStyle2,
        ConstructorSvgs.backStyle3,
        ConstructorSvgs.backStyle4,
        ConstructorSvgs.backStyle5,
        ConstructorSvgs.backStyle6,
        ConstructorSvgs.backStyle7,
        ConstructorSvgs.backStyle8,
        ConstructorSvgs.backStyle9,
        ConstructorSvgs.backStyle10,
        ConstructorSvgs.backStyle11,
        ConstructorSvgs.backStyle12,
      ],
      faceTypes: [
        ConstructorSvgs.face1,
        ConstructorSvgs.face2,
        ConstructorSvgs.face3,
        ConstructorSvgs.face4,
        ConstructorSvgs.face5,
        ConstructorSvgs.face6,
        ConstructorSvgs.face7,
        ConstructorSvgs.face8,
        ConstructorSvgs.face9,
        ConstructorSvgs.face10,
        ConstructorSvgs.face11,
        ConstructorSvgs.face12,
      ],
      options: [
        ConstructorSvgs.option1,
        ConstructorSvgs.option2,
        ConstructorSvgs.option3,
        ConstructorSvgs.option4,
        ConstructorSvgs.option5,
        ConstructorSvgs.option6,
        ConstructorSvgs.option7,
        ConstructorSvgs.option8,
        ConstructorSvgs.option9,
        ConstructorSvgs.option10,
        ConstructorSvgs.option11,
        ConstructorSvgs.option12,
      ],
      numbers: [
        ConstructorSvgs.number1,
        ConstructorSvgs.number2,
        ConstructorSvgs.number3,
        ConstructorSvgs.number4,
        ConstructorSvgs.number5,
        ConstructorSvgs.number6,
        ConstructorSvgs.number7,
        ConstructorSvgs.number8,
        ConstructorSvgs.number9,
        ConstructorSvgs.number10,
        ConstructorSvgs.number11,
        ConstructorSvgs.number12,
      ],
      arrows: [
        ConstructorSvgs.arrows1,
        ConstructorSvgs.arrows2,
        ConstructorSvgs.arrows3,
        ConstructorSvgs.arrows4,
        ConstructorSvgs.arrows5,
        ConstructorSvgs.arrows6,
        ConstructorSvgs.arrows7,
        ConstructorSvgs.arrows8,
        ConstructorSvgs.arrows9,
        ConstructorSvgs.arrows10,
        ConstructorSvgs.arrows11,
        ConstructorSvgs.arrows12,
        ConstructorSvgs.arrows13,
      ],
    },
  },
};
