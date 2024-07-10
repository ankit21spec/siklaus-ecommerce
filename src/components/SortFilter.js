import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortFilter = ({ setSort, setFilter, categories }) => {
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Remove duplicate categories
  const uniqueCategories = Array.from(new Set(categories.map((cat) => cat.name))).map(
    (name) => categories.find((cat) => cat.name === name)
  );

  return (
    <div style={{ margin: "10px", display: "flex", gap: "20px" }}>
      <FormControl style={{ width: "15%" }}>
        <InputLabel>Sort by</InputLabel>
        <Select onChange={handleSortChange}>
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl style={{ width: "15%" }}>
        <InputLabel>Category</InputLabel>
        <Select onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          {uniqueCategories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SortFilter;