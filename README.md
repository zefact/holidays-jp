# @zefact/holidays-jp [![publish jp-holidays](https://github.com/zefact/holidays-jp/actions/workflows/main.yml/badge.svg)](https://github.com/zefact/holidays-jp/actions/workflows/main.yml) ![GPR Version](https://img.shields.io/github/package-json/v/zefact/holidays-jp?label=version)

日本の祝日及び休業日を設定・判定する Javascript のライブラリです。  
会社の休業日等の休みを設定し、判定することもできます。  
国民の祝日に関する法律（1948 年 7 月 20 日）以降の祝祭日を設定しています。  
2023 年 6 月時点でのデータに基づく。

## インストール

GitHub Packages にて公開しているため、ディレクトリ直下に`.npmrc`ファイルを作成し以下を記載。

```
@zefact:registry="https://npm.pkg.github.com"
//npm.pkg.github.com/:_authToken={ GitHubのPAT（自身のプライベートアクセストークン） }
```

PAT の取得方法は[こちら](https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)を参照。

```shell
$ npm install @zefact/holidays-jp
```

## 利用方法

```ts
// ES Modules
import HolidaysJP from '@zefact/holidays-jp';
// commonJS
const HolidaysJP = require('@zefact/holidays-jp');

// 祝日判定
const holiday = HolidaysJP.isHoliday('2023/01/01');
if (holiday) console.log(holiday); // 元旦

// 休業日設定
const workingHolidays = [
  [1, '休業日', 5, 1, 2000],
  [2, '休業日', 5, [3, 5], 2000],
  [9, '休業日', ['2023/05/22', '2023/05/23']],
];
HolidaysJP.setWorkingDefinitions(workingHolidays);

// 休業日判定
const workingHoliday = HolidaysJP.isHoliday('2023/05/22');
if (workingHoliday) console.log(workingHoliday); // 休業日
```

ブラウザ

```js
<script src='./dist/holidays-jp.iife.min.js'></script>;

// 祝日判定
const holiday = HolidaysJP.isHoliday('2023/01/01');
if (holiday) console.log(holiday); // 元旦

// 休業日設定
const workingHolidays = [
  [1, '休業日', 5, 1, 2000],
  [2, '休業日', 5, [3, 5], 2000],
  [9, '休業日', ['2023/05/22', '2023/05/23']],
];
HolidaysJP.setWorkingDefinitions(workingHolidays);

// 休業日判定
const workingHoliday = HolidaysJP.isHoliday('2023/05/22');
if (workingHoliday) console.log(workingHoliday); // 休業日
```

## 定義

基本的に 1948(昭和 23 年)年 7 月 20 日公布、施行された国民の祝日に関する法律を元に作成。  
この日以前の祝日は正しくないもしくは計算されません。

### 振替休日

1973 年 4 月以降適用  
2007 年以前は祝日が日曜日の場合、翌日を振替休日とする。  
2007 年以降は祝日が日曜日の場合、次の祝日でない日を振替休日とする。

### 国民の休日

1986 年以降適用  
前後が祝日で挟まれた日は国民の休日とする。

### 春分・秋分の日

国立天文台が「暦要項」を前年 2 月の最初の官報に掲載し、これをもって正式決定となります。  
1980 年以降は簡易計算式にて計算。それ以前は固定値。  
[http://www.asahi-net.or.jp/~ci5m-nmr/misc/equinox.html](http://www.asahi-net.or.jp/~ci5m-nmr/misc/equinox.html)

## License

[MIT](LICENSE)

## 謝辞

[japanese-holidays-js](https://github.com/osamutake/japanese-holidays-js)を参考に作成しました。  
osamutake 様及び Contributors の皆様に感謝いたします。

## ChangeLog

- 2023-06-06：v1.0.0
  - 初版
