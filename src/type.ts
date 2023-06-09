/**
 * 祝日・休業日定義
 * 1948年（昭和23年）7月20日施行以降の祝日定義
 * https://ja.wikipedia.org/wiki/国民の祝日
 *
 * 祝日・休業日タイプ： 1: 日付指定
 *      [1, '祝日名', 月, 日, 開始年, [終了年]]
 * 祝日・休業日タイプ： 2: 週曜日指定（日:0〜土:6）
 *      [2, '祝日名', 月, [週, 曜日], 開始年, [終了年]]
 * 祝日タイプ： 3:春分の日
 *      [3, '祝日名']
 * 祝日タイプ： 4:秋分の日
 *      [4, '祝日名']
 * 祝日・休業日タイプ： 9: 年月日指定
 *      [9, '祝日名', ['YYYY/MM/DD']]
 */
export type Definition = [number, string, (number | string[])?, (number | number[])?, number?, number?];

/**
 * 祝日定義の配列
 */
export type Definitions = Definition[];
