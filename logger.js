/**
 * Conditionally log debugging information.
 *
 * Messages are only output when the `DEBUG` environment variable is set.
 * Payloads that are not strings are serialized to JSON.
 *
 * @param {string} label - Message label used to group debug output.
 * @param {any} payload - Additional context to log.
 */
export function logDebug(label, payload) {
  if (process.env.DEBUG) {
    const msg = typeof payload === 'string' ? payload : JSON.stringify(payload);
    console.debug(label, msg);
  }
}
