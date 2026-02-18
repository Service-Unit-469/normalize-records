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
import assert from 'assert';
import { readFile } from 'fs/promises';
import { RecordNormalizer } from '../src/normalizer.js';

async function readJson(file) {
  return JSON.parse(await readFile(file));
}

describe('Record Normalizer Tests', function() {
  it('simple merge', async function() {
    const normalizer = new RecordNormalizer();
    const records = await readJson('test/res/simple.json');
    const config = await readJson('test/res/config.json');
    const normalized = normalizer.normalizeRecords(records, config);
    assert.strictEqual(normalized.length, 2);
  });

  it('will fail on missing source', function() {
    const normalizer = new RecordNormalizer();
    assert.throws(() => normalizer.normalizeRecords([{ id: 1 }, { id: 2 }], {
      primaryKey: 'id',
      primarySources: ['id'],
      fieldRules: {
        id: {
          source: 'notvalid',
          reducer: 'unique',
        },
      },
    }));
  });

  it('will fail on missing mapper', function() {
    const normalizer = new RecordNormalizer();
    assert.throws(() => normalizer.normalizeRecords([{ id: 1 }, { id: 2 }], {
      primaryKey: 'id',
      primarySources: ['id'],
      fieldRules: {
        id: {
          mappers: ['notvalid'],
          reducer: 'unique',
        },
      },
    }));
  });

  it('will fail on missing reducer', function() {
    const normalizer = new RecordNormalizer();
    assert.throws(() => normalizer.normalizeRecords([{ id: 1 }, { id: 2 }], {
      primaryKey: 'id',
      primarySources: ['id'],
      fieldRules: {
        id: {
          mappers: [],
          reducer: 'notvalid',
        },
      },
    }));
  });

  it('will normalize records', function() {
    const normalizer = new RecordNormalizer();
    const result = normalizer.normalizeRecords(
      [
        { id: 1, value: 3 },
        { id: 1, value: 4 },
      ],
      {
        primaryKey: 'id',
        primarySources: ['id'],
        fieldRules: {
          id: {
            reducer: 'first',
          },
          value: {
            reducer: 'unique',
          },
        },
      },
    );
    assert.strict(result.length, 1);
    assert.strict(result[0].id, 1);
    assert.strict(result[0].value, [3, 4]);
  });

  it('will skip records without a primary key', function() {
    const normalizer = new RecordNormalizer();
    const result = normalizer.normalizeRecords(
      [{ id: 1, value: 3 }, { value: 4 }],
      {
        primaryKey: 'id',
        primarySources: ['id'],
        fieldRules: {
          id: {
            reducer: 'first',
          },
          value: {
            reducer: 'unique',
          },
        },
      },
    );
    assert.strict(result.length, 1);
    assert.strict(result[0].id, 1);
    assert.strict(result[0].value, [3]);
  });

  it('can add custom functions', function() {
    const normalizer = new RecordNormalizer();
    normalizer.addSource('customext', () => 'customext');
    normalizer.addMapper('custommap', (values) => values.map((v) => v.replace('customext', 'custommap')));
    normalizer.addReducer('customred', (values) => values.map((v) => v.replace('custommap', 'customred')));
    const result = normalizer.normalizeRecords([{ id: 1, value: 3 }], {
      primaryKey: 'id',
      primarySources: ['id'],
      fieldRules: {
        id: {
          reducer: 'first',
        },
        value: {
          source: 'customext',
          mappers: ['custommap'],
          reducer: 'customred',
        },
      },
    });
    assert.strict(result.length, 1);
    assert.strict(result[0].value, ['customred']);
  });
});
