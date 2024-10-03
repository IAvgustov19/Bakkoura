import { Images } from '../assets';
import { t } from '../i18n';

export const EventsData = [
    {
        id: 1,
        image: Images.Img.calendarSlider1,
        text: `${t("calendar_slider_1")}`
    },
    // Чтобы удалить событие просто смахните его влево до конца \n
    {
        id: 2,
        image: Images.Img.calendarSlider2,
        text: `${t("calendar_slider_2")}`
    },
    // Нажимая на тумблер слева, вы можете менять вид календаря - список или листаемые дни \n
    // {
    //     id: 3,
    //     image: Images.Img.calendarSlider3,
    //     text: 'When displaying days, tap on the desired month or day to open it in full screen and see information about it'
    // },
    // // При отображении дней, нажмите на нужный месяц или день, чтобы открыть его в полный экран и увидеть информацию о нём \n
    // {
    //     id: 3,
    //     image: Images.Img.calendarSlider4,
    //     text: 'Inside the day, you can also delete an event by swiping it to the left until the end'
    // },
    // Внутри дня вы также можете удалить событие, смамхнув его влево до конца \n
]