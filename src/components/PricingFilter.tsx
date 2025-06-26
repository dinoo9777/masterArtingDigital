import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFilter, resetFilters } from "../store/slices/contentSlice";
import PricingSlider from "./PricingSlider";

const OPTIONS = [
  { label: "Paid", value: 0 },
  { label: "Free", value: 1 },
  { label: "View Only", value: 2 },
];

const PricingFilter = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.content.filters);
    const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: number) => {
    dispatch(toggleFilter(value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

    return (
        <div className="mx-5 mb-4">
            <div className="flex justify-between items-center md:hidden mb-2">
                <label htmlFor="Filter Collase" className="text-gray-400 text-sm">Filter Options</label>
                <button id="Filter Collase"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-xs px-2 py-1 bg-gray-700 text-white rounded"
                >
                    {isOpen ? "Hide Filters" : "Show Filters"}
                </button>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} md:block bg-[#0f0f14]`}>
                <div className=" flex flex-wrap gap-4 items-center mb-6 p-4 text-gray-500 text-[10px] bg-[#0f0f14]">
                    <span className="text-gray-500">Pricing Options:</span>
                    {OPTIONS.map(({ label, value }) => (
                    <label key={value} className="flex items-center gap-2">
                        <input className="scheme-dark accent-gray-500 bg-gray-500 accent-bg-gray-500"
                        type="checkbox"
                        checked={selected.includes(value)}
                        onChange={() => handleChange(value)}
                        />
                        {label}
                    </label>
                    ))}
                    <PricingSlider />
                    <a href="#"
                    onClick={(e) => { e.preventDefault(); handleReset(); }}
                    className="ml-auto px-3 py-1 text-gray-400 rounded cursor-pointer"
                    >
                    RESET
                    </a>
                </div>
            </div>
        </div>
  );
};

export default PricingFilter;
