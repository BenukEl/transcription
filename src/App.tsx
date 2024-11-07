// src/App.tsx
import React from 'react';
import { RouterProvider, Route } from '@tanstack/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';

const queryClient = new QueryClient();
const router = new RouterProvider({ routes: [new Route({ path: '/', component: HomePage })] });

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
