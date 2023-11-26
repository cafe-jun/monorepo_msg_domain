import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

declare global {
  interface Window {
    naver: any;
    Kakao: any;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
    }
  >
    <BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
