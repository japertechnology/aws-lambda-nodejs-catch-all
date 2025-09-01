import { logDebug } from '../logger.js';

describe('logDebug', () => {
  const originalDebug = console.debug;
  let messages;

  beforeEach(() => {
    messages = [];
    console.debug = (...args) => {
      messages.push(args.join(' '));
    };
    process.env.DEBUG = '1';
  });

  afterEach(() => {
    console.debug = originalDebug;
    delete process.env.DEBUG;
  });

  test('logs circular structures without throwing', () => {
    const obj = {};
    obj.self = obj;

    expect(() => logDebug('label', obj)).not.toThrow();
    expect(messages).toHaveLength(1);
    expect(messages[0]).toContain('label');
  });
});
