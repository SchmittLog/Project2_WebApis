import axios, { AxiosResponse } from "axios";
import { PlayerClasses, ClassList, WeaponDetails, WeaponList } from "./datatypes";

const weaponInput: Element | null = document.getElementById("input1");
const classInput: Element | null = document.getElementById("input2");
const weapBtn = document.getElementById("btn1");
const weapTable = document.getElementById("WeaponsTable");
const claBtn = document.getElementById("btn2")
const claTable = document.getElementById("ClassTable");

// Define a click listener on the weapon filter button
weapBtn?.addEventListener("click", () => {
  removeOldWeaponData();
  fetchNewWeaponData();
});

// Define a click listener on the class filter button
claBtn?.addEventListener("click", () => {
  removeOldClassData();
  fetchNewClassData();
});

function removeOldWeaponData() {
  // Use the class name fromAPI to select all the rows
  // in the table which are generated axios data
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromWeaponAPI");

  for (let k = 0; k < rows.length; k++) {
    // Remove the row from the parent (weapTable)
    weapTable?.removeChild(rows[k]);
  }
}

function removeOldClassData() {
  const rows: NodeListOf<HTMLTableRowElement> =
    document.querySelectorAll(".fromClassAPI");

  for (let k = 0; k < rows.length; k++) {
    claTable?.removeChild(rows[k]);
  }
}

function fetchNewWeaponData() {
  // Use the user input to control which weapons to fetch
  const weaponFilter = (weaponInput as HTMLInputElement)?.value;

  axios
    .request({
      method: "GET",
      url: "https://api.open5e.com/weapons/"
    })
    .then((r: AxiosResponse) => r.data)
    .then((ru: WeaponList) => {
      for (let k = 0; k < ru.results.length; k++) {
        const u: WeaponDetails = ru.results[k];
        const aRow = document.createElement("tr");
        
        /*
        I had to use a if statement to filter my api data. 
        Unfortunately, the endpoints I chose weren't able to be filtered using parameters.
        If I was able to use the parameters I would've used
        "params: { category: weaponFilter }" in the .request block above
        */

        if (weaponFilter == u.category) {
        // Use a unique class name so it is easy to remove rows later
        aRow.setAttribute("class", "fromWeaponAPI");
        weapTable?.appendChild(aRow);

        // Create a table data cell to show the weapon details
        const nameCell = document.createElement("td");
        nameCell.innerText = u.name;
        aRow.appendChild(nameCell);
        
        const dmgDieCell = document.createElement("td");
        dmgDieCell.innerText = u.damage_dice;
        aRow.appendChild(dmgDieCell);
        
        const dmgTypeCell = document.createElement("td");
        dmgTypeCell.innerText = u.damage_type;
        aRow.appendChild(dmgTypeCell);

        const propCell = document.createElement("td");
        propCell.innerText = u.properties;
        aRow.appendChild(propCell);

        const weightCell = document.createElement("td");
        weightCell.innerText = u.weight;
        aRow.appendChild(weightCell);
        } else {
          continue;
        }
      }
    });    
}

function fetchNewClassData(){
  const classFilter = (classInput as HTMLInputElement)?.value;
  
  axios
        .request({
          method: "GET",
          url: "https://api.open5e.com/classes/"
        })
        .then((r: AxiosResponse) => r.data)
        .then((ru: ClassList) => {
          for (let k = 0; k < ru.results.length; k++) {
            const u: PlayerClasses = ru.results[k];    
            const aRow = document.createElement("tr")

            /*
            I had to use a if statement to filter my api data. 
            Unfortunately, the endpoints I chose weren't able to be filtered using parameters.
            If I was able to use the parameters I would've used
           "params: { spellcasting_ability: classFilter }" in the .request block above
             */

            if (classFilter == u.spellcasting_ability){
            aRow.setAttribute("class", "fromClassAPI");
            claTable?.appendChild(aRow);

            // Create a table data cell to show class details
            const nameCell = document.createElement("td");
            nameCell.innerText = u.name;
            aRow.appendChild(nameCell);

            const hitDieCell = document.createElement("td");
            hitDieCell.innerText = u.hit_dice;
            aRow.appendChild(hitDieCell);

            const hpCell = document.createElement("td");
            hpCell.innerText = u.hp_at_1st_level;
            aRow.appendChild(hpCell);

            const profCell = document.createElement("td");
            profCell.innerText = u.prof_saving_throws;
            aRow.appendChild(profCell);

            const spellcastCell = document.createElement("td");

            if (u.spellcasting_ability == "") {
              spellcastCell.innerText = "None"
            } else {
              spellcastCell.innerText = u.spellcasting_ability;
            }

            aRow.appendChild(spellcastCell);
          } else {
            continue;
          }
          }
        });
      }

fetchNewWeaponData();
fetchNewClassData();
