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
  {title: 'Trade Journal (In Progress)', desc: 'Web app to track trading performance using JS calculations and localStorage.', tags:['JavaScript','localStorage'], link:'https://github.com/Staticshock1013'},
  {title: 'Rock Paper Scissors', desc: 'Interactive browser game using JS and DOM manipulation. Deployed to GitHub Pages.', tags:['JavaScript','DOM'], link:'https://github.com/Staticshock1013'},
  {title: 'Responsive Landing Page', desc: 'Mobile-first landing page built with HTML, CSS, Bootstrap.', tags:['HTML','CSS','Bootstrap'], link:'https://github.com/Staticshock1013'}
];

function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  grid.innerHTML = '';
  projects.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><div>${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}<div style="margin-top:10px"><a class="btn" href="${p.link}" target="_blank">View</a> <a class="btn" href="${p.link}/archive/refs/heads/main.zip" target="_blank" style="margin-left:8px">Download</a></div>`;
    grid.appendChild(el);
  });
}

function handleContact(e){
  e.preventDefault();
  const f = e.target;
  alert('Thanks, '+f.name.value+'. I will reply to '+f.email.value+'.');
  f.reset();
}

// tiny terminal typer
const phrases = ['learning: C++', 'studying: data-structures', 'building: trade-journal', 'deploying: github-pages'];
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