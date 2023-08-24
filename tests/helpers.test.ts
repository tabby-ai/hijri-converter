import { describe, expect, test } from '@jest/globals';
import {
  jdnToOrdinal,
  ordinalToJdn,
  jdnToRjd,
  rjdToJdn,
} from '../src/_lib/julianDayHelpers';

describe('hijri helpers', () => {
  test('Julian day number to date ordinal number', () => {
    expect(jdnToOrdinal(2447977)).toBe(726552);
  });

  test('date ordinal number to Julian day number', () => {
    expect(ordinalToJdn(726552)).toBe(2447977);
  });

  test('Julian day number to reduced Julian day number', () => {
    expect(jdnToRjd(2456087)).toBe(56087);
  });

  test('reduced Julian day number to Julian day number', () => {
    expect(rjdToJdn(56087)).toBe(2456087);
  });
});
