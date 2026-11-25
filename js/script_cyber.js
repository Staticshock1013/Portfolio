// Calculator functions
let calcInput = '0';
function appendNumber(num) {
  if (calcInput === '0' && num !== '.') calcInput = '';
  if (num === '.' && calcInput.includes('.')) return;
  calcInput += num;
  updateCalcDisplay();
}
function appendOperator(op) {
  if (calcInput === '') return;
  if (['+', '-', '/', '*'].some(o => calcInput.endsWith(o))) {
    calcInput = calcInput.slice(0, -1);
  }
  calcInput += op;
  updateCalcDisplay();
}
function clearCalc() {
  calcInput = '0';
  updateCalcDisplay();
}
function deleteChar() {
  calcInput = calcInput.slice(0, -1) || '0';
  updateCalcDisplay();
}
function calculateResult() {
  try {
    calcInput = String(eval(calcInput));
    if (calcInput === 'Infinity' || calcInput === 'NaN') calcInput = 'Error';
  } catch {
    calcInput = 'Error';
  }
  updateCalcDisplay();
}
function updateCalcDisplay() {
  const display = document.getElementById('calcDisplay');
  if (display) display.value = calcInput;
}

const projects = [
  {title: 'quant-lab', desc: 'Research-only NQ futures backtesting: pre-registered SPECs, no-lookahead engine, explicit NQ costs ($2.50/side), honest SPENT holdout labeling.', tags:['Python','pandas','pytest','CI'], link:'https://github.com/Staticshock1013/engineering-showcase/tree/main/projects/07-quant-lab'},
  {title: 'TerraTrend Global', desc: 'Streamlit geospatial MVP with authenticated NASA MODIS LST/NDVI samples, QC gates, and six-city coverage — period-level verified data only.', tags:['Python','Streamlit','NASA MODIS'], link:'https://github.com/Staticshock1013/engineering-showcase/tree/main/projects/06-terratrend-global'},
  {title: 'Engineering Showcase', desc: 'Monorepo of tested, documented projects aimed at ML / data / IT roles. Clone, run, review.', tags:['Python','GitHub Actions','Docs'], link:'https://github.com/Staticshock1013/engineering-showcase'}
];

function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  projects.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><div>${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}<div style="margin-top:10px"><a class="btn" href="${p.link}" target="_blank" rel="noopener">View on GitHub</a></div>`;
    grid.appendChild(el);
  });
}

function handleContact(e){
  e.preventDefault();
  const f = e.target;
  const subject = encodeURIComponent('Portfolio contact from ' + f.name.value);
  const body = encodeURIComponent(f.message.value + '\n\n— ' + f.name.value + ' <' + f.email.value + '>');
  window.location.href = 'mailto:Denzellr96@gmail.com?subject=' + subject + '&body=' + body;
}

// tiny terminal typer
const phrases = ['building: quant-lab', 'shipping: terratrend', 'testing: pytest + CI', 'target: ML / Python roles'];
let idx = 0; let pidx = 0;
function typeLoop(){
  const el = document.getElementById('typer');
  if(!el) return;
  const txt = phrases[idx];
  if(pidx <= txt.length){
    el.textContent = txt.slice(0,pidx);
    pidx++;
    setTimeout(typeLoop, 80);
  } else {
    setTimeout(()=>{pidx=0; idx = (idx+1)%phrases.length; typeLoop();}, 900);
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
renderProjects();
setTimeout(typeLoop,400);

// theme toggle: switch body class to light for quick preview
const tbtn = document.getElementById('themeToggle');
if(tbtn){
  tbtn.addEventListener('click', ()=>{
    document.body.classList.toggle('light');
    tbtn.textContent = document.body.classList.contains('light') ? 'DARK' : 'LIGHT';
  });
}