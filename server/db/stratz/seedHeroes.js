const fetchStratz = require('./fetchStratz');
const { Hero, HeroMatchups } = require('../models/Hero');

// Gets hero constants from API
const getAllHeroes = async () => {
    const response = await fetchStratz(`
            query HeroConstants {
                constants {
                    heroes {
                        id
                        displayName
                    }
                }
            }
        `);
    return response.data.constants.heroes.map(heroObj => {
        heroObj.name = heroObj.displayName.replaceAll(' ', '_');
        delete heroObj.displayName;
        return heroObj;
    })
};

// Adds API response to SQL db
const buildHeroTable = async () => {
    await Hero.sync({ force: true });
    await HeroMatchups.sync({ force: true });

    const allHeroes = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Could not reach STRATZ server (timeout)'))
        }, 5000); // Cancel if Stratz cannot be reached in 5s

        getAllHeroes().then(output => {
            clearTimeout(timer);
            resolve(output);
        });
    });
    for (let i = 0; i < allHeroes.length; i++) {
        await Hero.create(allHeroes[i]);
        await HeroMatchups.create({ id: allHeroes[i].id});
    }
    console.log('Hero tables successfully built')
}

if (require.main === module) { 
    buildHeroTable();
};
