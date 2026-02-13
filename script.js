// --- 1. DATA CONFIGURATION ---
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
    "None": { health: 0, physical: 0, magic: 0 },
    "Chief": { health: 25000, physical: 0, magic: 0 },
    "Dino": { health: 250000, physical: 0, magic: 0.2 },
    "Arachinex": { health: 450000, physical: 0.2, magic: 0.2 },
    "Grimroot": { health: 950000, physical: 0.2, magic: 1.0 },
    "Leonidas": { health: 1250000, physical: 0.25, magic: 0.25 },
    "Lightning God": { health: 25000000, physical: 0.3, magic: 0.3 },
    "Sand Golem": { health: 2000000000, physical: 0.4, magic: 0 },
    "Hydra Worm": { health: 4000000000, physical: 0.2, magic: 0.9 },
    "Dragon": { health: 8000000000, physical: 0.4, magic: 0.4 },
    "Nevermore": { health: 75000000000, physical: 0.3, magic: 0.6 },
    "Simba": { health: 750000000000, physical: 0.7, magic: 0.3 },
    "Anubis": { health: 1500000000000, physical: 0.5, magic: 0.7 },
    "Minotaur": { health: 30000000000, physical: 0.5, magic: 0.5 },
    "Ashgor": { health: 1600000000000, physical: 0.5, magic: 0.5 },
    "Eyegor": { health: 111000000000000, physical: 0.4, magic: 0.6 },
    "BloodRoot Witch": { health: 4000000000000000, physical: 0.3, magic: 0.4 },
    "Queen of Serpents": { health: 12000000000000000, physical: 0.4, magic: 0.5 },
};

const mobs = {
    "None": { health: 0, physical: 0, magic: 0 },
    "Snail": { health: 10, physical: 0, magic: 0 },
    "Pig": { health: 800, physical: 0, magic: 0 },
    "Turtle": { health: 2500, physical: 0.1, magic: 0 },
    "Caveman": { health: 4500, physical: 0, magic: 0 },
    "Spider": { health: 12500, physical: 0, magic: 0.1 },
    "Mammoth": { health: 75000, physical: 0.2, magic: 0.1 },
    "Viperbloom": { health: 125000, physical: 0, magic: 0 },
    "Warlock": { health: 100000, physical: 0, magic: 0.2 },
    "Spartan": { health: 250000, physical: 0.2, magic: 0 },
    "Reaper": { health: 750000, physical: 0.1, magic: 0.2 },
    "Angel": { health: 1500000, physical: 0.1, magic: 0.25 },
    "Cowboy": { health: 15000000, physical: 0.1, magic: 0 },
    "Ghost": { health: 60000000, physical: 0.2, magic: 0.8 },
    "Totem Sentinal": { health: 250000000, physical: 0.2, magic: 0.2 },
    "Mummy": { health: 500000000, physical: 0.3, magic: 0.1 },
    "Blightleap": { health: 2500000000, physical: 0.1, magic: 0.3 },
    "Bonepicker": { health: 25000000000, physical: 0.3, magic: 0.3 },
    "Oculon": { health: 100000000000, physical: 0.1, magic: 0.7 },
    "Magmaton": { health: 600000000000, physical: 0.1, magic: 0.2 },
    "Knobble": { health: 1800000000000, physical: 0.1, magic: 0.25 },
    "Puffcap": { health: 11000000000000, physical: 0.3, magic: 0.3 },
    "Shellthorn": { health: 400000000000000, physical: 0.7, magic: 0.1 },
    "Winxy": { health: 66000000000000, physical: 0, magic: 0.7 },
};

// --- 2. STATE MANAGEMENT ---
let currentWeaponType = "physical";
let currentWeapon = "Punch";
let currentBoss = "None";
let currentMob = "None";

// --- 3. HELPER FUNCTIONS ---

// Formats big numbers for Display (e.g. 1.2M)
function formatNumber(num) {
    if (num === Infinity || isNaN(num)) return "0";
    if (num < 1000) return Math.ceil(num).toString();
    const units = [
        {v: 1e18, s: 'Qi'}, 
        {v: 1e15, s: 'QD'}, 
        {v: 1e12, s: 'T'}, 
        {v: 1e9, s: 'B'}, 
        {v: 1e6, s: 'M'}, 
        {v: 1e3, s: 'K'}
    ];
    for (const u of units) {
        if (num >= u.v) return parseFloat((num / u.v).toFixed(2)) + u.s;
    }
    return Math.ceil(num).toString();
}

