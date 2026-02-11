// --- 1. DATA CONFIGURATION ---
const weapons = {
  physical: {
    "Punch": { multiplier: 0.1, attackSpeed: 2.0 },
    "Longsword": { multiplier: 0.15, attackSpeed: 2.0 },
    "Claymore": { multiplier: 0.2, attackSpeed: 2.0 },
    "Royal Sword": { multiplier: 0.25, attackSpeed: 2.0 },
    "Sandshard": { multiplier: 0.3, attackSpeed: 2.0 },
    "Inferno Sword": { multiplier: 0.35, attackSpeed: 2.0 },
    "Dragofeng": { multiplier: 1.2, attackSpeed: 2.0 },
    "Emberheart Sword": { multiplier: 0.7, attackSpeed: 2.0 },
  },
  magic: {
    "Winterbolt Staff": { multiplier: 0.15, attackSpeed: 1.0 },
    "Flame Staff": { multiplier: 0.17, attackSpeed: 1.0 },
    "Lightning Staff": { multiplier: 0.2, attackSpeed: 1.0 },
    "Aqua Staff": { multiplier: 0.23, attackSpeed: 1.0 },
    "Inferno Staff": { multiplier: 0.3, attackSpeed: 1.0 },
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

// Formats big numbers (e.g. 1.5B, 100K)
function formatNumber(num) {
    if (num === Infinity || isNaN(num)) return "0";
    if (num < 1000) return Math.ceil(num).toString();

    const units = [
        { value: 1e15, suffix: 'Q' },
        { value: 1e12, suffix: 'T' },
        { value: 1e9, suffix: 'B' },
        { value: 1e6, suffix: 'M' },
        { value: 1e3, suffix: 'K' },
    ];

    for (const unit of units) {
        if (num >= unit.value) {
            let n = num / unit.value;
            // Show 2 decimals max, remove trailing zeros (e.g., "1.50" -> "1.5")
            return parseFloat(n.toFixed(2)) + unit.suffix;
        }
    }
    return Math.ceil(num).toString();
}

// Main Calculation Logic
function calculateSP() {
    const weaponData = weapons[currentWeaponType][currentWeapon];
    
    // Determine target (Boss takes priority if both selected, but logic ensures only one is active)
    let target = null;
    if (currentBoss !== "None") target = bosses[currentBoss];
    else if (currentMob !== "None") target = mobs[currentMob];

    // Reset UI if no target
    if (!target || target.health === 0) {
        document.getElementById('requiredSP').textContent = "0";
        document.getElementById('targetHP').textContent = "-";
        document.getElementById('targetRes').textContent = "-";
        return;
    }

    // Get Resistance
    const resistance = target[currentWeaponType] || 0;

    // Display Target Stats
    document.getElementById('targetHP').textContent = formatNumber(target.health);
    document.getElementById('targetRes').textContent = (resistance * 100).toFixed(0) + "%";

    // CALCULATION FORMULA:
    // Damage = SP * Multiplier * (1 - Resistance)
    // Therefore: SP = TargetHP / (Multiplier * (1 - Resistance))
    
    let requiredSP;
    if (resistance >= 1) {
        requiredSP = "IMMUNE"; // Impossible to kill if 100% resistance
    } else {
        const effectiveMultiplier = weaponData.multiplier * (1 - resistance);
        requiredSP = target.health / effectiveMultiplier;
    }

    // Update Main Display
    const spDisplay = document.getElementById('requiredSP');
    spDisplay.textContent = requiredSP === "IMMUNE" ? "IMMUNE" : formatNumber(requiredSP);
    
    if(requiredSP === "IMMUNE") {
        spDisplay.style.color = "#ff4444"; // Red text for immune
    } else {
        spDisplay.style.color = ""; // Reset to default accent color
    }
}

// --- 4. DROPDOWN LOGIC (With Search) ---

function setupDropdown(id, optionsData, callback) {
    const dropdown = document.getElementById(id);
    const selected = dropdown.querySelector('.selected');
    const container = dropdown.querySelector('.options-container');
    const optionsList = dropdown.querySelector('.options');
    const searchBar = dropdown.querySelector('.search-bar');

    // Function to populate the list
    const renderOptions = (filterText = "") => {
        optionsList.innerHTML = ""; // Clear list
        
        const filtered = optionsData.filter(item => 
            item.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filtered.length === 0) {
            optionsList.innerHTML = `<li style="color: #666; cursor: default;">No results found</li>`;
            return;
        }

        filtered.forEach(opt => {
            const li = document.createElement('li');
            li.textContent = opt;
            li.onclick = (e) => {
                e.stopPropagation(); // Stop bubbling
                selected.textContent = opt;
                closeDropdown();
                callback(opt);
            };
            optionsList.appendChild(li);
        });
    };

    const openDropdown = () => {
        // Close all other dropdowns first
        document.querySelectorAll('.options-container').forEach(el => el.classList.remove('active'));
        container.classList.add('active');
        if (searchBar) {
            searchBar.value = ""; // Reset search
            searchBar.focus();
            renderOptions(""); // Reset list to full
        }
    };

    const closeDropdown = () => {
        container.classList.remove('active');
    };

    // Toggle on click
    selected.onclick = (e) => {
        e.stopPropagation();
        if (container.classList.contains('active')) {
            closeDropdown();
        } else {
            openDropdown();
        }
    };

    // Prevent closing when clicking inside search bar
    if (searchBar) {
        searchBar.onclick = (e) => e.stopPropagation();
        searchBar.oninput = (e) => renderOptions(e.target.value);
    }

    // Initial Render
    renderOptions();
}

// --- 5. INITIALIZATION ---

// Weapon Type Dropdown
setupDropdown('weaponTypeDropdown', ["Physical", "Magic"], (type) => {
    currentWeaponType = type.toLowerCase();
    
    // Update Weapon List based on type
    const newWeaponList = Object.keys(weapons[currentWeaponType]);
    currentWeapon = newWeaponList[0];
    
    // Re-setup the weapon dropdown with new list
    setupDropdown('weaponDropdown', newWeaponList, (weapon) => {
        currentWeapon = weapon;
        calculateSP();
    });
    
    // Update Weapon UI Text
    document.querySelector('#weaponDropdown .selected').textContent = currentWeapon;
    
    calculateSP();
});

// Weapon Selection Dropdown
setupDropdown('weaponDropdown', Object.keys(weapons.physical), (weapon) => {
    currentWeapon = weapon;
    calculateSP();
});

// Boss Dropdown
setupDropdown('bossDropdown', Object.keys(bosses), (boss) => {
    currentBoss = boss;
    if (boss !== "None") {
        // If boss selected, reset Mob
        currentMob = "None";
        document.querySelector('#mobDropdown .selected').textContent = "None";
    }
    calculateSP();
});

// Mob Dropdown
setupDropdown('mobDropdown', Object.keys(mobs), (mob) => {
    currentMob = mob;
    if (mob !== "None") {
        // If mob selected, reset Boss
        currentBoss = "None";
        document.querySelector('#bossDropdown .selected').textContent = "None";
    }
    calculateSP();
});

// Close dropdowns when clicking anywhere else on page
document.addEventListener('click', () => {
    document.querySelectorAll('.options-container').forEach(el => el.classList.remove('active'));
});

// Run initial calculation
calculateSP();