import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CurrentTeams, HeroList, HeroRecs, HeroSelection } from "./";
import { setAllHeroes } from "../store";

const Root = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setAllHeroes());
  }, []);

  return (
    <>
      <div id="main-container">
        <HeroList />
        <div className="rightContainer">
          <HeroSelection />
          <CurrentTeams />
        </div>
      </div>
      <HeroRecs />
    </>
  );
};

export default Root;
