import { registerApplication, start, LifeCycles } from 'single-spa';

// 1. Define the registration for Auth
registerApplication({
    name: "@org/auth",
    // System.import returns a promise of the lifecycle functions
    app: () => System.import<LifeCycles>("@org/auth"),
    activeWhen: (location: Location) => location.pathname.startsWith('/auth'),
    customProps: {
        authToken: "shared-token-123", // Example of passing data to sub-apps
    }
});

// 2. Register Marketing
registerApplication({
    name: "@org/marketing",
    app: () => System.import<LifeCycles>("@org/marketing"),
    activeWhen: (location: Location) =>
        location.pathname === '/' || location.pathname.startsWith('/marketing'),
});

// 3. Start the engine
start();