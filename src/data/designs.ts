import type { StaticImageData } from "next/image";
import type { CategorySlug } from "./categories";
import type { ThemeKey } from "./themes";
import swansClassicCover from "@/assets/images/swans-classic/cover-screenshot.jpg";

export interface ProgramItem {
  time: string;
  title: string;
}

export interface DesignDemo {
  /** Имена или имя виновника торжества */
  heroNames: string;
  /** Короткая подпись под именами на обложке */
  heroCaption: string;
  eventTypeLabel: string;
  /** ISO-дата и время мероприятия */
  date: string;
  venueName: string;
  venueAddress: string;
  mapQuery: string;
  program: ProgramItem[];
}

export interface Design {
  slug: string;
  name: string;
  category: CategorySlug;
  theme: ThemeKey;
  description: string;
  demo: DesignDemo;
  /**
   * Полностью авторский шаблон со своей вёрсткой и анимациями вместо общего
   * InvitationView/DesignScreen — сейчас используется только для "Swans"
   * (точное воспроизведение swans-template.vercel.app). При наличии этого
   * поля /invitations/[slug] рендерит соответствующий bespoke-компонент, а
   * DesignCard показывает `coverImage` вместо генеративной обложки.
   */
  customTemplate?: "swans-classic";
  /** Реальный скриншот готового bespoke-шаблона для карточки каталога. */
  coverImage?: StaticImageData;
}

