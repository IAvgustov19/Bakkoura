import {makeAutoObservable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {getWeather, showWeather} from 'react-native-weather-api';
import {SelectedCountriesType} from '../../types/worldTime';
import {RootStore} from '../rootStore';

export class WorldTimeStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.getAllCountries();
    setInterval(this.updateCountriesData, 60000);
  }

  worldTimeApiUrl = 'https://restcountries.com/v3.1/all';
  worldWeatherApiKey = '7b4f7ae10a69e7aafe6e2a44156625df';
  worldWeatherApiBase = 'https://api.openweathermap.org/data/2.5/';

  worldData = [];
  cloneWorldData = [];

  hour = 0;
  minut = 0;

  selectedCountries = new Map<string, SelectedCountriesType>();

  get getSelectedCountries() {
    return Array.from(this.selectedCountries.values());
  }

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
    const response = await fetch(this.worldTimeApiUrl);
    const countries = await response.json();
    runInAction(() => {
      this.worldData = this.sortCountriesByCapital(countries)
        .filter(e => e.capital !== undefined)
        .filter(e => e.timezones[0] !== 'UTC');
      this.cloneWorldData = this.sortCountriesByCapital(countries)
        .filter(e => e.capital !== undefined)
        .filter(e => e.timezones[0] !== 'UTC');
    });
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
        `https://api.weatherapi.com/v1/current.json?key=bb958a21cb6f4c8daa6105501240905&q=${city}&aqi=no`,
      )
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
          const temp = `${data.current.temp_c}`;
          resolve(temp);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          reject(error);
        });
    });
  };

  setCountry = async (data: SelectedCountriesType, callback: () => void) => {
    const temp = await this.getWeather(data.capital);
    const time = this.getLocalTime(data.timezones);
    const date = this.getLocalDate(data.timezones);
    const minutes = this.hour * 60 + this.minut;
    const newData = {
      id: data.capital + time.toString(),
      capital: data.capital,
      name: data.name,
      time: time,
      date: `Today ${temp}C  ${date}`,
      hour: this.hour,
      minut: this.minut,
      hour30: (minutes + minutes / 4) / 4,
      minut30: time.slice(3, 5),
      timezones: data.timezones,
    };
    runInAction(() => {
      this.selectedCountries.set(newData.id, newData);
    });
    this.filterWorldData('');
    callback();
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
          (country.minut30 = newLocalTime.slice(3, 5));
      });
    });
  };
}
