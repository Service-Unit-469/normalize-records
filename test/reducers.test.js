/*
 * Copyright 2023 Service Unit 469. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-env mocha */
import assert from 'assert';
import {
  anyMatch, first, highest, lowest, unique,
} from '../src/reducers.js';

describe('Reducers Tests', () => {
  describe('anyMatch', () => {
    it('can match', () => {
      const value = anyMatch(['y', 'n'], {
        pattern: 'Y|y',
        match: 'Y',
        nonMatch: 'N',
      });
      assert.strictEqual(value, 'Y');
    });

    it('can not match', () => {
      const value = anyMatch(['a', 'n'], {
        pattern: 'Y|y',
        match: 'Y',
        nonMatch: 'N',
      });
      assert.strictEqual(value, 'N');
    });

    it('will get nonmatch nothing', () => {
      const value = anyMatch([], {
        pattern: 'Y|y',
        match: 'Y',
        nonMatch: 'N',
      });
      assert.strictEqual(value, 'N');
    });
  });

  describe('first', () => {
    it('can get first value', () => {
      const value = first(['y', 'n']);
      assert.strictEqual(value, 'y');
    });

    it('will get undefined with nothing', () => {
      const value = first([]);
      assert.strictEqual(value, undefined);
    });
  });

  describe('highest', () => {
    it('can get the highest value', () => {
      const value = highest([1, 2, 3]);
      assert.strictEqual(value, 3);
    });

    it('will get undefined with nothing', () => {
      const value = highest([]);
      assert.strictEqual(value, undefined);
    });
  });

  describe('lowest', () => {
    it('can get the lowest value', () => {
      const value = lowest([1, 2, 3]);
      assert.strictEqual(value, 1);
    });

    it('will get undefined with nothing', () => {
      const value = lowest([]);
      assert.strictEqual(value, undefined);
    });
  });

  describe('unique', () => {
    it('can get the unique values', () => {
      const value = unique([1, 2, 2, 3]);
      assert.strictEqual(value.length, 3);
    });

    it('will get empty array with nothing', () => {
      const value = unique([]);
      assert.strictEqual(value.length, [].length);
    });

    it('can join values', () => {
      const value = unique(['test1', 'test2'], { join: ',' });
      assert.strictEqual(value, 'test1,test2');
    });
  });
});
