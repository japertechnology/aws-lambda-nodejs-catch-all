import { handler } from '../index.mjs';

describe('Bug reproduction tests', () => {
  test('handleFirehose should handle undefined records gracefully', async () => {
    // This should crash with current implementation
    const event = { records: null };
    const context = { awsRequestId: '1' };
    
    await expect(handler(event, context)).rejects.toThrow();
  });

  test('handleAppSync should handle undefined info gracefully', async () => {
    // This should crash with current implementation
    const event = { arguments: {}, identity: {}, info: null };
    const context = { awsRequestId: '1' };
    
    await expect(handler(event, context)).rejects.toThrow();
  });

  test('handleSns should handle undefined Sns gracefully', async () => {
    // This should crash with current implementation
    const event = { Records: [{ eventSource: 'aws:sns', Sns: null }] };
    const context = { awsRequestId: '1' };
    
    await expect(handler(event, context)).rejects.toThrow();
  });

  test('handleS3 should handle undefined s3 properties gracefully', async () => {
    // This should crash with current implementation
    const event = { Records: [{ eventSource: 'aws:s3', s3: { bucket: null, object: null } }] };
    const context = { awsRequestId: '1' };
    
    await expect(handler(event, context)).rejects.toThrow();
  });

  test('handleDynamoDB should handle undefined dynamodb gracefully', async () => {
    // This should crash with current implementation
    const event = { Records: [{ eventSource: 'aws:dynamodb', dynamodb: null }] };
    const context = { awsRequestId: '1' };
    
    await expect(handler(event, context)).rejects.toThrow();
  });

  test('handleSes should handle undefined ses properties gracefully', async () => {
    // This should crash with current implementation
    const event = { Records: [{ eventSource: 'aws:ses', ses: { mail: null } }] };
    const context = { awsRequestId: '1' };
    
    await expect(handler(event, context)).rejects.toThrow();
  });
});