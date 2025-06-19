import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle AWS AppSync resolver events.
 * Key fields:
 *  - arguments: GraphQL arguments passed to the resolver
 *  - identity: caller information such as Cognito identity
 *  - info.fieldName: GraphQL field being resolved
 * See https://docs.aws.amazon.com/appsync/latest/devguide/resolver-context-reference.html
 */
export default async function handleAppSync(event, context) {
  const invocation = collectInvocation(event, context, 'appSync');
  logDebug('invocation', invocation);
  logDebug('handleAppSync', { field: event.info?.fieldName, requestId: context.awsRequestId });
  console.log('AppSync field:', event.info.fieldName);
  return null;
}
