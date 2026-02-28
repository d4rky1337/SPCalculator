const weapons = {
  physical: {
    "Punch": { multiplier: 0.1 },
    "Longsword": { multiplier: 0.15 },
    "Claymore": { multiplier: 0.2 },
    "Royal Sword": { multiplier: 0.25 },
    "Sandshard": { multiplier: 0.3 },
    "Inferno Sword": { multiplier: 0.35 },
    "Icebringer Sword": { multiplier: 0.4 },
    "Dragofeng": { multiplier: 1.2 },
    "Emberheart Sword": { multiplier: 0.7 },
  },
  magic: {
    "Winterbolt Staff": { multiplier: 0.15 },
    "Flame Staff": { multiplier: 0.17 },
    "Lightning Staff": { multiplier: 0.2 },
    "Aqua Staff": { multiplier: 0.23 },
    "Inferno Staff": { multiplier: 0.3 },
    "Nature Staff": { multiplier: 0.35 },
    "Elixir Staff": { multiplier: 2.5 },
  }
};

const bosses = {
    "None": { health: 0, physical: 0, magic: 0, dropPct: 0, info: "Select a Boss or Mob to see specific information here." },
    "Chief": { health: 25000, physical: 0, magic: 0, dropPct: 20, info: "The Chief is a basic starter boss. No special resistances.<br>Spawns after 5 minutes<br>Must deal at least 20% damage to receive drops." },
    "Dino": { health: 250000, physical: 0, magic: 0.2, dropPct: 20, info: "Dino has a slight resistance to Magic (20%). Physical weapons are better here.<br>Spawns after 5 minutes<br>Must deal at least 20% damage to receive drops." },
    "Arachinex": { health: 450000, physical: 0.2, magic: 0.2, dropPct: 20, info: "Spawns after 5 minutes<br>Must deal at least 20% damage to receive drops." },
    "Grimroot": { health: 950000, physical: 0.2, magic: 1.0, dropPct: 20, info: "Spawns after 5 minutes<br>Must deal at least 20% damage to receive drops." },
    "Leonidas": { health: 1250000, physical: 0.25, magic: 0.25, dropPct: 20, info: "Spawns after 5 minutes<br>Must deal at least 20% damage to receive drops." },
    "Lightning God": { health: 25000000, physical: 0.3, magic: 0.3, dropPct: 20, info: "Spawns after 5 minutes<br>Must deal at least 20% damage to receive drops." },
    "Sand Golem": { health: 2000000000, physical: 0.4, magic: 0, dropPct: 20, info: "Spawns after 5 minutes<br>Must deal at least 20% damage to receive drops." },
    "Hydra Worm": { health: 4000000000, physical: 0.2, magic: 0.9, dropPct: 20, info: "Spawns after 5 minutes<br>Must deal at least 20% damage to receive drops." },
    "Dragon": { health: 8000000000, physical: 0.4, magic: 0.4, dropPct: 20, info: "Spawns after 5 minutes.<br>Must deal at least 20% damage to receive drops.<br>Drops Diamond Chest III 100%" },
    "Nevermore": { health: 75000000000, physical: 0.3, magic: 0.6, dropPct: 20, info: "Spawns behind the lavafall on the left.<br>Lavafall deals 20B damage.<br>Spawns after 5 minutes.<br>Must deal at least 20% damage to receive drops.<br>Drops Emerald Chest I 100%" },
    "Simba": { health: 750000000000, physical: 0.7, magic: 0.3, dropPct: 20, info: "Spawns behind the lavafall on the right.<br>Lavafall deals 40B damage.<br>Spawns after 5 minutes.<br>Must deal at least 20% damage to receive drops.<br> Drops Emerald Chest II 100%" },
    "Anubis": { health: 1500000000000, physical: 0.5, magic: 0.7, dropPct: 20, info: "Spawns behind the lavafall in the middle.<br>Lavafall deals 150B damage.<br>Spawns after 5 minutes.<br>Must deal at least 20% damage to receive drops.<br>Drops Emerald Chest III 100%<br>His fire rods hit hard but his fists hit harder. Keep running and he won't hit you. (Staff needed)" },
    "Minotaur": { health: 30000000000, physical: 0.5, magic: 0.5, dropPct: 20, info: "Spawns after 10 minutes.<br>Must deal at least 20% damage to receive drops.<br>His chest can drop secret weapons but it's unlikely.<br>Stay on the torches to not get hit. (Staff needed)" },
    "Ashgor": { health: 1600000000000, physical: 0.5, magic: 0.5, dropPct: 5, info: "Spawns randomly every 15-45 minutes.<br>Despawns after 10 minutes.<br>Does not restore health (if you deal >5%)<br>Must deal at least 5% damage to receive drops.<br>Is not affected by Blood Moon.<br>Standing on a tree or constantly running would help killing it." },
    "Eyegor": { health: 111000000000000, physical: 0.4, magic: 0.6, dropPct: 20, info: "Magic is less effective against him.<br>You will find him on the island in the middle of FairyLand" },
    "BloodRoot Witch": { health: 4000000000000000, physical: 0.3, magic: 0.4, dropPct: 20, info: "A powerful witch. Slightly weaker to Physical." },
    "Queen of Serpents": { health: 12000000000000000, physical: 0.4, magic: 0.5, dropPct: 20, info: "The ultimate endgame boss. Good luck.<br>Find it in the lake of FairyLand." },
};

