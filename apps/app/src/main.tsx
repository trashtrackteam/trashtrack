import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./global.css";
import App from "./components/app";
import { fallbackRender } from "./errror-boundary";
import "./i18n";

export const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={fallbackRender}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ErrorBoundary>
    </StrictMode>
);
