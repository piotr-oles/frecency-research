import { useId } from "react";

interface RangeInputProps {
  label: React.ReactNode;
  labelWidth?: number;
  description?: React.ReactNode;
  value: number;
  onChange: (nextValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
  top: number;
  left: number;
}

export const RangeInput = ({
  label,
  labelWidth,
  description,
  value,
  onChange,
  min,
  max,
  step,
  top,
  left,
}: RangeInputProps) => {
  const id = useId();

  return (
    <div
      style={{
        top,
        left,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: "0.25em",
        padding: "0.5em 1em",
      }}
    >
      <label
        htmlFor={`range-input-${id}`}
        style={labelWidth ? { width: labelWidth } : {}}
      >
        {label}
      </label>
      <input
        id={`range-input-${id}`}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
        min={min}
        max={max}
        step={step}
      />
      {description && <span>{description}</span>}
    </div>
  );
};
