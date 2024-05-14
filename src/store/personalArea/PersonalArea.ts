import { RootStore } from "../rootStore";
import { SecureEntries } from "../../utils/secureEntries";
import { makeAutoObservable, runInAction } from "mobx";
import { PersonalAreaStateInitial, PersonalAreaStateType } from "../../types/personalArea";
import { Languages } from "../../utils/languages";

export class PersonalAreaStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  personalAreaData: PersonalAreaStateType = { ...PersonalAreaStateInitial };

  setPersonalAreaState = (
    key: keyof PersonalAreaStateType,
    value: PersonalAreaStateType,
  ) => {
    this.personalAreaData[key] = value as never;
  };

  // secureEntries
  selectedEntry = { title: 'Free' };
  secureEntries = SecureEntries;


  onSelectEntry = (index: number) => {
    runInAction(() => {
      this.selectedEntry = this.secureEntries.find((e, i) => i === index);
      this.setPersonalAreaState('secureEntry', this.selectedEntry.title as never);
    });
  };

  onSecureEntryItemPress = (index: number) => {
    const newData = this.secureEntries.map((item, i) => {
      this.onSelectEntry(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.secureEntries = newData;
  };


  // language
  selectedLanguage = { title: 'English' };
  languages = Languages;


  onSelectLanguage = (index: number) => {
    runInAction(() => {
      this.selectedLanguage = this.languages.find((e, i) => i === index);
      this.setPersonalAreaState("language", this.selectedLanguage.title as never);
    });
  };

  onLanguageItemPress = (index: number) => {
    const newData = this.languages.map((item, i) => {
      this.onSelectLanguage(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.languages = newData;
  };

  // name
  name = 'Jihad Bakkoura';
  setName = (value: string) => {
    runInAction(() => {
      this.name = value;
      this.setPersonalAreaState('name', this.name as never);
    });
  };
}
