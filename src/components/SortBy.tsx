import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSort } from "../store/slices/contentSlice";

const SortBy = () => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.content.sort);

  const handleChange = (e: { target: { value: string; }; }): void => {
    dispatch(setSort(e.target.value));
  };

  return (
    <div className="px-6 mb-2 text-sm w-full flex text-[10px]">
        <label htmlFor="sortby" className="mr-2 ml-auto justify-items-center mt-1">Sort by:</label>
          <select id="sortby"
            value={sort}
            onChange={handleChange}
            className="bg-[#1a1a1a] p-1 rounded focus:outline-none text-[10px]"
          >
            <option value="">Relevance</option>
            <option value="title_asc" className="text-[10px]">Name ( A → Z )</option>
            <option value="title_desc" className="text-[10px]">Name ( Z → A )</option>
            <option value="creator_asc" className="text-[10px]">Creator ( A → Z )</option>
            <option value="creator_desc" className="text-[10px]">Creator ( Z → A )</option>
          </select>
    </div>
  );
};

export default SortBy;
