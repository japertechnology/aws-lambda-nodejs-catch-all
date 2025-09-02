import { jest } from '@jest/globals';
import handleCustomResource from '../handlers/handleCustomResource.js';

describe('handleCustomResource', () => {
  test('PUTs response to ResponseURL', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true });
    const event = {
      RequestType: 'Create',
      ResponseURL: 'https://example.com',
      StackId: 's',
      RequestId: 'r',
      LogicalResourceId: 'l'
    };
    const context = { awsRequestId: 'id1' };
    await handleCustomResource(event, context);
    expect(fetchMock).toHaveBeenCalledWith('https://example.com', expect.objectContaining({ method: 'PUT' }));
    const body = fetchMock.mock.calls[0][1].body;
    expect(JSON.parse(body)).toMatchObject({
      Status: 'SUCCESS',
      PhysicalResourceId: 'id1',
      StackId: 's',
      RequestId: 'r',
      LogicalResourceId: 'l'
    });
    fetchMock.mockRestore();
  });

  test('throws when ResponseURL missing', async () => {
    const event = { RequestType: 'Create' };
    const context = { awsRequestId: 'id1' };
    await expect(handleCustomResource(event, context)).rejects.toThrow('Missing ResponseURL');
  });
});
