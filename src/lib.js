import heroes from "../server/heroes.json";

export function heroNameById(heroId) {
  return heroes[heroId].name;
}

export function heroIconById(heroId) {
  const name = heroNameById(heroId).replaceAll(" ", "_");
  return `assets/heroIcons/${name}_icon.webp`;
}
