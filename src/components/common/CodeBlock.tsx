import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useEffect } from "react";

export default function CodeBlock({ code }: { code?: string }) {
  useEffect(() => {
    setTimeout(() => {
      hljs.highlightAll();
    }, 100);
  }, []);
  return (
    <div>
      <pre
        css={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
        }}
      >
        <code className="language-typescript">{code}</code>
      </pre>
    </div>
  );
}
