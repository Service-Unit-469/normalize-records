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

import { notBlank } from './mappers.js';

/**
 * Returns the match value if the values matches the pattern and the nonMatch value otherwise
 * @param {Array<any>} values
 * @param {{pattern:string,match:any,nonMatch:any}} config
 */
function anyMatch(values, config) {
  return notBlank(values).some((v) => new RegExp(config.pattern).test(v))
    ? config.match
    : config.nonMatch;
}

/**
 * Gets the first non-blank value
 * @param {Array<any>} values
 */
function first(values) {
  if (notBlank(values).length > 0) {
    return notBlank(values)[0];
  }
  return undefined;
}

/**
 * Gets the highest value by natural sort
 * @param {Array<any>} values
 */
function highest(values) {
  return notBlank(values).sort()[values.length - 1];
}

/**
 * Gets the lowest value by natural sort
 *
 * @param {Array} values
 */
function lowest(values) {
  return notBlank(values).sort()[0];
}

/**
 * Gets the unique values
 *
 * @param {Array} values
 * @param {{join:string}} config
 */
function unique(values, config) {
  const un = new Set();
  notBlank(values).forEach((v) => un.add(v));
  if (!config?.join) {
    return Array.from(un).sort();
  } else {
    return Array.from(un).sort().join(config.join);
  }
}

export {
  anyMatch, first, highest, lowest, unique,
};
