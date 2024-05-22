/* eslint-disable react/prop-types */
import * as Unicons from "@iconscout/react-unicons";
import styles from "./Filter.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { reset, updateState } from "./filterSlice";
function Filter() {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("Filter By Price");

  function handleVisible() {
    setIsVisible((visible) => !visible);
  }

  function handleINC() {
    dispatch(updateState("asc"));
    setFilterText("Low to High");
  }
  function handleDEC() {
    dispatch(updateState("desc"));
    setFilterText("High to Low");
  }
  function handleone() {
    dispatch(updateState("one"));
    setFilterText("$500 - $1000");
  }
  function handleabove() {
    dispatch(updateState("above"));
    setFilterText("$1000 and Above");
  }
  function handlefive() {
    dispatch(updateState("five"));
    setFilterText("$500 and below");
  }
  function handleReset() {
    dispatch(reset());
    setFilterText("Filter By Price");
  }
  return (
    <div className={styles.filter} onClick={handleVisible}>
      <p>{filterText}</p>
      <Unicons.UilAngleDown />

      {isVisible && (
        <div className={styles.filterMenu}>
          <p onClick={handleINC} className={styles.p}>
            Price -- Low to High
          </p>
          <p onClick={handleDEC} className={styles.p}>
            Price -- High to Low
          </p>
          <p onClick={handlefive} className={styles.p}>
            $500 and below
          </p>
          <p onClick={handleone} className={styles.p}>
            $500 - $1000
          </p>
          <p onClick={handleabove} className={styles.p}>
            $1000 and Above
          </p>
          <p onClick={handleReset} className={styles.p}>
            None
          </p>
        </div>
      )}
    </div>
  );
}

export default Filter;
