// components/AutoSuggest.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [rfnum, setRfnum] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();
  // Fetch suggestions with debounce
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/autosuggest?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        const locations = data.locationMap?.LOCATION || [];
        console.log(locations);
        setSuggestions(
          locations.map((loc) => ({ result: loc.result, rfnum: loc.rfnum }))
        );
        setShowDropdown(true);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce: 300ms

    return () => clearTimeout(handler);
  }, [query]);

  const handleSelect = (value) => {
    setQuery(value.result);
    setRfnum(value.rfnum);
    setShowDropdown(false);
  };

  const handleSearch = () => {
    router.push(`/city/${query}?rfnum=${rfnum}`);
  };

  console.log({ rfnum });

  return (
    <div className='relative max-w-md mx-auto'>
      <div className='flex items-center border rounded-lg overflow-hidden w-full'>
        <input
          type='text'
          placeholder='Search location...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='flex-grow p-2 outline-none'
        />

        {/* Divider */}
        <div className='w-px h-6 bg-gray-300'></div>

        <button className='p-2 hover:bg-gray-700' onClick={handleSearch}>
          <img src='/search.svg' className='w-5 h-5 text-white' alt='search' />
        </button>
      </div>

      {loading && (
        <div className='absolute right-2 top-2 text-gray-500'>...</div>
      )}

      {showDropdown && suggestions.length > 0 && (
        <>
          <ul className='absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-auto'>
            {suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  console.log(item);
                  handleSelect(item);
                }}
                className='p-2 hover:bg-gray-100 cursor-pointer text-black'
              >
                {item.result}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
