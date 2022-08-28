// Rebuilds hero table (this is mostly proof of concept, but might be used to more easily get hero info later, such as stats, spells, etc)
// Calls Stratz API
const Sequelize = require('sequelize');
const db = require('./db');
const Hero = require('./models/Hero');

const fetchStratz = require('../api/fetchStratz');

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
    // console.log('Rebuilding hero table...')
    await Hero.sync({ force: true });

    const allHeroes = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Could not reach STRATZ server (timeout)'))
        }, 5000); // max wait is 5s

        getAllHeroes().then(output => {
            clearTimeout(timer);
            resolve(output);
        });
    });
    for (let i = 0; i < allHeroes.length; i++) {
        Hero.create(allHeroes[i]);
    }
    // console.log('\nHero table succesfully created');
}

// See 'npm run rebuildHeroes'
if (require.main === module) { 
    buildHeroTable();
};
