// Bulgarian translation of the text in case-facts.en.ts, for the /bg/ page. A translation only: values,
// dates and the source strings come from the English, so a source is always cited as it was published.

/** By fact key. */
export const FACT_TEXT: Record<string, string> = {
  instructions: '35 измамни нареждания срещу сметката на Bangladesh Bank във Федералната резервна банка на Ню Йорк',
  totalValue: 'Общо около 951 млн. USD',
  completed: '5 изпълнени нареждания',
  manila: '81 млн. USD към пет сметки в клона на RCBC на улица Jupiter, Макати',
  sriLanka: '20 млн. USD към Шри Ланка',
  stoppedNewYork: '30 нареждания, около 850 млн. USD, спрени в Ню Йорк',
  stoppedValue: 'Около 850 млн. USD, спрени в Ню Йорк',
  fandation: 'Плащането към Шри Ланка беше спряно от банка посредник, след като „Foundation“ беше изписано „Fandation“',
  sriLankaRecovered: 'Всичките 20 млн. USD от плащането към Шри Ланка са възстановени',
  recovered2025: 'Към 2025 г. са възстановени около 15 от 81-те млн. USD',
  printer:
    'Потвържденията се печатаха автоматично на физически принтер, който спря да работи; третирано е като обикновена повреда на принтер (по публикациите)',
  weekendDhaka: 'Уикендът в Бангладеш е петък и събота',
  weekendNewYork: 'Уикендът в Ню Йорк е събота и неделя',
  chineseNewYear: 'Понеделник, 8 февруари 2016 г., беше Китайската нова година и банките в Манила бяха затворени',
  malware:
    'Публикациите описват зловреден софтуер, който е манипулирал платежния софтуер на банката и е потискал отпечатаните потвърждения',
  bspFine: 'Bangko Sentral ng Pilipinas глоби RCBC с 1 млрд. филипински песо (около 53 млн. USD), най-голямата глоба, която е налагала',
};

/** In the order of TIMELINE. */
export const TIMELINE = [
  { day: 'Чт 4 февр.', text: 'Трийсет и пет нареждания излизат от банката, около 951 млн. USD' },
  { day: 'Пт 5 февр.', text: 'Принтерът за потвърждения спира. 81 млн. USD стигат до Манила' },
  { day: 'Пт и сб', text: 'Уикендът на банката. Запитванията от Ню Йорк остават без отговор' },
  { day: 'Пн 8 февр.', text: 'Китайската нова година. Банките в Манила са затворени' },
];

export const TIMELINE_CAPTION =
  'Трийсет нареждания, около 850 млн. USD, бяха спрени в Ню Йорк. 20-те млн. USD за Шри Ланка се върнаха. Възстановени са около 15 от 81-те млн. USD.';

/** In the order of AFTERMATH. */
export const AFTERMATH = [
  { when: 'Чт 4 февр. 2016', text: 'Трийсет и пет нареждания излизат от банката, около 951 млн. USD.' },
  {
    when: 'Пт 5 февр.',
    text: 'Откриват, че принтерът за потвърждения не печата, и го третират като повреда на принтера. 81 млн. USD стигат до Манила.',
  },
  { when: 'Пт и сб', text: 'Уикендът на банката. Запитванията от Ню Йорк остават без отговор.' },
  { when: 'Пн 8 февр.', text: 'Китайската нова година. Банките в Манила са затворени.' },
  {
    when: 'Без дата в източниците',
    text: 'Банка посредник спира плащането към Шри Ланка: „Foundation“ е изписано „Fandation“. Всичките 20 млн. USD са възстановени.',
  },
  {
    when: '5 авг. 2016',
    text: 'Bangko Sentral ng Pilipinas глобява RCBC с 1 млрд. филипински песо, около 53 млн. USD, най-голямата глоба, която е налагала.',
  },
  { when: 'Към 2025 г.', text: 'Възстановени са около 15 от 81-те млн. USD.' },
];

export const CITY_NAMES: Record<string, string> = { dhaka: 'Дака', newYork: 'Ню Йорк', manila: 'Манила' };

/** By ISO day. */
export const DAY_LABELS: Record<string, string> = {
  '2016-02-04': 'Чт 4 февр.',
  '2016-02-05': 'Пт 5 февр.',
  '2016-02-06': 'Сб 6 февр.',
  '2016-02-07': 'Нд 7 февр.',
  '2016-02-08': 'Пн 8 февр.',
};

/** In the order of CLOSED_PERIODS. */
export const CLOSED_PERIOD_LABELS = ['Уикенд в Дака', 'Уикенд в Ню Йорк', 'Манила: Китайска нова година'];

/** The calendar's closed reasons, by their English text. */
export const REASONS: Record<string, string> = { Weekend: 'Уикенд', 'Chinese New Year': 'Китайска нова година' };
