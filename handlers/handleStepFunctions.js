import { logDebug } from '../logger.js';
import collectInvocation from '../collectInvocation.js';

/**
 * Handle AWS Step Functions task invocations.
 *
 * Example callback payload (waitForTaskToken):
 * {
 *   "taskToken": "token",
 *   "input": { ... }
 * }
 *
 * Example context object payload (Payload.$ == "$$"):
 * {
 *   "source": "aws.states",
 *   "Execution": { "Input": { ... } },
 *   "Task": { "Token": "token" }
 * }
 */
export default async function handleStepFunctions(event, context) {
  const invocation = collectInvocation(event, context);
  logDebug('invocation', invocation);
  logDebug('handleStepFunctions', { requestId: context.awsRequestId });
  const input = event.input ?? event.Execution?.Input ?? event;
  console.log('StepFunctions input:', input);
  return { status: 'SUCCEEDED', output: input };
}
