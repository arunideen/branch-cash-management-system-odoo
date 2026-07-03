/* ==========================================================================
   BCMS — Odoo 19 CE mockups · shared web-client shell + light interactivity
   No dependencies, no build step.
   ========================================================================== */
const ICON = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chat:'<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/>',
  caret:'<path d="m6 9 6 6 6-6"/>',
  left:'<path d="m15 18-6-6 6-6"/>', right:'<path d="m9 18 6-6-6-6"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  kanban:'<rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="11" rx="1"/>',
  form:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  pivot:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 3v18"/>',
  graph:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  print:'<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  paperclip:'<path d="M21 8.5 12 17.5a4 4 0 0 1-6-6l8.5-8.5a2.5 2.5 0 0 1 4 4L10 15.5"/>',
  check:'<path d="M20 6 9 17l-5-5"/>', x:'<path d="M18 6 6 18M6 6l12 12"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.17V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.6 15H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6h.09A1.65 1.65 0 0 0 11 3.09V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.91 9H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  bank:'<path d="M3 21h18M5 18v-8M10 18v-8M14 18v-8M19 18v-8M12 3 3 8h18z"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
  alert:'<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  file:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>',
  receipt:'<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
  send:'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  db:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14a8 3 0 0 0 16 0V5"/><path d="M4 12a8 3 0 0 0 16 0"/>',
  activity:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
};
function svg(n,w){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${w?`style="width:${w}px;height:${w}px"`:''}>${ICON[n]||''}</svg>`;}

const MENUS = [
  ['dashboard','Dashboard','dashboard.html'],
  ['collections','Collections','my-requests.html'],
  ['cashier','Cashier','cashier-queue.html'],
  ['closing','Cash Closing','cash-closing.html'],
  ['approvals','Approvals','approvals.html'],
  ['deposits','Deposits','deposit.html'],
  ['accounting','Accounting','accounting.html'],
  ['reporting','Reporting','dashboard.html'],
  ['config','Configuration','masters.html'],
];

function buildNavbar(){
  const body=document.body;
  if(!body.classList.contains('o-app')) return;      // login / index opt out
  const active=body.dataset.menu||'';
  const user=body.dataset.user||'Priya Nair';
  const role=body.dataset.role||'Cashier';
  const initials=user.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const menuHtml=MENUS.map(m=>`<a href="${m[2]}" class="${m[0]===active?'active':''}">${m[1]}</a>`).join('');
  const nav=document.createElement('nav');
  nav.className='o-navbar';
  nav.innerHTML=`
    <a class="o-apps" href="index.html" title="Apps">${svg('grid')}</a>
    <div class="o-brand">${svg('cash',16)}<span class="brand-name">Branch&nbsp;Cash</span>${svg('caret',13)}</div>
    <div class="o-menu">${menuHtml}</div>
    <div class="o-systray">
      <div class="o-sys-btn" title="Activities">${svg('clock')}<span class="o-count">3</span></div>
      <div class="o-sys-btn" title="Messages">${svg('chat')}<span class="o-count">2</span></div>
      <div class="o-user"><div class="o-ava">${initials}</div><span class="o-uname">${user}</span>${svg('caret',12)}</div>
    </div>`;
  body.insertBefore(nav,body.firstChild);
}

/* Notebook tabs */
function wireNotebook(){
  document.querySelectorAll('[data-nb]').forEach(nb=>{
    nb.querySelectorAll('.o-nb-tabs button').forEach(btn=>btn.addEventListener('click',()=>{
      nb.querySelectorAll('.o-nb-tabs button').forEach(b=>b.classList.toggle('on',b===btn));
      nb.querySelectorAll('.o-nb-page').forEach(p=>p.classList.toggle('on',p.dataset.page===btn.dataset.tab));
    }));
  });
}
/* Chatter Send/Log toggle */
function wireChatter(){
  document.querySelectorAll('[data-chatter]').forEach(ch=>{
    ch.querySelectorAll('[data-cbtn]').forEach(btn=>btn.addEventListener('click',()=>{
      ch.querySelectorAll('[data-cbtn]').forEach(b=>b.classList.toggle('btn-secondary',b===btn));
      ch.querySelectorAll('[data-cbtn]').forEach(b=>b.classList.toggle('btn-link',b!==btn));
      const box=ch.querySelector('[data-cbox]');
      if(box) box.style.display=(btn.dataset.cbtn==='none')?'none':'block';
    }));
  });
}
/* Dialogs */
function wireDialogs(){
  document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();const d=document.getElementById(b.dataset.open);if(d)d.classList.add('open');}));
  document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('.o-dialog-ov').classList.remove('open')));
  document.querySelectorAll('.o-dialog-ov').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');}));
}
/* Payment-mode segmented control */
function wireMode(){
  const seg=document.querySelector('[data-mode-seg]');if(!seg)return;
  seg.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
    seg.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));
    const m=b.dataset.mode;
    document.querySelectorAll('[data-mode-panel]').forEach(p=>p.style.display=(p.dataset.modePanel===m||(m==='mixed'))?'':'none');
  }));
}
function inr(n){return '₹'+Math.round(n).toLocaleString('en-IN');}
/* Denomination + running total/variance */
function wireDenoms(){
  document.querySelectorAll('[data-denom]').forEach(box=>{
    const totalEl=box.querySelector('[data-denom-total]');
    const required=parseFloat(box.dataset.required||'0');
    const bar=box.dataset.bar?document.querySelector(box.dataset.bar):null;
    function calc(){
      let t=0;
      box.querySelectorAll('.denom').forEach(inp=>{
        const f=parseFloat(inp.dataset.face||'0'),c=parseInt(inp.value||'0',10)||0,s=f*c;t+=s;
        const se=inp.closest('tr').querySelector('[data-sub]');if(se)se.textContent=inr(s);
      });
      if(totalEl)totalEl.textContent=inr(t);
      box.querySelectorAll('[data-phys]').forEach(e=>e.textContent=inr(t));
      if(bar&&required){
        const ok=t===required;
        bar.querySelector('[data-bar-amt]').textContent=`${inr(t)} / ${inr(required)}`;
        const st=bar.querySelector('[data-bar-status]');
        if(st)st.textContent=ok?'Matched ✓':(t<required?'Short by '+inr(required-t):'Over by '+inr(t-required));
        const bd=bar.querySelector('[data-bar-badge]');
        if(bd){bd.className='o-badge '+(ok?'b-success':'b-warning');bd.innerHTML=`<span class="dot"></span>${ok?'Matched':'Not matched'}`;}
        document.querySelectorAll('[data-need-match]').forEach(b=>b.classList.toggle('disabled',!ok));
      }
      const varBox=box.dataset.expected?document.querySelector('[data-variance]'):null;
      if(varBox){
        const exp=parseFloat(varBox.dataset.expected||'0');const v=t-exp;
        const va=varBox.querySelector('[data-var-amt]');if(va)va.textContent=(v>=0?'+':'−')+inr(Math.abs(v));
        const vb=varBox.querySelector('[data-var-badge]');
        if(vb){vb.className='o-badge '+(v===0?'b-success':'b-danger');vb.innerHTML=`<span class="dot"></span>${v===0?'Balanced':'Variance'}`;}
        const rr=document.querySelector('[data-var-reason]');if(rr)rr.style.display=v===0?'none':'';
      }
    }
    box.querySelectorAll('.denom').forEach(i=>i.addEventListener('input',calc));
    calc();
  });
}
document.addEventListener('DOMContentLoaded',()=>{buildNavbar();wireNotebook();wireChatter();wireDialogs();wireMode();wireDenoms();
  document.querySelectorAll('[data-svg]').forEach(el=>el.innerHTML=svg(el.dataset.svg)+el.innerHTML);
});
