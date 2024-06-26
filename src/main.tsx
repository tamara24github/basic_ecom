import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { CartContextProvider } from './contexts/CartContext.tsx'
import { ToastContextProvider } from './contexts/ToastContext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * (60 * 1000),
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ToastContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
