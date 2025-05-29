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
import { notEqual } from '../src/mappers.js';

describe('Mappers Tests', function() {
  describe('notEqual', function() {
    it('can match', function() {
      const value = notEqual(['test', 'excludeme'], { value: 'excludeme' });
      assert.strictEqual(value.length, 1);
      assert.strictEqual(value[0], 'test');
    });

    it('will work with nothing', function() {
      const value = notEqual([], { value: 'excludeme' });
      assert.strictEqual(value.length, 0);
    });
  });
});
