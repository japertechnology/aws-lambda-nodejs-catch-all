import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle Alexa Skills Kit requests.
 * Key fields:
 *  - session.sessionId: unique session identifier
 *  - request.type: type such as IntentRequest
 *  - request.intent.name and slots: invoked intent details
 *  - context.System.device.deviceId: device identifier
 * See https://developer.amazon.com/en-US/docs/alexa/custom-skills/request-and-response-json-reference.html
 */
export default async function handleAlexa(event, context) {
  const invocation = collectInvocation(event, context, 'alexa');
  logDebug('invocation', invocation);
  logDebug('handleAlexa', { sessionId: event.session?.sessionId, requestType: event.request?.type, awsRequestId: context.awsRequestId });
  return {
    version: '1.0',
    response: { outputSpeech: { type: 'PlainText', text: 'Hello from Alexa!' } },
  };
}
