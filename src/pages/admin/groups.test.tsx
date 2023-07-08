import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useGetGroupsQuery } from '<@>/store/groups/groups-api';
import DashBoard from './groups';

jest.mock('src/store/groups/groups-api');

const mockData = {
  data: {
    value: [
      {
        id: 1,
        name: 'Group 1',
        membersCount: 5,
        capacity: 10,
      },
      {
        id: 2,
        name: 'Group 2',
        membersCount: 3,
        capacity: 5,
      },
    ],
  },
  isLoading: false,
  error: null,
};

describe('Dashboard component', () => {
  beforeEach(() => {
    useGetGroupsQuery.mockReturnValue(mockData);
  });

  test('renders the component', () => {
    render(<DashBoard/>);
    const group1Name = screen.getByText('Group 1');
    const group2Name = screen.getByText('Group 2');
    expect(group1Name).toBeInTheDocument();
    expect(group2Name).toBeInTheDocument();
  });

  test('renders loading state', async () => {
    useGetGroupsQuery.mockReturnValueOnce({
      ...mockData,
      data: null,
      isLoading: true,
    });
    render(<DashBoard/>);
    const loading = screen.getByText('Loading...');
    await waitFor(() => expect(loading).toBeInTheDocument());
  });

  test('renders error state', async () => {
    useGetGroupsQuery.mockReturnValueOnce({
      ...mockData,
      data: null,
      isLoading: false,
      error: 'Error fetching groups',
    });
    render(<DashBoard/>);
    const error = screen.getByText('Error fetching groups');
    await waitFor(() => expect(error).toBeInTheDocument());
  });
});