const mobs = {
    "None": { health: 0, physical: 0, magic: 0, spPerMin: { physical: 0, magic: 0 }, info: "Select a Boss or Mob to see specific information here." },
    "Snail": { health: 10, physical: 0, magic: 0, spPerMin: { physical: 600, magic: 600 }, info: "The weakest mob in the game. Good for absolute beginners." },
    "Pig": { health: 800, physical: 0, magic: 0, spPerMin: { physical: 2000, magic: 1840 }, info: "Pigs spawn in the starting area. Physical weapons farm them slightly faster." },
    "Turtle": { health: 2500, physical: 0.1, magic: 0, spPerMin: { physical: 4000, magic: 4600 }, info: "Turtles have shells giving them 10% physical resistance. Magic is better here." },
    "Caveman": { health: 4500, physical: 0, magic: 0, spPerMin: { physical: 11000, magic: 12000 }, info: "Found in GrassLand near chief." },
    "Spider": { health: 12500, physical: 0, magic: 0.1, spPerMin: { physical: 18000, magic: 26000 }, info: "Spiders resist magic slightly. Watch out for their webs.<br>Can be found in the caves on the right side of GrassLand" },
    "Mammoth": { health: 75000, physical: 0.2, magic: 0.1, spPerMin: { physical: 20000, magic: 24000 }, info: "Thick fur gives them 20% physical defense.<br>Can be found in the caves on the right side of GrassLand" },
    "Viperbloom": { health: 125000, physical: 0, magic: 0, spPerMin: { physical: 38500, magic: 38500 }, info: "A dangerous plant. No resistances.<br>Find them in CurseLand" },
    "Warlock": { health: 100000, physical: 0, magic: 0.2, spPerMin: { physical: 130000, magic: 143000 }, info: "Warlocks use magic, so they have 20% magic resistance.<br>Find them deep in the CurseLand." },
    "Spartan": { health: 250000, physical: 0.2, magic: 0, spPerMin: { physical: 308000, magic: 352000 }, info: "Shields up! 20% physical resistance.<br>They are located in the castle above CurseLand." },
    "Reaper": { health: 750000, physical: 0.1, magic: 0.2, spPerMin: { physical: 1170000, magic: 1260000 }, info: "Ghosts of the past.<br>Ironically you will find them in Heaven (jump on the clouds near chief)" },
    "Angel": { health: 1500000, physical: 0.1, magic: 0.25, spPerMin: { physical: 2700000, magic: 3060000 }, info: "Holy beings with high magic defense.<br>These are agressive mobs, be careful." },
    "Cowboy": { health: 15000000, physical: 0.1, magic: 0, spPerMin: { physical: 4200000, magic: 5200000 }, info: "Yeehaw! Found in the desert biome.<br>First mob you encounter in the area." },
    "Ghost": { health: 60000000, physical: 0.2, magic: 0.8, spPerMin: { physical: 9020000, magic: 10030000 }, info: "Almost completely immune to magic attacks (80%). Use swords!.<br>They are found in the graveyards in the desert." },
    "Totem Sentinal": { health: 250000000, physical: 0.2, magic: 0.2, spPerMin: { physical: 205000000, magic: 26500000 }, info: "A balanced defender.<br>You might skip him and go straight to mummies." },
    "Mummy": { health: 500000000, physical: 0.3, magic: 0.1, spPerMin: { physical: 43000000, magic: 52000000 }, info: "Wrapped in bandages, providing physical defense.<br>Last mob before vulcano." },
    "Blightleap": { health: 2500000000, physical: 0.1, magic: 0.3, spPerMin: { physical: 70500000, magic: 75000000 }, info: "A toxic frog creature.<br>First mob from vulcano." },
    "Bonepicker": { health: 25000000000, physical: 0.3, magic: 0.3, spPerMin: { physical: 141000000, magic: 159000000 }, info: "Scavengers of the wasteland.<br>Next mob after BlightLeap." },
    "Oculon": { health: 100000000000, physical: 0.1, magic: 0.7, spPerMin: { physical: 273000000, magic: 338000000 }, info: "A floating eye. Highly resistant to magic but weak against swords." },
    "Magmaton": { health: 600000000000, physical: 0.1, magic: 0.2, spPerMin: { physical: 658000000, magic: 728000000 }, info: "Made of pure lava.<br>You'll kill a lot of these guys before getting to FairyLand.<br>You can start farming them when you can 3shot." },
    "Knobble": { health: 1800000000000, physical: 0.1, magic: 0.25, spPerMin: { physical: 1050000000, magic: 1200000000 }, info: "Why isn't this thing called a gnome?<br>If you can kill this guy you escaped Magmaton Hell!" },
    "Puffcap": { health: 11000000000000, physical: 0.3, magic: 0.3, spPerMin: { physical: 2050000000, magic: 9600 }, info: "A giant mushroom.<br>You might need Emberheart sword or Dragofeng for this guy." },
    "Winxy": { health: 66000000000000, physical: 0, magic: 0.7, spPerMin: { physical: 8000, magic: 9600 }, info: "A fairy with incredibly high magic resistance." },
    "Shellthorn": { health: 400000000000000, physical: 0.7, magic: 0.1, spPerMin: { physical: 8000, magic: 9600 }, info: "Heavily armored. 70% physical resistance.<br>0.5% change to drop Ruby 3 chest" },
};

