import { Images } from '../assets';
import { t } from '../i18n';

export const ProjectTimerData = [
    {
        id: 1,
        image: Images.Img.projectTimerSlider1,
        text: `${t('project_timer_slider_1')}`
    },
    // Чтобы удалить проект просто смахните его влево до конца \n
    {
        id: 2,
        image: Images.Img.projectTimerSlider2,
        text: `${t('project_timer_slider_2')}`
    },
    // Перейдя на страницу ‘Calculate’, вы можете выбрать проект, доход и затраченного время которого хотите помотреть, в выпадающем списке сверху \n
]