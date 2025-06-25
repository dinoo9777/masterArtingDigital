import type { ContentItem } from "../types";


const ContentCard = ({ item }: { item: ContentItem }) => {
  return (
    <div className="shadow rounded text-gray-500">
      <img src={item.imagePath} alt={item.title} className="w-full h-80 object-cover rounded" />
        <div className="mt-2 flex justify-between items-start">
            <div className="flex flex-col">
            <div className="font-semibold text-sm text-white">{item.creator}</div>
            <div className="text-gray-400 text-base">{item.title}</div>
            </div>
            <div className="text-lg font-bold text-white">
            {item.pricingOption !== 0
                ? item.pricingOption === 2 ? <span className="text-lg text-gray-500">View Only</span> : `₹${item.price}`
                : <span className=" text-gray-500">Free</span>}
            </div>
        </div>
    </div>
  );
};

export default ContentCard;