import collectInvocation from '../collectInvocation.js';

describe('collectInvocation', () => {
  test('captures values from function properties', () => {
    const event = { foo: 'bar' };
    const context = {
      awsRequestId: 'req-1',
      getRemainingTimeInMillis() { return 1000; },
      custom: () => 'value'
    };

    const result = collectInvocation(event, context, 'test');

    expect(result).toEqual({
      event,
      context: {
        awsRequestId: 'req-1',
        getRemainingTimeInMillis: 1000,
        custom: 'value'
      },
      handlerType: 'test'
    });
  });
});
