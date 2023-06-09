import definitions from './holidays-def';
import { Definition, Definitions } from './type';

/** 休業日設定 */
let _workingDefinitions: Definitions = [];

/**
 * 渡された日付が祝日かどうかを返す（振替休日・国民の休日を除く）
 * @param date 対象日付
 * @returns 祝日の場合は祝日名。それ以外は空文字。
 */
const _isHolidayOnly = (targetDate: Date) => {
  let holiday = '';

  for (let def of definitions) {
    // 定義内かどうか
    if (def[4] && targetDate.getFullYear() < def[4]) continue;
    if (def[5] && def[5] < targetDate.getFullYear()) continue;
    if (def[0] === 3 && targetDate.getFullYear() <= 1948) continue;
    if (def[0] === 4 && targetDate.getFullYear() < 1948) continue;

    // 日付指定
    if (def[0] === 1) {
      holiday = simpleHoliday(targetDate, def);
      if (holiday) break;
    }
    // 週曜日指定
    if (def[0] === 2) {
      holiday = nthWeek(targetDate, def);
      if (holiday) break;
    }
    // 春分の日
    if (def[0] === 3) {
      holiday = syunbun(targetDate, def);
      if (holiday) break;
    }
    // 秋分の日
    if (def[0] === 4) {
      holiday = syuubun(targetDate, def);
      if (holiday) break;
    }
  }
  return holiday;
};

const _isWorkingHoliday = (targetDate: Date) => {
  let workingHoliday = '';

  for (let def of _workingDefinitions) {
    // 定義内かどうか
    if (def[4] && targetDate.getFullYear() < def[4]) continue;
    if (def[5] && def[5] < targetDate.getFullYear()) continue;

    // 日付指定
    if (def[0] === 1) {
      workingHoliday = simpleHoliday(targetDate, def);
      if (workingHoliday) break;
    }
    // 週曜日指定
    if (def[0] === 2) {
      workingHoliday = nthWeek(targetDate, def);
      if (workingHoliday) break;
    }
    // 年月日指定
    if (def[0] === 9) {
      workingHoliday = arrayHoliday(targetDate, def);
      if (workingHoliday) break;
    }
  }
  return workingHoliday;
};

/**
 * 日付指定の祝日・休業日定義から、対象日付が祝日・休業日かどうかを返す
 * @param targetDate 対象日付
 * @param definition 祝日・休業日定義（年が範囲内であること）
 * @returns 祝日・休業日の場合は祝日・休業日名。それ以外は空文字。
 */
const simpleHoliday = (targetDate: Date, definition: Definition) => {
  if (targetDate.getMonth() + 1 !== definition[2]) return '';
  if (targetDate.getDate() !== definition[3]) return '';
  // 月・日が一致している場合値を返す
  return definition[1];
};

/**
 * 週曜日指定の祝日・休業日定義から、対象日付が祝日・休業日かどうかを返す
 * @param targetDate 対象日付
 * @param definition 祝日・休業日定義（年が範囲内であること）
 * @returns 祝日の場合は祝日名。それ以外は空文字。
 */
const nthWeek = (targetDate: Date, definition: Definition) => {
  const compDate = getNthWeekDay(
    targetDate.getFullYear(),
    <number>definition[2]!,
    (<number[]>definition[3])[0],
    (<number[]>definition[3])[1]
  );
  if (targetDate.getMonth() !== compDate.getMonth()) return '';
  if (targetDate.getDate() !== compDate.getDate()) return '';
  return definition[1];
};

/**
 * 対象日付が春分の日かどうかを返す
 * @param targetDate 対象日付
 * @param definition 祝日定義（年が範囲内であること）
 * @returns 祝日の場合は祝日名。それ以外は空文字。
 */
const syunbun = (targetDate: Date, definition: Definition) => {
  // 3月ではない場合処理しない
  if (targetDate.getMonth() + 1 !== 3) return '';
  // 1948年以前(1948年含む)は処理しない
  if (targetDate.getFullYear() <= 1948) return '';

  // 1980年以前は固定値計算
  if (targetDate.getFullYear() < 1980) {
    // http://www.asahi-net.or.jp/~ci5m-nmr/misc/equinox.html
    // 20 - 1960, 1964, 1968, 1972, 1976
    // 21 - others
    const _20 = [1960, 1964, 1968, 1972, 1976];
    if (targetDate.getDate() === 20 && _20.includes(targetDate.getFullYear())) {
      return definition[1];
    } else if (targetDate.getDate() === 21) {
      return definition[1];
    }
    return '';
  }

  // 1980年以降
  const d =
    Math.floor(20.8431 + 0.242194 * (targetDate.getFullYear() - 1980)) -
    Math.floor((targetDate.getFullYear() - 1980) / 4);
  if (targetDate.getDate() === d) return definition[1];
  return '';
};

/**
 * 対象日付が秋分の日かどうかを返す
 * @param targetDate 対象日付
 * @param definition 祝日定義（年が範囲内であること）
 * @returns 祝日の場合は祝日名。それ以外は空文字。
 */
