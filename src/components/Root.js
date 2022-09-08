import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DraftingGrid, HeroList, Recommendations, HeroSelection } from "./";
import { setAllHeroes } from "../store";

const Root = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setAllHeroes());
  }, [])
  
  return (
    <div id="main-container">
      <HeroList />
      <HeroSelection />
    </div>
  );
};

export default Root;
