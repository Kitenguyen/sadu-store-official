import { useState } from "react";

export function ExpandableText({
  text,
  previewLines = 3,
  className = "",
  buttonClassName = "",
}: {
  text: string;
  previewLines?: number;
  className?: string;
  buttonClassName?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={className}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: previewLines,
              }
        }
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className={buttonClassName}
      >
        {expanded ? "Thu gọn" : "Xem thêm"}
      </button>
    </div>
  );
}
