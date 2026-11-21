const $=id=>document.getElementById(id);
const today=new Date().toISOString().slice(0,10);
let tasks=JSON.parse(localStorage.getItem('thetaks_tasks')||'[]');
let filter='all';
const save=()=>localStorage.setItem('thetaks_tasks',JSON.stringify(tasks));
const dateLabel=new Intl.DateTimeFormat('id-ID',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
$('todayLabel').textContent=dateLabel.toUpperCase();
function render(){
 const visible=tasks.filter(t=>filter==='all'||(filter==='active'&&!t.done)||(filter==='done'&&t.done));
 const done=tasks.filter(t=>t.done).length, total=tasks.length, pct=total?Math.round(done/total*100):0;
 $('progressText').textContent=pct+'% completed';$('progressNumber').textContent=pct+'%';
 $('progressBar').style.width=pct+'%';$('doneCount').textContent=done+' selesai';$('leftCount').textContent=(total-done)+' tersisa';
 $('taskList').innerHTML='';
 $('emptyState').style.display=visible.length?'none':'block';
 visible.sort((a,b)=>(a.done-b.done)||((a.date||'').localeCompare(b.date||''))).forEach(t=>{
  const el=document.createElement('article');el.className='task-card'+(t.done?' done':'');
  const due=t.date?new Date(t.date+'T00:00:00').toLocaleDateString('id-ID',{day:'numeric',month:'short'}):'No deadline';
  el.innerHTML=`<button class="check" aria-label="Selesaikan tugas">${t.done?'✓':''}</button><div class="task-main"><div class="task-title"></div><div class="task-meta"><span>${t.category}</span><span>·</span><span>${due}</span><span class="priority ${t.priority}">${t.priority}</span></div></div><div class="task-actions"><button class="mini-btn edit" aria-label="Edit">✎</button><button class="mini-btn delete" aria-label="Hapus">×</button></div>`;
  el.querySelector('.task-title').textContent=t.title;
  el.querySelector('.check').onclick=()=>{t.done=!t.done;save();render()};
  el.querySelector('.edit').onclick=()=>openModal(t);
  el.querySelector('.delete').onclick=()=>{tasks=tasks.filter(x=>x.id!==t.id);save();render();toast('Task deleted')};
  $('taskList').appendChild(el);
 });
}
function openModal(task=null){
 $('taskForm').reset();$('editingId').value=task?.id||'';$('modalTitle').textContent=task?'Edit task':'New task';
 $('taskTitle').value=task?.title||'';$('taskCategory').value=task?.category||'Personal';
 $('taskPriority').value=task?.priority||'medium';$('taskDate').value=task?.date||today;
 $('modal').classList.add('open');setTimeout(()=>$('taskTitle').focus(),100);
}
function closeModal(){$('modal').classList.remove('open')}
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),1800)}
$('addBtn').onclick=()=>openModal();$('closeModal').onclick=closeModal;
$('modal').onclick=e=>{if(e.target===$('modal'))closeModal()};
$('taskForm').onsubmit=e=>{
 e.preventDefault();const id=$('editingId').value;
 const item={id:id||String(Date.now()),title:$('taskTitle').value.trim(),category:$('taskCategory').value,priority:$('taskPriority').value,date:$('taskDate').value,done:false};
 if(!item.title)return;
 if(id){const old=tasks.find(t=>t.id===id);item.done=old?.done||false;tasks=tasks.map(t=>t.id===id?item:t);toast('Task updated')}
 else{tasks.push(item);toast('Task added')}
 save();closeModal();render();
};
$('filters').onclick=e=>{const b=e.target.closest('[data-filter]');if(!b)return;filter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render()};
$('clearDone').onclick=()=>{tasks=tasks.filter(t=>!t.done);save();render();toast('Completed tasks cleared')};
$('themeBtn').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('thetaks_dark',document.body.classList.contains('dark'))};
if(localStorage.getItem('thetaks_dark')==='true')document.body.classList.add('dark');
$('allNav').onclick=()=>{filter='all';document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter==='all'));render();window.scrollTo({top:0,behavior:'smooth'})};
$('focusNav').onclick=()=>toast('Focus mode coming soon');
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
render();
