import type { ContentItem } from "../types";

export const fetchContentData = async (): Promise<ContentItem[]> => {
  const response = await fetch("https://closet-recruiting-api.azurewebsites.net/api/data");
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};