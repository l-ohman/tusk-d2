// Should split this into 2 categories:
    // (1) Builds base hero table
    // (2) Gets winrates of each hero and other necessary data

const { Hero } = require('../models/Hero');

const fetchStratz = require('./fetchStratz');

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
    }
    console.log('Hero table successfully built')
}

if (require.main === module) { 
    buildHeroTable();
};
