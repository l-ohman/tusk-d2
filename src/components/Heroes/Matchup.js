import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHeroData } from "../../store"

function Matchups ({ team, against }) {
    const teams = useSelector(state => state.teams);
    const dispatch = useDispatch();
    const thisTeam = teams[team];
    
    React.useEffect(() => {
        const heroesSelected = [...teams.radiant, ...teams.dire];

        const getHeroData = async (heroIds) => {
            for (let i = 0; i < heroIds.length; i++) {
                console.log('getting data for hero: ', heroIds[i])
                await dispatch(fetchHeroData(heroIds[i].id));
            }
        }
        getHeroData(heroesSelected);
    }, [teams])
    
    return(<div className="individualMatchupCont">
        <h2>{against ? "Best Bans for " : "Best Picks for "}{team[0].toUpperCase() + team.slice(1)}</h2>
    </div>)
}

export default Matchups;
