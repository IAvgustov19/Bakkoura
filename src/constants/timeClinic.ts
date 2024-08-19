import { ImageSourcePropType } from 'react-native';
import { Images } from '../assets';
import { APP_ROUTES } from '../navigation/routes';

export const TimeManagementTexts = {
  first: `Watches, like a luxury car, eventually require an update of style and character, while remaining themselves. Our brand atelier will create a new style for your watch by adding a few artful touches.`,
  second: `From a simple calendar with the phases of the Moon to a loose tourbillon combined with a minuterepeater with a cathedral battle and a power reserve of 5 days and much more.`,
  third: `The most difficult model is Intrepido Montre Contemporaine Grand Complication Tourbillon Reveil Manufacture.`,
  fourth: `Concept caliber FVn81 with manual winding, power reserve of 43 hours, equipped with a tourbillon and an alarm clock. The ultra-black titanium case with PVD coating impresses with its dimensions of 55x42 mm and 18 mm in height.`,
  fifth: `The first collection impressed with such complications as chronograph, perpetual calendar, flyback function, GMT and moon phases.`,
};

export type TimeClinicListType = {
  id: number;
  title: string;
  info: string;
  navigate: string;
  isbtn: boolean;
};

export type AboutTimeType = {
  id: number;
  title: string;
  navigate: string;
  info?: {
    text: string;
    author: string;
  }[];
};
export const AboutTimeInitial = {
  id: 0,
  title: '',
  navigate: '',
  info: [
    {
      text: '',
      author: '',
    },
  ],
};

export type TimeWealthDataType = {
  id: number;
  title: string;
  navigate: string;
  imageUrl: ImageSourcePropType;
  texts: string[];
};
export const TimeWealthDataInitial: TimeWealthDataType = {
  id: 0,
  title: '',
  navigate: '',
  imageUrl: 0,
  texts: [''],
};

export const TimeClinicList: TimeClinicListType[] = [
  {
    id: 1,
    title: 'Time Management',
    info: 'Details about the concept...',
    navigate: APP_ROUTES.TIME_MANAGEMENT,
    isbtn: true,
  },
  {
    id: 2,
    title: 'About Time',
    info: 'Stories about the time...',
    navigate: APP_ROUTES.ABOUT_TIME,
    isbtn: false,
  },
  {
    id: 3,
    title: 'The Book of The Time',
    info: 'Stories about the time...',
    navigate: APP_ROUTES.THE_BOOK,
    isbtn: false,
  },
  {
    id: 4,
    title: '30H concept',
    info: 'Stories about the time...',
    navigate: APP_ROUTES.CONCEPT_30H,
    isbtn: false,
  },
  {
    id: 5,
    title: 'Jihad Bakkoura',
    info: 'About the Founder...',
    navigate: APP_ROUTES.JIHAD_BAKKOURA_TIME_CLINIC,
    isbtn: false,
  },
  {
    id: 6,
    title: 'Time Wealth',
    info: 'Stories about the time...',
    navigate: APP_ROUTES.TIME_WEALTH,
    isbtn: false,
  },
  {
    id: 7,
    title: 'FrancVila Watch',
    info: 'About the Founder....',
    navigate: APP_ROUTES.FRANS_VILA,
    isbtn: false,
  },
  {
    id: 8,
    title: 'Podcass',
    navigate: APP_ROUTES.PODCASTS,
    info: 'Stories about the time...',
    isbtn: false,
  }
];

