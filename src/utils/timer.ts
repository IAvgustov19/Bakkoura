import { Images } from '../assets';
import {t} from '../i18n'

export const TimerData = [
    {
        id: 1,
        image: Images.Img.timerSlider1,
        text: `${t("timer_slider_1")}`
    },
    // Вверху экрана с помощью тумблера вы можете изменять часовой формат часов - 24ч или 30ч и изменить ход направления таймера - назад или вперёд \n
    {
        id: 2,
        image: Images.Img.timerSlider2,
        text: `${t("timer_slider_1")}`
    },
    // Жёлтая кнопка ниже даёт вам установить тип занятия: работа или отдых \n
]