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
  date?: string;
};
export const TimeWealthDataInitial: TimeWealthDataType = {
  id: 0,
  title: '',
  navigate: '',
  imageUrl: 0,
  texts: [''],
  date: '',
};

export const TimeClinicList: TimeClinicListType[] = [
  {
    id: 1,
    title: 'Podcast',
    navigate: APP_ROUTES.PODCASTS,
    info: 'Stories about the time...',
    isbtn: false,
  },
  {
    id: 2,
    title: 'Consultation',
    navigate: APP_ROUTES.CONSULTATION,
    info: 'Stories about the time...',
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
    title: 'Reccomendations',
    info: 'Stories about the time...',
    navigate: APP_ROUTES.RECOMMENDATION,
    isbtn: false,
  },
  {
    id: 5,
    title: 'About Time',
    info: 'Stories about the time...',
    navigate: APP_ROUTES.ABOUT_TIME,
    isbtn: false,
  },
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
        author: '- Albert Einstein',
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
    title: 'Time is a secret account opened by god in your name.',
    texts: [
      `Crises and inflation kill business. And time is the rapid inflation of life. We don't need to get our hopes up about how much time is ahead of us, it's important to realize how much we've already missed. When approached wisely, time will become your 3rd hand - the one that catches luck by the tail. Jihad Bakkoura sought and found a way to live each hour with meaning and purpose: there are 30 parts in a day. We never know where we lose time.`,
      `And time is the only personal account you will never know anything about. How much has the Almighty given you? How much is left? The only thing we can do is manage “spending.” Don't let time run out and zero out your life's account too early! How? Bakkoura devoted his life to the study of clocks and found 2,190 “hours” per year. Every year. Time that you spend doing the right things. After all, life is measured in actions, not hours.`,
    ],
  },
  {
    id: 5,
    title: 'Time is water.',
    texts: ['Time is water. When there are 2 hours to complete a task, handle it in 2, and if an hour is allotted, we wll handle it in an hour. How can we do that? Humans are amazing creatures, we can program ourselves. You wake up in the night, look at the clock and realize that you will definitely not get enough sleep, because there are only 4 hours left to sleep. And you definitely will not get enough sleep. And if you do not know what is “only” left, you will wake up rested.',
      'A clock that divides the day into 30 parts is a bold idea that breaks the routine for those who are not afraid to break the rules. We harvested 12 minutes from each hour and gained an extra 6 “hours” of life! Do everything on time and never regret anything!',
      'The BAKKOURA NON SYSTEM collection is dedicated to the daredevils and dreamers who find it hard to live in the grip of 24 hours!',
      'Time is conditional - value is determined by people. Is 1 real or 1 yuan a lot or a little? How do you know? You feel it. Somewhere in your brain there is a conventional ruler that tells you whether it is valuable or not. Nobody knows if 1 minute is a lot or a little. What can happen in a minute? Everything or nothing.', 
      'Some are always late and some are always early Why? We all have a different sense of time. For some, a minute is not much, and for others, it is a lot. So, as with money, the unit of measurement seems to be the same for everyone, but in fact everyone has his own. But human beings are so organized that we have to be guided by something. 5 stars in the hotel, Michelin stars in the restaurant, ratings in the reviews. If you have 24 hours you will live 24, and if you have 30 you will live 30.'],
  },
  {
    id: 6,
    title: 'The world lives by its own rules.',
    texts: ['Pythagoras said the earth was round, and it was not until 1992 that the Vatican recognized that the earth was round. But in 2023, almost 15 million people believe the earth is round.', 
      'We were told that there are 24 hours in a day. Although the academic hour is 45 minutes, in Europe the working hour is 50 minutes.',
      'The Slavs had 16 hours and 9 months in a year in a 24-hour day until the 18th century, but in Ethiopia there are 13 months. In the 18th century, decimal time was in effect in France for several years - the day was divided into ten parts. Although before France such a system was tried in ancient China. In parallel with the division of the day into 12 “shi”, the Chinese divided them into 100 “ke”, each of which, in turn, was divided into 60 “fen”',
      'The Eastern world lives by the lunar calendar, where there are 354 days in a year, and in lunar days can be from a minute to 48 hours. So, how much time do we have left? '],
  },
  {
    id: 7,
    title: 'The metaphysics of time.',
    texts: ['One physicist put forward the theory that time does not exist. If you try to take time in your hands, it always slips through your fingers. People are sure that time exists, but they can not access it. We can not touch time because it simply does not exist?',
      'An interesting observation is that time can only exist where something is happening, there is at least some matter and characteristics. For example, in space in a black hole there is no matter at all and absolutely nothing, nothing is happening and there is no time there. Before the big bang or the moment when the Almighty created everything - there was nothing, so there was no time. Did it appear together with the universe or did it appear together with consciousness? Where consciousness, subconsciousness or soul goes when we sleep - there is no time. Does it mean that when one sleeps time ceases to exist? In the external world it is there, but it is not there for you.']
  },
  {
    id: 8,
    title: 'If tomorrow comes.',
    texts: ["We always live in the “now”, Bakkoura even has a concept dedicated to the moment - NOW. It means not to be in the center of events, but to be the center. Because for human beings, NOW is always NOW, but it is so immense that it basically doesn't exist. So we can say that we live without time. Just as there is no tomorrow - none of us will ever find ourselves in tomorrow. So there is no tomorrow either. So there is no now, there is no tomorrow...there is no time. There is only the moment and our memory.",
      "Time is linked to memory. We remember everything only in chronology and remember in connection with the moment: when I was at school..., during a vacation.... that year. If God takes away our time, he will take away people's memory. And what is man if he has no history (memory)? Man will cease to exist.",
      "That is why NON SYSTEM will try to give you more moments, help you to fill your childhood with memory so that you LIVE."]
  },
  {
    id: 9,
    title: 'What NON SYSTEM looks like',
    texts: ["We do not cancel the 24 hours in a day, we help to redistribute them wisely. The effect of NON SYSTEM can be compared to:",
"NON SYSTEM is like a pizza. You can divide it into 6 pieces, you can divide it into 8 or 10. The diameter doesn't change, and we feed more people, but no one goes hungry.",
"● NON SYSTEM is like an hourglass with a strict number of grains of sand inside and they fall at the right speed because the narrow neck is properly designed. We didn't change the number of grains of sand, we narrowed the neck a bit to make it look like there is more time.",
"● NON SYSTEM - like chocolate. There is a famous puzzle that looks like a bar of chocolate, but if you put it together differently you get a big empty space. How? Nothing has changed, but it's as if the space has gotten bigger.",
"● NON SYSTEM - like a jar of life. There are big rocks, small rocks, and sand - these are matters and events. Imagine if you put the sand in first, then the small stones and then the large stones - how much will fit? And if it's the other way around.",
"● NON SYSTEM is like a general cleaning in life. Imagine if you did a general cleaning and threw out all the junk: old, unnecessary things, things you don't use. The size of the apartment remains the same, but it seems bigger, there is so much free space for something useful. That's how the 30 system works - we reallocate time to make room for something needed "]
  },
  {
    id: 10,
    title: 'Who needs to redistribute time? ',
    texts:["Everyone. Speed is of the utmost importance right now. We're trying to get everything done. To be efficient, but very few people actually know how to manage time properly. Like money, there are those who know how to allocate it correctly and live like a king on 1,000 reais, and there are beggars with 10,000 in their pockets - because it's leaking away. There are competent investors who can turn every reais into a hundred, and there are those who will lose that hundred. In the same way, everyone has the same amount of time, but some are rich and some are poor because they don't know how to allocate it properly.",
"This skill is necessary for young people who are just starting to learn about the world and have so much to do.",
"● For people of advanced age who don't have much left and still have so much to do. ",
"● For business people who are trying to make sure that staff concentrate on work and don't get distracted. ",
"For people who are always late and have no sense of time. "]
  },
  {
    id: 11,
    title: '30 - limitless development ',
    texts: ["In numerology, the number 30 means the next stage of development. And if the number 3 is talent, then 30 is talent without limits. It is said that to see 30 on the clock is the higher powers advising to rest and return to the spiritual beginning. Famous numerologists attribute 30 on the clock 5 meanings:" ,
      "1.	If you want to try yourself as a painter or sculptor, be brave. Start at least with a small, make steps on the way to achieving your goal.",
      "2.	If something is not satisfying in your life, it's time to make changes. You need to take the initiative in your own hands and act.",
      "3. intuition will help not to be confused and avoid mistakes. If there are any doubts, listen to your inner voice. ",
      "4.	The number 30 does not promise an immediate solution to all problems. It is necessary to make efforts, but do not doubt yourself and that your activity is beneficial.",
      "5.	Communication is essential for you. You need support to feel completely happy. Try to find a compromise and do not throw away true friends. "]
  },
  {
    id: 12,
    title: 'Who invented 24 hours in a day ',
    texts:["In 23 hours and 56 minutes, the Earth makes a complete revolution around the sun, but there are 24 hours in a day. Every four years, the extra minutes add up to an extra day - February 29. ",
"At first, they allocated just daytime and nighttime. Then - four times: sunrise, zenith, sunset and night. Some peoples had special systems. For example, the natives of the Society Islands in the Pacific Ocean had 18 hours in a day, and in ancient Russia - 16." ,
"For the first time divided the day into parts ancient Egyptians In the 21st century BC Pharaoh Thothmes III established the custom of measuring time with the help of sundials, where day and night were divided into 10 hours of “daylight” and 10 hours of “night light”. ",
"A more accurate system of time measurement was proposed by the ancient Babylonians. They divided the day into 24 hours, but the length of each hour was different depending on the season. However, such a system was inconvenient. ",
"Ancient Rome used sundials, but their use was impractical because they worked only during the day. Therefore, in order to rationalize the use of time, the Roman Empire first came up with the idea of dividing the day into equal hours. Claudius Ptolemy, who lived in the 2nd century AD, officially introduced the division of the day into 24 hours, more precisely into two of 12. ",
"The final establishment of the 24-hour day occurred only in 1840 century with the development of railroad transportation and the need to accurately coordinate the schedule of trains. "]
  },
  {
    id: 13,
    title: 'Why 30 hours is more effective',
    texts: ["Because NON SYSTEM is not just a clock, but a time-management methodology that helps you reallocate your time without stressing your body and trying to defeat procrastination. Focusing on 30 parts, where each conditional hour is less, and your sense of time does not know about it and is oriented simply on the dial, you will more effectively prioritize rest-employment. One of the most effective time management tools is considered to be the splitting of a large task. This method is sometimes referred to as “eating the elephant in pieces.” The idea is to divide a large task into smaller ones. “Portionally” you can cope with any task, it no longer seems insurmountable. Very similar to Bakkoura's NON SYSTEM."]
  },
{
    id: 14,
    title: '2 more time management methods with NON SYSTEM',
    texts: ["There are many methods to be efficient, but together with NON SYSTEM you can successfully use 2 more: Pomodoro technique and one task in one time period. Pomodoro - the idea is that a specific part of the time you work and a specific part of the time you rest. It's called a “tomato.” The time of one “tomato” is 30 minutes, of which 25 minutes you work and 5 minutes you rest. It takes 4 of these cycles of work and rest to take a major 30-minute break. In 2009, Stanford University researchers conducted an experiment in which they found out that if a person performs several intellectual tasks at the same time, he is worse at concentrating, thinking and memorizing. It is much more effective to allocate one task in one period of time, and concentrate only on it. The exception is the combination of physical and mental activity."]
  },
  {
    id: 15,
    title: 'The magic of still time',
    texts: ["This phenomenon is called chronostasis. From the Greek words “chronos” - time - and “stasis” - motionless. It occurs when, when you “suddenly” look at a watch with hands, the second hand seems to freeze for a second and then continues moving.  The reasons are not completely known, but there is a good explanation for this magic. When we look at anything, the eye is in constant movement over microscopic distances. These movements are called saccades. The saccades allow the brightness of individual points to shift constantly, so the picture is stable. Information from the eyes comes to the brain for processing, and the brain already transmits the processed result to the consciousness. When we look at one point, the picture stabilizes. But when we quickly transfer our gaze, the brain first receives a blurred picture, so the processing and sending of all this business to the consciousness is suspended until the gaze is not fixed on the point to which it was directed. After that, the transmission of data to consciousness is restored. But what to do with that segment of time when the eye was moving? Everything is simple - this segment is filled with the initial picture from the moment when the eye focuses on a new object, and it is perceived as a longer fragment of a new scene. The same is true for touch. If you grab an object sharply, the time of interaction with it will be perceived as longer than it really is. "]
   },
   {
    id: 16,
    title: 'NON SYSTEM - IS NOT A WATCH',
    texts: ['NON SYSTEM is not a watch, but a special innovative chronograph. In the watchmaking world, there are three gradations: watch, chronograph and chronometer. A chronometer is a particularly accurate watch that has been tested and received a special certificate. A regular watch is designed to display the current time and can show up to 12 hours on the dial. A chronograph is a watch that can measure and record time intervals.']
   },
   {
    id: 17,
    title: 'Once upon a time there were 30 hours in a day',
    texts: ["In South America, near the highest lake in the world, Titicaca, there are ruins of the ancient Indian city of Tiaguanaco. In this city were found the so-called “Gate of the Sun”, the most famous monument of Indian culture. German researchers have unraveled the mysterious sculptures carved on the “Sun Gate”: it is the oldest calendar in the world. In their opinion, the calendar refers to the time when our Earth rotated slower, making 290 revolutions per year. There were thirty hours in a day, twenty-four days in a month, and twelve months in a year. The “Gate of the Sun” has symbols of a solar eclipse, which was almost every day. The world learned about the deciphering of this calendar only in 1937. On the basis of the age of the “Sun Gate” we can make an assumption that a year of 290 days long existed in the period between the Second and previous pole shifts (5200 - 1600 BC), after which it became equal to 360 days. "]
   },
   {
    id: 18,
    title: 'Biorhythms are a special human clock',
    texts: ["The biological clock is a complex and incredibly precise mechanism. Each person has their own individual biological clock and varies from 22 to 25 hours. Larks are called people with a shortened biological cycle, and owls - with a lengthened one. It is interesting that during his life a person can be both an owl and a lark, because daily biorhythms during his life can change. nnMore than 300 different functions and processes controlled by the biological clock are already known: pulse, blood pressure, blood. It is interesting that human biorhythms are studied in so-called “time isolation” conditions, in which the subject is deprived of any information about time!  nnAnalysis of 147 experiments conducted by various researchers showed that regardless of the degree of physical exertion, nutrition and social contacts, the period of the body temperature rhythm under conditions of isolation from time is always more than 24 hours. Exactly more and almost never less.  nnA similar phenomenon is observed with respect to the rhythm “sleep-wake”, which in isolation conditions is also longer than 24 hours and sometimes stretches even up to 35 hours and more! "]
},
{
    id: 19,
    title: 'From birth, a person lacks time in the day',
    texts: ["It turns out that a person from the moment of birth is under severe stress - he constantly lacks at least an hour in the day. It is established that in the first days after birth children live on a 25-hour rhythm, and only in the future this rhythm is restructured to 24-hour. nnAccording to a famous cosmobiologist, this is one of the reasons for the aging of the human body. Why does the human's own clock, which appeared as an adaptation to daily changes in the external environment, have a period different from 24 hours? From the point of view of evolution, this is a clear paradox. There are many conjectures and assumptions here, which are still waiting for confirmation. nnWhat is important is the ability to feel one's “biological clock”. Not all people have the same ability. Some people have this clock working normally, others - lagging behind, and others, on the contrary, are in a hurry.  nnTo check the quality of their “biological clock”, scientists have proposed a test. To do this, you need to start a stopwatch and, without looking, count down the seconds to one minute, and then stop the stopwatch. If you test yourself in this way five times a day - at 8, 12, 16, 20 and 24 hours and three days in a row, you can clearly establish how accurately go your “biological clock”. As a rule, people with a “individual minute” duration of 63-69 seconds and a very high degree of adaptation to the environment, and they are usually characterized by good health. Those with a low “individual minute” score (46-47 seconds), on the other hand, are more likely to be stressed. The lower the “minute,” the more severe the illness. nnWho knows, maybe in the future, we will learn not only to turn back our internal chronometer at will, i.e. to become younger. "]
},
{
    id: 20,
    title: 'Did you know that time can stop?',
    texts: ["Distant galaxies are moving faster than nearby galaxies. Astrophysicists believe that the Universe is speeding up as it is constantly expanding, which is increasing.  nnThere is a theory that attributes this to a mysterious force in the universe known as “dark energy.” But a Spanish physicist has proposed an alternative theory: he believes that more distant, older galaxies are moving faster than nearby ones because time flowed faster in the past.  nnIf he is right, then in a few billion years, “everything will be frozen like a snapshot, forever.”"]
},
  {
    id: 21,
    title: "Story by unknown author: If only there were 30 hours in a day....",
    texts: [
      "Hypothesis: when you grow up, you have a longer day.",
      "It would seem that the regime - is our everything, if every day to lie down at the same time, every time to get up exactly on the clock, the body no longer needs an alarm clock, he himself as a clock. But as soon as you try to make in your days not 24 hours, but say 30, that's it, it's gone. You realize that you could easily live somewhere on another planet, it's even more convenient. At the same time it is still necessary to spend only 8 hours on sleep, that is, you sleep for 8 hours, and awake for 22. When you are awake for 20 hours and sleep for 4, then fatigue accumulates, you still need to sleep for 8 hours, but being awake for 16 hours is too little! So you live in a ridiculous rhythm, awake for 18 hours and sleep for 6."
    ]
  },
  {
    id: 22,
    title: "NON SYSTEM is ahead of the future",
    texts: [
      "The Earth's gravity interferes with time by slowing it down. Under the influence of luni-solar tides, the Earth slows down its rotation, and astronomical day increases, each century adding 3 milliseconds.",
      "Now there are 24 hours in a day, and in about 200 million years there will be 25. Maybe then mankind will stop complaining about the lack of time? And in the time of the dinosaurs, about 230 million years ago, there were only 23 hours in a day.",
      "How many millions of years ahead of the universe is the NON SYSTEM concept?"
    ]
  },
  {
    id: 23,
    title: "Time - 4th dimension",
    texts: [
      "Back in 1888 in The Time Machine, Herbert Welsh called time the 4th dimension. He was thinking of a mechanism for traveling in the 4th dimension: to be simultaneously in the present and in a million variations of the future. A character with these capabilities appears “for real” in one of the Men in Black movies.",
      "The simplest example of the existence of the fourth dimension is the pyramid of Cheops. If you stand next to the pyramid of Cheops and look through binoculars at the city, people will move faster for you. You won't see it, but faster. The curvatures are too small, but still the pyramid of Cheops is comparably large to a human being. This is because the pyramid is very large and massive and creates a large warp of space and time slows down a bit for you."
    ]
  },
  {
    id: 24,
    title: "“Only time belongs to us.”",
    texts: [
      "The Roman philosopher Seneca said, “Only time belongs to us.” Because time is subjective and only we determine how to feel and distribute it. That's why Bakkoura offers an additional scale for time management.",
      "We do not cancel or replace the usual 24 hours in a day, but we redistribute the minutes within the space so that you get an extra 6 “hours” per day at your disposal.",
      "That's how much you'll gain from the universe if you rearrange yourself to count on a 30-part scale. As we age, it seems to us that time goes faster. Scientists have proven that this is actually true. Time subjectively speeds up with the square root of age. So for a 40-year-old adult, one year goes by twice as fast as for a 10-year-old child. Given this pattern, the following four periods in life can be considered equal: 5-10 years (1×), 10-20 years (2×), 20-40 years (4×), 40-80 years (8×).",
      "In life only time belongs to us, so it is important to use it wisely and wisely, for this purpose Bakkoura has developed the NON SYSTEM dial."
    ]
  },
  {
    id: 25,
    title: "A parable about time!",
    texts: [
      "In some distant land there existed a being known as Time. It was unpredictable and free, rushing through space and eluding capture. People sought to capture Time in order to master it.",
      "One day, a wise man decided to go out in search of Time. He traveled to the valley of the vanished clock, where the ticking echoes of times past could be heard. There he found an old, dust-covered clock workshop.",
      "Inside, among the old clocks and gears, he saw a small, humble creature. It was the Old Man of Time. The Old Man sat in a corner and seemed tired and lonely.",
      "The wise man approached the Old Man of Time and asked: “Why are you so tired and lonely? After all, all people are striving to catch and possess you.”",
      "The Old Man of Time raised his wise eyes and replied, “I run so that I do not elude people, but I walk slowly enough so that they can enjoy the moment. I give everyone an equal amount of time, but everyone decides how to use it.”",
      "The wise man reflected and asked: “So what do you do so that you don't feel time slipping away?”",
      "The Old Man of Time smiled and said: “My dear friend, the secret is not to catch me or hold me back. The secret is learning to be in the present. Plan the future wisely, but don't forget to live for today.”"
    ]
  },
  {
    id: 26,
    title: "About deadline and redline",
    texts: [
      "The term “deadline” first appeared in the American press in the middle of the 19th century. It was used by journalists to refer to a deadline for submitting articles or materials for publication.",
      "It used to be the name of a line in a military prison, where a prisoner who crossed it was considered a fugitive and shot without warning. It's good that it's not the 19th century and crossing the deadline is not directly life-threatening.",
      "But not many people know that there is also a redline.",
      "Redline is an interim deadline for submitting work. Originally it was called a line that separates the danger zone, for example, during an accident. This red line must not be crossed, as there may be a danger to life or limb beyond it.",
      "In business, a redline is a deadline by which everything within a company must be ready. This is the red line beyond which it will no longer be possible to seriously improve the product. At most, you can fix the flaws. Between the redline and the deadline, time is left for revision."
    ]
  },
  {
    id: 27,
    title: "About decimal time",
    texts: [
      "In 1754, French mathematician Jean le Ronde d'Alamberte proposed dividing all units of time by ten. In 1788, French lawyer Claude Boniface Collignon proposed dividing the day into 10 hours, each hour into 100 minutes, each minute into 1,000 seconds, and each second into 1,000 levels.",
      "He also proposed a week of 10 days and dividing the year into 10 “solar months.”",
      "And the French Parliament decreed that the period “from midnight to midnight shall be divided into ten parts, each into ten others, and so on to the smallest measurable fraction of duration.”",
      "The system officially went into effect on November 24, 1793. Midnight began at zero o'clock (or 10 o'clock) and noon came at 5 o'clock. Thus, each metric hour became 2.4 conventional hours. Calculations became easier. Time could be written in fractions, for example, 6 hours and 42 minutes became 6.42 hours, and both values meant the same thing.",
      "To help people switch to the new time format, watch manufacturers began producing watches with dials showing both decimal and old time.",
      "To this day, there are still fans of decimal time. In 1897, mathematician Henri Poincaré made a compromise by keeping the 24-hour day. An hour, however, Poincaré divided into 100 decimal minutes each. The minutes were divided into 100 seconds. This project was not approved. In 1900 it was decided to abandon decimal time forever."
    ]
  },
  {
    id: 28,
    title: "24 vs 30",
    texts: [
      "Nothing will change for you, just by changing the settings you will become more efficient. Succeed more. Do more. It's all about the internal “ruler.”",
      "If you put your lunch on a small plate, it will seem like there is more food (this is a secret and a tip from many weight loss coaches). But after all, the amount of food won't change, it will just seem like a lot to you and you'll eat less. So it is with a day that has 30 parts. The total number of minutes won't change, but you'll put them on a smaller plate (12 minutes less usually) and it will seem like more time - you can get more done and get more done.",
      "NON SYSTEM is not to reconcile time, but to live your life more efficiently. An hour here is the usual 48 minutes, which in 24 hours will buy you as much as 6 hours of extra time.",
      "The 24 Hour System:",
      "● Alien rules.",
      "● Hasn't been updated since the 2nd century AD.",
      "● Already lagging behind.",
      "30-part system:",
      "● Your life - your rules.",
      "● Future time.",
      "● Gives you acceleration."
    ]
  },
  {
    id: 29,
    title: "Problem solving",
    texts: [
      "That's the point of the NON SYSTEM - it's your choice. If you see a problem, you can solve it. If you're stressed about time, you can maximize it with a 30-hour clock.",
      "Huge to-do lists can increase anxiety. The secret, psychologists say, is that when you realize that time is limited, it's easier to focus and do things you enjoy.",
      "Favorite activities can also be categorized. Writer and entrepreneur Darius Foro's “six-spokes theory” would work for this.",
      "● Body. What are some of your favorite activities that improve your health and give you energy?",
      "● Mind. What sets you on a positive wave?",
      "● Love. Who do you enjoy spending time with?",
      "● Work. What tasks bring you satisfaction?",
      "● Money. How do you like to spend your money?",
      "● Play. What hobbies and activities lift your spirits?"
    ]
  },
  {
    id: 30,
    title: "Not only time, but also the calendar is not linear",
    texts: [
      "Islamic countries live according to the Hijra. Counting began from the first emigration of Muslims to the holy places in Medina in 622 and the lunar calendar is used. A year on the Islamic calendar is 354 or 355 days.",
      "Thailand lives on the lunar Buddhist calendar. They are now in the year 2565. Why is that? Because the calendar began when Buddha attained nirvana.",
      "In Israel, both Gregorian and Jewish calendars are officially used. The Jewish one starts counting from the appearance of the first new moon in the sky. It was first recorded on October 7, 3761 B.C. Therefore, the Jewish calendar is now 5780 years.",
      "Ethiopia. The ancient calendar of Alexandria became the founder of the Ethiopian calendar, which lags behind the Gregorian calendar by 8 years. The Ethiopian calendar has 13 months - 12 months have exactly 30 days each, while the 13th month has 5 or 6 (depending on the leap year).",
      "Japan uses the official calendar and the Gregorian calendar. The official one always starts after the reign of the next emperor is announced, who gives a motto for the time of his reign. There it is now 31 years and the “Age of Peace and Tranquility.”",
      "In Iran and Afghanistan, the Persian calendar is now 1398.",
      "Several other Asian countries use the Chinese calendar: Mongolia, Cambodia, Vietnam and others. Now there 4717 year. The Chinese calendar began with the year of the beginning of the reign of Emperor Huangdi in 2637 BC.",
      "North Korea's calendar is called Juche, began its chronology from the birthday of the country's eternal president Kim Il Sung in 1912. It is now 108 years old."
    ]
  }
];

