import {db} from '../config/firebase';
import {
  PomodoroDataType,
  ProjectTimerDataType,
  SelectListDataType,
  TodoTimerDataType,
  TogetherDataType,
} from '../types/alarm';
import {NewEventStateType} from '../types/calendar';
import {SelectedCountriesType} from '../types/worldTime';
import {AlarmListsItemType} from '../types/alarm';

import auth from '@react-native-firebase/auth';

// calendar events
export const addEventToFirestore = async event => {
  try {
    await db.collection('events').add(event);
  } catch (error) {
    console.error('Error', error);
  }
};

export const getEventsFromFirestore = async (): Promise<
  NewEventStateType[]
> => {
  try {
    const user = auth().currentUser;
    const userId = user.uid;
    const snapshot = await db
      .collection('events')
      .where('uid', '==', userId)
      .get();
    const events: NewEventStateType[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: data.uid,
        id: doc.id,
        name: data.name || '',
        day: data.day || 0,
        month: data.month || 0,
        year: data.year || 0,
        comment: data.comment || '',
        amPM: data.amPM || '',
        hour: data.hour || 0,
        stayedSecond: data.stayedSecond || 0,
        minut: data.minut || 0,
        second: data.second || 0,
        stayedDay: data.stayedDay || 0,
        stayedHour: data.stayedHour || 0,
        stayedMinut: data.stayedMinut || 0,
        date: data.date || [],
        timeStamp: data.timeStamp || Date.now(),
        repeat: data.repeat || '',
        already: data.already || false,
        time: data.time || '',
        allDay: data.allDay || false,
        reminder: data.reminder || '',
        sound: data.sound || '',
        location: data.location || '',
        description: data.description || '',
      };
    });
    return events;
  } catch (error) {
    console.error('Error', error);
    return [];
  }
};

export const getEventFromFirestore = async id => {
  try {
    const doc = await db.collection('events').doc(id).get();
    if (doc.exists) {
      const data = doc.data();
      return {
        uid: data.uid,
        id: doc.id,
        name: data.name || '',
        day: data.day || 0,
        month: data.month || 0,
        year: data.year || 0,
        comment: data.comment || '',
        amPM: data.amPM || '',
        hour: data.hour || 0,
        stayedSecond: data.stayedSecond || 0,
        minut: data.minut || 0,
        second: data.second || 0,
        stayedDay: data.stayedDay || 0,
        stayedHour: data.stayedHour || 0,
        stayedMinut: data.stayedMinut || 0,
        date: new Date(
          data.year,
          data.month - 1,
          data.day,
          data.hour,
          data.minut,
          data.second,
        ).toISOString(),
        timeStamp: data.timeStamp || Date.now(),
        repeat: data.repeat || '',
        already: data.already || false,
        time: data.time || '',
        allDay: data.allDay || false,
        reminder: data.reminder || '',
        sound: data.sound || '',
        location: data.location || '',
        description: data.description || '',
      };
    } else {
      console.error('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error', error);
    return null;
  }
};

export const updateEventInFirestore = async (id, updatedEvent) => {
  try {
    await db.collection('events').doc(id).update(updatedEvent);
  } catch (error) {
    console.error('Error', error);
  }
};

export const deleteEventFromFirestore = async id => {
  try {
    await db.collection('events').doc(id).delete();
  } catch (error) {
    console.error('Error', error);
  }
};

// timer tasks - Todo Timer
export const addTaskToFirestore = async task => {
  try {
    const docRef = await db.collection('tasks').doc();
    task.id = docRef.id;
    await docRef.set(task);
    console.log('Task added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error', error);
  }
};

export const fetchTasksFromFirestore = async (): Promise<
  TodoTimerDataType[]
> => {
  try {
    const user = auth().currentUser;
    const userId = user.uid;
    console.log('userIduserIduserIduserId', userId);
    const snapshot = await db
      .collection('tasks')
      .where('uid', '==', userId)
      .get();
    const tasks: TodoTimerDataType[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: data.uid,
        id: data.id,
        key: data.key,
        name: data.name,
        goal: data.goal,
        time: data.time,
        seconds: data.second || 0,
        startTime: data.startTime || 0,
        endTime: data.endTime || 0,
        hours: data.hours || 0,
        minutes: data.minutes || 0,
        totalTime: data.totalTime || '00:00:00',
        secondInterval: data.secondInterval,
        timestamp: data.timestamp || 0,
        play: data.play || false,
        date: data.date || 0,
      };
    });
    return tasks;
  } catch (error) {
    console.error('Error', error);
    return [];
  }
};