let currentWeaponType = "physical";
let currentWeapon = "Punch";
let currentBoss = "None";
let currentMob = "None";


function formatNumber(num) {
    if (num === Infinity || isNaN(num)) return "0";
    if (num < 1000) return Math.ceil(num).toString();
    const units = [
        {v: 1e18, s: 'Qi'}, {v: 1e15, s: 'QD'}, {v: 1e12, s: 'T'}, 
        {v: 1e9, s: 'B'}, {v: 1e6, s: 'M'}, {v: 1e3, s: 'K'}
    ];
    for (const u of units) {
        if (num >= u.v) return parseFloat((num / u.v).toFixed(2)) + u.s;
    }
    return Math.ceil(num).toString();
}

function parseAbbreviatedNumber(str) {
    if (!str) return 0;
    let cleanStr = str.toString().toLowerCase().replace(/,/g, '').trim();
    const suffixes = {
        'k': 1e3, 'm': 1e6, 'b': 1e9, 't': 1e12, 'q': 1e15, 
        'qd': 1e15, 'qa': 1e15, 'qi': 1e18, 'sx': 1e21, 'sp': 1e24
    };
    const match = cleanStr.match(/^([0-9.]+)([a-z]+)$/);
    if (match) {
        if (suffixes[match[2]]) return parseFloat(match[1]) * suffixes[match[2]];
    }
    return parseFloat(cleanStr) || 0;
}

