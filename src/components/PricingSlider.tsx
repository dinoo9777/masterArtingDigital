import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setMaxPrice, setMinPrice } from "../store/slices/contentSlice";
import { Range } from "react-range";

const MIN = 0;
const MAX = 500;

const PricingSlider = () => {
  const dispatch = useAppDispatch();
  const maxPrice = useAppSelector((state) => state.content.maxPrice) ?? MAX;
  const minPrice = useAppSelector((state) => state.content.minPrice) ?? MIN;
  // 🛡️ Ensure fallback to defaults
  const safeMax = maxPrice ?? MAX;
  const safeMin = minPrice ?? MIN;

  const handleChange = (values: number[]) => {
    dispatch(setMinPrice(values[0])); // ✅ lower thumb
    dispatch(setMaxPrice(values[1])); // ✅ upper thumb
  };

  return (
    <div className="px-6 w-[250px]">
      <div className="text-xs text-gray-500 flex justify-between">
        <span className="mr-5">₹{minPrice}</span>
        <span className="w-[250px] mt-2">
            <Range
                step={1}
                min={MIN}
                max={MAX}
                values={[safeMin, safeMax]}
                onChange={handleChange}
                renderTrack={({ props, children }) => {
                  const { ref, ...propsRest } = props;
                  return (
                    <div
                      ref={ref}
                      {...propsRest}
                      className="h-1 bg-gray-300 rounded relative"
                      style={{ ...props.style }}
                    >
                    <div
                    className="absolute top-0 h-1 bg-gray-600 rounded"
                    style={{
                      left: `${((safeMin - MIN) / (MAX - MIN)) * 100}%`,
                      width: `${((safeMax - safeMin) / (MAX - MIN)) * 100}%`,
                    }}
                    />
                    {children}
                </div>
                  )
                }}
                renderThumb={({ props }) => {
                  const { key, ...propsRest } = props;
                  return (
                    <div
                      key={key}
                      {...propsRest}
                      className="w-4 h-4 bg-gray-800 rounded-full shadow-md"
                    />
                  );
                }}
                />
            </span>
        <span className="ml-5">₹{maxPrice}</span>
      </div>
    </div>
  );
};

export default PricingSlider;