export const AboutTimeData: AboutTimeType[] = [
  {
    id: 1,
    title: 'Time and feelings',
    navigate: APP_ROUTES.ABOUT_TIME_INFO,
    info: [
      {
        text: 'Through love, time passes unnoticed, and through time, love passes unnoticed.',
        author: '- Dorothy Parker',
      },
      {
        text: 'Time strengthens friendship but weakens love',
        author: '- Albert Einstein',
      },
      {
        text: 'If love kills time, then time takes revenge and kills love.',
        author: '- Margaret Thatcher',
      },
      {
        text: 'When you sit next to a pretty girl, an hour seems like a minute, but when you sit on a hot griddle, a minute seems like an hour.',
        author: '- Einstein',
      },
      {
        text: 'We live by deeds, not years; in thought, not breath; by sensations, not numbers on a dial. We should count time by heartbeat. He who thinks the most, feels the noblest, acts the best lives the most.',
        author: '- Aristotle',
      },
      {
        text: 'Time cannot be stopped, but for the sake of love it sometimes stops.',
        author: '- Pearl Buck',
      },
      {
        text: 'The length of time depends on our mood. The dimensions of space are conditioned by our consciousness.',
        author: '- Hong Zichen',
      },
      {
        text: 'There is no time - life is so short - for squabbles, apologies, acrimony and calls to account. There is only time to love, and for that, so to speak, there is only a moment.',
        author: '- Mark Twain',
      },
      {
        text: 'True feeling will stand the test of time.',
        author: '- Eric Segal',
      },
      {
        text: 'There is a time to work, and there is a time to love. There is no other time.',
        author: '- Coco Chanel',
      },
      {
        text: 'Time spent with a woman cannot be called time lost.',
        author: '- Andre Morois',
      },
      {
        text: 'Time soothes, time clarifies, no mood can remain unchanged for hours on end.',
        author: '- Thomas Mann',
      },
      {
        text: 'Time does not pass in vain or roll on without any effect on our senses: it does marvelous things in the soul.',
        author: '- Juan Trippe',
      },
      {
        text: "Time cures love's longing.",
        author: '- Ovid',
      },
    ],
  },
  {
    id: 2,
    title: 'Philosophical quotes',
    navigate: APP_ROUTES.ABOUT_TIME_INFO,
    info: [
      {
        text: 'Time is a storm in which we are all lost.',
        author: '- William Carlos Williams',
      },
      {
        text: 'There are no secrets that time does not reveal.',
        author: '- Jean Racine',
      },
      {
        text: 'The present tense has one advantage over all others - it is our own.',
        author: '- Charles Colton',
      },
      {
        text: 'Time is like a child led by the hand: looking backward....',
        author: '- Julio Cortázar',
      },
      {
        text: "The timing is always important. If it's too early, no one will understand. If it's too late, everyone will forget.",
        author: '- Anna Wintour',
      },
      {
        text: 'Time has the great power of giving everything legitimacy - even in the realm of morality.',
        author: '- Henry Louis Mencken',
      },
      {
        text: 'The two strongest warriors are patience and time.',
        author: '- Leo Tolstoy',
      },
      {
        text: 'Time is the test of all inclinations, all feelings, all connections.....',
        author: '- Vissarion Belinsky',
      },
      {
        text: 'I never think about the future: it comes quickly enough as it is.',
        author: '- Albert Einstein',
      },
      {
        text: 'Time is a great healer, but a bad beautician.',
        author: '- Lucille S Harperer',
      },
      {
        text: 'Time is plentiful, but it cannot be spared.',
        author: '- Charles W. Chesnutt',
      },
    ],
  },
  {
    id: 3,
    title: 'Time and people',
    navigate: APP_ROUTES.ABOUT_TIME_INFO,
    info: [
      {
        text: 'Time, which changes people, does not change the way we think of them.',
        author: '- Marcel Proust',
      },
      {
        text: 'There is only one thing more valuable than our time, and that is who we spend it on.',
        author: '- Christopher Leo',
      },
      {
        text: 'How we spend our time determines who we are.',
        author: '- Jonathan Estrin',
      },
    ],
  },
  // {
  //   id: 4,
  //   title: 'Time Immutability Quotes',
  //   navigate: APP_ROUTES.ABOUT_TIME_INFO,
  // },
  // {
  //   id: 5,
  //   title: 'Time and wisdom',
  //   navigate: APP_ROUTES.ABOUT_TIME_INFO,
  // },
  // {
  //   id: 6,
  //   title: 'Time and the life flow',
  //   navigate: APP_ROUTES.ABOUT_TIME_INFO,
  // },
  // {
  //   id: 7,
  //   title: 'Time and happines',
  //   navigate: APP_ROUTES.ABOUT_TIME_INFO,
  // },
  // {
  //   id: 8,
  //   title: 'Time and business',
  //   navigate: APP_ROUTES.ABOUT_TIME_INFO,
  // },
  // {
  //   id: 9,
  //   title: 'Motivational quotes',
  //   navigate: APP_ROUTES.ABOUT_TIME_INFO,
  // },
];