export const designs: Design[] = [
  {
    slug: "swans-classic",
    name: "Swans",
    category: "wedding",
    theme: "swans-classic",
    customTemplate: "swans-classic",
    coverImage: swansClassicCover,
    description:
      "Авторская посекционная копия премиального шаблона «лебеди»: конверт из перьев, календарь-открытка, программа торжества и анкета гостя.",
    demo: {
      heroNames: "Данияр & Мээрим",
      heroCaption: "Save the Date",
      eventTypeLabel: "Свадьба",
      date: "2027-09-18T17:00:00",
      venueName: "Банкетный зал «Гранд Холл»",
      venueAddress: "г. Бишкек, просп. Манаса, 40",
      mapQuery: "Гранд Холл Бишкек",
      program: [
        { time: "16:00", title: "Встреча гостей" },
        { time: "17:00", title: "Начало торжества" },
        { time: "19:00", title: "Праздничная программа" },
        { time: "22:00", title: "Завершение вечера" },
      ],
    },
  },
  {
    slug: "white-swans",
    name: "White Swans",
    category: "wedding",
    theme: "swans",
    description: "Белый дизайн с лебедями — нежность и симметрия для свадебного приглашения.",
    demo: {
      heroNames: "Мирбек & Айчүрөк",
      heroCaption: "Приглашаем разделить с нами день нашей свадьбы",
      eventTypeLabel: "Свадьба",
      date: "2026-11-14T17:00:00",
      venueName: "Банкетный зал «Ак Куу»",
      venueAddress: "г. Бишкек, ул. Ахунбаева, 120",
      mapQuery: "Банкетный зал Ак Куу Бишкек",
      program: [
        { time: "17:00", title: "Сбор гостей" },
        { time: "17:30", title: "Церемония бракосочетания" },
        { time: "18:30", title: "Праздничный ужин" },
        { time: "20:00", title: "Первый танец молодожёнов" },
        { time: "23:00", title: "Завершение вечера" },
      ],
    },
  },
  {
    slug: "blue-letter",
    name: "Blue Letter",
    category: "wedding",
    theme: "blue-envelope",
    description: "Синий конверт с золотыми деталями и восковой печатью — торжественно и сдержанно.",
    demo: {
      heroNames: "Азамат & Айперi",
      heroCaption: "С радостью приглашаем вас на нашу свадьбу",
      eventTypeLabel: "Свадьба",
      date: "2026-10-02T16:00:00",
      venueName: "Ресторан «Изумруд»",
      venueAddress: "г. Бишкек, пр. Чуй, 45",
      mapQuery: "Ресторан Изумруд Бишкек",
      program: [
        { time: "16:00", title: "Встреча гостей" },
        { time: "16:30", title: "Регистрация брака" },
        { time: "17:30", title: "Банкет" },
        { time: "19:30", title: "Конкурсы и танцы" },
      ],
    },
  },
  {
    slug: "black-white-classic",
    name: "Black & White Classic",
    category: "wedding",
    theme: "blackwhite",
    description: "Чёрно-белая свадебная фотография — кинематографично и минималистично.",
    demo: {
      heroNames: "Тимур & Дарика",
      heroCaption: "Приглашаем разделить с нами этот особенный день",
      eventTypeLabel: "Свадьба",
      date: "2027-02-20T15:00:00",
      venueName: "Дом приёмов «Октава»",
      venueAddress: "г. Бишкек, ул. Токтогула, 89",
      mapQuery: "Дом приёмов Октава Бишкек",
      program: [
        { time: "15:00", title: "Сбор гостей" },
        { time: "15:30", title: "Церемония" },
        { time: "16:30", title: "Фотосессия" },
        { time: "18:00", title: "Банкет" },
      ],
    },
  },
  {
    slug: "olive-paper",
    name: "Olive Paper",
    category: "jubilee",
    theme: "olive",
    description: "Оливковый оттенок и фактура бумаги — благородно для юбилейного торжества.",
    demo: {
      heroNames: "Роза Асановна",
      heroCaption: "Приглашаем на праздник в честь юбилея",
      eventTypeLabel: "Юбилей",
      date: "2026-12-05T18:00:00",
      venueName: "Банкетный зал «Нур-Азия»",
      venueAddress: "г. Бишкек, ул. Киевская, 131",
      mapQuery: "Банкетный зал Нур-Азия Бишкек",
      program: [
        { time: "18:00", title: "Сбор гостей" },
        { time: "18:30", title: "Праздничный ужин" },
        { time: "19:30", title: "Поздравления и тосты" },
        { time: "21:00", title: "Концертная программа" },
      ],
    },
  },
  {
    slug: "burgundy-heritage",
    name: "Burgundy Heritage",
    category: "kyz-uzatuu",
    theme: "burgundy",
    description: "Бордовый с национальными орнаментами — для тёплой церемонии кыз узатуу.",
    demo: {
      heroNames: "Бермет",
      heroCaption: "Приглашаем на кыз узатуу нашей дочери",
      eventTypeLabel: "Кыз узатуу",
      date: "2026-09-27T15:00:00",
      venueName: "Юрточный комплекс «Ала-Тоо»",
      venueAddress: "с. Кой-Таш, Аламединский район",
      mapQuery: "Юрточный комплекс Ала-Тоо Бишкек",
      program: [
        { time: "15:00", title: "Встреча гостей" },
        { time: "15:30", title: "Благословение старейшин" },
        { time: "16:30", title: "Национальные обряды" },
        { time: "18:00", title: "Праздничный дастархан" },
      ],
    },
  },
  {
    slug: "sunny-celebration",
    name: "Sunny Celebration",
    category: "sunnot-toi",
    theme: "kids-light",
    description: "Светлый праздничный дизайн для детского торжества — тепло и радостно.",
    demo: {
      heroNames: "Алинур",
      heroCaption: "Приглашаем на сүннөт той нашего сына",
      eventTypeLabel: "Сүннөт той",
      date: "2026-08-01T13:00:00",
      venueName: "Кафе «Балдар Дүйнөсү»",
      venueAddress: "г. Бишкек, ул. Гагарина, 58",
      mapQuery: "Кафе Балдар Дуйносу Бишкек",
      program: [
        { time: "13:00", title: "Сбор гостей" },
        { time: "13:30", title: "Праздничная программа" },
        { time: "14:30", title: "Угощение" },
        { time: "16:00", title: "Подарки и пожелания" },
      ],
    },
  },
  {
    slug: "first-steps",
    name: "First Steps",
    category: "tushoo-kesuu",
    theme: "steps",
    description: "Мягкие пастельные тона с мотивом первых шагов — для тушоо кесүү.",
    demo: {
      heroNames: "Айсулуу",
      heroCaption: "Приглашаем на тушоо кесүү нашей дочери",
      eventTypeLabel: "Тушоо кесүү",
      date: "2026-11-01T12:00:00",
      venueName: "Семейное кафе «Балапан»",
      venueAddress: "г. Бишкек, ул. Московская, 14",
      mapQuery: "Кафе Балапан Бишкек",
      program: [
        { time: "12:00", title: "Сбор гостей" },
        { time: "12:30", title: "Обряд разрезания тушоо" },
        { time: "13:15", title: "Праздничный обед" },
        { time: "14:30", title: "Игры и подарки" },
      ],
    },
  },
  {
    slug: "silver-wave",
    name: "Silver Wave",
    category: "kyz-uzatuu",
    theme: "teal-silver",
    description: "Глубокий изумрудно-бирюзовый тон с серебряным орнаментом — современный взгляд на кыз узатуу.",
    demo: {
      heroNames: "Айзада",
      heroCaption: "Приглашаем на кыз узатуу нашей дочери",
      eventTypeLabel: "Кыз узатуу",
      date: "2026-10-18T15:30:00",
      venueName: "Банкетный зал «Көк Асаба»",
      venueAddress: "г. Бишкек, ул. Фучика, 3",
      mapQuery: "Банкетный зал Кок Асаба Бишкек",
      program: [
        { time: "15:30", title: "Встреча гостей" },
        { time: "16:00", title: "Благословение старейшин" },
        { time: "17:00", title: "Национальные обряды" },
        { time: "18:30", title: "Праздничный дастархан" },
      ],
    },
  },
  {
    slug: "golden-jubilee",
    name: "Golden Jubilee",
    category: "jubilee",
    theme: "gold-anniversary",
    description: "Тёмный шоколадный фон с золотым лавровым узором — торжественно для юбилейной даты.",
    demo: {
      heroNames: "Марат Асанович",
      heroCaption: "Приглашаем разделить радость юбилея",
      eventTypeLabel: "Юбилей",
      date: "2026-12-19T18:30:00",
      venueName: "Ресторан «Алтын Дан»",
      venueAddress: "г. Бишкек, ул. Разакова, 17",
      mapQuery: "Ресторан Алтын Дан Бишкек",
      program: [
        { time: "18:30", title: "Сбор гостей" },
        { time: "19:00", title: "Праздничный ужин" },
        { time: "20:00", title: "Поздравления и тосты" },
        { time: "21:30", title: "Концертная программа" },
      ],
    },
  },
  {
    slug: "pearl-elegance",
    name: "Pearl Elegance",
    category: "wedding",
    theme: "pearl",
    description: "Жемчужные акценты на светлом фоне — воздушно и утончённо.",
    demo: {
      heroNames: "Нурлан & Жаңыл",
      heroCaption: "Приглашаем вас разделить радость нашей свадьбы",
      eventTypeLabel: "Свадьба",
      date: "2027-01-16T16:30:00",
      venueName: "Ресторан «Жемчужина»",
      venueAddress: "г. Бишкек, ул. Байтик Баатыра, 25",
      mapQuery: "Ресторан Жемчужина Бишкек",
      program: [
        { time: "16:30", title: "Сбор гостей" },
        { time: "17:00", title: "Выход молодожёнов" },
        { time: "18:00", title: "Банкет" },
        { time: "20:30", title: "Танцевальная программа" },
      ],
    },
  },
];

export const getDesignBySlug = (slug: string): Design | undefined =>
  designs.find((d) => d.slug === slug);
