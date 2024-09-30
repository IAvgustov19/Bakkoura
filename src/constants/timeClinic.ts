import { ImageSourcePropType } from 'react-native';
import { Images } from '../assets';
import { APP_ROUTES } from '../navigation/routes';

import {t} from '../i18n'

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
    title: `${t('Podcast')}`,
    navigate: APP_ROUTES.PODCASTS,
    info: `${t('Stories about')}`,
    isbtn: false,
  },
  {
    id: 2,
    title: `${t('Consultation')}`,
    navigate: APP_ROUTES.CONSULTATION,
    info: `${t('Make an appointment for a consultation')}`,
    isbtn: false,
  },
  {
    id: 3,
    title: `${t('The Book of The Time')}`,
    info: `${t('A book about time')}`,
    navigate: APP_ROUTES.THE_BOOK,
    isbtn: false,
  },
  {
    id: 4,
    title: `${t('Reccomendations')}`,
    info: `${t('Important tips with mesmerizing images')}`,
    navigate: APP_ROUTES.RECOMMENDATION,
    isbtn: false,
  },
  {
    id: 5,
    title: `${t('About Time')}`,
    info: `${t('A variety of quotes, divided into categories')}`,
    navigate: APP_ROUTES.ABOUT_TIME,
    isbtn: false,
  },
];

