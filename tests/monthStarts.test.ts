import { describe, expect, test } from '@jest/globals';
import { hijriToGregorian, gregorianToHijri } from '../src';

const kfupmComparisonCalendar = require('./fixtures/kfupm-comparison-calender.json');
const ummalquraWebsiteCalendar = require('./fixtures/ummalqura-website-calendar.json');
const ummalquraNewspaperIssues = require('./fixtures/ummalqura-newspaper-issues.json');

const testCases = [
  ...kfupmComparisonCalendar,
  ...ummalquraWebsiteCalendar,
  ...ummalquraNewspaperIssues,
];

describe('calendar converting', () => {
  for (let i = 0; i < testCases.length; i++) {
    const [[hijriDate, gregorianDateTuple]] = testCases[i];
    const [hYear, hMonth, hDay] = hijriDate;
    const [gYear, gMonth, gDay] = gregorianDateTuple;

    test('Hijri to Gregorian', () => {
      const gregorian = hijriToGregorian({
        year: hYear,
        month: hMonth,
        day: hDay,
      });
      expect([gregorian.year, gregorian.month, gregorian.day]).toEqual(
        gregorianDateTuple
      );
    });

    test('Gregorian to Hijri', () => {
      const hijri = gregorianToHijri({
        year: gYear,
        month: gMonth,
        day: gDay,
      });
      expect([hijri.year, hijri.month, hijri.day]).toEqual(hijriDate);
    });
  }
});
