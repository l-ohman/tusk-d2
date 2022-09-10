const heroes = {
  1: { name: "Anti-Mage", stat: "Agility" },
  2: { name: "Axe", stat: "Strength" },
  3: { name: "Bane", stat: "Intelligence" },
  4: { name: "Bloodseeker", stat: "Agility" },
  5: { name: "Crystal Maiden", stat: "Intelligence" },
  6: { name: "Drow Ranger", stat: "Agility" },
  7: { name: "Earthshaker", stat: "Strength" },
  8: { name: "Juggernaut", stat: "Agility" },
  9: { name: "Mirana", stat: "Agility" },
  10: { name: "Morphling", stat: "Agility" },
  11: { name: "Shadow Fiend", stat: "Agility" },
  12: { name: "Phantom Lancer", stat: "Agility" },
  13: { name: "Puck", stat: "Intelligence" },
  14: { name: "Pudge", stat: "Strength" },
  15: { name: "Razor", stat: "Agility" },
  16: { name: "Sand King", stat: "Strength" },
  17: { name: "Storm Spirit", stat: "Intelligence" },
  18: { name: "Sven", stat: "Strength" },
  19: { name: "Tiny", stat: "Strength" },
  20: { name: "Vengeful Spirit", stat: "Agility" },
  21: { name: "Windranger", stat: "Intelligence" },
  22: { name: "Zeus", stat: "Intelligence" },
  23: { name: "Kunkka", stat: "Strength" },
  25: { name: "Lina", stat: "Intelligence" },
  26: { name: "Lion", stat: "Intelligence" },
  27: { name: "Shadow Shaman", stat: "Intelligence" },
  28: { name: "Slardar", stat: "Strength" },
  29: { name: "Tidehunter", stat: "Strength" },
  30: { name: "Witch Doctor", stat: "Intelligence" },
  31: { name: "Lich", stat: "Intelligence" },
  32: { name: "Riki", stat: "Agility" },
  33: { name: "Enigma", stat: "Intelligence" },
  34: { name: "Tinker", stat: "Intelligence" },
  35: { name: "Sniper", stat: "Agility" },
  36: { name: "Necrophos", stat: "Intelligence" },
  37: { name: "Warlock", stat: "Intelligence" },
  38: { name: "Beastmaster", stat: "Strength" },
  39: { name: "Queen of Pain", stat: "Intelligence" },
  40: { name: "Venomancer", stat: "Agility" },
  41: { name: "Faceless Void", stat: "Agility" },
  42: { name: "Wraith King", stat: "Strength" },
  43: { name: "Death Prophet", stat: "Intelligence" },
  44: { name: "Phantom Assassin", stat: "Agility" },
  45: { name: "Pugna", stat: "Intelligence" },
  46: { name: "Templar Assassin", stat: "Agility" },
  47: { name: "Viper", stat: "Agility" },
  48: { name: "Luna", stat: "Agility" },
  49: { name: "Dragon Knight", stat: "Strength" },
  50: { name: "Dazzle", stat: "Intelligence" },
  51: { name: "Clockwerk", stat: "Strength" },
  52: { name: "Leshrac", stat: "Intelligence" },
  53: { name: "Nature's Prophet", stat: "Intelligence" },
  54: { name: "Lifestealer", stat: "Strength" },
  55: { name: "Dark Seer", stat: "Intelligence" },
  56: { name: "Clinkz", stat: "Agility" },
  57: { name: "Omniknight", stat: "Strength" },
  58: { name: "Enchantress", stat: "Intelligence" },
  59: { name: "Huskar", stat: "Strength" },
  60: { name: "Night Stalker", stat: "Strength" },
  61: { name: "Broodmother", stat: "Agility" },
  62: { name: "Bounty Hunter", stat: "Agility" },
  63: { name: "Weaver", stat: "Agility" },
  64: { name: "Jakiro", stat: "Intelligence" },
  65: { name: "Batrider", stat: "Intelligence" },
  66: { name: "Chen", stat: "Intelligence" },
  67: { name: "Spectre", stat: "Agility" },
  68: { name: "Ancient Apparition", stat: "Intelligence" },
  69: { name: "Doom", stat: "Strength" },
  70: { name: "Ursa", stat: "Agility" },
  71: { name: "Spirit Breaker", stat: "Strength" },
  72: { name: "Gyrocopter", stat: "Agility" },
  73: { name: "Alchemist", stat: "Strength" },
  74: { name: "Invoker", stat: "Intelligence" },
  75: { name: "Silencer", stat: "Intelligence" },
  76: { name: "Outworld Destroyer", stat: "Intelligence" },
  77: { name: "Lycan", stat: "Strength" },
  78: { name: "Brewmaster", stat: "Strength" },
  79: { name: "Shadow Demon", stat: "Intelligence" },
  80: { name: "Lone Druid", stat: "Agility" },
  81: { name: "Chaos Knight", stat: "Strength" },
  82: { name: "Meepo", stat: "Agility" },
  83: { name: "Treant Protector", stat: "Strength" },
  84: { name: "Ogre Magi", stat: "Intelligence" },
  85: { name: "Undying", stat: "Strength" },
  86: { name: "Rubick", stat: "Intelligence" },
  87: { name: "Disruptor", stat: "Intelligence" },
  88: { name: "Nyx Assassin", stat: "Agility" },
  89: { name: "Naga Siren", stat: "Agility" },
  90: { name: "Keeper of the Light", stat: "Intelligence" },
  91: { name: "Io", stat: "Strength" },
  92: { name: "Visage", stat: "Intelligence" },
  93: { name: "Slark", stat: "Agility" },
  94: { name: "Medusa", stat: "Agility" },
  95: { name: "Troll Warlord", stat: "Agility" },
  96: { name: "Centaur Warrunner", stat: "Strength" },
  97: { name: "Magnus", stat: "Strength" },
  98: { name: "Timbersaw", stat: "Strength" },
  99: { name: "Bristleback", stat: "Strength" },
  100: { name: "Tusk", stat: "Strength" },
  101: { name: "Skywrath Mage", stat: "Intelligence" },
  102: { name: "Abaddon", stat: "Strength" },
  103: { name: "Elder Titan", stat: "Strength" },
  104: { name: "Legion Commander", stat: "Strength" },
  105: { name: "Techies", stat: "Intelligence" },
  106: { name: "Ember Spirit", stat: "Agility" },
  107: { name: "Earth Spirit", stat: "Strength" },
  108: { name: "Underlord", stat: "Strength" },
  109: { name: "Terrorblade", stat: "Agility" },
  110: { name: "Phoenix", stat: "Strength" },
  111: { name: "Oracle", stat: "Intelligence" },
  112: { name: "Winter Wyvern", stat: "Intelligence" },
  113: { name: "Arc Warden", stat: "Agility" },
  114: { name: "Monkey King", stat: "Agility" },
  119: { name: "Dark Willow", stat: "Intelligence" },
  120: { name: "Pangolier", stat: "Agility" },
  121: { name: "Grimstroke", stat: "Intelligence" },
  123: { name: "Hoodwink", stat: "Agility" },
  126: { name: "Void Spirit", stat: "Intelligence" },
  128: { name: "Snapfire", stat: "Strength" },
  129: { name: "Mars", stat: "Strength" },
  135: { name: "Dawnbreaker", stat: "Strength" },
  136: { name: "Marci", stat: "Strength" },
  137: { name: "Primal Beast", stat: "Strength" },
};

module.exports = { heroes }