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

  const handleChange = (value: number) => {
    dispatch(toggleFilter(value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6 p-4 text-gray-500 text-[10px] bg-[#0f0f14] mx-5 ">
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
  );
};

export default PricingFilter;
