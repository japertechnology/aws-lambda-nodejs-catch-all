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

const handlerMap = {
  './handlers/handleAlexa.js': handleAlexa,
  './handlers/handleLex.js': handleLex,
  './handlers/handleAppSync.js': handleAppSync,
  './handlers/handleIoTRule.js': handleIoTRule,
  './handlers/handleFirehose.js': handleFirehose,
  './handlers/handleConfigRule.js': handleConfigRule,
  './handlers/handleStepFunctions.js': handleStepFunctions,
  './handlers/handleWebSocket.js': handleWebSocket,
  './handlers/handleAuthorizerV1.js': handleAuthorizerV1,
  './handlers/handleAuthorizerV2.js': handleAuthorizerV2,
  './handlers/handleHttpV1.js': handleHttpV1,
  './handlers/handleHttpV2.js': handleHttpV2,
  './handlers/handleAlb.js': handleAlb,
  './handlers/handleEdge.js': handleEdge,
  './handlers/handleCloudWatchLogs.js': handleCloudWatchLogs,
  './handlers/handleCustomResource.js': handleCustomResource,
  './handlers/handleCognito.js': handleCognito,
  './handlers/handleSqs.js': handleSqs,
  './handlers/handleSns.js': handleSns,
  './handlers/handleS3.js': handleS3,
  './handlers/handleDynamoDB.js': handleDynamoDB,
  './handlers/handleKinesis.js': handleKinesis,
  './handlers/handleSes.js': handleSes,
  './handlers/handleEventBridge.js': handleEventBridge,
  './handlers/handleScheduled.js': handleScheduled,
};

export async function loadDispatchTable() {
  const { default: config } = await import('./dispatch-config.js');
  return config.map(({ check, handler }) => ({ check, handler: handlerMap[handler] }));
}

export const dispatchTablePromise = loadDispatchTable();
