import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Sidebar from "./SideBar";

// Mock the useGetGroupByIdQuery hook
jest.mock("src/store/groups/groups-api", () => ({
  useGetGroupByIdQuery: jest.fn(() => ({
    data: {
      value: {
        id: "123",
        name: "Test Group",
        members: [
          {
            fullName: "John Doe",
            profilePicture: "https://example.com/john-doe.png",
            telegramUsername: "@johndoe",
            university: "Test University",
            graduationYear: "2022",
          },
          {
            fullName: "Jane Doe",
            profilePicture: "https://example.com/jane-doe.png",
            telegramUsername: "@janedoe",
            university: "Test University",
            graduationYear: "2023",
          },
        ],
        capacity: 10,
        membersCount: 2,
      },
    },
    isLoading: false,
    error: null,
  })),
}));

// Mock the useAutoFillGroupMutation hook
const mockAutoFillMutation = jest.fn();
jest.mock("src/store/groups/groups-api", () => ({
  useAutoFillGroupMutation: jest.fn(() => [
    mockAutoFillMutation,
    { error: null, isLoading: false },
  ]),
}));

describe("Sidebar component", () => {
  it("opens the auto-fill modal and calls the auto-fill mutation when the Confirm button is clicked", async () => {
    render(<Sidebar id="123" setSelectedGroup={() => {}} />);
    const autoFillButton = screen.getByText("Auto Fill Seats");
    fireEvent.click(autoFillButton);

    // Check that the modal is displayed
    await waitFor(() => {
      expect(screen.getByText("Confirm Auto Fill?")).toBeInTheDocument();
    });

    // Click the Confirm button to trigger the auto-fill mutation
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    // Check that the auto-fill mutation is called with the correct arguments
    await waitFor(() => {
      expect(mockAutoFillMutation).toHaveBeenCalledTimes(1);
      expect(mockAutoFillMutation).toHaveBeenCalledWith({ id: "123" });
    });
  });

  it("displays an error message when there are no users in the waitlist", async () => {
    jest.mock("src/store/groups/groups-api", () => ({
      useAutoFillGroupMutation: jest.fn(() => [
        jest.fn(),
        { error: { message: "No user in the waitlist" }, isLoading: false },
      ]),
    }));

    render(<Sidebar id="123" setSelectedGroup={() => {}} />);
    const autoFillButton = screen.getByText("Auto Fill Seats");
    fireEvent.click(autoFillButton);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(screen.getByText("No user in the waitlist")).toBeInTheDocument();
    });
  });

  it("displays an error message when the group is already full", async () => {
    jest.mock("src/store/groups/groups-api", () => ({
      useAutoFillGroupMutation: jest.fn(() => [
        jest.fn(),
        { error: { message: "This group is full!" }, isLoading: false },
      ]),
    }));

    render(<Sidebar id="123" setSelectedGroup={() => {}} />);
    const autoFillButton = screen.getByText("Auto Fill Seats");
    fireEvent.click(autoFillButton);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(screen.getByText("This group is full!")).toBeInTheDocument();
    });
  });
});
