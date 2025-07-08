/**
 * Universal AWS Lambda handler entry point.
 *
 * Each incoming event is inspected and dispatched to a specific
 * handler based on its shape.  All handler implementations live
 * under the `handlers/` directory.
 */
import { logDebug } from './logger.js';
import handleAlexa from './handlers/handleAlexa.js';
import handleLex from './handlers/handleLex.js';
import handleAppSync from './handlers/handleAppSync.js';
import handleIoTRule from './handlers/handleIoTRule.js';
import handleFirehose from './handlers/handleFirehose.js';
import handleConfigRule from './handlers/handleConfigRule.js';
import handleStepFunctions from './handlers/handleStepFunctions.js';
import handleWebSocket from './handlers/handleWebSocket.js';
import handleAuthorizerV1 from './handlers/handleAuthorizerV1.js';
import handleAuthorizerV2 from './handlers/handleAuthorizerV2.js';
import handleHttpV1 from './handlers/handleHttpV1.js';
import handleHttpV2 from './handlers/handleHttpV2.js';
import handleAlb from './handlers/handleAlb.js';
import handleEdge from './handlers/handleEdge.js';
import handleCloudWatchLogs from './handlers/handleCloudWatchLogs.js';
import handleCustomResource from './handlers/handleCustomResource.js';
import handleCognito from './handlers/handleCognito.js';
import handleSqs from './handlers/handleSqs.js';
import handleSns from './handlers/handleSns.js';
import handleS3 from './handlers/handleS3.js';
import handleDynamoDB from './handlers/handleDynamoDB.js';
import handleKinesis from './handlers/handleKinesis.js';
import handleSes from './handlers/handleSes.js';
import handleEventBridge from './handlers/handleEventBridge.js';
import handleScheduled from './handlers/handleScheduled.js';
import handleDefault from './handlers/handleDefault.js';

/**
 * Extract the eventSource from the first record if the event contains
 * a `Records` array. Some AWS services use `EventSource` instead of
 * `eventSource`, so both are checked.
 *
 * @param {object} event - Incoming Lambda event.
 * @returns {string|undefined} the source service or undefined if not present.
 */
function getRecordsSource(event) {
  if (event.Records && Array.isArray(event.Records) && event.Records.length > 0) {
    return event.Records[0].eventSource || event.Records[0].EventSource;
  }
  return undefined;
}

// Mapping of event detection functions to their corresponding handler.
// Each `check` function returns true if the incoming event matches that
// handler's expected structure.
const dispatchTable = [
  { check: e => e.request && e.session && e.context?.System, handler: handleAlexa },
  { check: e => e.bot && e.userId && e.inputTranscript, handler: handleLex },
  { check: e => e.arguments && e.identity && e.info, handler: handleAppSync },
  { check: e => e.clientId && e.topic && e.payload, handler: handleIoTRule },
  { check: e => e.records && Array.isArray(e.records) && e.records[0]?.recordId, handler: handleFirehose },
  { check: e => e.invokingEvent && e.ruleParameters && e.resultToken, handler: handleConfigRule },
  { check: e => e.taskToken || e.source === 'aws.states', handler: handleStepFunctions },
  { check: e => e.version === '2.0' && e.requestContext?.routeKey && e.requestContext?.connectionId, handler: handleWebSocket },
  { check: e => e.type === 'TOKEN' && e.methodArn, handler: handleAuthorizerV1 },
  { check: e => e.version === '2.0' && e.type === 'REQUEST', handler: handleAuthorizerV2 },
  { check: e => e.version === '2.0' && e.requestContext?.http?.method, handler: handleHttpV2 },
  { check: e => e.httpMethod, handler: handleHttpV1 },
  { check: e => e.requestContext?.elb, handler: handleAlb },
  { check: e => e.Records && e.Records[0]?.cf, handler: handleEdge },
  { check: e => e.awslogs?.data, handler: handleCloudWatchLogs },
  { check: e => e.RequestType && e.ResponseURL, handler: handleCustomResource },
  { check: e => e.triggerSource && e.userPoolId, handler: handleCognito },
  { check: e => getRecordsSource(e) === 'aws:sqs', handler: handleSqs },
  { check: e => getRecordsSource(e) === 'aws:sns', handler: handleSns },
  { check: e => getRecordsSource(e) === 'aws:s3', handler: handleS3 },
  { check: e => getRecordsSource(e) === 'aws:dynamodb', handler: handleDynamoDB },
  { check: e => getRecordsSource(e) === 'aws:kinesis', handler: handleKinesis },
  { check: e => getRecordsSource(e) === 'aws:ses', handler: handleSes },
  { check: e => e.source === 'aws.events', handler: handleScheduled },
  { check: e => e.source && e['detail-type'], handler: handleEventBridge },
];

/**
 * Main Lambda entry point used by AWS.
 *
 * Iterates over the dispatch table and invokes the first handler whose
 * `check` function matches the incoming event.  If no handler matches,
 * a fallback handler is executed.  HTTP events receive a 500 response
 * if an error is thrown.
 */
export async function handler(event, context) {
  logDebug('dispatcher', { requestId: context.awsRequestId });
  try {
    for (const { check, handler: h } of dispatchTable) {
      if (check(event)) {
        return await h(event, context);
      }
    }
    return await handleDefault(event, context);
  } catch (err) {
    console.error('Error processing event', err);
    // For HTTP requests, return an error response
    if (event.httpMethod || (event.version === '2.0' && event.requestContext?.http?.method)) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
    throw err;
  }
}

