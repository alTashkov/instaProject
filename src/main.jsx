// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from '@/components/ui/provider';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { createSystem, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        light:"#f2ebec",
        dark:"#1a1919"
      },
    },
  },
})

const system = createSystem(config)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider enableSystem={true} attribute="class">
        <Provider>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
