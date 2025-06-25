import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchContentData } from "../utils/fetchData";
import { setItems, setSearch, setFilters, setSort, setMinPrice, setMaxPrice} from "../store/slices/contentSlice";
import ContentCard from "../components/ContentCard";
import PricingFilter from "../components/PricingFilter";
import KeywordSearch from "../components/KeywordSearch";
import { useSearchParams } from "react-router-dom";
import SortBy from "../components/SortBy";
import { parseFParam, buildFParam } from "../utils/urlFilters";

const FilterMap: Record<string, number> = {
  paid: 0,
  free: 1,
  viewonly: 2,
};

const ReverseFilterMap: Record<number, string> = {
  0: "paid",
  1: "free",
  2: "viewonly",
};
const Home = () => {
  const DEFAULT_MIN = 0;
  const DEFAULT_MAX = 500; // or whatever your slider's maximum is

  const dispatch = useAppDispatch();
  const { items, filters, search, sort, minPrice, maxPrice } = useAppSelector((state) => state.content);
  const [params, setParams] = useSearchParams();

  // ⬇️ On mount: parse URL
  useEffect(() => {
    const fRaw = params.get("f") || "";
    const fParams = parseFParam(fRaw);

    dispatch(setSearch(fParams.search || ""));
    dispatch(setSort(fParams.sort || ""));
    dispatch(setMinPrice(Number(fParams.min || DEFAULT_MIN)));
    dispatch(setMaxPrice(Number(fParams.max || DEFAULT_MAX)));

    const parsedFilters = (fParams.priceoption || "")
      .split("_")
      .map((label) => FilterMap[label])
      .filter((v): v is number => v !== undefined);
    dispatch(setFilters(parsedFilters));
  }, []);

  // ⬇️ Sync URL from Redux state
  useEffect(() => {
    const obj: Record<string, string> = {};

    if (search) obj.search = search;
    if (sort) obj.sort = sort;
    if (minPrice !== DEFAULT_MIN) obj.min = String(minPrice);
    if (maxPrice !== DEFAULT_MAX) obj.max = String(maxPrice);
    if (filters.length > 0) {
      obj.priceoption = filters
        .map((num) => ReverseFilterMap[num])
        .filter(Boolean)
        .join("_");
    }
    const fString = buildFParam(obj);
    if (fString) {
      setParams({ f: fString }, { replace: true });
    } else {
      setParams({}, { replace: true });
    }
  }, [search, filters, sort, maxPrice, minPrice]);

  // ⬇️ Fetch content data
  useEffect(() => {
    fetchContentData()
      .then((res) => dispatch(setItems(res)))
      .catch((err) => console.error("Fetch error:", err));
  }, [dispatch]);

  let filteredItems = items.filter((item) => {
    const matchesFilter = filters.length === 0 || filters.includes(item.pricingOption);
    const matchesPrice =
      (maxPrice == null || item.price <= maxPrice) &&
      (minPrice == null || item.price >= minPrice);
    const keyword = search.toLowerCase();
    const matchesSearch =
      keyword === "" ||
      item.creator.toLowerCase().includes(keyword) ||
      item.title.toLowerCase().includes(keyword);

    return matchesFilter && matchesSearch && matchesPrice;
  });

    // ✅ Apply sorting
    filteredItems = [...filteredItems].sort((a, b) => {
        switch (sort) {
            case "title_asc":
            return a.title.localeCompare(b.title);
            case "title_desc":
            return b.title.localeCompare(a.title);
            case "creator_asc":
            return a.creator.localeCompare(b.creator);
            case "creator_desc":
            return b.creator.localeCompare(a.creator);
            default:
            return 0;
        }
    }); 

  return (
    <div className=" text-gray-100 min-h-screen p-4 bg-[#19191e]">
      <div className="max-w-7xl mx-auto">
        <KeywordSearch />
        <PricingFilter />
        <SortBy />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mx-5">
          {filteredItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
