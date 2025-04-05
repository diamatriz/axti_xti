// src/components/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Ошибка в компоненте:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Произошла ошибка</h2>
          <p>Пожалуйста, попробуйте позже.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;