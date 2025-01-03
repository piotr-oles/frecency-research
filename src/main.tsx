import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TimeBucket } from "./pages/TimeBucket.tsx";
import { ExponentialDecay } from "./pages/ExponentialDecay.tsx";
import { ScoreDecay } from "./pages/ScoreDecay.tsx";

const pages: Record<string, React.ReactNode> = {
  "time-bucket": <TimeBucket />,
  "time-bucket-with-interactions": <TimeBucket hasInteractions />,
  "exponential-decay": <ExponentialDecay />,
  "exponential-decay-with-half-life": <ExponentialDecay hasHalfLifePoint />,
  "exponential-decay-with-interactions": (
    <ExponentialDecay hasHalfLifePoint hasInteractions />
  ),
  "exponential-decay-with-mapped-value": (
    <ExponentialDecay hasHalfLifePoint hasInteractions hasMappedScore />
  ),
  "score-decay": <ScoreDecay />,
};

function getCurrentPage() {
  const params = new URLSearchParams(document.location.search);
  const page = params.get("page");
  if (page && pages[page]) {
    return pages[page];
  } else {
    return (
      <>
        <h1>Graphs:</h1>
        <ul>
          {Object.keys(pages).map((page) => (
            <li key={page}>
              <a href={`?page=${encodeURIComponent(page)}`}>{page}</a>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>{getCurrentPage()}</StrictMode>
);
