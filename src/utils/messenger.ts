import { Images } from "../assets";
import { t } from "../i18n";

export const MessageTypes = [
    {
        id: 1,
        title: `${t("Media")}`,
    },
    {
        id: 2,
        title: `${t("Voices")}`,
    },
    {
        id: 3,
        title: `${t("Links")}`,
    },
    {
        id: 4,
        title: `${t("Files")}`,
    },
    {
        id: 5,
        title: `${t("Music")}`,
    },

];


export const SearchMessageTypes = [
    {
        id: 1,
        title: `${t("Chats")}`,
    },
    {
        id: 2,
        title: `${t("Media")}`,
    },
    {
        id: 3,
        title: `${t("Voices")}`,
    },
    {
        id: 4,
        title: `${t("Links")}`,
    },
    {
        id: 5,
        title: `${t("Files")}`,
    },
    {
        id: 6,
        title: `${t("Music")}`,
    },

];

export const fileData = [
    { id: 1, title: 'presentation.pdf', subtitle: '17.11.23 - 09:12 - 1.2Mb - Tatyana Yanchuk' },
    { id: 2, title: 'poster.psd', subtitle: '17.11.23 - 10:05 - 1.5Mb - John Doe' },
    { id: 3, title: 'presentation.pdf', subtitle: '17.11.23 - 11:30 - 2.1Mb - Alice Johnson' },
    { id: 4, title: 'businesscard.psd', subtitle: '17.11.23 - 12:45 - 1.8Mb - Michael Smith' },
    { id: 5, title: 'Book Antiqua.ttf', subtitle: '17.11.23 - 13:20 - 2.3Mb - Sarah Lee' },
    { id: 6, title: 'Banner.psd', subtitle: '17.11.23 - 14:10 - 1.7Mb - David Brown' },
];

export const smileyEmojis = [
    '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😇', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚',
    '😇', '🥳', '🤩', '🤗', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '😮', '😯', '😲', '😳', '🥺', '😵', '😠',
    '😡', '😤', '😥', '😓', '😪', '😴', '😵', '🤯', '🤠', '🥳', '😷', '🤒', '🤕', '🤢', '🤧', '😇', '🤠', '🥳', '🥺', '😎'
];

export const ChatData = [
    {
        id: 1,
        image: Images.Img.messengerSlider1,
        text: `${t("messenger_slider_1")}`
    },
    // Чтобы отредактировать сообщение, удалить его или поставить реакцию, зажмите необходимое сообщение и выберите необходимое действие \n
]