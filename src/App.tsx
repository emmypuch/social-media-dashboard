import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import {
  ThemeProvider as CustomThemeProvider,
  useTheme,
} from "./components/context/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";

const queryClient = new QueryClient();

function App() {
  const { themeObject } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <ThemeProvider theme={themeObject}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <ErrorBoundary>
                    <Dashboard />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