export const TheBookTexts = [
  {
    id: 1,
    title: 'How time is called.',
    texts: [
      `Psycholinguists - people who study the influence of language on people's behavior are sure that language determines our character. And life determines language, for example, in the language of northern peoples there are more than 30 words for snow, in southern countries one. Some languages do not know the word no, in other languages there is no “I” and it determines the worldview. The name of time in different languages can also tell a lot. `,
      `For example, English time - goes back to Old English “tīma”, which is etymologically related to tīd. This word meant not only “time” but also “tide” and “ebb” (modern tide). English time has a peculiarity: it can denote both an interval and a point in time, when in other languages there are separate names for these concepts. `,
      `Slavonic “time” is borrowed from Church Slavonic. This word is related to the ancient Indian word “vártma” - track. The verb “to spin” is related to the same root! Perhaps that is why Slavic peoples have an attitude to time as something fatal - unambiguous. `,
      `In Chinese, time is 时间 (shijian). The main meaning of the word is concentrated in the first character 时 (shi). It is formed from two parts - “sun” and “to guide” (日 and 之). That is, it symbolizes the movement of the sun, which is time in the earthly sense. Its meaning is “time, hour, season, epoch”. `,
      `The second character 间 (jian) in the word “time” is more of a service character. It means “gap, gap, distance.” This character consists of two parts - the gate (門), and in it the moon (月). It turns out that etymologically the word time means “interval of time”, not the concept of “time” as such. That is, for the Chinese, time is necessarily from something and to something, some distance measured in hours. In Arabic, time was originally denoted by the word “almanac”, which was borrowed by many languages of the world in the original meaning of guide, table, overview. The modern concept of the word “time” الوقت is close to the Slavic understanding of time - a form of being, the best moment for something`,
    ],
  },
  {
    id: 2,
    title: 'There is a special kind of time - business time ',
    texts: [
      `In economics, time is the speed of reaction or response to changes that occur. The economy lives by its own clock, close in meaning to the Chinese concept - time is a period. K the economy has 4 times/periods: `,
      `Instantaneous - a period of time during which it is impossible to change any of the factors affecting the business.`,
      `Short-term - a period of time during which it is impossible to change the fixed factors of production (production area and equipment), but it is possible to change the variable factors of production (number of employees, amount of raw materials and energy). `,
      `Short-term - a period of time during which it is impossible to change the fixed factors of production (number of employees, amount of raw materials and energy).  `,
      `Long-term - it is possible to change all factors except technology. Production increases, demand increases, prices increase, costs increase.`,
      `Super long - a period in which everything changes and company and technology, innovation comes. In English the word run is used to describe economic time: shortrun, longrun. Economic time in all its four dimensions cannot be tied to an astronomical period of time`,
    ],
  },
  {
    id: 3,
    title: 'Chronophages or time-eaters',
    texts: [
      `The Tale of Lost Time is a story about children not cherishing and respecting time. Chronophages took advantage of this and stole time from children and turned them into old people. They don't need it... This is a fairy tale, but in life can you steal time? Time management experts say yes. Here are 5 of the most vicious time eaters, which, by the way, Bakkoura's NON SYSTEM watch is perfectly able to fight against, helping you to redistribute your time:`,
      `1. the Internet 
2.	Talking on the phone
3.	Getting up late
4.	Reflection - reflections from the series of “if only...”
5.	Wrong prioritization The term “chronophage” is derived from the Greek words “chronos” (time) and “phage” (to devour). Behind this generalized concept can hide virtually any time management problems: from outright force majeure to errors in planning. They come in five types:
1.	Activities
2. people
3.	External circumstances (force majeure)
4.	Internal circumstances
5.	Organizational miscalculations`,
    ],
  },
  {
    id: 4,
    title: 'Time is a secret account opened by god in your name. ',
    texts: [
      `Crises and inflation kill business. And time is the rapid inflation of life. We don't need to get our hopes up about how much time is ahead of us, it's important to realize how much we've already missed. When approached wisely, time will become your 3rd hand - the one that catches luck by the tail. Jihad Bakkoura sought and found a way to live each hour with meaning and purpose: there are 30 parts in a day. We never know where we lose time.`,
      `And time is the only personal account you will never know anything about. How much has the Almighty given you? How much is left? The only thing we can do is manage “spending.” Don't let time run out and zero out your life's account too early! How? Bakkoura devoted his life to the study of clocks and found 2,190 “hours” per year. Every year. Time that you spend doing the right things. After all, life is measured in actions, not hours.`,
    ],
  },
  {
    id: 5,
    title: 'Time is water. ',
    texts: [
      `Time is water. When there are 2 hours to complete a task, handle it in 2, and if an hour is allotted, we'll handle it in an hour. How can we do that? Humans are amazing creatures, we can program ourselves. You wake up in the night, look at the clock and realize that you will definitely not get enough sleep, because there are only 4 hours left to sleep. And you definitely won't get enough sleep. And if you don't know what's “only” left, you'll wake up rested.`,
      `A clock that divides the day into 30 parts is a bold idea that breaks the routine for those who aren't afraid to break the rules. We harvested 12 minutes from each hour and gained an extra 6 “hours” of life! Do everything on time and never regret anything!`,
      `The BAKKOURA NON SYSTEM collection is dedicated to the daredevils and dreamers who find it hard to live in the grip of 24 hours! `,
      `Time is conditional - value is determined by people. Is 1 real or 1 yuan a lot or a little? How do you know? You feel it. Somewhere in your brain there's a conventional ruler that tells you whether it's valuable or not. Nobody knows if 1 minute is a lot or a little. What can happen in a minute? Everything or nothing. `,
      `Some are always late and some are always early Why? We all have a different sense of time. For some, a minute is not much, and for others, it's a lot. So, as with money, the unit of measurement seems to be the same for everyone, but in fact everyone has his own. But human beings are so organized that we have to be guided by something. 5 stars in the hotel, Michelin stars in the restaurant, ratings in the reviews. If you have 24 hours you will live 24, and if you have 30 you will live 30. The world lives by its own rules`,
      `Pythagoras said the earth was round, and it wasn't until 1992 that the Vatican recognized that the earth was round. But in 2023, almost 15 million people believe the earth is round. We were told that there are 24 hours in a day. Although the academic hour is 45 minutes, in Europe the working hour is 50 minutes.`,
      `The Slavs had 16 hours and 9 months in a year in a 24-hour day until the 18th century, but in Ethiopia there are 13 months. In the 18th century, decimal time was in effect in France for several years - the day was divided into ten parts. Although before France such a system was tried in ancient China. In parallel with the division of the day into 12 “shi”, the Chinese divided them into 100 “ke”, each of which, in turn, was divided into 60 “fen” The Eastern world lives by the lunar calendar, where there are 354 days in a year, and in lunar days can be from a minute to 48 hours. So, how much time do we have left? The metaphysics of time`,
      `One physicist put forward the theory that time doesn't exist. If you try to take time in your hands, it always slips through your fingers. People are sure that time exists, but they can't access it. We can't touch time because it simply doesn't exist?`,
      `An interesting observation is that time can only exist where something is happening, there is at least some matter and characteristics. For example, in space in a black hole there is no matter at all and absolutely nothing, nothing is happening and there is no time there. Before the big bang or the moment when the Almighty created everything - there was nothing, so there was no time. Did it appear together with the universe or did it appear together with consciousness? Where consciousness, subconsciousness or soul goes when we sleep - there is no time. Does it mean that when one sleeps time ceases to exist? In the external world it is there, but it is not there for you. `,
    ],
  },
];

