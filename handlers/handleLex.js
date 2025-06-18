import { logDebug } from '../logger.js';

/**
 * Handle Amazon Lex bot invocations.
 * Key fields:
 *  - bot.name, alias and version identify the bot
 *  - userId: user identifier for the conversation
 *  - inputTranscript: raw text from the user
 *  - currentIntent.name and slots: intent being fulfilled
 *  - invocationSource: reason for invocation
 * See https://docs.aws.amazon.com/lex/latest/dg/lambda-input-response-format.html
 */
export default async function handleLex(event, context) {
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
