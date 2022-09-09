import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {setSelectedHero} from "../../store";

function HeroList () {
    const allHeroes = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    
    const handleClick = (hero) => {
        dispatch(setSelectedHero(hero));
    }

    return(<div className="leftContainer heroIconsContainer">
        {allHeroes.map(hero => {
            return <img key={hero.id} src={`assets/heroIcons/${hero.name}_icon.webp`} 
            onClick={() => handleClick(hero)} className="heroIconDraft"/>
        })}
    </div>)
}

export default HeroList;
