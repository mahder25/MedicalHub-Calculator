const mainEl = document.getElementById("main");
const Naviitems = document.querySelectorAll(".naviitem");
const mainBtn = document.getElementById("main-btn");  
const rail = document.getElementById("rail");   

const tools = {
    bmi:{
        title: "BMI Calculator",
        formHTML: `<label>weight(kg):<input type="number" id="weight" ></label><br><br>
        <label>height(cm):<input type="number" id="height" ></label>
        <p id="result"></p>
        `,
       calculate :  () => {
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
      if(!weight||!height) return;
      const bmi = weight/Math.pow(height/100,2);
      document.getElementById("result").innerText = `BMI : ${bmi.toFixed(1)}`;
       }

    },
    CrCl : {
        title: "Creatinine Clearance",
        formHTML : `<label>age(yr)<input type="number" id="age" ></label><br><br>
        <label>weight(kg)<input type="number" id="crweight" > </label><br><br>
        <label>serumCreatinine(mg/dL)<input type="number" id = "serumcr" ></label>
        <p id= "result"></P>
        `, 
        calculate : () => {
            const age = parseFloat(document.getElementById("age").value);
            const weight = parseFloat(document.getElementById("crweight").value);
            const serumCreatinine =parseFloat(document.getElementById("serumcr").value);
            if(!age || !weight || !serumCreatinine) return;
            const CrCl = ((140-age)*weight)/(72* serumCreatinine);
            document.getElementById("result").innerText  = `creatinine clearance : ${CrCl.toFixed(1)}`;
        }
    },
       GCS: {
        title: "Glasgow Coma Scale",
        formHTML: `
        <label>Eye opening (1-4):
          <select id="eye">
            <option value="4">4 - Spontaneous</option>
            <option value="3">3 - To speech</option>
            <option value="2">2 - To pain</option>
            <option value="1">1 - None</option>
          </select>
        </label><br><br>
        <label>Verbal response (1-5):
          <select id="verbal">
            <option value="5">5 - Oriented</option>
            <option value="4">4 - Confused</option>
            <option value="3">3 - Inappropriate words</option>
            <option value="2">2 - Incomprehensible sounds</option>
            <option value="1">1 - None</option>
          </select>
        </label><br><br>
        <label>Motor response (1-6):
          <select id="motor">
            <option value="6">6 - Obeys commands</option>
            <option value="5">5 - Localizes pain</option>
            <option value="4">4 - Withdraws from pain</option>
            <option value="3">3 - Abnormal flexion</option>
            <option value="2">2 - Extension</option>
            <option value="1">1 - None</option>
          </select>
        </label>
        <p id="result"></p>`,
        calculate: () => {
            const eye = parseFloat(document.getElementById("eye").value);
            const verbal = parseFloat(document.getElementById("verbal").value);
            const motor = parseFloat(document.getElementById("motor").value);
            const total = eye + verbal + motor;
            document.getElementById("result").innerText = `Total GCS : ${total} / 15`;
        }
    },
        
       chad: {
        title: "CHA2DS2-VASc Score",
        formHTML: `
        <label><input type="checkbox" id="chf"> Congestive heart failure</label><br>
        <label><input type="checkbox" id="htn"> Hypertension</label><br>
        <label>Age:
          <select id="ageGroup">
            <option value="0">Under 65</option>
            <option value="1">65-74</option>
            <option value="2">75 or older</option>
          </select>
        </label><br>
        <label><input type="checkbox" id="diabetes"> Diabetes</label><br>
        <label><input type="checkbox" id="strokeHx"> Prior stroke/TIA (2 pts)</label><br>
        <label><input type="checkbox" id="vascular"> Vascular disease</label><br>
        <label>Sex:
          <select id="sex">
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </label>
        <p id="result"></p>`,
        calculate: () => {
            let score = 0;
            score += document.getElementById("chf").checked ? 1 : 0;
            score += document.getElementById("htn").checked ? 1 : 0;
            score += parseFloat(document.getElementById("ageGroup").value);
            score += document.getElementById("diabetes").checked ? 1 : 0;
            score += document.getElementById("strokeHx").checked ? 2 : 0;
            score += document.getElementById("vascular").checked ? 1 : 0;
            score += parseFloat(document.getElementById("sex").value);
            document.getElementById("result").innerText = `Score : ${score} points`;
        }
    },
        anion: {
        title: "Anion Gap",
        formHTML: `<label>Sodium (mEq/L)<input type="number" id="sodium"></label><br><br>
        <label>Chloride (mEq/L)<input type="number" id="chloride"></label><br><br>
        <label>Bicarbonate (mEq/L)<input type="number" id="bicarb"></label>
        <p id="result"></p>`,
        calculate: () => {
            const sodium = parseFloat(document.getElementById("sodium").value);
            const chloride = parseFloat(document.getElementById("chloride").value);
            const bicarb = parseFloat(document.getElementById("bicarb").value);
            if (!sodium || !chloride || !bicarb) return;
            const gap = sodium - (chloride + bicarb);
            document.getElementById("result").innerText = `Anion Gap : ${gap.toFixed(1)} mEq/L`;
        }
    },
       calcium: {
        title: "Corrected Calcium",
        formHTML: `<label>Total calcium (mg/dL)<input type="number" id="calciumVal"></label><br><br>
        <label>Albumin (g/dL)<input type="number" id="albumin"></label>
        <p id="result"></p>`,
        calculate: () => {
            const calciumVal = parseFloat(document.getElementById("calciumVal").value);
            const albumin = parseFloat(document.getElementById("albumin").value);
            if (!calciumVal || !albumin) return;
            const corrected = calciumVal + 0.8 * (4 - albumin);
            document.getElementById("result").innerText = `Corrected Calcium : ${corrected.toFixed(2)} mg/dL`;
        }
    }  
};
mainBtn.addEventListener("click", () => {
  rail.classList.toggle("open");
});
Naviitems.forEach(button =>{
    button.addEventListener('click',() => {
        const key = button.dataset.tool;
        const tool = tools[key];
        if(!tool) return;
        
        mainEl.innerHTML = `<h2>${tool.title}</h2>${tool.formHTML}`;

        mainEl.querySelectorAll("input , select").forEach(input => {
    input.addEventListener("input", tool.calculate);
});

Naviitems.forEach(b => b.classList.toggle("active", b === button));
        rail.classList.remove("open");
    
    });
});





  
