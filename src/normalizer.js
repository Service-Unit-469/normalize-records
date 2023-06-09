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
import { alternateValue, getValue } from './sources.js';
import { notBlank, notEqual, replace } from './mappers.js';
import {
  anyMatch, first, highest, lowest, unique,
} from './reducers.js';

/**
 * @callback MappingFunction a function which given multiple values is called on
 * each and returns a derived array of values
 * @param {Array<any>} values the values to map
 * @param {any} config the configuration provided for the mapper
 * @returns {Array<any>} the mapped value
 */

/**
 * @callback ReducingFunction a function which takes multiple values
 * and reduces them into a normalized value
 * @param {Array<any>} values the values to reduce
 * @param {any} config the configuration provided for the reducer
 * @returns {any} the reduced value
 */

/**
 * @callback ValueSource a function for extracting a value from the record
 * @param {Record<string,any>} record the record from which to extract the value
 * @param {any} [config] the configuration for the function
 * @returns {any} the extracted value
 */

/**
 * @typedef FieldRule
 * @property {string|Object} reducer the name of the reducer function to execute on the field
 * @property {Array<string|Object>} [mappers] the mapping functions to execute on this field
 * @property {string|Object} [source] the function to retrieve the value for the field
 */

/**
 * @typedef NormalizationConfig
 * @property {string} primaryKey the primary key for performing the merging
 * @property {Array<string>} primarySources the source fields to retrieve the primary key
 * @property {Record<string,FieldRule>} fieldRules the rules for how to normalize each field
 */

class RecordNormalizer {
  #log = console;

  /**
   * @type {Record<string, MappingFunction>}
   */
  #mappers;

  /**
   * @type {Record<string, ReducingFunction>}
   */
  #reducers;

  /**
   * @type {Record<string, ValueSource>}
   */
  #sources;