export const Concept30hTexts = [
  {
    id: 1,
    title: `Be free, as you were created to be, to realize what you were created to do`,
    texts: [
      `The NO LINE project is a decoding of the time code.It is necessary to realize the importance of time, recognize it and touch time.In the age of speed, we must change the division of time to keep up with development. Change the stereotypes that do not reflect its truth and adjust the way we measure time. Then we will be moving in the right direction. We will be able to feel and control time, which helps us like a third hand.The proof of this is in our achievements.`,
    ],
  },
  {
    id: 2,
    title: `A life in which time is absent`,
    texts: [
      `magine that time has disappeared and there is no time in the Universe.We now live in a world where there is no next moment and past moments have disappeared.We have no history and no future, we have no memory and no hope.We live in one moment that lasts forever, and our senses are not renewed.A rose that has not yet bloomed will not bloom, and a wilted rose will not wither.We find ourselves stuck, and the thought of it terrifies me.People who have succeeded and impacted the world have realized the importance of time before it was lost. Use your time wisely and respect it to the best of your ability. Make the most out of it.Those who do not value time live as if one moment lasts forever, without time`,
    ],
  },
  {
    id: 3,
    title: `A life in which time is absent`,
    texts: [
      `magine that time has disappeared and there is no time in the Universe.We now live in a world where there is no next moment and past moments have disappeared.We have no history and no future, we have no memory and no hope.We live in one moment that lasts forever, and our senses are not renewed.A rose that has not yet bloomed will not bloom, and a wilted rose will not wither.We find ourselves stuck, and the thought of it terrifies me.People who have succeeded and impacted the world have realized the importance of time before it was lost. Use your time wisely and respect it to the best of your ability. Make the most out of it.Those who do not value time live as if one moment lasts forever, without time`,
    ],
  },
];
export const JihadBakkouraTexts = [
  {
    id: 1,
    title: `Bakkoura Dynasty is success built on a personal brand JIHAD BAKKOURA`,
    texts: [
      `Jihad Bakkura has dedicated 20 years to the luxury industry. First as a client, then as a distributor and finally as an owner and brand creator. He has spent part of his life in the East and part in the West: integrating the best of both cultures into his concepts and his projects.`,
    ],
  },
  {
    id: 2,
    title: `Take control of your time and theUniverse around you will change`,
    texts: [
      `Jihad Bakkoura:"I trust in God."Jihad has a strong attention to time and detail.He has a distinctive personality represented in his crazy ideas in a world driven by madness and ruled by reason.Bakkoura is known for his love of fine art, he is a thinker, poet, clothing and watch designer, and a successful businessman.He founded the Bakkoura Dynasty, which includes several companies and projects in various fields.Throughout his professional career, Bakkoura has demonstrated a love for the philosophy of innovative challenge.He has launched two different campaigns: the first one is called "Decipher Time Together" and the second one is to redefine the names of time so that we can touch it.He introduced a new philosophy of time, saying:"Time is the third hand".In this context, he believes that time is divided into feelings, evaluated by values, and measured by `,
      `achievements.Bakkoura emphasizes the importance of valuing and subtracting time, saying:"Time is collected only by subtraction."He is against half-hearted decisions and believes that the limits we set are an illusion.In business, communication is the art of success.His experience in the world of luxury watches spans over 20 years.His journey started as a buyer, then he became a distributor, then the owner of Franc Vila brand and finally created his own brand "Bakkoura" which is a combination of wisdom and magic.He developed the "Nun Time" system, which he believes keeps pace with the age of speed, and in some of his designs he decided to use the rotation of the hands as time decreases rather than increases.Bakkoura distinguishes himself by being associated with the city of Damascus, and his designs tell stories that combine the charm of the East with the subtlety of the West.In this regard, he says, "Every Bakkoura design has a story in it that tells what your grandmother used to tell you."Jihad says, "Yes, the devil lived in the details before I drove him out of them."Our proof of this is Bakkoura.`,
    ],
  },
  {
    id: 3,
    title: `Badreya`,
    texts: [
      `Exclusive brand ambassador.Always open for communication with Bakkoura watch buyers.This name, which I have proudly embraced, is not just a passing word or name, but rather an echo that reflects the deep heritage and renewed meaning in my heart.Badria is my mother, may God have mercy on her, the woman who drew my features before she even saw me, the first to feed me and give me a taste of love.My mother, she is the door to my first livelihood and the compass that showed me the path in life. I chose her name as the title for Bakur's commercial transactions because she is still present in my life.Badria, a beautiful mascot who encouraged me to do everything to make me proud.She is the symbol of all great symbols, and I will wear this name with pride so that it will always remind me of my roots and who I am.Our testament to that is Badria.`,
    ],
  },
  {
    id: 4,
    title: `Our message`,
    texts: [
      `The representation of time.Not as a figure of time, not as a masterpiece of wonder, not as a passageway of luxury, or as an adornment of emptiness. Rather, we add our imprint to its visual appearance, which does not exist if it does not exist itself.And its values are for those who want to be valued. Our models prove it.`,
    ],
  },
  {
    id: 5,
    title: `Bakkoura family`,
    texts: [
      `Someone who looks like us is one of us.We strive to earn our existence`,
    ],
  },
];

