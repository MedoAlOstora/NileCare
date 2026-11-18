// Language switch (Arabic / English). The choice is remembered between pages.
(function(){
var KEY="nilecare-lang",lang="ar";
try{var saved=localStorage.getItem(KEY);if(saved==="en"||saved==="ar")lang=saved}catch(e){}
var btn=document.getElementById("lang");
function apply(){
document.documentElement.lang=lang;
document.documentElement.dir=lang==="ar"?"rtl":"ltr";
document.querySelectorAll("[data-en]").forEach(function(e){e.textContent=e.getAttribute("data-"+lang)});
btn.textContent=lang==="ar"?"English":"\u0639\u0631\u0628\u064a";
}
btn.addEventListener("click",function(){
lang=lang==="ar"?"en":"ar";
try{localStorage.setItem(KEY,lang)}catch(e){}
apply();
});
window.NileCare={apply:apply};
apply();
})();
