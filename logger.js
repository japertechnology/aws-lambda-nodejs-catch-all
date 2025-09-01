/**
 * Conditionally log debugging information.
 *
 * Messages are only output when the `DEBUG` environment variable is set.
 * Payloads that are not strings are serialized to JSON. If serialization
 * fails (e.g. due to circular references) we fall back to `util.inspect` so
 * that debugging information is still output without throwing errors.
 *
 * @param {string} label - Message label used to group debug output.
 * @param {any} payload - Additional context to log.
 */
import { inspect } from 'node:util';

export function logDebug(label, payload) {
  if (process.env.DEBUG) {
    let msg;
    if (typeof payload === 'string') {
      msg = payload;
    } else {
      try {
        msg = JSON.stringify(payload);
      } catch {
        msg = inspect(payload);
      }
    }
    console.debug(label, msg);
  }
}