export const Concept30hTexts = [
  {
    id: 1,
    title: `Be free, as you were created to be, to realize what you were created to do`,
    texts: ["\"Whoever controls time controls life. Using new concepts is the first and most correct step into the future. We gave customers the opportunity to redistribute time to make room for something they need\" Jihad Bakkoura",
"30H is convenient for adventurers and dreamers who feel the pressure of living in a 24-hour system.",
"Time is a top-secret account opened by God in your Name. Own time is the only personal account you will never get to know anything about. ",
"How much did the Supreme creator gift you? How much is left?",
"The only we can do is manage \"expenses\". Don't let the time run out and reduce your life account to null ahead of time! After all, life is measured in deeds, not in hours.", 
"We collected 12 minutes from each hour and got an additional 6 \"hours\" of life! The dial of each model is divided into 30 parts. The concept does not cancel but makes it possible to redistribute time during the day more efficiently. ",
"30H is not just a watch, but a time management technique that helps to correctly redistribute time without exposing the body to stress.",
"We never know where we are wasting time. Crises and inflation are killing business.  Time is an uncontrollable inflation of life.  30h –with a wise approach, it will become your 3rd hand.",
"30H is like a pizza. It can be divided into 6 parts, 8 or 10. The diameter does not change but you can feed more people without any waste.",
"30H is like a sandglass.  There is a strict number of grains of sand inside and they fall at the right speed, because the narrow neck. We didn't change the number of grains we narrowed the neck.",
"30H is like a jar. There are big stones, small ones, and sand — these are deeds of your life. Imagine if you put sand first, then small, and then large stones - how much will fit? But if to do it the other way - may fit much more.",
"The same way the watch divided into 30 parts works - redistribute time to make room for something necessary." ],
  }
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
      `Jihad Bakkoura:"I trust in God." Jihad has a strong attention to time and detail. He has a distinctive personality represented in his crazy ideas in a world driven by madness and ruled by reason. Bakkoura is known for his love of fine art, he is a thinker, poet, clothing and watch designer, and a successful businessman. He founded the Bakkoura Dynasty, which includes several companies and projects in various fields. Throughout his professional career, Bakkoura has demonstrated a love for the philosophy of innovative challenge. He has launched two different campaigns: the first one is called "Decipher Time Together" and the second one is to redefine the names of time so that we can touch it.He introduced a new philosophy of time, saying: "Time is the third hand". In this context, he believes that time is divided into feelings, evaluated by values, and measured by achievements. `,
      `Bakkoura emphasizes the importance of valuing and subtracting time, saying: "Time is collected only by subtraction." He is against half-hearted decisions and believes that the limits we set are an illusion. In business, communication is the art of success.His experience in the world of luxury watches spans over 20 years.His journey started as a buyer, then he became a distributor, then the owner of Franc Vila brand and finally created his own brand "Bakkoura" which is a combination of wisdom and magic.He developed the "Nun Time" system, which he believes keeps pace with the age of speed, and in some of his designs he decided to use the rotation of the hands as time decreases rather than increases.Bakkoura distinguishes himself by being associated with the city of Damascus, and his designs tell stories that combine the charm of the East with the subtlety of the West.In this regard, he says, "Every Bakkoura design has a story in it that tells what your grandmother used to tell you."Jihad says, "Yes, the devil lived in the details before I drove him out of them."Our proof of this is Bakkoura.`,
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
      `Someone who looks like us is one of us. We strive to earn our existence`,
    ],
  },
];