function formatTime(mins) {
    if (mins < 60) return formatNumber(mins) + "m";
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    if (h >= 1000) return formatNumber(h) + "h";
    if (m === 0) return formatNumber(h) + "h";
    return formatNumber(h) + "h " + m + "m";
}

// --- 4. MAIN UNIFIED CALCULATOR ---
function calculate() {
    const weaponData = weapons[currentWeaponType][currentWeapon];
    const playerStatInput = document.getElementById('playerStat');
    let userSP = parseAbbreviatedNumber(playerStatInput.value);

    let target = null;
    if (currentBoss !== "None") target = bosses[currentBoss];
    else if (currentMob !== "None") target = mobs[currentMob];

    const infoTitle = document.getElementById('infoTitle');
    const infoText = document.getElementById('infoText');

    if (!target || target.health === 0) {
        document.getElementById('dmgDisplay').textContent = "-";
        document.getElementById('hitsDisplay').textContent = "-";
        document.getElementById('requiredSP').textContent = "-";
        document.getElementById('targetHP').textContent = "-";
        document.getElementById('targetRes').textContent = "-";
        
        document.getElementById('bossTracker').style.display = 'none';
        document.getElementById('farmTracker').style.display = 'none';

        if(infoTitle) infoTitle.textContent = "Game Guide";
        if(infoText) infoText.innerHTML = "Select a Boss or Mob to see specific information, tips, and weaknesses here!";
        return;
    }

    if(infoTitle) infoTitle.textContent = (currentBoss !== "None" ? currentBoss : currentMob) + " Info";
    if(infoText) infoText.innerHTML = target.info || "No specific info available.";

    const res = target[currentWeaponType] || 0;

    let myDamage = 0, hitsToKill = "∞";

    if (res >= 1) {
        hitsToKill = "IMMUNE";
    } else {
        myDamage = Math.floor(userSP * weaponData.multiplier * (1 - res)); 
        hitsToKill = myDamage <= 0 ? "∞" : Math.ceil(target.health / myDamage);
    }

    let requiredSP = res >= 1 ? "IMMUNE" : target.health / (weaponData.multiplier * (1 - res));

    document.getElementById('dmgDisplay').textContent = res >= 1 ? "IMMUNE" : formatNumber(myDamage);
    document.getElementById('hitsDisplay').textContent = typeof hitsToKill === 'number' ? formatNumber(hitsToKill) : hitsToKill;
    document.getElementById('targetHP').textContent = formatNumber(target.health);
    document.getElementById('targetRes').textContent = (res * 100).toFixed(0) + "%";

    const spDisplay = document.getElementById('requiredSP');
    spDisplay.textContent = requiredSP === "IMMUNE" ? "IMMUNE" : formatNumber(requiredSP);
    spDisplay.style.color = requiredSP === "IMMUNE" ? "#ff4444" : "";

    const bossTracker = document.getElementById('bossTracker');
    const farmTracker = document.getElementById('farmTracker');
    const farmTimeNeeded = document.getElementById('farmTimeNeeded');
    const bossDropPercentDisplay = document.getElementById('bossDropPercentDisplay');

    if (currentBoss !== "None") {
        bossTracker.style.display = 'block';
        farmTracker.style.display = 'none';
        
        let dropPct = target.dropPct || 0;
        
        if(bossDropPercentDisplay) {
            bossDropPercentDisplay.textContent = dropPct + "%";
        }
        
        let dmgNeeded = target.health * (dropPct / 100);
        document.getElementById('bossDamageNeeded').textContent = formatNumber(dmgNeeded);
    } 
    else if (currentMob !== "None") {
        bossTracker.style.display = 'none';
        farmTracker.style.display = 'block';
        
        if (farmTimeNeeded) {
            farmTimeNeeded.style.fontSize = "1.8rem"; 
            
            const mobKeys = Object.keys(mobs);
            const currentIndex = mobKeys.indexOf(currentMob);
            const nextMobName = mobKeys[currentIndex + 1];

            if (nextMobName) {
                let nextMob = mobs[nextMobName];
                let nextRes = nextMob[currentWeaponType] || 0;
                let nextRequiredSP = 0;
                let isImmune = false;

                if (nextRes >= 1) {
                    isImmune = true; 
                } else {
                    nextRequiredSP = nextMob.health / (weaponData.multiplier * (1 - nextRes));
                }

                if (isImmune) {
                    farmTimeNeeded.textContent = "NEXT IMMUNE";
                    farmTimeNeeded.style.fontSize = "1.2rem";
                } else {
                    let gainPerMin = target.spPerMin ? (target.spPerMin[currentWeaponType] || 0) : 0;

                    if (nextRequiredSP > userSP) {
                        let deficit = nextRequiredSP - userSP;
                        let reqMins = gainPerMin > 0 ? Math.ceil(deficit / gainPerMin) : "∞";
                        farmTimeNeeded.textContent = reqMins === "∞" ? "∞" : formatTime(reqMins);
                    } else {
                        farmTimeNeeded.textContent = "READY!";
                    }
                }
            } else {
                farmTimeNeeded.textContent = "MAX MOB!";
                farmTimeNeeded.style.fontSize = "1.4rem";
            }
        }
    }
}


