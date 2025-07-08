/**
 * Build a structured representation of the invocation data.
 *
 * The raw `context` object exposes functions, so we copy its enumerable
 * properties while invoking any functions to capture their returned values.
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
    for (const [key, value] of Object.entries(context)) {
      ctx[key] = typeof value === 'function' ? value.call(context) : value;
    }
  }
  return { event, context: ctx, handlerType };
}
