'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SceneErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn('3D Scene failed to load:', error);
    // Send to analytics if needed
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="fixed inset-0 z-0 flex items-center justify-center">
          <div className="text-center p-8">
            <p className="text-slate-400 text-sm">
              3D visualization unavailable. Showing fallback view.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
