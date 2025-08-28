import { useEffect, useState } from "react";
import jsonData from "../data/scraped.json";

export default function useSearchList(rfnum, pgNum, pageSize = 10) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // Reset list if rfnum changes
  useEffect(() => {
    setList([]);
  }, [rfnum]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    async function fetchLocalList() {
      try {
        // Fetch the JSON from public folder
        const res = jsonData;
        const data = res;

        // Pagination
        const startIndex = (pgNum - 1) * pageSize;
        const endIndex = pgNum * pageSize;
        const pageData = data.slice(startIndex, endIndex);

        // Append new data to list
        setList((prevList) => [...prevList, ...pageData]);
        setHasMore(endIndex < data.length);

        setLoading(false);
      } catch (err) {
        console.error("🚀 ~ useSearchList ~ err:", err);
        setError(true);
      }
    }

    fetchLocalList();
  }, [rfnum, pgNum, pageSize]);

  return [loading, error, list, hasMore];
}
