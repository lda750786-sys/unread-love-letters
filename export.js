'use strict';
(() => {
  if (/^#chapter-(?:[1-9]|[1-4][0-9]|50)$/.test(location.hash)) document.getElementById('reader').hash=location.hash;
  const progress = {};
  for (const key of ['knownWords','againWords','doneChapters','lastChapter','quizProgressV1','dark']) {
    try {const data=JSON.parse(localStorage.getItem(key)); if (data !== null) progress[key]=data;} catch {}
  }
  if (!Object.keys(progress).some(k => k !== 'dark')) return;
  document.getElementById('export-panel').hidden = false;
  document.getElementById('download').onclick = () => {
    const data = new Blob([JSON.stringify({format:'unread-love-letters-progress',version:1,progress})],{type:'application/json'});
    const url=URL.createObjectURL(data), link=document.createElement('a');
    link.href=url; link.download='未读情书-阅读进度.json';
    document.body.append(link); link.click(); link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),30000);
  };
})();
