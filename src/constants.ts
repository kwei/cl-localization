export enum Locale {
  Default = 'ENU',
  FRA = 'FRA',
  DEU = 'DEU',
  JPN = 'JPN',
  CHT = 'CHT',
  CHS = 'CHS',
  KOR = 'KOR',
  ITA = 'ITA',
  ESP = 'ESP',
}

export const Locales = [
  Locale.Default,
  Locale.FRA,
  Locale.DEU,
  Locale.JPN,
  Locale.CHT,
  Locale.CHS,
  Locale.KOR,
  Locale.ITA,
  Locale.ESP,
];

export const LOCALE_FILE_NAME_MAP: Record<Locale, string> = {
  [Locale.DEU]: 'de_DE.json',
  [Locale.Default]: 'en_US.json',
  [Locale.ESP]: 'es_ES.json',
  [Locale.FRA]: 'fr_FR.json',
  [Locale.ITA]: 'it_IT.json',
  [Locale.JPN]: 'ja_JP.json',
  [Locale.KOR]: 'ko_KR.json',
  [Locale.CHS]: 'zh_CN.json',
  [Locale.CHT]: 'zh_TW.json',
};

export const FILE_NAME_LOCALE_MAP: Record<string, Locale> = {
  'de_DE.json': Locale.DEU,
  'en_US.json': Locale.Default,
  'es_ES.json': Locale.ESP,
  'fr_FR.json': Locale.FRA,
  'it_IT.json': Locale.ITA,
  'ja_JP.json': Locale.JPN,
  'ko_KR.json': Locale.KOR,
  'zh_CN.json': Locale.CHS,
  'zh_TW.json': Locale.CHT,
};
