/**
 * Build a structured representation of the invocation data.
 *
 * The raw `context` object exposes functions, so we copy its enumerable
 * properties while invoking any functions to capture their returned values.
 * If a function throws, its error message is stored instead of aborting.
 * This keeps test snapshots stable and avoids leaking functions.
 *
 * @param {object} event - Event payload provided to the Lambda.
 * @param {object} context - Lambda context object.
 * @param {string} handlerType - Identifier for the handler handling the event.
 * @returns {object} Normalized invocation information.
 */
export default function collectInvocation(event, context, handlerType) {
  const ctx = {};
  if (context) {
    const handle = (key, value) => {
      if (typeof value === 'function') {
        try {
          ctx[key] = value.call(context);
        } catch (err) {
          ctx[key] = err && err.message ? err.message : String(err);
        }
      } else {
        ctx[key] = value;
      }
    };

    for (const [key, value] of Object.entries(context)) {
      handle(key, value);
    }

    const proto = Object.getPrototypeOf(context);
    if (proto && proto !== Object.prototype) {
      for (const key of Reflect.ownKeys(proto)) {
        if (key === 'constructor' || Object.prototype.hasOwnProperty.call(ctx, key)) {
          continue;
        }
        handle(key, context[key]);
      }
    }
  }
  return { event, context: ctx, handlerType };
}
