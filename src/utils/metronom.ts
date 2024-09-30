import { Images } from '../assets';
import {t} from '../i18n'

export const MetronomData = [
    // {
    //     id: 1,
    //     image: Images.Img.metronomSlide1,
    //     text: 'To change the format of the metronome, swipe it aside'
    // },
    // Для изменения формата метронома смахните его в сторону \n
    {
        id: 1,
        image: Images.Img.metronomSlide2,
        text: `${t("metronom_slider_1")}`
    },
    // Внизу экрана вы сможете выбрать количество тактов и указать, пропускать ли его через раз \n
    {
        id: 2,
        image: Images.Img.metronomSlide3,
        text: `${t("metronom_slider_2")}`
    },
    // Изменить скорость в секунду вы сможете вверху экрана, используя кнопки ‘плюс’ и ‘минус’ \n 
]