import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-900">
          <section className="max-w-md rounded-lg bg-white p-8 shadow-soft">
            <h1 className="text-2xl font-bold">Something needs attention</h1>
            <p className="mt-3 text-slate-600">Refresh the page and try again. The API data remains safe.</p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
