/**
 * Universal AWS Lambda handler.
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

export async function handler(event, context) {
  logDebug('dispatcher', { requestId: context.awsRequestId });
  try {
    // Alexa Skills Kit (Custom Skill)
    if (event.request && event.session && event.context?.System) {
      return await handleAlexa(event, context);
    }
    // Lex Bot
    if (event.bot && event.userId && event.inputTranscript) {
      return await handleLex(event, context);
    }
    // AppSync (GraphQL Resolver)
    if (event.arguments && event.identity && event.info) {
      return await handleAppSync(event, context);
    }
    // IoT Rule
    if (event.clientId && event.topic && event.payload) {
      return await handleIoTRule(event, context);
    }
    // Kinesis Firehose Data Transformation
    if (event.records && Array.isArray(event.records) && event.records[0]?.recordId) {
      return await handleFirehose(event, context);
    }
    // AWS Config Rule Evaluation
    if (event.invokingEvent && event.ruleParameters && event.resultToken) {
      return await handleConfigRule(event, context);
    }
    // Step Functions (Sync Task)
    if (event.execution && event.stateMachineArn) {
      return await handleStepFunctions(event, context);
    }
    // API Gateway WebSocket (HTTP API v2)
    if (event.version === '2.0' && event.requestContext?.routeKey && event.requestContext?.connectionId) {
      return await handleWebSocket(event, context);
    }
    // API Gateway Custom Authorizer v1
    if (event.type === 'TOKEN' && event.methodArn) {
      return await handleAuthorizerV1(event, context);
    }
    // API Gateway Custom Authorizer v2
    if (event.version === '2.0' && event.type === 'REQUEST') {
      return await handleAuthorizerV2(event, context);
    }
    // HTTP API Gateway v2 (HTTP API)
    if (event.version === '2.0' && event.requestContext?.http?.method) {
      return await handleHttpV2(event, context);
    }
    // HTTP API Gateway v1 (REST API)
    if (event.httpMethod) {
      return await handleHttpV1(event, context);
    }
    // Application Load Balancer
    if (event.requestContext?.elb) {
      return await handleAlb(event, context);
    }
    // Lambda@Edge
    if (event.Records && event.Records[0]?.cf) {
      return await handleEdge(event, context);
    }
    // CloudWatch Logs subscription
    if (event.awslogs?.data) {
      return await handleCloudWatchLogs(event, context);
    }
    // CloudFormation Custom Resource
    if (event.RequestType && event.ResponseURL) {
      return await handleCustomResource(event, context);
    }
    // Cognito User Pool Trigger
    if (event.triggerSource && event.userPoolId) {
      return await handleCognito(event, context);
    }
    // Records-based event sources (SQS, SNS, S3, DynamoDB, Kinesis, SES)
    if (event.Records && Array.isArray(event.Records) && event.Records.length > 0) {
      const source = event.Records[0].eventSource || event.Records[0].EventSource;
      switch (source) {
        case 'aws:sqs':      return await handleSqs(event, context);
        case 'aws:sns':      return await handleSns(event, context);
        case 'aws:s3':       return await handleS3(event, context);
        case 'aws:dynamodb': return await handleDynamoDB(event, context);
        case 'aws:kinesis':  return await handleKinesis(event, context);
        case 'aws:ses':      return await handleSes(event, context);
        default:             return await handleDefault(event, context);
      }
    }
    // Scheduled CloudWatch event
    if (event.source === 'aws.events') {
      return await handleScheduled(event, context);
    }
    // EventBridge / CloudWatch Events
    if (event.source && event['detail-type']) {
      return await handleEventBridge(event, context);
    }
    // Fallback handler
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

