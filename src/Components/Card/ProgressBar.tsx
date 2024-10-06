interface ProgressBarProps {
  total: number;
  value: number;
  barColor?: string;
  backgroundColor?: string;
}

function CustomProgressBar({
  value,
  total = 100,
  barColor = "#000",
  backgroundColor = "#ccc",
}: ProgressBarProps) {
  return (
    <div
      className="progress-bar-container"
      style={{
        position: "relative",
        width: "100%",
        height: "8px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        className="progress-bar-background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: backgroundColor,
        }}
      />
      <div
        className="progress-bar-foreground"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${(value / total) * 100}%`,
          height: "100%",
          backgroundColor: barColor,
          transition: "width 0.5s ease-in-out",
        }}
      />
    </div>
  );
}

export default CustomProgressBar;