  constructor() {
    this.#mappers = { notBlank, notEqual, replace };
    this.#reducers = {
      anyMatch,
      first,
      highest,
      lowest,
      unique,
    };
    this.#sources = { alternateValue, getValue };
  }

  /**
   * Adds a new function as supported for reducing values
   * @param {string} name the name with which to register the function
   * @param {MappingFunction} func the actual function
   */
  addMapper(name, func) {
    this.#mappers[name] = func;
  }

  /**
   * Adds a new function as supported for reducing values
   * @param {string} name the name with which to register the function
   * @param {ReducingFunction} func the actual function
   */
  addReducer(name, func) {
    this.#reducers[name] = func;
  }

  /**
   * Adds a new function as supported for extracting values
   * @param {string} name the name with which to register the function
   * @param {ValueSource} func the actual function
   */
  addSource(name, func) {
    this.#sources[name] = func;
  }

  /**
   * @param {Record<string,any>} record the record to map
   * @param {NormalizationConfig} config
   */
  #calculatePrimaryKey(record, config) {
    const primarySources = config.primarySources.filter(
      (v) => record[v] && record[v] !== '',
    );
    if (primarySources.length !== 0) {
      return record[primarySources[0]];
    } else {
      this.#log.warn(
        `Found record without a primary key: ${JSON.stringify(record)}`,
      );
      return undefined;
    }
  }

  /**
   * @param {Array<Record<string,any>>} duplicatedRecords
   * @param {FieldRule} rule
   * @param {string} field
   */
  #extractValues(duplicatedRecords, rule, field) {
    let config = rule.source;
    if (!rule.source) {
      config = { field };
    }
    const source = this.#getSource(
      field,
      rule.source?.name || rule.source || 'getValue',
    );
    return duplicatedRecords.map((r) => source(r, config));
  }

  /**
   * Gets the source, failing with a helpful message if not found
   * @param {string} fieldName
   * @param {string} sourceName
   */
  #getSource(fieldName, sourceName) {
    if (!this.#sources[sourceName]) {
      throw new Error(
        `Could not find source ${sourceName} for field ${fieldName}. Registered sources: ${JSON.stringify(
          Object.keys(this.#sources),
        )}`,
      );
    }
    return this.#sources[sourceName];
  }

  /**
   * Gets the mapper, failing with a helpful message if not found
   * @param {string} fieldName
   * @param {string} mapperName
   */
  #getMapper(fieldName, mapperName) {
    if (!this.#mappers[mapperName]) {
      throw new Error(
        `Could not find mapper ${mapperName} for field ${fieldName}. Registered mappers: ${JSON.stringify(
          Object.keys(this.#mappers),
        )}`,
      );
    }
    return this.#mappers[mapperName];
  }

  /**
   * Gets the reducer, failing with a helpful message if not found
   * @param {string} fieldName
   * @param {string} reducerName
   */
  #getReducer(fieldName, reducerName) {
    if (!this.#reducers[reducerName]) {
      throw new Error(
        `Could not find reducer ${reducerName} for field ${fieldName}. Registered reducers: ${JSON.stringify(
          Object.keys(this.#reducers),
        )}`,
      );
    }
    return this.#reducers[reducerName];
  }

  /**
   *
   * @param {Record<string,any>} record the record to map
   * @param {NormalizationConfig} config
   * @param {Set<string>} primaryKeys
   */
  #mapRecord(record, config, primaryKeys) {
    const primaryKey = this.#calculatePrimaryKey(record, config);
    if (!primaryKey) {
      return undefined;
    }
    primaryKeys.add(primaryKey);
    const mapped = { ...record };
    mapped[config.primaryKey] = primaryKey;
    return mapped;
  }

  /**
   * @param {Array<any>} values
   * @param {FieldRule} rule
   * @param {string} field
   */
  #mapValues(values, rule, field) {
    let mapped = [...values];
    if (rule.mappers) {
      rule.mappers.forEach((mapper) => {
        mapped = this.#getMapper(field, mapper.name || mapper)(mapped, mapper);
      });
    }
    return mapped;
  }

  /**
   * Merges denormalized records into NF1 records by a primary key.
   * @param {Array<any>} records the records to normalize
   * @param {NormalizationConfig} config
   */
  normalizeRecords(records, config) {
    this.#log.info(`Denormalized record count: ${records.length}`);
    // first we need to define and set the primary key
    this.#log.info(
      `Identifying primary key ${config.primaryKey} from ${JSON.stringify(
        config.primarySources,
      )}`,
    );
    const primaryKeys = new Set();
    const mapped = records
      .map((record) => this.#mapRecord(record, config, primaryKeys))
      .filter((record) => record);

    const normalizedRecords = [];
    // loop through each primary key value
    primaryKeys.forEach((key) => {
      // get the duplicate records
      const duplicatedRecords = mapped.filter(
        (l) => l[config.primaryKey] === key,
      );
      this.#log.debug(
        `Merging record for ${key} from: ${duplicatedRecords.length} duplicates`,
      );

      // create a normalize record by looping through each field and calling the merge operation
      const normalizedRecord = {};
      Object.keys(config.fieldRules).forEach((field) => {
        if (config.fieldRules[field]) {
          const rule = config.fieldRules[field];

          /**
           * @type {any[]}
           */
          let values;
          try {
            values = this.#extractValues(duplicatedRecords, rule, field);
          } catch (err) {
            throw new Error(
              `Failed to get values for primaryKey:${key} field:${field} source: ${JSON.stringify(
                rule.source,
              )}, cause: ${err}`,
            );
          }

          try {
            values = this.#mapValues(values, rule, field);
          } catch (err) {
            throw new Error(
              `Failed to map values for primaryKey:${key} field:${field} mappers: ${JSON.stringify(
                rule.mappers,
              )}, cause: ${err}`,
            );
          }
          try {
            normalizedRecord[field] = this.#reduce(values, rule, field);
          } catch (err) {
            throw new Error(
              `Failed to reduce value for primaryKey:${key} field:${field} reducer: ${JSON.stringify(
                rule.reducer,
              )}, cause: ${err}`,
            );
          }
        }
      });
      normalizedRecords.push(normalizedRecord);
    });
    this.#log.info(`Normalized record count: ${normalizedRecords.length}`);
    return normalizedRecords;
  }

  /**
   * @param {Array<any>} values
   * @param {FieldRule} rule
   * @param {string} field
   */
  #reduce(values, rule, field) {
    return this.#getReducer(field, rule.reducer.name || rule.reducer)(
      values,
      rule.reducer,
    );
  }

  /**
   *
   * @param {any} log
   */
  withLogger(log) {
    this.#log = log;
  }
}

export { RecordNormalizer };
