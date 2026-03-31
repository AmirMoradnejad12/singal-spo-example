import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App';

// Type definition for props passed from the Root Config (Shell)
interface AppProps {
    name: string;
    authToken?: string;
}

const lifecycles = singleSpaReact({
    React,
    ReactDOMClient,
    rootComponent: App,
    // This tells single-spa WHERE to inject the app in the HTML
    domElementGetter: () => document.getElementById('single-spa-application:@org/auth')!,
    errorBoundary(err: Error, info: React.ErrorInfo) {
        return <div style={{ color: 'red' }}>Auth App Error: {err.message}</div>;
    },
});

// VERY IMPORTANT: Export these exact names
export const { bootstrap, mount, unmount } = lifecycles;