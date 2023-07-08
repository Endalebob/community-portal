import { QueryClient, QueryClientProvider } from 'react-query';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { GroupDataApi, useGetGroupsQuery } from './groups-api';

const server = setupServer(
  rest.get('https://a2sv-community-portal-api.onrender.com/api/Groups', (req, res, ctx) => {
    return res(ctx.json({ data: [{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }] }));
  })
);

describe('GroupDataApi', () => {
  let queryClient;

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should get groups', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => ({ data: [{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }] }),
      })
    );
    global.fetch = mockFetch;

    const { result, waitFor } = renderHook(() => useGetGroupsQuery(), {
      wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    });

    await waitFor(() => {
      expect(result.current.isFetching).toBe(false);
    });

    expect(result.current.data).toEqual([{ id: 1, name: 'Group 1' }, { id: 2, name: 'Group 2' }]);
    expect(result.current.error).toBeUndefined();
  });
});