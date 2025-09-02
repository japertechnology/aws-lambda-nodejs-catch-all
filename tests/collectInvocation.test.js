/**
 * Unit tests for the `collectInvocation` helper, verifying that context
 * functions are executed and errors handled gracefully.
 */
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

  test('handles context functions that throw', () => {
    const event = {};
    const context = {
      ok: () => 'good',
      fail() { throw new Error('boom'); }
    };

    const result = collectInvocation(event, context, 'test');

    expect(result).toEqual({
      event,
      context: { ok: 'good', fail: 'boom' },
      handlerType: 'test'
    });
  });

  test('captures prototype methods', () => {
    const event = {};
    class ProtoCtx {
      protoMethod() { return 'proto'; }
      protoFail() { throw new Error('oops'); }
    }
    const context = new ProtoCtx();
    context.awsRequestId = 'req-2';
    context.own = () => 'own';

    const result = collectInvocation(event, context, 'test');

    expect(result).toEqual({
      event,
      context: {
        awsRequestId: 'req-2',
        own: 'own',
        protoMethod: 'proto',
        protoFail: 'oops'
      },
      handlerType: 'test'
    });
  });
});
