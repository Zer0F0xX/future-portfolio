'use client';

import React, { useEffect } from 'react';

export function DevAxeAudit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const loadAxe = async () => {
      // Using dynamic import to ensure axe-core is only loaded in dev
      const axe = await import('@axe-core/react');
      const ReactDOM = await import('react-dom');
      
      axe.default(React, ReactDOM, 1000);
      console.log('Accessibility audit enabled. Axe-core will run on page changes.');
    };

    loadAxe();
  }, []);

  return null;
}
