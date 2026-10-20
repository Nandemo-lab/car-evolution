import test from 'node:test'
import assert from 'node:assert/strict'

import { sanitizeAnalyticsParameters } from '../src/analytics.js'
import { classifyModelQuery } from '../src/model-finder.js'

test('analytics parameters discard raw user input and personal identifiers', () => {
  assert.deepEqual(sanitizeAnalyticsParameters({
    query: 'JF1',
    notes: '車台番号 ABC123',
    vin: 'ABC123',
    query_type: 'model_code',
    result_count: 2,
    checked: true,
  }), {
    query_type: 'model_code',
    result_count: 2,
    checked: true,
  })
})

test('model finder classifies without retaining the entered value', () => {
  assert.equal(classifyModelQuery('JF1'), 'model_code')
  assert.equal(classifyModelQuery('プリウス'), 'vehicle_name')
  assert.equal(classifyModelQuery('unknown model'), 'other')
})
