/* eslint-disable react/prop-types */
import { useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import styles from "./Search.module.css";

import { useNavigate } from "react-router-dom";

function Search() {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchValue) return;
    navigate(`/search/${searchValue}`);
    setSearchValue("");
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit} className={styles.input}>
        <Unicons.UilSearch style={{ outline: "gray", color: "gray" }} />
        <input
          placeholder="Search for a product"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      {/* <Filter /> */}
    </div>
  );
}

export default Search;
