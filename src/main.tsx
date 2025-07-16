import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const queryClient = new QueryClient();

const functions = getFunctions();
if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
