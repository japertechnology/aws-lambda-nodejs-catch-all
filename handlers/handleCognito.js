import { logDebug } from '../logger.js';

/**
 * Handle Amazon Cognito User Pool triggers.
 * Key fields:
 *  - triggerSource, userPoolId and userName
 *  - request and response objects
 * See https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-trigger-syntax-shared.html
 */
export default async function handleCognito(event, context) {
  logDebug('handleCognito', { trigger: event.triggerSource, requestId: context.awsRequestId });
  console.log('Cognito trigger:', event.triggerSource);
  return event;
}