export const FrancVillaTexts = {
  id: 1,
  title: `FrancVila`,
  date: '07:08.2023 - Jihad Bakkoura',
  image: Images.Svg.francVila,
  texts: [
    `Concept caliber FVn81 with manual winding, power reserve of 43 hours, equipped with a tourbillon and an alarm clock. These timepieces live for everyone who has achieved success. And it doesn't matter who he is: an athlete, a politician, the head of a mafia clan, a star or an IT specialist. The company specializes in the production of all swiss watches with complications in super-limited series of 4, 8, 48 and 88 copies, which guarantees an exclusive high-tech design and a bright personality. The FRANC VILA watch is a mechanic created by a philosopher.`,
    `Businessman, Poet, Designer, Creator Of Revolutionary Watch Concepts Of Time.Jihad Bakkoura Continues To Write A Story That Began In 2004 In Spain With No Less Passion And Imagination.He Has Come Up With An Exciting New Life For Each Model.`,
    `A globally recognized independent all Swiss luxury watch brand. The philosophy behind the Franc Vila brand is pure perfection. Innovation, creativity and excellency are our fundamental principles. Our aim is to create a complete range of watch complications presented in a strong, contemporary and - above all - unique design.«Exclusivity is the heart of luxury».`,
    `The case in the form of an inverted "figure eight" later became a distinctive feature of Franc Vila watches.The symbol has an infinite number of meanings.This is infinite confidence, this is completeness and individuality.`,
     ],
};
export const RecommendationViewData = {
  id: 1,
  title: `New Era of Bakkoura Dynasty`,
  date: '07:08.2023 - Jihad Bakkoura',
  image: Images.Img.rec1,
  texts: [
    `Concept caliber FVn81 with manual winding, power reserve of 43 hours, equipped with a tourbillon and an alarm clock. These timepieces live for everyone who has achieved success. And it doesn't matter who he is: an athlete, a politician, the head of a mafia clan, a star or an IT specialist. The company specializes in the production of all swiss watches with complications in super-limited series of 4, 8, 48 and 88 copies, which guarantees an exclusive high-tech design and a bright personality. The FRANC VILA watch is a mechanic created by a philosopher.`,
    `Businessman, Poet, Designer, Creator Of Revolutionary Watch Concepts Of Time.Jihad Bakkoura Continues To Write A Story That Began In 2004 In Spain With No Less Passion And Imagination.He Has Come Up With An Exciting New Life For Each Model`,
    `A globally recognized independent all Swiss luxury watch brand. The philosophy behind the Franc Vila brand is pure perfection. Innovation, creativity and excellency are our fundamental principles. Our aim is to create a complete range of watch complications presented in a strong, contemporary and - above all - unique design.«Exclusivity is the heart of luxury»`,
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
    texts: [ "There were two events in my life, the first made me think about the matter of time, the second pushed me to actively study the issue. In one of my projects, the question arose about the execution of the contract and it turned out that I and the contractors had a different understanding of the deadlines specified in the contract. ",
      "At the same time, we were both right. At that moment, I thought that time is not what we see on the clock or on the calendar, but what we understand. How fast is it? And slowly? Someone has a minute, someone has a second. Time has no limits. And the second event in my life is when my mother left me and this earth.",
      "Then I decided that studying and developing the concepts of time is something that is not only interesting to me, but also important. When we lose a loved one, time stops at first, as if, then you realize, even if it was 50-80 years, it's incredibly small. Because our life is a memory, we know and remember our lives only by time intervals.",
      "Take away a person's time, he will have no memory left, and when memory goes away, life goes away... It's not for nothing that they say, as long as you remember a person, he continues to live. Because you're giving him time.",
"Jihad Bakkur's 25 Thoughts on Life, Man and the Clock.",
"Happiness is in harmony. And harmony is in confidence. You have to believe in yourself first to find harmony.",
"To become successful, you need to get to know the taste of money, it is the best driver.",
"In ancient times, an influential person always had his seal, the seal of authority in our century is an exclusive watch.",
"You can believe it, you cannot believe it. But it is indispensable to try!",
"We forget to take pride in the fact that we are all really just people. Being proud of our surroundings (passport, nation, family name) means be not an unique but following someone else's idea.",
"It is scary to become a hostage to success, it is important to remain free and in control of life, not to let circumstances dictate terms.",
"Our souls are alive. The soul has its own needs, and it governs us. When it's time to rest or change business, we feel bad. When we do everything \"according to our soul\", we find happiness.",
"Man and it’s time are one.",
"It is important to learn not to waste time, but to appreciate what is left. Only when you realize what you are losing, you do begin to live life to the fullest.",
"Time is a testimony that God goes hand in hand with man on earth. It is intertwined with man's life and body, the resource of which is also measured by time. We should cure time as well as body.",
"Time should be joyful and well spent. The body - healthy.  Spirit - strong.",
"God sends a soul to earth and gives it a body. With the soul time is born. I create the watch, it is the body of time.",
"To inspire means to ensoul. Without you, there would be no us. My watch is inspired by your life.",
"Learn to mention every moment so you don't lose a precious second of your life.",
"Even just a glance at a luxury item can create a mood.",
"Every person is already a brand.",
"In the universe, everything is a matter of time! The one who controls time controls life.",
"God gives us two priceless gifts at birth: life and time.",
"Final is the beginning.",
"The universe does not know the word \"if.\" I don't believe in coincidence. History goes exactly the way you mean it.",
"Now is all we have. Manage the moment and be the center, not in the center.",
"Each person's story is unique. It cannot be faked, cannot be confused, cannot be repeated.",
"We live in a three-dimensional world. Everything has three sides: the good, the bad, and the hidden.",
"The only real luxury is the luxury of understanding one another.",
"Ideas and discoveries come to those who seek. I know, to see the shadow, you have to seek the sun."],
  },
];

