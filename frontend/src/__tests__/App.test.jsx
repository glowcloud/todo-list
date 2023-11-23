import { jest, describe, expect, test } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContextProvider } from "../context/ThemeContext";
import App from "../App";
import { DataContext } from "../context/DataContext";

describe("checks if app is rendered correctly", () => {
  const renderApp = (token) => {
    return render(
      <DataContext.Provider value={{}}>
        <ThemeContextProvider>
          <AuthContext.Provider value={{ token: token }}>
            <App />
          </AuthContext.Provider>
        </ThemeContextProvider>
      </DataContext.Provider>
    );
  };

  test("app renders login page when token from auth context is empty", () => {
    renderApp(null);
    expect(screen.queryByText(/^Click here to/)).toBeTruthy();
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  test("app renders home page when token from auth context is not empty", async () => {
    globalThis.global.fetch = jest.fn();
    jest.spyOn(globalThis.global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ ok: true, json: {} }),
      })
    );
    renderApp("sth");

    await waitFor(() => {
      expect(screen.queryByText(/^Click here to/)).toBeNull();
      expect(screen.queryByRole("list")).toBeTruthy();
    });
  });
});
