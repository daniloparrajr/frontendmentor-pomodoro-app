import React, { useId } from "react";

import { ReactComponent as ArrowUpIcon } from "../assets/icon-arrow-up.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/icon-arrow-down.svg";

const NumberInput = ({
  label,
  labelClasses,
  id,
  type = "number",
  value,
  onChange,
  onAdd,
  onSubtract,
  ...delegated
}) => {
  const generatedId = useId();
  const appliedId = id || generatedId;

  return (
    <>
      <label
        htmlFor={appliedId}
        className="block w-1/2 grow basis-1/2 text-xs opacity-40 md:mb-1.5 md:w-full"
      >
        {label}
      </label>
      <div className="relative w-1/2 grow basis-1/2 md:w-full">
        <input
          id={appliedId}
          type={type}
          className="w-full"
          value={value}
          onChange={onChange}
          {...delegated}
        />
        <button
          className="absolute right-0 top-0 flex h-1/2 w-10 justify-center opacity-25 transition-opacity hover:opacity-100"
          type="button"
          onClick={onAdd}
        >
          <span className="sr-only">click to add one</span>
          <ArrowUpIcon className="mt-auto mb-1 text-mirage" />
        </button>
        <button
          className="absolute right-0 bottom-0 flex h-1/2 w-10 justify-center opacity-25 transition-opacity hover:opacity-100"
          type="button"
          onClick={onSubtract}
        >
          <span className="sr-only">click to minus one</span>
          <ArrowDownIcon className="mt-1 mb-auto text-mirage" />
        </button>
      </div>
    </>
  );
};

export default NumberInput;
