import { makeAutoObservable, runInAction } from 'mobx';
import { getWeather, showWeather } from 'react-native-weather-api';
import { SelectedCountriesType } from '../../types/worldTime';
import { RootStore } from '../rootStore';
import { addCountryToFirestore, getAllCountriesFromFirestore } from '../../services/firestoreService';

import auth from '@react-native-firebase/auth';

export class WorldTimeStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.getAllCountries();
    this.fetchCountriesFromFirestore();
    setInterval(this.updateCountriesData, 60000);
  }

  worlTimeApiUrl = 'https://restcountries.com/v3.1/all';
  worldWeatherApiKey = '7b4f7ae10a69e7aafe6e2a44156625df';

  worldData = [];
  cloneWorldData = [];

  hour = 0;
  minut = 0;
  isLoading = false;

  temp = '0';

  selectedCountries: SelectedCountriesType[] = [];

  getLocalTime = timezones => {
    let now = new Date();
    let offset = now.getTimezoneOffset() / 60;
    let timezoneOffset = parseInt(timezones[0].split('UTC')[1]);
    let localTime = new Date(
      now.getTime() + (offset + timezoneOffset) * 3600 * 1000,
    );

    let hours = localTime.getHours();
    let minutes = localTime.getMinutes();
    let timeString = '';
    this.hour = hours;
    this.minut = minutes;

    let period = hours < 12 ? ' am' : ' pm';

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    timeString =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      period;

    return timeString;
  };
  getLocalDate = timezones => {
    let now = new Date();
    let offset = now.getTimezoneOffset() / 60;
    let timezoneOffset = parseInt(timezones[0].split('UTC')[1]);
    let localTime = new Date(
      now.getTime() + (offset + timezoneOffset) * 3600 * 1000,
    );

    let day = localTime.getDate();
    let month = localTime.getMonth() + 1;
    let year = localTime.getFullYear();

    let dateString =
      day.toString().padStart(2, '0') +
      '/' +
      month.toString().padStart(2, '0') +
      '/' +
      year;

    return dateString;
  };

  sortCountriesByCapital = countries => {
    return countries.sort((a, b) => {
      const capitalA = a.capital ? a.capital[0] : '';
      const capitalB = b.capital ? b.capital[0] : '';

      if (capitalA < capitalB) {
        return -1;
      }
      if (capitalA > capitalB) {
        return 1;
      }
      return 0;
    });
  };

  getAllCountries = async () => {
    const response = await fetch(this.worlTimeApiUrl);
    const countries = await response.json();
    this.worldData = this.sortCountriesByCapital(countries).filter(
      e => e.capital !== undefined,
    );
    this.cloneWorldData = this.sortCountriesByCapital(countries).filter(
      e => e.capital !== undefined,
    );
  };

  filterWorldData = name => {
    if (name) {
      this.worldData = this.cloneWorldData.filter(
        item =>
          item.name.common
            ?.trim()
            .toLowerCase()
            .includes(name.toLowerCase().trim()) ||
          item.capital
            .toString()
            ?.trim()
            .toLowerCase()
            .includes(name.toLowerCase().trim()),
      );
    } else {
      this.worldData = this.cloneWorldData;
    }
  };

  getWeather = async (city?: string) => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.worldWeatherApiKey}`
      )
        .then(response => response.json())
        .then(data => {
          runInAction(() => {
            this.isLoading = false;
          }); const temp = `${Math.round(data.main.temp - 273)}`;
          resolve(temp);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          reject(error);
        }).finally(() => {
          runInAction(() => {
            this.isLoading = false;
          });
        })
    });
  };

  setCountry = async (data: SelectedCountriesType, callback: () => void) => {
    this.getWeather(data.capital) as never;
    const time = this.getLocalTime(data.timezones);
    const date = this.getLocalDate(data.timezones);
    const minutes = this.hour * 60 + this.minut;
    const userId = auth().currentUser.uid;
    const newData = {
      uid: userId,
      id: this.selectedCountries.length + 1,
      capital: data.capital,
      name: data.name?.common?.toString(),
      time: time,
      date: `Today ${this.temp}C  ${date}`,
      hour: this.hour,
      minut: this.minut,
      timezones: data.timezones,
    };
    this.selectedCountries = [...this.selectedCountries, newData] as never;
    callback();

    try {
      // Add country to Firebase Firestore
      await addCountryToFirestore(newData);
      console.log('Country added to Firebase!');
    } catch (error) {
      console.error('Error adding country to Firebase:', error);
    }
  };

  updateCountriesData = async () => {
    runInAction(() => {
      this.selectedCountries.forEach(country => {
        const newLocalTime = this.getLocalTime(country.timezones);
        country.time = newLocalTime;
        (country.hour = this.hour),
          (country.minut = this.minut),
          (country.hour30 =
            (this.hour * 60 + this.minut + (this.hour * 60 + this.minut / 4)) /
            4),
          (country.minut30 = Number(newLocalTime.slice(3, 5)));
      });
    });
  };

  fetchCountriesFromFirestore = async () => {
    try {
      const countries = await getAllCountriesFromFirestore();
      const updatedCountries = await Promise.all(countries.map(async (country) => {
        const temp = await this.getWeather(country.capital);
        const time = this.getLocalTime(country.timezones);
        const date = this.getLocalDate(country.timezones);
        return {
          ...country,
          time,
          date: `Today ${temp}°C ${date}`,
          hour: this.hour,
          minut: this.minut,
          hour30: this.hour + this.hour / 4,
          minut30: this.minut + this.minut / 4,
        };
      }));

      runInAction(() => {
        this.selectedCountries = updatedCountries;
        this.isLoading = false;
      });
    } catch (error) {
      console.error('Error fetching countries from Firebase:', error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
