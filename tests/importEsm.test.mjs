import { gregorianToHijri, hijriToGregorian } from '../dist/index.js';

const date = new Date();

const hijriDate = gregorianToHijri({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDay(),
});

const gregorianDate = hijriToGregorian({ year: 1444, month: 7, day: 15 });
