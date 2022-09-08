import React from "react";
import { useSelector } from "react-redux";

function HeroList () {
    const allHeroes = useSelector(state => state.heroes);
    console.log(allHeroes)

    return(<div className="heroIconsContainer">
        {allHeroes.map(hero => {
            return <img key={hero.id} src={`assets/heroIcons/${hero.name}_icon.webp`} className="heroIconDraft"/>
        })}
    </div>)
}

export default HeroList;
