import { handler } from '../index.mjs';

describe('handler', () => {
  test('handles HTTP API v1 event', async () => {
    const event = { httpMethod: 'GET', path: '/hello' };
    const context = { awsRequestId: '1' };
    const result = await handler(event, context);
    expect(result).toEqual({
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello from API Gateway v1', event })
    });
  });

  test('handles S3 event', async () => {
    const event = {
      Records: [
        {
          eventSource: 'aws:s3',
          s3: { bucket: { name: 'my-bucket' }, object: { key: 'file.txt' } }
        }
      ]
    };
    const context = { awsRequestId: '1' };
    const result = await handler(event, context);
    expect(result).toEqual({ processed: 1 });
  });
});
