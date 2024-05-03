import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import HomePage from "../Main/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("메인 페이지 테스트 ", () => {
  test("산책로 추천리스트 확인", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    await waitFor(() => {
      const listTilte = screen.getByText(/당신을 위한 산책로 추천/i);
      expect(listTilte).toBeInTheDocument();
    });
  });
});
