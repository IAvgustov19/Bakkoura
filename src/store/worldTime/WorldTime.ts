import {makeAutoObservable, runInAction} from 'mobx';
import {
  getWeather,
  dailyForecast,
  showWeather,
  getLocation,
} from 'react-native-weather-api';
import {SelectedCountriesType} from '../../types/worldTime';
import {RootStore} from '../rootStore';

export class WorldTimeStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.getAllCountries();
  }

  worlTimeApiUrl = 'https://restcountries.com/v3.1/all';
  worldWeatherApiKey = '7b4f7ae10a69e7aafe6e2a44156625df';

  worldData = [];
  cloneWorldData = [];

  hour = 0;
  minut = 0;

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

  getWeather = (city?: string, country?: string) => {
    getWeather({
      key: this.worldWeatherApiKey,
      city: city,
      country: country ? country : '',
    }).then(() => {
      let data = new showWeather();
      const tempFahrenheit = data.temp;
      const tempCelsius = Math.round(((tempFahrenheit - 32) * 5) / 90);
      this.temp = `${tempCelsius}`;
    });
  };

  setCountry = (data: SelectedCountriesType, callback: () => void) => {
    this.getWeather(data.capital, data.name?.common?.toString()) as never;
    const time = this.getLocalTime(data.timezones);
    const date = this.getLocalDate(data.timezones);
    const newData = {
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
    console.log(this.selectedCountries);
    callback();
  };
}
