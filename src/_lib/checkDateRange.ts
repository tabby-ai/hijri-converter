import { GREGORIAN_RANGE, HIJRI_RANGE } from './ummalqura';
import { isoFormat } from './isoFormat';
import { DateType } from './types';
import { hijriDaysInMonth } from './dateHelpersHijri';

/**
 * Check date values if within valid range.
 */
export function checkHijriRange(date: DateType): void {
  // check year
  const [[minYear], [maxYear]] = HIJRI_RANGE;
  if (date.year < minYear || maxYear < date.year) {
    throw Error('date out of range');
  }
  // check month
  const maxMonths = 12;
  if (date.month < 1 || maxMonths < date.month) {
    throw Error(`month must be in 1..${maxMonths}`);
  }
  // check day
  const monthLen = hijriDaysInMonth(date.year, date.month);
  if (date.day < 1 || monthLen < date.day) {
    throw Error(`day must be in 1..${monthLen}`);
  }
}

/**
 * Check if Gregorian date is within valid range.
 */
export function checkGregorianRange(date: DateType) {
  const [minDate, maxDate] = GREGORIAN_RANGE;
  const isoCurrentDate = isoFormat(date.year, date.month, date.day);
  if (
    isoFormat(...minDate) > isoCurrentDate ||
    isoFormat(...maxDate) < isoCurrentDate
  ) {
    throw Error('date out of range');
  }
}
