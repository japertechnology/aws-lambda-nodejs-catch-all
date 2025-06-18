/**
 * Universal AWS Lambda handler.
 */
const handleAlexa = require('./handlers/handleAlexa');
const handleLex = require('./handlers/handleLex');
const handleAppSync = require('./handlers/handleAppSync');
const handleIoTRule = require('./handlers/handleIoTRule');
const handleFirehose = require('./handlers/handleFirehose');
const handleConfigRule = require('./handlers/handleConfigRule');
const handleStepFunctions = require('./handlers/handleStepFunctions');
const handleWebSocket = require('./handlers/handleWebSocket');
const handleAuthorizerV1 = require('./handlers/handleAuthorizerV1');
const handleAuthorizerV2 = require('./handlers/handleAuthorizerV2');
const handleHttpV1 = require('./handlers/handleHttpV1');
const handleHttpV2 = require('./handlers/handleHttpV2');
const handleAlb = require('./handlers/handleAlb');
const handleEdge = require('./handlers/handleEdge');
const handleCloudWatchLogs = require('./handlers/handleCloudWatchLogs');
const handleCustomResource = require('./handlers/handleCustomResource');
const handleCognito = require('./handlers/handleCognito');
const handleSqs = require('./handlers/handleSqs');
const handleSns = require('./handlers/handleSns');
const handleS3 = require('./handlers/handleS3');
const handleDynamoDB = require('./handlers/handleDynamoDB');
const handleKinesis = require('./handlers/handleKinesis');
const handleSes = require('./handlers/handleSes');
const handleEventBridge = require('./handlers/handleEventBridge');
const handleScheduled = require('./handlers/handleScheduled');
const handleDefault = require('./handlers/handleDefault');
exports.handler = async (event, context) => {
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
    // EventBridge / CloudWatch Events
    if (event.source && event['detail-type']) {
      return await handleEventBridge(event, context);
    }
    // Scheduled CloudWatch event
    if (event.source === 'aws.events') {
      return await handleScheduled(event, context);
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
};

