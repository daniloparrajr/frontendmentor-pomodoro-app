import React from "react";

const RadioButtons = ({ name, inputs, fieldValue, onChange }) => {
  const colorMap = {
    default:
      "bg-lilac text-mirage hover:ring-lilac peer-checked:bg-mirage peer-checked:text-white peer-focus:ring-lilac",
    froly:
      "bg-froly text-froly hover:ring-froly peer-focus:ring-froly peer-checked:text-mirage",
    malibu:
      "bg-malibu text-malibu hover:ring-malibu peer-focus:ring-malibu peer-checked:text-mirage",
    heliotrope:
      "bg-heliotrope text-heliotrope hover:ring-heliotrope peer-focus:ring-heliotrope peer-checked:text-mirage",
  };

  const fontMap = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  };

  console.log(name);

  return (
    <div className="flex items-center justify-center gap-4">
      {inputs.map(({ value, id, label, theme = "default", font = "sans" }) => {
        return (
          <div key={id}>
            <input
              type="radio"
              name={name}
              value={value}
              id={id}
              className={`peer sr-only`}
              checked={fieldValue === value}
              onChange={(e) => onChange(e)}
            />
            <label
              htmlFor={id}
              className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full transition-shadow hover:ring-1 hover:ring-offset-4 peer-focus:ring-1 peer-focus:ring-offset-4 ${colorMap[theme]} ${fontMap[font]}`}
            >
              {label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioButtons;
