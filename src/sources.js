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

import { isBlank } from './mappers.js';

/**
 * Returns the value of the alternateField if the value of the testField equals the testValue.
 * Otherwise returns the value of the defaultField.
 *
 * @param {Record<string,any>} record
 * @param {{defaultField:string,alternateField:string,testField:string,testValue:any}} config
 */
function alternateValue(record, config) {
  const {
    defaultField, alternateField, testField, testValue,
  } = config;
  const value = record[testField];
  if (value === testValue) {
    return record[alternateField];
  } else {
    return record[defaultField];
  }
}

/**
 * Returns the value of a different field name than the field to which the data will be saved
 *
 * @param {Record<string,any>} record
 * @param {{field:string,fallbackField:string}} config
 */
function getValue(record, config) {
  const value = record[config.field];
  if (isBlank(value)) {
    return record[config.fallbackField];
  }
  return value;
}

export { alternateValue, getValue };