export const FrancVillaTexts = {
  id: 1,
  title: `FrancVila`,
  date: '07:08.2023 - Jihad Bakkoura',
  image: Images.Svg.francVila,
  texts: [
    `oncept caliber FVn81 with manual winding, power reserve of 43 hours, equipped with a tourbillon and an alarm clock. These timepieces live for everyone who has achieved success. And it doesn't matter who he is: an athlete, a politician, the head of a mafia clan, a star or an IT specialist. The company specializes in the production of all swiss watches with complications in super-limited series of 4, 8, 48 and 88 copies, which guarantees an exclusive high-tech design and a bright personality. The FRANC VILA watch is a mechanic created by a philosopher.`,
    `Businessman, Poet, Designer, Creator Of Revolutionary Watch Concepts Of Time.Jihad Bakkoura Continues To Write A Story That Began In 2004 In Spain With No Less Passion And Imagination.He Has Come Up With An Exciting New Life For Each Model.`,
    `A globally recognized independent all Swiss luxury watch brand. The philosophy behind the Franc Vila brand is pure perfection. Innovation, creativity and excellency are our fundamental principles. Our aim is to create a complete range of watch complications presented in a strong, contemporary and - above all - unique design.«Exclusivity is the heart of luxury».`,
    `The case in the form of an inverted "figure eight" later became a distinctive feature of Franc Vila watches.The symbol has an infinite number of meanings.This is infinite confidence, this is completeness and individuality.`,
    `A globally recognized independent all Swiss luxury watch brand.`,
    `The philosophy behind the Franc Vila brand is pure perfection. Innovation, creativity and excellency are our fundamental principles.`,
    `Our aim is to create a complete range of watch complications presented in a strong, contemporary and - above all - unique design.«Exclusivity is the heart of luxury».`,
    `The case in the form of an inverted "figure eight" later became a distinctive feature of Franc Vila watches.The symbol has an infinite number of meanings.This is infinite confidence, this is completeness and individuality.`,
    `A globally recognized independent all Swiss luxury watch brand.`,
    `The philosophy behind the Franc Vila brand is pure perfection. Innovation, creativity and excellency are our fundamental principles`,
    `Our aim is to create a complete range of watch complications presented in a strong, contemporary and - above all - unique design.«Exclusivity is the heart of luxury».`,
  ],
};