// Parses User Input (Handles "10M", "10k", "5.5B")
function parseAbbreviatedNumber(str) {
    if (!str) return 0;
    
    // Normalize string (lowercase, remove commas)
    let cleanStr = str.toString().toLowerCase().replace(/,/g, '').trim();

    // Suffix Multipliers
    const suffixes = {
        'k': 1e3,
        'm': 1e6,
        'b': 1e9,
        't': 1e12,
        'q': 1e15,  // Quadrillion
        'qd': 1e15, // Handling your specific QD
        'qa': 1e15, // Alternative Quadrillion
        'qi': 1e18, // Quintillion
        'sx': 1e21, // Sextillion
        'sp': 1e24  // Septillion
    };

    // Regex to separate number from letters
    // Matches: "10.5" and "m" in "10.5m"
    const match = cleanStr.match(/^([0-9.]+)([a-z]+)$/);

    if (match) {
        const numberPart = parseFloat(match[1]);
        const suffixPart = match[2];

        if (suffixes[suffixPart]) {
            return numberPart * suffixes[suffixPart];
        }
    }

    // Fallback: just return number if no suffix found
    return parseFloat(cleanStr) || 0;
}

function calculate() {
    const weaponData = weapons[currentWeaponType][currentWeapon];
    const playerStatInput = document.getElementById('playerStat');
    
    // Use the new parser here
    let userSP = parseAbbreviatedNumber(playerStatInput.value);

    let target = null;
    if (currentBoss !== "None") target = bosses[currentBoss];
    else if (currentMob !== "None") target = mobs[currentMob];

    // Reset UI if no target
    if (!target || target.health === 0) {
        document.getElementById('dmgDisplay').textContent = "0";
        document.getElementById('hitsDisplay').textContent = "0";
        document.getElementById('requiredSP').textContent = "0";
        document.getElementById('targetHP').textContent = "-";
        document.getElementById('targetRes').textContent = "-";
        return;
    }

    const res = target[currentWeaponType] || 0;

    // --- 1. CALCULATE YOUR DAMAGE & HITS ---
    let myDamage = 0;
    let hitsToKill = "∞";

    if (res >= 1) {
        myDamage = 0; // Immune
        hitsToKill = "IMMUNE";
    } else {
        myDamage = userSP * weaponData.multiplier * (1 - res);
        myDamage = Math.floor(myDamage); 
        
        if (myDamage <= 0) {
            hitsToKill = "∞";
        } else {
            hitsToKill = Math.ceil(target.health / myDamage);
        }
    }

    // --- 2. CALCULATE REQUIRED SP ---
    let requiredSP;
    if (res >= 1) {
        requiredSP = "IMMUNE";
    } else {
        const effectiveMult = weaponData.multiplier * (1 - res);
        requiredSP = target.health / effectiveMult;
    }

    // --- 3. UPDATE UI ---
    
    document.getElementById('dmgDisplay').textContent = res >= 1 ? "IMMUNE" : formatNumber(myDamage);
    document.getElementById('hitsDisplay').textContent = typeof hitsToKill === 'number' ? formatNumber(hitsToKill) : hitsToKill;

    document.getElementById('targetHP').textContent = formatNumber(target.health);
    document.getElementById('targetRes').textContent = (res * 100).toFixed(0) + "%";

    const spDisplay = document.getElementById('requiredSP');
    spDisplay.textContent = requiredSP === "IMMUNE" ? "IMMUNE" : formatNumber(requiredSP);
    spDisplay.style.color = requiredSP === "IMMUNE" ? "#ff4444" : "";
}

// --- 4. INPUT HANDLING ---

const inputField = document.getElementById('playerStat');

// Event: When user types (Calculate immediately, allow letters)
inputField.addEventListener('input', function(e) {
    calculate();
});

// Event: When user clicks away or presses enter (Format to full number with commas)
inputField.addEventListener('change', function(e) {
    const val = parseAbbreviatedNumber(e.target.value);
    if(val > 0) {
        e.target.value = val.toLocaleString('en-US'); // Turns 10m into 10,000,000
    }
});

// --- 5. DROPDOWN LOGIC ---
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

// --- 6. INITIALIZATION ---

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
