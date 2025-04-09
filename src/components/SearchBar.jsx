import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-text-light dark:text-text-dark
                   focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
                   transition-colors disabled:opacity-50"
          disabled={loading}
        />
        <motion.button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1
                     bg-primary-light dark:bg-primary-dark text-white rounded-md
                     hover:bg-blue-600 dark:hover:bg-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
          disabled={loading || !city.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Searching..." : "Search"}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