export const updateTaskInFirestore = async (id, updatedTask) => {
  try {
    await db.collection('tasks').doc(id).update(updatedTask);
  } catch (error) {
    console.error('Error', error);
  }
};

export const deleteTaskFromFirestore = async id => {
  try {
    await db.collection('tasks').doc(id).delete();
  } catch (error) {
    console.error('Error', error);
  }
};

// countries - WorldTime
export const addCountryToFirestore = async data => {
  try {
    const docRef = await db.collection('countries').doc();
    data.id = docRef.id;
    await docRef.set(data);
    console.log('Country added');
  } catch (error) {
    console.error('Error', error);
  }
};

export const getAllCountriesFromFirestore = async () => {
  try {
    const user = auth().currentUser;
    const userId = user.uid;
    console.log('userIduserIduserIduserId', userId);
    const snapshot = await db
      .collection('countries')
      .where('uid', '==', userId)
      .get();
    const countries: SelectedCountriesType[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: data.uid,
        id: data.id,
        capital: data.capital,
        name: data.name,
        time: data.time,
        date: data.date,
        hour: data.hour,
        minut: data.minut,
        hour30: data.hour30,
        minut30: data.minut30,
        timezones: data.timezones,
      };
    });
    return countries;
  } catch (error) {
    console.error('Error', error);
    return [];
  }
};

// Bakkoura-watch - sectors
export const addSectorToFirestore = async sector => {
  try {
    const docRef = await db.collection('sectors').doc();
    sector.id = docRef.id;
    await docRef.set(sector);
  } catch (error) {
    console.error('Error adding sector: ', error);
  }
};

// Function to get all sectors from Firestore
export const getSectorsFromFirestore = async () => {
  try {
    const user = auth().currentUser;
    const userId = user.uid;
    const snapshot = await db
      .collection('sectors')
      .where('uid', '==', userId)
      .get();
    const sectors: SelectListDataType[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        uid: data.uid,
        name: data.name,
        color: data.color,
        fromHour: data.fromHour,
        fromMin: data.fromMin,
        toHour: data.toHour,
        toMin: data.toMin,
        start: data.start,
        end: data.end,
      };
    });
    return sectors;
  } catch (error) {
    console.error('Error fetching sectors: ', error);
    return [];
  }
};

// Function to get a sector by ID from Firestore
export const getSectorFromFirestore = async id => {
  try {
    const doc = await db.collection('sectors').doc(id).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data(),
      };
    } else {
      console.error('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching sector: ', error);
    return null;
  }
};

// Function to update a sector in Firestore
export const updateSectorInFirestore = async (id, updatedSector) => {
  try {
    await db.collection('sectors').doc(id).update(updatedSector);
  } catch (error) {
    console.error('Error updating sector: ', error);
  }
};

export const deleteSectorFromFirestore = async id => {
  try {
    await db.collection('sectors').doc(id).delete();
  } catch (error) {
    console.error('Error deleting sector: ', error);
  }
};

// time together
export const addEtapToFirestore = async etap => {
  try {
    const docRef = await db.collection('etaps').doc();
    etap.id = docRef.id;
    await docRef.set(etap);
  } catch (error) {
    console.error('Error adding sector: ', error);
  }
};

export const getEtapsFromFirestore = async () => {
  try {
    const user = auth().currentUser;
    const userId = user.uid;
    const snapshot = await db
      .collection('etaps')
      .where('uid', '==', userId)
      .get();
    const etaps: TogetherDataType[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: data.uid,
        id: doc.id,
        name: data.name,
        type: data.type,
        fromDate: data.fromDate,
        fromDateFormat: data.fromDateFormat,
        reminder: data.reminder,
        control: data.control,
        time: data.time,
        days: data.days,
        timeStamp: data.timeStamp,
      };
    });
    return etaps;
  } catch (error) {
    console.error('Error fetching etaps: ', error);
    return [];
  }
};

// pomodoro tasks

export const addPomodoroTaskToFirestore = async task => {
  try {
    const docRef = await db.collection('pomodoroTasks').doc();
    task.id = docRef.id;
    await docRef.set(task);
  } catch (error) {
    console.error('Error adding task: ', error);
  }
};