export const RecommendationsData: TimeWealthDataType[] = [
  {
    id: 1,
    imageUrl: Images.Img.rec1,
    navigate: '',
    title: `Bakkoura Dynasty is success built on a personal brand JIHAD BAKKOURA`,
    texts: [
      'Concept caliber FVn81 with manual winding, power reserve of 43 hours, equipped with a tourbillon and an alarm clock. ',
    ],
    date: '07:08.2023 - Jihad Bakkoura',
  },
  {
    id: 2,
    imageUrl: Images.Img.rec2,
    navigate: '',
    title: `Bakkoura Dynasty is success built on a personal brand JIHAD BAKKOURA`,
    texts: [
      'Concept caliber FVn81 with manual winding, power reserve of 43 hours, equipped with a tourbillon and an alarm clock. ',
    ],
    date: '07:08.2023 - Jihad Bakkoura',
  },
  {
    id: 3,
    imageUrl: Images.Img.rec3,
    navigate: '',
    title: `Bakkoura Dynasty is success built on a personal brand JIHAD BAKKOURA`,
    texts: [
      'Concept caliber FVn81 with manual winding, power reserve of 43 hours, equipped with a tourbillon and an alarm clock. ',
    ],
    date: '07:08.2023 - Jihad Bakkoura',
  },
  {
    id: 4,
    imageUrl: Images.Img.rec4,
    navigate: '',
    title: `Bakkoura Dynasty is success built on a personal brand JIHAD BAKKOURA`,
    texts: [
      'Concept caliber FVn81 with manual winding, power reserve of 43 hours, equipped with a tourbillon and an alarm clock. ',
    ],
    date: '07:08.2023 - Jihad Bakkoura',
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