export const AboutTimeData: AboutTimeType[] = [
    {
      id: 1,
      title: "Time and feelings",
      navigate: APP_ROUTES.ABOUT_TIME_INFO,
        info: [
          {
            text: "Through love, time passes unnoticed, and through time, love passes unnoticed.",
            author: "- Dorothy Parker"
          },
          {
            text: "Time strengthens friendship but weakens love.",
            author: "- Albert Einstein"
          },
          {
            text: "If love kills time, then time takes revenge and kills love.",
            author: "- Margaret Thatcher"
          },
          {
            text: "When you sit next to a pretty girl, an hour seems like a minute, but when you sit on a hot griddle, a minute seems like an hour.",
            author: "- Albert Einstein"
          },
          {
            text: "We live by deeds, not years; in thought, not breath; by sensations, not numbers on a dial. We should count time by heartbeat. He who thinks the most, feels the noblest, acts the best lives the most.",
            author: "- Aristotle"
          },
          {
            text: "Time cannot be stopped, but for the sake of love it sometimes stops.",
            author: "- Pearl Buck"
          },
          {
            text: "The length of time depends on our mood. The dimensions of space are conditioned by our consciousness.",
            author: "- Hong Zichen"
          },
          {
            text: "There is no time - life is so short - for squabbles, apologies, acrimony and calls to account. There is only time to love, and for that, so to speak, there is only a moment.",
            author: "- Mark Twain"
          },
          {
            text: "True feeling will stand the test of time.",
            author: "- Eric Segal"
          },
          {
            text: "There is a time to work, and there is a time to love. There is no other time.",
            author: "- Coco Chanel"
          },
          {
            text: "Time spent with a woman cannot be called time lost.",
            author: "- Andre Morois"
          },
          {
            text: "Time soothes, time clarifies, no mood can remain unchanged for hours on end.",
            author: "- Thomas Mann"
          },
          {
            text: "Time does not pass in vain or roll on without any effect on our senses: it does marvelous things in the soul.",
            author: "- Juan Trippe"
          },
          {
            text: "Time cures love's longing.",
            author: "- Ovid"
          }
        ]
      },
      {
      id: 2,
      title: "Philosophical quotes",
      navigate: APP_ROUTES.ABOUT_TIME_INFO,
        info: [
          {
            text: "Time cures everything. What if time itself is the disease?",
            author: "- Cecilia Ahern"
          },
          {
            text: "Time goes slow when you're watching it. It senses the tracking. But it takes advantage of our absent-mindedness. It is even possible that there are two times: the one we follow and the one that transforms us.",
            author: "- Albert Camus"
          },
          {
            text: "Time is illusory. Lunchtime is even more illusory.",
            author: "- Ernest Hemingway"
          },
          {
            text: "Time changes everything except life and death.",
            author: "- Antri Bergson"
          },
          {
            text: "Time lightens everything.",
            author: "- Sophocles"
          },
          {
            text: "Time is the school in which we learn, time is the flame in which we burn.",
            author: "- Delmore Schwartz"
          },
          {
            text: "Time is a perpetual motion machine that no one has invented.",
            author: "- Ronald Reagan"
          },
          {
            text: "Time is the ball, become a strong stick to win the game.",
            author: "- Rudaki"
          },
          {
            text: "Time is the wisest counselor.",
            author: "- Pericles"
          },
          {
            text: "Time is the longest distance between two places.",
            author: "- Tennessee Williams"
          },
          {
            text: "Time is the most honest critic.",
            author: "- A. Morois"
          },
    {
      text: "Time is a storm in which we are all lost.",
      author: "- William Carlos Williams"
    },
    {
      text: "There are no secrets that time does not reveal.",
      author: "- Jean Racine"
    },
    {
      text: "The present tense has one advantage over all others - it is our own.",
      author: "- Charles Colton"
    },
    {
      text: "Time is like a child led by the hand: looking backward....",
      author: "- Julio Cortázar"
    },
    {
      text: "The timing is always important. If it's too early, no one will understand. If it's too late, everyone will forget.",
      author: "- Anna Wintour"
    },
    {
      text: "Time has the great power of giving everything legitimacy - even in the realm of morality.",
      author: "- Henry Louis Mencken"
    },
    {
      text: "The two strongest warriors are patience and time.",
      author: "- Leo Tolstoy"
    },
    {
      text: "Time is the test of all inclinations, all feelings, all connections.....",
      author: "- Vissarion Belinsky"
    },
    {
      text: "I never think about the future: it comes quickly enough as it is.",
      author: "- Albert Einstein"
    },
    {
      text: "Time is a great healer, but a bad beautician.",
      author: "- Lucille S. Harperer"
    },
    {
      text: "Time is plentiful, but it cannot be spared.",
      author: "- Charles W. Chesnutt"
    },
    {
      text: "Everything flows, everything changes.",
      author: "- Heraclitus"
    },
    {
      text: "The only reason for the existence of time is so that everything doesn't happen at the same time.",
      author: "- Albert Einstein"
    },
    {
      text: "Time and health are two precious assets that we don't recognize or appreciate until they are exhausted.",
      author: "- Denis Waitley"
    },
    {
      text: "Time is a created thing. To say: I don't have time is like saying: I don't want it.",
      author: "- Lao-tzu"
    },
    {
      text: "Time is the fabric of which life is made.",
      author: "- Benjamin Franklin"
    },
    {
      text: "If we were to become faster than time, we might become slower than life.",
      author: "- Stanislaw Jerzy Lec"
    },
    {
      text: "The power of time is a law worthy of respect.",
      author: "- Publius Cyrus"
    },
    {
      text: "A perfect clock runs regularly. Perfect time is faster or slower.",
      author: "- Stanislaw Jerzy Lec"
    },
    {
      text: "Time reveals everything hidden and hides everything manifest.",
      author: "- Sophocles"
    },
    {
      text: "The clock is the enemy: the more you look at it, the slower time flows.",
      author: "- Albert Camus"
    },
    {
      text: "Clocks do not show time, but symbolize it.",
      author: "- Bruce Robertson"
    },
    {
      text: "Clocks are not in a hurry - time is in a hurry.",
      author: "- Carl Jung"
    },
    {
      text: "A minute lost cannot be regained even by eternity itself.",
      author: "- Socrates"
    },
    {
      text: "Time has only one problem - sooner or later it expires.",
      author: "- Chuck Palahniuk"
    },
    {
      text: "Only time never runs out of time...",
      author: "- Sándor Petőfi"
    },
    {
      text: "He who has lived long has lived well, and time spent wrongly is not lived but lost.",
      author: "- Thomas Fuller"
    },
    {
      text: "Haste is bad already in that it takes up a great deal of time.",
      author: "- Gilbert Chesterton"
    },
    {
      text: "The sun burns every day. It burns up Time. The universe goes round and round on its axis. Time burns up years and people...",
      author: "- Ray Bradbury"
    },
    {
      text: "Listening to the ticking of the clock, we notice that time is ahead of us.",
      author: "- Ramon Gomez de la Serna"
    },
    {
      text: "With each new minute, a new life begins for us.",
      author: "- Jerome Clapka Jerome"
    },
    {
      text: "Waste of time is the worst of all evils.",
      author: "- C. Cantu"
    },
    {
      text: "Look at the clock. The hands run only forward. Do you know why? Because the past no longer has any meaning...",
      author: "- Joe Kennedy"
    },
    {
      text: "According to the laws of physics, if you procrastinate, time will inevitably run out of time later.",
      author: "- Sándor Petőfi"
    },
    {
      text: "Postponement is the thief of time.",
      author: "- E. Jung"
    },
    {
      text: "Time can be taken away, time cannot be shared.",
      author: "- Sándor Petőfi"
    },
    {
      text: "No one has ever been able to stop time, not even God.",
      author: "- Carl Jung"
    },
    {
      text: "Autumn, winter, spring and summer fly by, imperceptibly replacing each other. Each of us does not even notice the flight of time, immersed in the labor of everyday life.",
      author: "- Akio Morita"
    },
    {
      text: "One of the most irreplaceable losses is the loss of time.",
      author: "- J. Buffon"
    },
    {
      text: "We must learn to get four hours of sleep. Then we will have more time for idleness.",
      author: "- Bill Wilson"
    },
    {
      text: "There is no space and time, but their unity.",
      author: "- Albert Einstein"
    },
    {
      text: "There is no greater evil than the waste of time.",
      author: "- Michelangelo"
    },
    {
      text: "You can't live through time vertically. Time is such a thing that flows horizontally.",
      author: "- Fyodor Bondarchuk"
    },
    {
      text: "Some moments have the flavor of eternity.",
      author: "- Mark Levy"
    },
    {
      text: "Don't try to spend time. Time will not be spent.",
      author: "- James Joyce"
    },
    {
      text: "The present tense is fraught with the future.",
      author: "- W. Leibniz"
    },
    {
      text: "We do not choose the times, we can only decide how to live in the times that have chosen for us.",
      author: "- John Ronald"
    },
    {
      text: "Music is for me a favorite means of time travel and the fastest way to go back in time.",
      author: "- Frédéric Begbeder"
    },
    {
      text: "We cannot choose the time in which we live. We can only choose what we do with the time we are given.",
      author: "- Tadao Yamaguchi"
    },
    {
      text: "We are doomed to kill time - that is how we gradually die.",
      author: "- Octavio Paz"
    },
    {
      text: "I've always been stopped by time. Too much - then, too little - now...",
      author: "- Pete Rozell"
    },
    {
      text: "I resent that the precious hours of our lives, those marvelous moments that will never come back, are wasted aimlessly on sleep.",
      author: "- Jerome Clapka"
    },
    {
      text: "Of all critics, the greatest, the most brilliant, the most infallible is time.",
      author: "- Vissarion Belinsky"
    },
    {
      text: "Out of an age that knew no hope, an age that knows no fear is born.",
      author: "- Alfred de Musset"
    },
    {
      text: "Of all things, time is least of all ours, and most of all we lack it.",
      author: "- J. Buffon"
    },
    {
      text: "There are many ways to kill time - and none to resurrect it.",
      author: "- Henry Ford"
    },
    {
      text: "The arguments of time are stronger than the arguments of reason.",
      author: "- Thomas Paine"
    },
    {
      text: "It takes one day for a major evil to appear, but it takes several centuries to wipe it out.",
      author: "- L. Blanqui"
    },
    {
      text: "The two greatest tyrants on earth: chance and time.",
      author: "- Johann Herder"
    },
    {
      text: "It is said that time is a good teacher. But in the end it kills all its students.",
      author: "- Sándor Petőfi"
    },
    {
      text: "The years, running by, take from us one thing after another.",
      author: "- Horace"
    },
    {
      text: "Dies in the flow of time only that which is devoid of a strong grain of life and that, therefore, is not worth living.",
      author: "- V. Belinsky"
    },
    {
      text: "Yesterday is history. Tomorrow is a mystery. Today is a gift.",
      author: "- Harvey Milk"
    },
    {
      text: "To choose time is to save time, and what is done untimely is done in vain.",
      author: "- Francis Bacon"
    },
    {
      text: "Everything has its time and it is not worth rushing it.",
      author: "- Janusz Wiszniewski"
    },
    {
      text: "Everything has its time. A time to destroy and a time to build. A time to be silent and a time to speak.",
      author: "- Ray Bradbury"
    },
    {
      text: "What's important is never urgent. All that is urgent is only vanity.",
      author: "- Xiang Tzu"
    },
    {
      text: "All we have to decide is what to do with the time we have been given.",
      author: "- John Ronald Reuel Tolkien"
    },
    {
      text: "Time - confronted with memory, recognizes its disempowerment.",
      author: "- Joseph Brodsky"
    },
    {
      text: "Time is a marvelous thing. There is so much of it when you wait, and so little when you are late.",
      author: "- Sándor Petőfi"
    },
    {
      text: "Everything in life happens either on time or too late.",
      author: "- Simone Benke"
    },
    {
      text: "Everything is possible. The impossible just takes more time.",
      author: "- Ray Bradbury"
    },
    {
      text: "Everything seems attractive through the softening haze of time.",
      author: "- Jerome Clapka Jerome"
    },
    {
      text: "Everything must be done in time. Yesterday was too early, tomorrow will be too late.",
      author: "- Bernard Werber"
    },
    {
      text: "Everything comes in its own time for those who know how to wait.",
      author: "- Balzac"
    },
    {
      text: "Only one thing will put everything in its place - it is time, and one must accept it and move on.",
      author: "- Fyodor Bondarchuk"
    },
    {
      text: "Time cannot be wasted, everything serves for something, leads to something, teaches something.",
      author: "- Blanca Busquets"
    },
    {
      text: "Time doesn't heal - it just changes roles.",
      author: "- Alya Kudryashova"
    },
    {
      text: "Time is like a mosquito: it is well killed by a book.",
      author: "- Amerigo Bonasera"
    },
    {
      text: "Time is our friend and time is our enemy. It does not forgive when one's back is turned to it.",
      author: "- Janusz Wisniewski"
    },
    {
      text: "Time does not go backwards, that is why it is always so difficult to make a choice.",
      author: "- Salvador Dali"
    },
    {
      text: "Time flows through the fingers of downcast hands.",
      author: "- Gilbert Chesterton"
    },
    {
      text: "Time is not a stream, nor a collapse, nor space, but a merciless continuity of missed opportunities.",
      author: "- Meir Shalev"
    },
    {
      text: "Time eats metal but hardens the spirit.",
      author: "- Sándor Petőfi"
    },
    {
      text: "Time passes, but the spoken word remains.",
      author: "- L. Tolstoy"
    },
    {
      text: "Time passed so quickly, and went so slowly.",
      author: "- Mark Levy"
    },
    {
      text: "Time is inexorable, even if you somehow try to stop it.",
      author: "- Sam Walton"
    },
    {
      text: "Time never stands still, life is constantly evolving, human relationships are modified every fifty years.",
      author: "- Johann Goethe"
    },
    {
      text: "Time does not like to be wasted.",
      author: "- Ford Henry"
    }
  ]
},
{
    id: 3,
    title: "Time and people",
    navigate: APP_ROUTES.ABOUT_TIME_INFO,
  info: [
    {
      text: "Who does not know how to make good use of his time, he is the first to complain about its shortage: he kills days on dressing, eating, sleeping, empty conversations, on thinking about what should be done, and simply on doing nothing.",
      author: "- J. Labruyere"
    },
    {
      text: "No matter how fast time flies, it moves extremely slowly for one who only watches it move.",
      author: "- Samuel Johnson"
    },
    {
      text: "Sometimes you want to get away from someone or something, as time passes, we can never get it back...",
      author: "- Ruslan Yugov"
    },
    {
      text: "Woe to those peoples who obey time instead of commanding it.",
      author: "- Ludwig Bernet"
    },
    {
      text: "Time, which is so fleeting, the time that passes away irrevocably, is man's most precious possession, and to throw it away is the most subtle form of wastefulness.",
      author: "- Somerset Maugham"
    },
    {
      text: "Time heals everything, whether you want it to or not. Time heals everything, takes everything away, leaving only darkness at the end. Sometimes in that darkness we meet others, and sometimes we lose them there again.",
      author: "- Stephen King"
    },
    {
      text: "Time is relative for everyone because everyone perceives it differently.",
      author: "- Edmond Wells"
    },
    {
      text: "Time changes everything - except for something inside us that is always surprised by change.",
      author: "- Thomas Hardy"
    },
    {
      text: "Time flies faster the closer we get to old age.",
      author: "- E. Senancourt"
    },
    {
      text: "Time and chance can do nothing for those who do nothing for themselves.",
      author: "- D. Canning"
    },
    {
      text: "Time plays an important role in a person's life, during life a person fulfills different roles and it should be used competently.",
      author: "- Jacques Martin"
    },
    {
      text: "Time is the coin of your life. You have only this coin, and only you have the right to determine what it should be spent on. Beware lest someone else spend it for you.",
      author: "- Carl Sandberg"
    },
    {
      text: "Time is but a sequence of our thoughts. Our soul is capable of self-immersion, it can compose its own society.",
      author: "- N. Karamzin"
    },
    {
      text: "Time is a great master of cutting all the Gordian knots of human relations.",
      author: "- Alexey Pisemsky"
    },
    {
      text: "In all human life there is not a single minute in which it would be allowed to treat a person lightly and carelessly.",
      author: "- L. Pisarev"
    },
    {
      text: "Without the ability to possess time it is impossible to possess oneself.",
      author: "- John Steinbeck"
    },
    {
      text: "Time, which changes people, does not change the way we think of them.",
      author: "- Marcel Proust"
    },
    {
      text: "There is only one thing more valuable than our time, and that is who we spend it on.",
      author: "- Christopher Leo"
    },
    {
      text: "How we spend our time determines who we are.",
      author: "- Jonathan Estrin"
    },
    {
      text: "Everyone has their day, and some days are longer than others.",
      author: "- Winston Churchill"
    },
    {
      text: "The man who dares to waste an hour of time has not discovered the value of life.",
      author: "- Charles Darwin"
    },
    {
      text: "Modern man does not know what to do with the time and forces he has let loose.",
      author: "- Teilhard de Chardin"
    },
    {
      text: "Nothing can man dispose of to a greater extent than time.",
      author: "- L. Feuerbach"
    },
    {
      text: "How we spend our time determines who we are.",
      author: "- Jonathan Estrin"
    },
    {
      text: "Ordinary people think how to spend time, great people think how to use it.",
      author: "- Arthur Schopenhauer"
    },
    {
      text: "A man does not spare time by thinking that there is plenty of it.",
      author: "- Paulo Coelho"
    },
    {
      text: "A man finds time for everything he really wants.",
      author: "- F.M. Dostoevsky"
    },
    {
      text: "A man can do much more and act much better. He makes only one mistake - he thinks he has plenty of time at his disposal.",
      author: "- Carlos Castaneda"
    },
    {
      text: "A child's hour is longer than an old man's day.",
      author: "- Arthur Schopenhauer"
    },
    {
      text: "There are thieves who are not punished, but who steal from people the most valuable thing - time.",
      author: "- Benjamin Franklin"
    },
    {
      text: "The new becomes old, then the years will pass by - And the old will be replaced by the new: so it was, so it will always be.",
      author: "- Rudaki"
    },
    {
      text: "Regret for the unwisely wasted time to which people indulge does not always help them to use the rest of it wisely.",
      author: "- Jean de Labruyere"
    },
    {
      text: "Modern man believes that he loses something - time - when he does not do something fast enough. However, he doesn't know what to do with the time he squanders - he only knows how to kill it.",
      author: "- Erich Fromm"
    },
    {
      text: "The most valuable gift you can give someone is your time, because you are giving something away that you can never get back.",
      author: "- Che Guevara"
    },
    {
      text: "The wisest man is the one who is most annoyed by the loss of time.",
      author: "- Dante Alighieri"
    },
    {
      text: "Some period of time will pass, and you'll start to regret the time you wasted on a person who never really appreciated it.",
      author: "- Alice Romanova"
    },
    {
      text: "As I've gotten older, I realize how fleeting time is. I don't want to waste it. I want to spend time with the people I love and doing things that really mean something.",
      author: "- Brad Pitt"
    },
    {
      text: "Very few people know how to manage their wealth wisely, even fewer who know how to allocate their time, and of those two things, the latter is the most important.",
      author: "- Philip Chesterfield"
    },
    {
      text: "Take away an hour of a man's time, take away a man's life - the only difference is in the scale.",
      author: "- Frank Herbert"
    },
    {
      text: "Ordinary people trouble themselves only to pass the time; but whoever has any talent - to make use of the time.",
      author: "- Arthur Schopenhauer"
    },
    {
      text: "The inability to take care of one's own and other people's time is real uncultivation.",
      author: "- N. Krupskaya"
    },
    {
      text: "It is not time that changes people, but the circumstances passed during that time.",
      author: "- Theophrastus"
    },
    {
      text: "Perhaps the most important thing is to spend time with those who honestly want to spend time with you.",
      author: "- Tadao Yamaguchi"
    },
    {
      text: "Many of those for whom the day stretches too long lament that life is too short.",
      author: "- Charles Caleb Colton"
    },
    {
      text: "People often don't know what to do with time, but time knows what to do with people.",
      author: "- Mark Marronnier"
    },
    {
      text: "Love for the past tense is often nothing but hatred for the present tense.",
      author: "- Pierre Boiste"
    },
    {
      text: "Only a few out of hundreds of people can value their time.",
      author: "- Alfred Tennyson"
    },
    {
      text: "He who is attacked by his time is not yet sufficiently ahead of it - or behind it.",
      author: "- Friedrich Nietzsche"
    },
    {
      text: "No matter how rich a man may be, time still cannot be bought.",
      author: "- Haruki Murakami"
    },
    {
      text: "When a man has a lot of free time, he will accomplish little.",
      author: "- Xunzi"
    },
    {
      text: "He who does not know the value of time is not born for glory.",
      author: "- Luc de Vauvenargue"
    }
  ]
},
{
    id: 4,
    title: "Time immutability",
    navigate: APP_ROUTES.ABOUT_TIME_INFO,
  info: [
    {
      text: "The world is impossible without time, but time is also impossible without world.",
      author: "- Arthur Schopenhauer"
    },
    {
      text: "Time is infinite motion, without a single moment of rest - and it cannot be thought of otherwise.",
      author: "- Leo Tolstoy"
    },
    {
      text: "Time will always honor and support what is strong, but will turn to dust what proves to be unstable.",
      author: "- Anatole France"
    },
    {
      text: "Time and tide wait for no one.",
      author: "- Geoffrey Chaucer"
    },
    {
      text: "The future cannot come, for when it comes, it is already past.",
      author: "- Henrik Ibsen"
    },
    {
      text: "It does not run away from us, it flows to us. Whether you look forward to the next minute or do not realize it at all, it will come.",
      author: "- Anthony Surozhsky"
    },
    {
      text: "No matter how much we try, life runs faster than us, and if we are still slow, it passes, as if it was not ours, and, although it ends on the last day, leaves us daily.",
      author: "- Seneca"
    },
    {
      text: "A year is like a scrap of time, it is cut off, and time remains as it was.",
      author: "- Jules Renard"
    },
    {
      text: "All that time carries away in its course changes the name and form of things, their nature and destiny.",
      author: "- Plato"
    },
    {
      text: "Time has neither beginning nor end. Time is like the serpent Ouroboros, which has grasped its own tail with its teeth. Eternity is hidden in every moment. And eternity is made up of the moments that create it.",
      author: "- Andrzej Sapkowski"
    },
    {
      text: "Three things do not return: an arrow fired, a word spoken, and days gone by.",
      author: "- Georg Franklin Gaumer"
    },
    {
      text: "Where time exists, nothing can be taken back.",
      author: "- Haruki Murakami"
    },
    {
      text: "The new becomes old, then the years pass by - And the old is replaced by the new: so it was, so it will always be.",
      author: "- Rudaki"
    },
    {
      text: "Time has happened to us, life has happened to us, this is something that no one has ever been able to resist.",
      author: "- Elchin Safarli"
    },
    {
      text: "The hand of time has the power to tame.",
      author: "- John Henry Newman"
    },
    {
      text: "The problem with time is not its lack, but the fact that it can't be turned back.",
      author: "- Ray Bradbury"
    },
    {
      text: "Neither a river nor fleeting time can stop.",
      author: "- Ovid"
    },
    {
      text: "Nothing is longer than time, since it is the measure of eternity; nothing is shorter than it, since it is lacking for all our endeavors... All men neglect it, all regret its loss.",
      author: "- Voltaire"
    },
    {
      text: "It is impossible to stop time: the clock industry will not allow it.",
      author: "- Stanislaw Jerzy"
    },
    {
      text: "One can regret better times, but one cannot escape one's time.",
      author: "- Michel de Montaigne"
    },
    {
      text: "If the cosmos has an infinite supply of time, it doesn't just mean that anything can happen. It means that everything will actually happen someday.",
      author: "- Erlend Lu"
    },
    {
      text: "Time is like grains of sand that fall through the fingers of life, it is impossible to count them, but someday the palm of consciousness will be empty, the grains of sand will merge with each other and form eternity.",
      author: "- Oleg Tishchenko"
    },
    {
      text: "Time is an ocean, not a river. Why chase the wave if it will come to naught anyway?",
      author: "- Rosalind Fly"
    },
    {
      text: "Time is the Universe's way of testing our desires for truth. That's probably why we almost never get everything at once.",
      author: "- Elchin Safarli"
    },
    {
      text: "Time is just a fourth dimension? A small dot at the end of an hour arrow - the length of an instant, the width of existence, the height of infinity.",
      author: "- Howard Inlet"
    },
    {
      text: "Time doesn't flow like a river that you can't enter twice. It is like circles diverging on the water.",
      author: "- Thomas Watson"
    },
    {
      text: "Time is as motionless as a shore: it seems to us to be running, but on the contrary, we are passing.",
      author: "- Pierre Boiste"
    },
    {
      text: "Time seems to me an immense ocean, which has swallowed up many great writers, caused accidents to others, and shattered some.",
      author: "- D. Addison"
    },
    {
      text: "There is a time for everything: its hour for conversation, its hour for rest.",
      author: "- Homer"
    },
    {
      text: "Time does not wait and does not forgive a single lost moment.",
      author: "- N. Garin-Mikhailovsky"
    },
    {
      text: "Time is eternal, and we pass.",
      author: "- Moses Safir"
    },
    {
      text: "Time is a moving image of motionless eternity. Everything that breaks the unity of society is worthless; all establishments that put man at odds with himself are worthless.",
      author: "- Jean-Jacques Rousseau"
    },
    {
      text: "Time is passing! - you are accustomed to say because of the established wrong notion. Time is eternal: pass you by!",
      author: "- Bob Marley"
    }
  ]
},
{
    id: 5,
    title: "Time and wisdom",
    navigate: APP_ROUTES.ABOUT_TIME_INFO,
    info: [
    {
      text: "The wisest are most annoyed at the loss of time.",
      author: "- Dante Alighieri"
    },
    {
      text: "The loss of time is hardest on him who knows more.",
      author: "- I. Goethe"
    },
    {
      text: "Wisest of all is time, for it reveals everything.",
      author: "- Thales of Miletus"
    },
    {
      text: "Nine-tenths of all wisdom consists in the wise disposition of time.",
      author: "- Theodore Roosevelt"
    },
    {
      text: "Where the mind is powerless, time often helps.",
      author: "- Seneca Lucius Aeneas"
    },
    {
      text: "Everything matures only with time; no one is born wise.",
      author: "- Miguel de Cervantes"
    }
  ]
},
{
    id: 6,
    title: "Time and the flow of life:",
    navigate: APP_ROUTES.ABOUT_TIME_INFO,
  info: [
    {
      text: "Time marvelously shows us what really matters.",
      author: "- Margaret B. Peters"
    },
    {
      text: "One can only forget about time by spending it usefully.",
      author: "- Charles Baudelaire"
    },
    {
      text: "What good is immortality to a man who cannot make good use of even half an hour?",
      author: "- Ralph Waldo Emerson"
    },
    {
      text: "They say time heals all wounds. I disagree. The wounds remain. Over time, the mind, protecting its sanity, covers them with scar tissue, and the pain diminishes. But it never goes away.",
      author: "- Rose Kennedy"
    },
    {
      text: "Every day is a bank account, and time is our currency. No one is rich, no one is poor, we each have 24 hours.",
      author: "- Christopher Rice"
    },
    {
      text: "Life is a very short time between two eternities.",
      author: "- Thomas Carlyle"
    },
    {
      text: "If you love life, don't waste time, because life is made up of time.",
      author: "- Benjamin Franklin"
    },
    {
      text: "Time is a very deceptive thing. All there ever is is now. We can have experiences from the past, but we can't relive them; and we can hope for the future, but we don't know if there is one.",
      author: "- George Harrison"
    },
    {
      text: "As long as we put off life, it flies by.",
      author: "- Seneca"
    },
    {
      text: "Time wasted is existence; time used usefully is life.",
      author: "- E. Jung"
    },
    {
      text: "You have in life what you give more time to.",
      author: "- Menander"
    },
    {
      text: "Whoever said that time heals all wounds has lied. Time only helps you learn to bear the blow and then live with those wounds.",
      author: "- The Age of Adaline"
    },
    {
      text: "While we are thinking how to kill time, time is killing us.",
      author: "- Alphonse Allee"
    },
    {
      text: "First we kill time all our lives, and then it turns out that in fact everything happened exactly the opposite - it was time that slowly and imperceptibly killed us.",
      author: "- Pavel Kornev"
    },
    {
      text: "The successive years steal something from us every day, until finally they steal us.",
      author: "- Alexander Poka"
    },
    {
      text: "Sooner or later, everything happens to everyone - if only there were enough time.",
      author: "- George Bernard Shaw"
    },
    {
      text: "The first hour that gave us life has shortened it.",
      author: "- Charlie Chaplin"
    },
    {
      text: "Nothing belongs to us, only our time.",
      author: "- Andre Morua"
    },
    {
      text: "Putting nothing off until tomorrow is the secret of someone who knows the value of time.",
      author: "- E. Laboulaye"
    },
    {
      text: "Don't waste time, it's the material of which life is made.",
      author: "- Frederic Begbeder"
    },
    {
      text: "We ask ourselves for a long life, and meanwhile only the depth of life and its high moments matter. Let us measure time with a spiritual measure.",
      author: "- R. Emerson"
    },
    {
      text: "How terrible it is to feel that the passage of time carries away all that you possessed.",
      author: "- B. Pascal"
    },
    {
      text: "What were the most important minutes of your life, you find out when it's too late.",
      author: "- Agatha Christie"
    },
    {
      text: "Life gives many things to think about, but little time.",
      author: "- John Austin"
    },
    {
      text: "Life and time are two teachers. Life teaches us how to manage time properly, time teaches us how to appreciate life.",
      author: "- Erich Maria Remarque"
    },
    {
      text: "Human life is multiplied by the sum of time saved.",
      author: "- F. Collier"
    },
    {
      text: "Life in general has only one bad property - limited time.",
      author: "- Andre Morois"
    },
    {
      text: "A tree, no matter how powerful and strong its roots, can be uprooted in an hour, but it takes years for it to bear fruit.",
      author: "- As-Samarqandi"
    },
    {
      text: "Everything in the world has its time, everything under heaven has its hour. There is a time to be born and a time to die, a time to sow and a time to uproot, a time to kill and a time to heal, a time to be silent and a time to speak, a time for war and a time for peace.",
      author: "- Bible"
    },
    {
      text: "Time is stretchable, it depends on what kind of content you fill it with.",
      author: "- S. Marshak"
    },
    {
      text: "Time should undoubtedly be measured by events, not by the number of hours that have passed.",
      author: "- Henry Rider Haggard"
    },
    {
      text: "Time heals wounds, though it does not rid us of scars.",
      author: "- Mark Levy"
    },
    {
      text: "Time is a strange thing, and life is even stranger. Somehow the wheels or cogs have turned wrong, and human lives have become intertwined too soon or too late.",
      author: "- Ray Bradbury"
    },
    {
      text: "Time is the same as money: don't squander it, and you'll have plenty of it.",
      author: "- Gaston Levis"
    },
    {
      text: "Time stretches and the years fly.",
      author: "- V. Zubkov"
    },
    {
      text: "Time doesn't matter, what matters is what you fill it with.",
      author: "- Che Guevara"
    },
    {
      text: "Time does not heal, it teaches. It teaches you to put up with the inevitable.",
      author: "- Bertrand Russell"
    },
    {
      text: "There are minutes for which you can give months and years.",
      author: "- A. P. Chekhov"
    }
  ]
},
{
    id: 7,
    title: "Time and happiness",
    navigate: APP_ROUTES.ABOUT_TIME_INFO,
        info: [
          {
            text: "We don't have time to be ourselves. There is only enough of it to be happy.",
            author: "- Albert Camus"
          },
          {
            text: "I'm not really interested in saving time, I prefer to enjoy it.",
            author: "- Eduardo Galeano"
          },
          {
            text: "Time lost with pleasure is not considered lost.",
            author: "- John Lennon"
          },
          {
            text: "I wish time would stretch faster and fly slower.",
            author: "- Bertrand Russell"
          },
          {
            text: "The happy count time in minutes, while for the unhappy it drags on for months.",
            author: "- James Cooper"
          },
          {
            text: "The happiest people on earth are those who can deal freely with time without fearing the consequences.",
            author: "- Kira Borg"
          },
          {
            text: "Days add up so quickly into weeks, weeks into months, and months into years that you don't even notice the happiest time of your life is gone.",
            author: "- M. Gorky"
          },
          {
            text: "Time is a mirage, it shrinks in moments of happiness and stretches in hours of suffering.",
            author: "- R. Aldington"
          }
        ]
      },
      {
        id: 8,
        title: "Time and business",
        navigate: APP_ROUTES.ABOUT_TIME_INFO,
            info: [
              {
                text: "Time is more valuable than money. You can get more money, but you can't get more time.",
                author: "- Jim Rohn"
              },
              {
                text: "The most valuable resource we have is time.",
                author: "- Steve Jobs"
              },
              {
                text: "Time is the most valuable thing a man can spend.",
                author: "- Diogenes"
              },
              {
                text: "We should use time as a tool, not a couch potato.",
                author: "- John F. Kennedy"
              },
              {
                text: "He who rules time rules the world.",
                author: "- Theodore Roosevelt"
              },
              {
                text: "Today those who have money have no time, and those who have time have no money.",
                author: "- B. Franklin"
              },
              {
                text: "The greatest waste one can make is a waste of time.",
                author: "- Theophrastus"
              },
              {
                text: "Not one minute of time can be bought with cash; if it could, the rich would live longer than anyone else.",
                author: "- O. Henry"
              },
              {
                text: "Wise allocation of time is the basis for every successful endeavor.",
                author: "- Jan Komensky"
              },
              {
                text: "Ideas are daughters of the past and mothers of the future and are always slaves of time!",
                author: "- Gustave Lebon"
              },
              {
                text: "If time is the most precious thing, then the waste of time is the greatest hustle.",
                author: "- B. Franklin"
              },
              {
                text: "An expensive watch does not create time, but reflects how precious it is to its owner.",
                author: "- M.A. Bulgakov"
              },
              {
                text: "Money is expensive, human life is even more expensive, but time is the most expensive.",
                author: "- Alexander Suvorov"
              },
              {
                text: "All economy ultimately boils down to saving time.",
                author: "- Karl Marx"
              },
              {
                text: "The time we have is the money we do not have.",
                author: "- Ilf and Petrov"
              },
              {
                text: "Time, unlike money, cannot be accumulated.",
                author: "- B. Krutier"
              },
              {
                text: "Time and money are mostly interchangeable.",
                author: "- Winston Churchill"
              },
              {
                text: "Time is the same as money: do not waste it, and you will have plenty of it.",
                author: "- Gaston Levis"
              },
              {
                text: "Time is like a skillful steward, constantly producing new talents to replace those that have disappeared.",
                author: "- Kozma Prutkov"
              },
              {
                text: "Time is the greatest of innovators.",
                author: "- Francis Bacon"
              },
              {
                text: "Time acts when it works, and it does not mean anything just like that.",
                author: "- Valery Popov Feast of nonsense"
              },
              {
                text: "Time is money. But no money will give time back.",
                author: "- Henry Ford"
              },
              {
                text: "The second you stop fighting time, it starts working for you.",
                author: "- Dr. John"
              }
            ]
          },
          {
            id: 9,
            title: "Motivational Quotes About Time",
            navigate: APP_ROUTES.ABOUT_TIME_INFO,
  info: [
    {
      text: "Keep time! Guard it any hour, any minute. Without supervision it will slip away like a lizard. Illuminate every moment with an honest, worthy accomplishment! Give it weight, meaning, light.",
      author: "- Mann Thomas"
    },
    {
      text: "Time passes, that's the trouble. The past grows and the future shrinks. There's less and less chance to do anything - and more and more resentment for what you didn't have time to do.",
      author: "- Haruki Murakami"
    },
    {
      text: "Time is long enough for him who uses it; he who labors and who thinks expands its limits.",
      author: "- Voltaire"
    },
    {
      text: "Time is invaluable. Think carefully what you spend it on.",
      author: "- Bernard Shaw"
    },
    {
      text: "Time is an expanse for the development of ability.",
      author: "- K. Marx"
    },
    {
      text: "Time is a precious gift given to us to become smarter, better, more mature and more perfect in it.",
      author: "- Mann Thomas"
    },
    {
      text: "Anything is possible, the impossible just takes more time.",
      author: "- Grey's Anatomy"
    },
    {
      text: "Keep count of every day, make every minute spent count! Time is the only thing where frugality is commendable.",
      author: "- Thomas Mann"
    },
    {
      text: "Everything in life is temporary. So if things are going well, enjoy it - it won't last forever. And if things are going badly, don't worry - that won't last forever either.",
      author: "- Unknown"
    },
    {
      text: "Nothing in life is random, and everything that happens to us happens at the right time and in the right place...",
      author: "- Bertrand Russell"
    },
    {
      text: "Keep an account of every day, account for every minute spent! Time is the only time where frugality is commendable.",
      author: "- Thomas Mann"
    },
    {
      text: "Time should be used creatively and always realize that any time is a chance to accomplish great things.",
      author: "- Martin Luther King"
    },
    {
      text: "Time is free, but it is priceless. You can't own it, but you can use it. You can't save it, but you can spend it. Once you lose it, you can never get it back.",
      author: "- Harvey Mackay"
    },
    {
      text: "If you spend too much time thinking about something, you will never do it.",
      author: "- Bruce Lee"
    },
    {
      text: "The bad news is that time flies. The good news is that you're a pilot.",
      author: "- Mikhail Altshuller"
    },
    {
      text: "Time is the least we have.",
      author: "- Ernest Hemingway"
    },
    {
      text: "Your time is limited, so don't waste it on someone else's life. Don't fall into the trap of dogma that lives on the basis of other people's thinking. Don't let the noise of other people's opinions drown out your own inner voice. And most importantly, have the courage to follow your heart and intuition.",
      author: "- Steve Jobs"
    },
    {
      text: "They always say that time changes things, but really you have to change them yourself.",
      author: "- Andy Warhol"
    },
    {
      text: "If you love life, don't waste time, because life is made up of time.",
      author: "- Benjamin Franklin"
    },
    {
      text: "Good use of time makes time even more precious.",
      author: "- Rousseau Jean-Jacques"
    },
    {
      text: "I advise you to take care of the minutes, and the hours will take care of themselves.",
      author: "- Philip Stanhope Chesterfield"
    },
    {
      text: "Lost time is time in which we have not lived a fully human life, time not enriched by experience, creative endeavor, joy and suffering.",
      author: "- Dietrich Bonhoeffer"
    },
    {
      text: "Since you are not sure of even one minute, don't waste a single hour.",
      author: "- Benjamin Franklin"
    },
    {
      text: "As we speak, merciless time is flying away. Catch this day, trusting as little as possible in the next.",
      author: "- Horace"
    },
    {
      text: "Understand this: time waits for no man. What was yesterday is already history. What will be tomorrow, no one can know. Today is a gift.",
      author: "- Martha Graham"
    },
    {
      text: "The right time may never come at all. If you really want to do something, forget about time and just do it.",
      author: "- Bernard Werber"
    },
    {
      text: "By giving up the phrase 'I don't have time...' you will soon realize that you have time for almost anything you see fit to do in life.",
      author: "- Fyodor Dostoevsky"
    },
    {
      text: "There is nothing stronger than an idea whose time has come!",
      author: "- Victor Hugo"
    },
    {
      text: "Don't waste time endlessly revisiting past mistakes or missed opportunities. There is still a long life ahead of us, we have no reason to look back.",
      author: "- Pablo Picasso"
    },
    {
      text: "Keep up with time, or you'll hurt those who chase it.",
      author: "- Glen Cook"
    },
    {
      text: "There is no need to rush time. Those who were in a hurry are already in the graveyard.",
      author: "- Coco Chanel"
    },
    {
      text: "Don't wait. The timing will never be perfect.",
      author: "- Napoleon Hill"
    },
    {
      text: "Don't talk about how you don't have time. You have exactly as much time as Michelangelo, Leonardo da Vinci, Thomas Jefferson, Pasteur, Helen Keller, and Albert Einstein had.",
      author: "- Jackson Browne"
    },
    {
      text: "Learn to value time, and most of your problems will resolve themselves.",
      author: "- Anton Pavlovich Chekhov"
    },
    {
      text: "Youth flies fast: catch the passing of time. The day gone by is always better than the present day.",
      author: "- Johannes Kepler"
    },
    {
      text: "Do you love life? Then do not waste time, for it is from it that life is made.",
      author: "- Benjamin Franklin"
    },
    {
      text: "Catch the hour before it slips away from you. Rare are the moments of life that are truly great and significant.",
      author: "- Friedrich Schiller"
    },
    {
      text: "Seek to meet a friend whenever you have time to live.",
      author: "- Khalil Jebran"
    },
    {
      text: "Every moment lost is a lost cause, a lost usefulness.",
      author: "- Philip Chesterfield"
    },
    {
      text: "Every minute you are angry with someone, you lose 60 seconds of happiness that you will never get back.",
      author: "- Ralph Waldo Emerson"
    },
    {
      text: "Make the most of every moment so you won't repent later and regret missing out on your youth.",
      author: "- Paulo Coelho"
    },
    {
      text: "If you want to, you'll find the time; if you don't want to, you'll find the reason.",
      author: "- Haruki Murakami"
    },
    {
      text: "Here and now is the best time. Don't dream of a better time.",
      author: "- Sri Chinmoy"
    },
    {
      text: "The perfect time will never come. Take action now!",
      author: "- Pablo Picasso"
    },
    {
      text: "If one is simply ahead of his time, the day will come when it will catch up with him.",
      author: "- Ludwig Wittgenstein"
    },
    {
      text: "If you don't make up your mind today - tomorrow will be the same as yesterday.",
      author: "- Henry Ford"
    },
    {
      text: "If you want to have leisure, don't waste time for nothing.",
      author: "- Benjamin Franklin"
    },
    {
      text: "If you want to have little time, do nothing.",
      author: "- Anton Chekhov"
    },
  ]
  }
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
