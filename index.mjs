/**
 * Universal AWS Lambda handler entry point.
 *
 * Each incoming event is inspected and dispatched to a specific
 * handler based on its shape.  All handler implementations live
 * under the `handlers/` directory.
 */
import { logDebug } from './logger.js';
import { dispatchTablePromise } from './dispatcher.js';
import handleDefault from './handlers/handleDefault.js';

// Dispatch configuration is loaded on module import. The promise resolves to an
// array of { check, handler } objects used during event dispatch.

/**
 * Main Lambda entry point used by AWS.
 *
 * Iterates over the dispatch table and invokes the first handler whose
 * `check` function matches the incoming event.  If no handler matches,
 * a fallback handler is executed.  HTTP or WebSocket events receive
 * a 500 response if an error is thrown.
 */
export async function handler(event, context) {
  logDebug('dispatcher', { requestId: context.awsRequestId });
  try {
    const dispatchTable = await dispatchTablePromise;
    for (const { check, handler: h } of dispatchTable) {
      if (check(event)) {
        return await h(event, context);
      }
    }
    return await handleDefault(event, context);
  } catch (err) {
    console.error('Error processing event', err);
    // For HTTP or WebSocket requests, return an error response
    if (event.httpMethod || (event.version === '2.0' && (event.requestContext?.http?.method || event.requestContext?.routeKey))) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
    throw err;
  }
}

