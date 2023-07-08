import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useCreateGroupMutation } from '<@>/store/groups/groups-api';
import CreateGroup from './CreateGroup';

jest.mock('src/store/groups/groups-api');

describe('CreateGroup', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the form', () => {
    render(<CreateGroup handleClose={() => {}} />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('should display error messages for empty inputs', async () => {
    render(<CreateGroup handleClose={() => {}} />);
    const createButton = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(createButton);
    await waitFor(() => {
      expect(screen.getByText('Group name is required')).toBeInTheDocument();
      expect(screen.getByText('Group size is required')).toBeInTheDocument();
      expect(screen.getByText('Telegram link is required')).toBeInTheDocument();
      expect(screen.getByText('Division level is required')).toBeInTheDocument();
    });
  });

  it('should call the create group API with the correct data', async () => {
    const mockCreateGroupMutation = useCreateGroupMutation as jest.MockedFunction<typeof useCreateGroupMutation>;
    const mockMutationFunction = jest.fn();
    const mockMutationState = {
      isLoading: false,
      error: undefined,
      data: undefined,
      isUninitialized: true,
      isSuccess: false,
      isError: false,
      reset: jest.fn(),
      ...mockMutationFunction(),
    };
    mockCreateGroupMutation.mockReturnValue([mockMutationFunction, mockMutationState]);
    render(<CreateGroup handleClose={() => {}} />);
    const groupNameInput = screen.getByLabelText('Group Name');
    const groupSizeInput = screen.getByLabelText('Group Size');
    const telegramLinkInput = screen.getByLabelText('Group Telegram Link');
    const divisionIdInput = screen.getByLabelText('Select Division');
    fireEvent.change(groupNameInput, { target: { value: 'Test Group' } });
    fireEvent.change(groupSizeInput, { target: { value: '10' } });
    fireEvent.change(telegramLinkInput, { target: { value: 't.me/testgroup' } });
    fireEvent.change(divisionIdInput, { target: { value: '1' } });
    const createButton = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(createButton);
    await waitFor(() => {
      expect(mockCreateGroupMutation).toHaveBeenCalledWith(undefined);
      expect(mockMutationFunction).toHaveBeenCalledWith({
        name: 'Test Group',
        capacity: 10,
        telegramLink: 't.me/testgroup',
        division: 1,
      });
    });
  });
});