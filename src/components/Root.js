import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Header,
  Footer,
  CurrentTeams,
  HeroList,
  HeroRecommendations,
  HeroSelection,
  BannedHeroes,
} from "./";
import { setAllHeroes } from "../store";

const Root = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setAllHeroes());
  }, []);

  return (
    <>
      <div id="page-container">
        <Header />

        <div id="draft-container">
          <HeroList />
          <div className="rightContainer">
            <HeroSelection />
            <CurrentTeams />
            <BannedHeroes />
          </div>
        </div>

        <HeroRecommendations />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Root;
