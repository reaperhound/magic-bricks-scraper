import { useEffect, useState } from "react";

export default function useSearchList(rfnum, pgNum) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  //    Reset list if rfnum changes
  useEffect(() => {
    setList([]);
  }, [rfnum]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    async function newProjectListFetch() {
      try {
        const res = await fetch(
          `/api/newprojectlist?rfnum=${rfnum}&pgNum=${pgNum}`
        );
        const data = await res.json();
        setList((prevList) => [...prevList, ...data]);
        setHasMore(data.length > 0); // if the array has data hasMore = true
        setLoading(false);
      } catch (err) {
        console.log("🚀 ~ useSearchList ~ err:", err);
        setError(true);
      }
    }
    newProjectListFetch();
  }, [rfnum, pgNum]);

  return [loading, error, list, hasMore];
}
