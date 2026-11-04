import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import InstrumentProvider from "./instrument/InstrumentProvider";
import Home from "./pages/home/Home";
import NotFound from "./pages/NotFound";
import SectionPage from "./pages/SectionPage";
import WorkPage from "./pages/work/WorkPage";

// The old site stays reachable at /legacy while it's replaced; loaded only if visited.
const LegacyApp = lazy(() => import("./legacy/LegacyApp"));

/** Vite's base ("/hi-im-franco/") without the trailing slash, as React Router expects. */
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path="legacy" element={<Suspense fallback={null}><LegacyApp /></Suspense>} />
        <Route element={<InstrumentProvider><Layout /></InstrumentProvider>}>
          <Route index element={<Home />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="life" element={<SectionPage section="life" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
