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

import { DateType } from './_lib/types';
import { checkGregorianRange } from './_lib/checkDateRange';
import { gregorianToJulian } from './_lib/dateHelpersHijri';
import { jdnToRjd } from './_lib/julianDayHelpers';
import { bisect } from './_lib/utils/bisect';
import { HIJRI_OFFSET, MONTH_STARTS } from './_lib/ummalqura';

/**
 * Return Hijri object for the corresponding Gregorian date.
 * @throws {Error} when date is out of supported Gregorian range.
 */
export function gregorianToHijri(date: DateType): DateType {
  checkGregorianRange(date);

  const jdn = gregorianToJulian(date);
  const rjd = jdnToRjd(jdn);
  const index = bisect(MONTH_STARTS, rjd) - 1;
  const months = index + HIJRI_OFFSET;
  const years = Math.floor(months / 12);
  const year = years + 1;
  const month = months - years * 12 + 1;
  const day = rjd - MONTH_STARTS[index] + 1;

  return { year, month, day };
}
