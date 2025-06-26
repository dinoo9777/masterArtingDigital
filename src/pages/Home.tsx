import { useEffect, useRef, useState } from "react";
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
  const fetchedRef = useRef(false);

  const dispatch = useAppDispatch();
  const { items, filters, search, sort, minPrice, maxPrice } = useAppSelector((state) => state.content);
  const [params, setParams] = useSearchParams();
  const ITEMS_PER_LOAD = 12;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

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
      const obj: Record<string, string | null | undefined> = {
          search: search || null,
          sort: sort || null,
          min: minPrice !== DEFAULT_MIN ? String(minPrice) : null,
          max: maxPrice !== DEFAULT_MAX ? String(maxPrice) : null,
          priceoption: filters.length > 0
              ? filters.map((num) => ReverseFilterMap[num]).filter(Boolean).join("_")
              : null

      };

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
  }, [search, filters, sort, maxPrice, setParams, minPrice]);

  // ⬇️ Fetch content data
    useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

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
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
            }
        });

        const current = loadMoreRef.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, []);
    const visibleItems = filteredItems.slice(0, visibleCount);
  return (
    <div className=" text-gray-100 min-h-screen p-4 bg-[#19191e]">
      <div className="max-w-7xl mx-auto">
        <div className="sticky top-15 bg-[#19191e]">
            <KeywordSearch />
            <PricingFilter />
        </div>
        <SortBy />
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mx-5">
        {
            visibleItems.map((item) => (
                <ContentCard key={item.id} item={item} />
            ))
        }
        </div>
        <div ref={loadMoreRef} className="h-10" />
      </div>
    </div>
  );
};

export default Home;
