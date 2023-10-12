import heroes from "../server/heroes.json";

export function heroNameById(heroId) {
  return heroes[heroId].name;
}

export function heroIconById(heroId) {
  const name = heroNameById(heroId).replaceAll(" ", "_");
  return `assets/heroIcons/${name}_icon.webp`;
}

export function secondsToClockTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds}`;
}
