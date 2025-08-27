// components/AutoSuggest.jsx
"use client";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
        setSuggestions(locations.map((loc) => loc.result));
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
    setQuery(value);
    setShowDropdown(false);
  };

  return (
    <div className='relative max-w-md mx-auto'>
      <input
        type='text'
        placeholder='Search location...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full p-2 border rounded-lg outline-none'
      />
      {loading && (
        <div className='absolute right-2 top-2 text-gray-500'>...</div>
      )}

      {showDropdown && suggestions.length > 0 && (
        <ul className='absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-60 overflow-auto'>
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item.value || item.name || item)}
              className='p-2 hover:bg-gray-100 cursor-pointer text-black'
            >
              {item.value || item.name || item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