export const getPomodoroTasksFromFirestore = async () => {
  try {
    const user = auth().currentUser;
    const userId = user.uid;
    const snapshot = await db
      .collection('pomodoroTasks')
      .where('uid', '==', userId)
      .get();
    const pomodoros: PomodoroDataType[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: data.uid,
        id: doc.id,
        name: data.name,
        description: data.description,
        finishTime: data.finishTime,
        minut: data.minut,
        second: data.second,
        time: data.time,
        hour: data.hour,
        breackType: data.breackType,
        estimatedPomodoros: data.estimatedPomodoros,
        estimatedHours: data.estimatedHours,
        totalCycle: data.totalCycle,
      };
    });
    return pomodoros;
  } catch (error) {
    console.error('Error fetching pomodoros: ', error);
    return [];
  }
};

export const updatePomodoroTaskInFirestore = async (id, updatedTask) => {
  try {
    await db.collection('pomodoroTasks').doc(id).update(updatedTask);
  } catch (error) {
    console.error('Error', error);
  }
};

export const deletePomodoroTaskFromFirestore = async id => {
  try {
    await db.collection('pomodoroTasks').doc(id).delete();
  } catch (error) {
    console.error('Error deleting pomodoros: ', error);
  }
};

// Alarm

export const addAlarmToFirestore = async alarm => {
  try {
    const docRef = await db.collection('alarms').doc();
    alarm.id = docRef.id;
    await docRef.set(alarm);
    console.log('Alarm added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding alarm: ', error);
  }
};

export const getAlarmsFromFirestore = async () => {
  try {
    const user = auth().currentUser;
    const userId = user.uid;
    const snapshot = await db
      .collection('alarms')
      .where('uid', '==', userId)
      .get();
    const alarms: AlarmListsItemType[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: data.uid,
        id: doc.id,
        name: data.name,
        time: data.time,
        hours: data.hours,
        minutes: data.minutes,
        description: data.description,
        isActive: data.isActive,
        repeat: data.repeat,
        sound: data.sound,
        leter: data.leter,
      };
    });
    return alarms;
  } catch (error) {
    console.error('Error fetching alarms: ', error);
    return [];
  }
};

export const updateAlarmInFirestore = async (id, updatedAlarm) => {
  try {
    await db.collection('alarms').doc(id).update(updatedAlarm);
  } catch (error) {
    console.error('Error updating alarm: ', error);
  }
};

export const deleteAlarmFromFirestore = async id => {
  try {
    await db.collection('alarms').doc(id).delete();
  } catch (error) {
    console.error('Error deleting alarm: ', error);
  }
};

// Project Timer
export const addProjectTimerToFirestore = async (
  timer: ProjectTimerDataType,
) => {
  try {
    const docRef = await db.collection('projectTimers').add(timer);
    timer.id = docRef.id;
    await docRef.set(timer);
    console.log('Project timer added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding project timer:', error);
  }
};

export const fetchProjectTimersFromFirestore = async (): Promise<
  ProjectTimerDataType[]
> => {
  try {
    const user = auth().currentUser;
    const userId = user.uid;
    const snapshot = await db
      .collection('projectTimers')
      .where('uid', '==', userId)
      .get();
    const timers: ProjectTimerDataType[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        uid: data.uid,
        title: data.title,
        description: data.description,
        date: data.date,
        time: data.time,
        workTime: data.workTime,
        price: data.price,
        paid: data.paid,
        second: data.second,
        play: data.play,
        active: data.active,
        totalPrice: data.totalPrice,
        totalTime: data.totalTime,
        secondInterval: data.secondInterval,
        timestamp: data.timestamp,
      };
    });
    return timers;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const updateProjectTimerInFirestore = async (
  id: any,
  updatedTimer: any,
) => {
  try {
    await db.collection('projectTimers').doc(id).update(updatedTimer);
    console.log('Project timer updated with ID:', id);
  } catch (error) {
    console.error('Error updating project timer:', error);
  }
};

export const deleteProjectTimerFromFirestore = async (id: string) => {
  try {
    await db.collection('projectTimers').doc(id).delete();
    console.log('Project timer deleted with ID:', id);
  } catch (error) {
    console.error('Error deleting project timer:', error);
  }
};
