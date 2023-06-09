#!/usr/bin/env node
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

import { readFile, writeFile } from 'fs/promises';
import { Command } from 'commander';
import { RecordNormalizer } from './normalizer.js';

// eslint-disable-next-line consistent-return
async function readJson(file) {
  try {
    return JSON.parse(await readFile(file));
  } catch (err) {
    console.error(`Failed to read file ${file}`, err);
    process.exit(1);
  }
}

const program = new Command();
program
  .name('normalize-records')
  .description('Apply functions to normalize records to the first normal form')
  .requiredOption(
    '--input <input>',
    'the input for the data to normalize, must be a JSON array of Objects',
  )
  .requiredOption(
    '--config <config>',
    'a JSON file containing the configurations',
  )
  .option('--output <output>', 'the file to write the output')
  .action(async (options) => {
    const records = await readJson(options.input);
    const config = await readJson(options.config);

    const normalizer = new RecordNormalizer();
    const normalized = normalizer.normalizeRecords(records, config);
    if (options.output) {
      await writeFile(options.output, JSON.stringify(normalized));
    } else {
      console.log(normalized);
    }
  });

program.parse(process.argv);
