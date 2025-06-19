export default function collectInvocation(event, context) {
  const ctx = {};
  if (context) {
    for (const [key, value] of Object.entries(context)) {
      ctx[key] = typeof value === 'function' ? value.call(context) : value;
    }
  }
  return { event, context: ctx };
}
