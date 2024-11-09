import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="">
        <div className="flex items-center">
          <input
            type={type}
            className={`px-3 py-2 w-[440px] rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
            ref={ref}
            {...props}
            id={id}
          />
        </div>
      </div>
    );
  }
);

export default Input;