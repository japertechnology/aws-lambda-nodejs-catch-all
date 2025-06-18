import { logDebug } from '../logger.js';

/**
 * Handle AWS Config rule evaluations.
 * Key fields:
 *  - invokingEvent: the configuration change that triggered the rule
 *  - ruleParameters: custom parameters for the rule
 *  - resultToken: token used when reporting evaluation results
 * See https://docs.aws.amazon.com/config/latest/developerguide/evaluate-config_develop-rules_nodejs.html
 */
export default async function handleConfigRule(event, context) {
  logDebug('handleConfigRule', { resultToken: event.resultToken, requestId: context.awsRequestId });
  console.log('Config rule invoke:', event.invokingEvent);
  return { complianceType: 'COMPLIANT', annotation: 'Default OK' };
}
