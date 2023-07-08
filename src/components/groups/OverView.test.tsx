import React from "react";
import { render, screen } from "@testing-library/react";
import GroupOverView from "./OverView";

jest.mock("src/store/groups/groups-api", () => ({
  useGetGroupTotalStudentQuery: jest.fn(() => ({ data: { value: 10 }, isLoading: false })),
  useGetTotalGroupsQuery: jest.fn(() => ({ data: { value: 5 }, isLoading: false })),
  useGetGroupMeanSizeQuery: jest.fn(() => ({ data: { value: 2 }, isLoading: false })),
}));

describe("GroupOverView component", () => {
  test("renders overview cards with data", () => {
    render(<GroupOverView/>);

    const totalStudentsCard = screen.getByText("TotalStudent");
    expect(totalStudentsCard).toBeInTheDocument();
    expect(totalStudentsCard.previousElementSibling?.tagName).toBe("svg");
    expect(totalStudentsCard.nextElementSibling).toHaveTextContent("10");

    const totalGroupsCard = screen.getByText("Number of Groups");
    expect(totalGroupsCard).toBeInTheDocument();
    expect(totalGroupsCard.previousElementSibling?.tagName).toBe("svg");
    expect(totalGroupsCard.nextElementSibling).toHaveTextContent("5");

    const groupMeanSizeCard = screen.getByText("Group Mean Size");
    expect(groupMeanSizeCard).toBeInTheDocument();
    expect(groupMeanSizeCard.previousElementSibling?.tagName).toBe("svg");
    expect(groupMeanSizeCard.nextElementSibling).toHaveTextContent("2");
  });

  test("renders loading component when data is being fetched", () => {
    jest.mock("src/store/groups/groups-api", () => ({
      useGetGroupTotalStudentQuery: jest.fn(() => ({ data: null, isLoading: true })),
      useGetTotalGroupsQuery: jest.fn(() => ({ data: null, isLoading: true })),
      useGetGroupMeanSizeQuery: jest.fn(() => ({ data: null, isLoading: true })),
    }));

    render(<GroupOverView/>);

    expect(screen.getByTestId("loading-component")).toBeInTheDocument();
  });

  test("renders fetching error component when there's an error", () => {
    jest.mock("src/store/groups/groups-api", () => ({
      useGetGroupTotalStudentQuery: jest.fn(() => ({ data: null, isLoading: false, error: { message: "Failed to fetch data" } })),
      useGetTotalGroupsQuery: jest.fn(() => ({ data: null, isLoading: false, error: { message: "Failed to fetch data" } })),
      useGetGroupMeanSizeQuery: jest.fn(() => ({ data: null, isLoading: false, error: { message: "Failed to fetch data" } })),
    }));

    render(<GroupOverView/>);

    expect(screen.getByTestId("fetching-error-component")).toBeInTheDocument();
  });
});