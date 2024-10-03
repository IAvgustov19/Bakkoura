import { Images } from '../assets';
import { t } from '../i18n';

export const AlarmData = [
    {
        id: 1,
        image: Images.Img.alarmSlide1,
        text: `${t("alarm_slider_1")}`
    },
    // Вверху экрана с помощью тумблера вы можете изменять часовой формат будильника - 24ч или 30ч \n
    {
        id: 2,
        image: Images.Img.alarmSlide2,
        text: `${t("alarm_slider_2")}`
    },
    // Чтобы удалить будильник смахните его влево дло конца \n
]