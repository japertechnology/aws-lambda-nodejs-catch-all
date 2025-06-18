export function logDebug(label, payload) {
  if (process.env.DEBUG) {
    const msg = typeof payload === 'string' ? payload : JSON.stringify(payload);
    console.debug(label, msg);
  }
}
