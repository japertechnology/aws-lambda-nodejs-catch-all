import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle Amazon Lex bot invocations.
 *
 * Dispatch criteria: executed when `event.bot`, `event.userId` and `event.inputTranscript` exist.
 *
 * Available event fields:
 *  - `bot.name`, `alias` and `version` identify the bot.
 *  - `userId`: user identifier for the conversation.
 *  - `inputTranscript`: raw text from the user.
 *  - `currentIntent.name` and `slots`: intent being fulfilled.
 *  - `invocationSource`: reason for invocation.
 * The Lambda `context` object is available for invocation metadata.
 *
 * See https://docs.aws.amazon.com/lex/latest/dg/lambda-input-response-format.html
 */
export default async function handleLex(event, context) {
  const invocation = collectInvocation(event, context, 'lex');
  logDebug('invocation', invocation);
  logDebug('handleLex', { intent: event.currentIntent?.name, requestId: context.awsRequestId });
  return {
    sessionAttributes: {},
    dialogAction: {
      type: 'Close',
      fulfillmentState: 'Fulfilled',
      message: { contentType: 'PlainText', content: 'Hello from Lex!' },
    },
  };
}
