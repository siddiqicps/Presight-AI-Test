import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white p-4">
          {/* <!-- Navigation and branding --> */}
          <nav>
            <Link to="/">Home</Link> | <Link to="/long-text">Long Text</Link> | <Link to="/websocket-request">WebSocket Request</Link>
          </nav>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row">
          <Outlet/>
        </div>

        <footer className="bg-gray-800 text-white p-4 text-center">
          {/* <!-- Footer content --> */}
          <p>&copy; 2025 My App</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;