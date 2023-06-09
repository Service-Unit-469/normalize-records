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
import { alternateValue, getValue } from '../src/sources.js';

describe('Source Tests', () => {
  describe('alternateValue', () => {
    it('can get alternate value', () => {
      const value = alternateValue(
        {
          field1: 'nope',
          field2: 'yep',
          field3: 'testvalue',
        },
        {
          defaultField: 'field1',
          alternateField: 'field2',
          testField: 'field3',
          testValue: 'testvalue',
        },
      );
      assert.strictEqual(value, 'yep');
    });

    it('will fall back to default', () => {
      const value = alternateValue(
        {
          field1: 'nope',
          field2: 'yep',
          field3: 'tetvalue2',
        },
        {
          defaultField: 'field1',
          alternateField: 'field2',
          testField: 'field3',
          testValue: 'testvalue',
        },
      );
      assert.strictEqual(value, 'nope');
    });
  });

  describe('getValue', () => {
    it('can get a value', () => {
      const value = getValue(
        {
          original: 'test',
        },
        {
          field: 'original',
        },
      );
      assert.strictEqual(value, 'test');
    });
  });
});