export const TimeWealthData: TimeWealthDataType[] = [
  {
    id: 1,
    imageUrl: Images.Img.tWCardImage,
    navigate: '',
    title: `Bakkoura Dynasty is success built on a personal brand JIHAD BAKKOURA`,
    texts: [
      'Jihad Bakkura has dedicated 20 years to the luxury industry. First as a client, then as a distributor and finally as an owner and brand creator.',
      ' He has spent part of his life in the East and part in the West: integrating the best of both cultures into his concepts and his projects.',
    ],
  },
  {
    id: 2,
    imageUrl: Images.Img.tWCardImage1,
    navigate: '',
    title: `Bakkoura Dynasty is success built on a personal brand JIHAD BAKKOURA`,
    texts: [
      'Jihad Bakkura has dedicated 20 years to the luxury industry. First as a client, then as a distributor and finally as an owner and brand creator.',
      ' He has spent part of his life in the East and part in the West: integrating the best of both cultures into his concepts and his projects.',
    ],
  },
  {
    id: 3,
    imageUrl: Images.Img.tWCardImage2,
    navigate: '',
    title: `Bakkoura Dynasty is success built on a personal brand JIHAD BAKKOURA`,
    texts: [
      'Jihad Bakkura has dedicated 20 years to the luxury industry. First as a client, then as a distributor and finally as an owner and brand creator.',
      ' He has spent part of his life in the East and part in the West: integrating the best of both cultures into his concepts and his projects.',
    ],
  },
  {
    id: 4,
    imageUrl: Images.Img.tWCardImage3,
    navigate: '',
    title: `Bakkoura Dynasty is success built on a personal brand JIHAD BAKKOURA`,
    texts: [
      'Jihad Bakkura has dedicated 20 years to the luxury industry. First as a client, then as a distributor and finally as an owner and brand creator.',
      ' He has spent part of his life in the East and part in the West: integrating the best of both cultures into his concepts and his projects.',
    ],
  },
];