const syuubun = (targetDate: Date, definition: Definition) => {
  // 9月ではない場合処理しない
  if (targetDate.getMonth() + 1 !== 9) return '';
  // 1948年以前は処理しない
  if (targetDate.getFullYear() < 1948) return '';

  // 1980年以前は固定値計算
  if (targetDate.getFullYear() < 1980) {
    // http://www.asahi-net.or.jp/~ci5m-nmr/misc/equinox.html
    // 24 - 1951, 1955, 1959, 1963, 1967, 1971, 1975, 1979
    // 23 - others
    const _24 = [1951, 1955, 1959, 1963, 1967, 1971, 1975, 1979];
    if (targetDate.getDate() === 24 && _24.includes(targetDate.getFullYear())) {
      return definition[1];
    } else if (targetDate.getDate() === 23) {
      return definition[1];
    }
    return '';
  }

  // 1980年以降
  const d =
    Math.floor(23.2488 + 0.242194 * (targetDate.getFullYear() - 1980)) -
    Math.floor((targetDate.getFullYear() - 1980) / 4);
  if (targetDate.getDate() === d) return definition[1];
  return '';
};

/**
 * 配列指定の祝日・休業日定義から、対象日付が祝日・休業日かどうかを返す
 * @param targetDate
 * @param definition
 * @returns
 */
const arrayHoliday = (targetDate: Date, definition: Definition) => {
  const dateString = formatDate(targetDate);
  return (<string[]>definition[2]!).includes(dateString) ? definition[1] : '';
};

/**
 * 対象日付が振替休日かどうかを返す
 * @param targetDate 対象日付
 * @returns 祝日の場合は祝日名。それ以外は空文字。
 */
const furikae = (targetDate: Date) => {
  const holiday = '振替休日';

  // 1973年4月以前は対象外
  if (targetDate.getFullYear() < 1973 || (targetDate.getFullYear() === 1973 && targetDate.getMonth() + 1 < 4))
    return '';

  // 連続して祝日を遡り、日曜が祝日かどうかを判定
  let _tmpDate = new Date(targetDate.getTime());
  let d = 0;
  while (true) {
    // 2007以前は月曜固定のため、複数日遡らない
    if (targetDate.getFullYear() < 2007 && d === -1) return '';
    // 日付をずらす
    _tmpDate.setDate(targetDate.getDate() + --d);
    // 祝日かどうか
    const _holiday = _isHolidayOnly(_tmpDate);
    // 祝日でなければ抜ける
    if (!_holiday) return '';
    // ずらした日付が日曜日の場合
    if (_tmpDate.getDay() === 0) return holiday;
  }
};

/**
 * 対象日付が国民の休日かどうかを返す
 * @param targetDate 対象日付
 * @returns 祝日の場合は祝日名。それ以外は空文字。
 */
const kokumin = (targetDate: Date) => {
  const holiday = '国民の休日';

  // 1986年以前は対象外
  if (targetDate.getFullYear() < 1986) return '';

  // 前日と翌日を取得
  let beforeDate = new Date(targetDate.getTime());
  beforeDate.setDate(targetDate.getDate() - 1);
  let afterDate = new Date(targetDate.getTime());
  afterDate.setDate(targetDate.getDate() + 1);

  // 前日を翌日が祝日かどうか
  if (_isHolidayOnly(beforeDate) && _isHolidayOnly(afterDate)) return holiday;
  return '';
};

// ------------------------------------------------ util

/**
 * Dateオブジェクトにして返す
 * @param date 日付
 * @returns Dateオブジェクト
 */
const convertStringDate = (date: string | Date) => {
  const d = new Date(date);
  if (!isNaN(d.getDate())) return d;
  throw new Error('wrong date!');
};

/**
 * 日付をYYYY/MM/DD形式にして文字列で返す
 * @param date 対象日付
 * @returns YYYY/MM/DD形式の文字列
 */
const formatDate = (date: Date) => {
  var y = date.getFullYear();
  var m = ('00' + (date.getMonth() + 1)).slice(-2);
  var d = ('00' + date.getDate()).slice(-2);
  return y + '/' + m + '/' + d;
};

/**
 * 対象年月週曜日のDateオブジェクトを返す
 * @param year 対象の年
 * @param month 対象の月
 * @param nth 対象の週番号
 * @param day 対象の曜日（日:0〜土:6）
 * @returns 対象年月週曜日のDateオブジェクトを返す
 */
const getNthWeekDay = (year: number, month: number, nthWeek: number, day: number) => {
  const date = new Date(year, month - 1, 1);
  const s = day < date.getDay() ? 7 : 0;
  const d = nthWeek * 7 + (s - date.getDay()) - 7 + day;
  date.setDate(date.getDate() + d);
  return date;
};

// ------------------------------------------------ export

/**
 * 渡された日付が祝日かどうかを返す
 * ※ 休業日設定を設定している場合は、休業日も返す
 * @param date 対象日付
 * @returns 祝日の場合は祝日名。それ以外は空文字。
 */
const isHoliday = (date: string | Date): string => {
  let holiday = '';

  // Dateオブジェクト取得
  const targetDate = convertStringDate(date);

  // 祝日を判定
  holiday = _isHolidayOnly(targetDate);
  if (holiday) return holiday;

  // 振替休日を判定
  holiday = furikae(targetDate);
  if (holiday) return holiday;

  // 国民の休日を判定
  holiday = kokumin(targetDate);
  if (holiday) return holiday;

  // 休業日が設定されていた場合、判定
  if (_workingDefinitions) {
    holiday = _isWorkingHoliday(targetDate);
    if (holiday) return holiday;
  }

  return holiday;
};

/**
 * 休業日を設定する
 * @param workingDefinitions 休業日設定
 */
const setWorkingDefinitions = (workingDefinitions: Definitions) => {
  _workingDefinitions = workingDefinitions;
};

export default { isHoliday, setWorkingDefinitions };
