[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![CI Build](https://github.com/Service-Unit-469/normalize-records/actions/workflows/build.yml/badge.svg)](https://github.com/Service-Unit-469/normalize-records/actions/workflows/build.yml)

# Normalize Records

A library for normalizing records into the first normal form.

## Use

### As a Library

First install the library:

    npm i  @service-unit-469/normalize-records

Then you can import and use the library:

    import { RecordNormalizer } from '@service-unit-469/normalize-records';

    const normalizer = new RecordNormalizer();
    const normalized = normalizer.normalizeRecords(data, config);

[API Documentation](./docs/API.md)

### Via CLI

This is also available as a CLI:

    npx @service-unit-469/normalize-records [options]

Get more details on the commands and options with:

    npx @service-unit-469/normalize-records -h