export const H30LegendDataTexts = [
  `"Whoever controls time controls life. Using new concepts is the first and most correct step into the future. We gave customers the opportunity to redistribute time to make room for something they need" Jihad Bakkoura
30H is convenient for adventurers and dreamers who feel the pressure of living in a 24-hour system.
Time is a top-secret account opened by God in your Name. Own time is the only personal account you will never get to know anything about. `,
  `How much did the Supreme creator gift you? How much is left?
The only we can do is manage "expenses". Don't let the time run out and reduce your life account to null ahead of time! After all, life is measured in deeds, not in hours. `,
  `We collected 12 minutes from each hour and got an additional 6 "hours" of life! The dial of each model is divided into 30 parts. The concept does not cancel but makes it possible to redistribute time during the day more efficiently. 
30H is not just a watch, but a time management technique that helps to correctly redistribute time without exposing the body to stress.`,
  `We never know where we are wasting time. Crises and inflation are killing business.  Time is an uncontrollable inflation of life.  30h –with a wise approach, it will become your 3rd hand.
30H is like a pizza. It can be divided into 6 parts, 8 or 10. The diameter does not change but you can feed more people without any waste.`,
  `30H is like a sandglass.  There is a strict number of grains of sand inside and they fall at the right speed, because the narrow neck. We didn't change the number of grains we narrowed the neck.`,
  `30H is like a jar. There are big stones, small ones, and sand — these are deeds of your life. Imagine if you put sand first, then small, and then large stones - how much will fit? But if to do it the other way - may fit much more.
The same way the watch divided into 30 parts works - redistribute time to make room for something necessary.`,
];
