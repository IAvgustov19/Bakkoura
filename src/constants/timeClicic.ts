import {APP_ROUTES} from '../navigation/routes';

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
    title: 'The Book of The Time',
    info: 'Stories about the time...',
    navigate: APP_ROUTES.THE_BOOK,
    isbtn: false,
  },
  {
    id: 3,
    title: '30H concept',
    info: 'Stories about the time...',
    navigate: APP_ROUTES.CONCEPT_30H,
    isbtn: false,
  },
  {
    id: 4,
    title: 'Jihad Bakkoura',
    info: 'About the Founder...',
    navigate: APP_ROUTES.JIHAD_BAKKOURA_TIME_CLINIC,
    isbtn: false,
  },
];

export const TheBookTexts = [
  {
    id: 1,
    title: 'The Book of the Time',
    texts: [
      `Concept caliber FVn81 with manual winding, power reserve of 43 hours, equipped with a tourbillon and an alarm clock. These timepieces live for everyone who has achieved success. And it doesn't matter who he is: an athlete, a politician, the head of a mafia clan, a star or an IT specialist. The company specializes in the production of all swiss watches with complications in super-limited series of 4, 8, 48 and 88 copies, which guarantees an exclusive high-tech design and a bright personality. The FRANC VILA watch is a mechanic created by a philosopher.`,
      `Businessman, Poet, Designer, Creator Of Revolutionary Watch Concepts Of Time.Jihad Bakkoura Continues To Write A Story That Began In 2004 In Spain With No Less Passion And Imagination.He Has Come Up With An Exciting New Life For Each Model.`,
      `A globally recognized independent all Swiss luxury watch brand. The philosophy behind the Franc Vila brand is pure perfection. Innovation, creativity and excellency are our fundamental `,
    ],
  },
  {
    id: 2,
    title: 'principles.',
    texts: [
      `perfection. Innovation, creativity and excellency are our fundamental principles. Our aim is to create a complete range of watch complications presented in a strong, contemporary and - above all - unique design.«Exclusivity is the heart of luxury». The case in the form of an inverted "figure eight" later became a distinctive feature of Franc Vila watches.The symbol has an infinite number of meanings.This is infinite confidence, this is completeness and individuality.`,
      `A globally recognized independent all Swiss luxury watch brand. The philosophy behind the Franc Vila brand is pure perfection. Innovation, creativity and excellency are our fundamental principles. Our aim is to create a complete range of watch complications presented in a strong, contemporary and - above all - unique design.«Exclusivity is the heart of luxury». The case in the form of an inverted "figure eight" later became a distinctive feature of Franc Vila watches.The symbol has an infinite number of meanings.This is infinite confidence, this is `,
    ],
  },
  {
    id: 3,
    title: 'completeness and individuality.',
    texts: [
      `fundamental principles. Our aim is to create a complete range of watch complications presented in a strong, contemporary and - above all - unique design.«Exclusivity is the heart of luxury». The case in the form of an inverted "figure eight" later became a distinctive feature of Franc Vila watches.The symbol has an infinite number of meanings.This is infinite confidence, this is completeness and individuality.fundamental principles.`,
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
