/*
 * This file contains modifications to code from https://github.com/mhalshehri/hijri-converter
 * that is licensed under the MIT license.
 *
 * Copyright (c) 2018 Mohammed H Alshehri (@mhalshehri) and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software.
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * This modified version of the Software is also licensed under the MIT license,
 * and is subject to the same conditions as the original version of the Software.
 *
 * Copyright (c) 2023 Tabby FZ-LLC
 *
 * A copy of the license can be found in the LICENSE file at the root of this
 * distribution.
 */

import { HIJRI_OFFSET, MONTH_STARTS } from './ummalqura';
import { DateType } from './types';
import { ordinalToJdn, rjdToJdn } from './julianDayHelpers';
import { DAYS_BEFORE_MONTH, ord2ymd, isLeap } from './dateHelpers';

/**
 * Return month’s index in ummalqura month starts
 */
function _monthIndex(year: number, month: number): number {
  const priorMonth = (year - 1) * 12 + month - 1;
  const index = priorMonth - HIJRI_OFFSET;
  return index;
}

/**
 * Return number of days in month.
 */
export function hijriDaysInMonth(year: number, month: number): number {
  const index = _monthIndex(year, month);
  return MONTH_STARTS[index + 1] - MONTH_STARTS[index];
}

/**
 * Return corresponding Julian day number (JDN) from Hijri date.
 */
export function hijriToJulian(date: DateType): number {
  const index = _monthIndex(date.year, date.month);
  const rjd = MONTH_STARTS[index] + date.day - 1;
  const jdn = rjdToJdn(rjd);
  return jdn;
}

/**
 * Return corresponding Julian day number (JDN) from Gregorian date.
 */
export function gregorianToJulian(date: DateType): number {
  const y = date.year - 1;
  const m = date.month;
  const daysBeforeYear =
    y * 365 + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
  const daysBeforeMonth =
    DAYS_BEFORE_MONTH[m] + Number(m > 2 && isLeap(date.year));
  const don = daysBeforeYear + daysBeforeMonth + date.day;
  const jdn = ordinalToJdn(don);
  return jdn;
}

/**
 * Construct a date from a proleptic Gregorian ordinal.
 *  January 1 of year 1 is day 1. Only the year, month and day are
 *  non-zero in the result.
 */
export function gregorianFromOrdinal(n: number): DateType {
  const [year, month, day] = ord2ymd(n);
  return { year, month, day };
}