const inputField = document.getElementById('playerStat');
inputField.addEventListener('input', calculate);
inputField.addEventListener('keydown', e => { if (e.key === 'Enter') inputField.blur(); });
inputField.addEventListener('change', e => {
    const val = parseAbbreviatedNumber(e.target.value);
    if(val > 0) e.target.value = val.toLocaleString('en-US'); 
    calculate();
});

function setupDropdown(id, optionsData, callback) {
    const dropdown = document.getElementById(id);
    const selected = dropdown.querySelector('.selected');
    const container = dropdown.querySelector('.options-container');
    const optionsList = dropdown.querySelector('.options');
    const searchBar = dropdown.querySelector('.search-bar');

    const renderOptions = (filter = "") => {
        optionsList.innerHTML = "";
        const filtered = optionsData.filter(i => i.toLowerCase().includes(filter.toLowerCase()));
        if(filtered.length === 0) optionsList.innerHTML = `<li style="color:#666;cursor:default">No results</li>`;
        
        filtered.forEach(opt => {
            const li = document.createElement('li');
            li.textContent = opt;
            li.onclick = (e) => {
                e.stopPropagation();
                selected.textContent = opt;
                container.classList.remove('active');
                callback(opt);
            };
            optionsList.appendChild(li);
        });
    };

    selected.onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll('.options-container').forEach(el => {
            if(el !== container) el.classList.remove('active');
        });
        container.classList.toggle('active');
        if(container.classList.contains('active') && searchBar) {
            searchBar.value = ""; searchBar.focus(); renderOptions("");
        }
    };

    if(searchBar) {
        searchBar.onclick = e => e.stopPropagation();
        searchBar.oninput = e => renderOptions(e.target.value);
    }
    renderOptions();
}


setupDropdown('weaponTypeDropdown', ["Physical", "Magic"], (val) => {
    currentWeaponType = val.toLowerCase();
    const wList = Object.keys(weapons[currentWeaponType]);
    currentWeapon = wList[0];
    setupDropdown('weaponDropdown', wList, (w) => { currentWeapon = w; calculate(); });
    document.querySelector('#weaponDropdown .selected').textContent = currentWeapon;
    calculate();
});

setupDropdown('weaponDropdown', Object.keys(weapons.physical), (val) => {
    currentWeapon = val; calculate();
});

setupDropdown('bossDropdown', Object.keys(bosses), (val) => {
    currentBoss = val;
    if(val !== "None") { 
        currentMob = "None"; 
        document.querySelector('#mobDropdown .selected').textContent = "None"; 
    }
    calculate();
});

setupDropdown('mobDropdown', Object.keys(mobs), (val) => {
    currentMob = val;
    if(val !== "None") { 
        currentBoss = "None"; 
        document.querySelector('#bossDropdown .selected').textContent = "None"; 
    }
    calculate();
});

document.addEventListener('click', () => {
    document.querySelectorAll('.options-container').forEach(el => el.classList.remove('active'));
});

calculate();
