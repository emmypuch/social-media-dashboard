import { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const ErrorContainer = styled.div`
  padding: 20px;
  background: #ffebee;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  color: #c62828;
  text-align: center;
  margin: 20px;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const ErrorDetails = styled.pre`
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 0.9rem;
  color: #333;
`;

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong.</ErrorTitle>
          <p>Please try again later.</p>
          {this.state.error && (
            <ErrorDetails>
              <strong>Error:</strong> {this.state.error.toString()}
              <br />
              <strong>Stack:</strong> {this.state.errorInfo?.componentStack}
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }
    return this.props.children;
  }
}
