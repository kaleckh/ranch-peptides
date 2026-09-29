type ArrowDirection = "right" | "up-right" | "down";

const paths: Record<ArrowDirection, string> = {
  right: "M4 12h15m-6-6 6 6-6 6",
  "up-right": "M7 17 17 7M8 7h9v9",
  down: "M12 5v14m-6-6 6 6 6-6",
};

export function ArrowIcon({ direction = "up-right", className }: { direction?: ArrowDirection; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <path d={paths[direction]} />
    </svg>
  );
}