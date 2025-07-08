import { handler } from '../index.mjs';

describe('Bug reproduction tests', () => {
  test('handleFirehose should handle undefined records gracefully', async () => {
    // Previously this would crash with null.map() error
    const event = { records: null };
    const context = { awsRequestId: '1' };
    
    // Should fallback to default handler since records is null
    const result = await handler(event, context);
    expect(result).toEqual({ fallback: true });
  });

  test('handleAppSync should handle undefined info gracefully', async () => {
    // Previously this would crash with null.fieldName error
    const event = { arguments: {}, identity: {}, info: { fieldName: null } };
    const context = { awsRequestId: '1' };
    
    // Should now handle gracefully
    const result = await handler(event, context);
    expect(result).toBeNull();
  });

  test('handleSns should handle undefined Sns gracefully', async () => {
    // Previously this would crash with null.Message error
    const event = { Records: [{ eventSource: 'aws:sns', Sns: null }] };
    const context = { awsRequestId: '1' };
    
    // Should now handle gracefully
    const result = await handler(event, context);
    expect(result).toEqual({ processed: 1 });
  });

  test('handleS3 should handle undefined s3 properties gracefully', async () => {
    // Previously this would crash with null.name error
    const event = { Records: [{ eventSource: 'aws:s3', s3: { bucket: null, object: null } }] };
    const context = { awsRequestId: '1' };
    
    // Should now handle gracefully
    const result = await handler(event, context);
    expect(result).toEqual({ processed: 1 });
  });

  test('handleDynamoDB should handle undefined dynamodb gracefully', async () => {
    // This already works correctly - just logs null
    const event = { Records: [{ eventSource: 'aws:dynamodb', dynamodb: null }] };
    const context = { awsRequestId: '1' };
    
    // Should handle gracefully
    const result = await handler(event, context);
    expect(result).toEqual({ processed: 1 });
  });

  test('handleSes should handle undefined ses properties gracefully', async () => {
    // Previously this would crash with null.source error
    const event = { Records: [{ eventSource: 'aws:ses', ses: { mail: null } }] };
    const context = { awsRequestId: '1' };
    
    // Should now handle gracefully
    const result = await handler(event, context);
    expect(result).toEqual({ processed: 1 });
  });
});