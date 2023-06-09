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

/**
 * Returns true if the value is falsy or an empty string
 * @param {any} str the value to check
 * @returns true if the value is blank, false otherwise
 */
function isBlank(str) {
  return !str || (typeof str === 'string' && /^\s*$/.test(str));
}

/**
 * Returns non-blank values
 * @param {Array<any>} values
 * @returns {Array<any>}
 */
function notBlank(values) {
  return values.filter((v) => !isBlank(v));
}

/**
 * Returns values which do not match the specified value
 * @param {Array<any>} values
 * @param {{value: any}} config
 * @returns {Array<any>}
 */
function notEqual(values, config) {
  return values.filter((v) => v !== config.value);
}

/**
 * Returns values after replacing the specified pattern with the specified replacement
 * @param {Array<any>} values
 * @param {{pattern:string,replacement:string}} config
 * @returns {Array<any>}
 */
function replace(values, config) {
  const pattern = new RegExp(config.pattern);
  return values.map((val) => val.replace(pattern, config.replacement));
}

export {
  isBlank, notBlank, notEqual, replace,
};
