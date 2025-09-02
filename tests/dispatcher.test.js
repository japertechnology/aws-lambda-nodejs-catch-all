/**
 * Tests for the dispatch table loader ensuring unknown handler paths trigger
 * appropriate errors.
 */
import config from '../dispatch-config.js';
import { loadDispatchTable } from '../dispatcher.js';

describe('loadDispatchTable', () => {
  test('throws for unknown handler path', async () => {
    config.push({ check: () => true, handler: './handlers/missing.js' });
    await expect(loadDispatchTable()).rejects.toThrow('Unknown handler path: ./handlers/missing.js');
    config.pop();
  });
});
