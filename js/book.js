// Booking form: validation, then send to Google Sheet through Apps Script.
(function(){
var f=document.getElementById("bookForm"),st=document.getElementById("bookStatus"),bd=document.getElementById("bDate");
bd.min=new Date().toISOString().slice(0,10);
function digits(x){return x.replace(/[\u0660-\u0669]/g,function(c){return c.charCodeAt(0)-1632})}
var rules={
name:function(v){return v.trim().length>=3},
mobile:function(v){return /^01[0125][0-9]{8}$/.test(digits(v.trim()))},
department:function(v){return v!==""},
date:function(v){return v!==""&&v>=bd.min},
source:function(){return !!f.querySelector('input[name="source"]:checked')}
};
function check(k){
var ok=rules[k](k==="source"?"":f.elements[k].value);
document.getElementById(k+"Err").hidden=ok;
if(k!=="source")f.elements[k].setAttribute("aria-invalid",ok?"false":"true");
return ok;
}
function say(en,ar,bad){
st.setAttribute("data-en",en);st.setAttribute("data-ar",ar);
st.hidden=false;st.className=bad?"note bad":"note";NileCare.apply();
}
function live(e){var k=e.target.name;if(rules[k]&&!document.getElementById(k+"Err").hidden)check(k)}
f.addEventListener("input",live);f.addEventListener("change",live);
f.addEventListener("submit",function(e){
e.preventDefault();
var ok=true;
Object.keys(rules).forEach(function(k){if(!check(k))ok=false});
if(!ok){
say("Please fix the highlighted fields.","صحّح الحقول المعلّمة.",true);
var bad=f.querySelector('[aria-invalid="true"]');if(bad)bad.focus();
return;
}
if(NILECARE_SCRIPT_URL.indexOf("PASTE")===0){
say("The form is valid, but the Google Sheet link is not set yet.","الفورم سليم، بس لينك الجوجل شيت لسه متحطّش.",true);
return;
}
var src=f.querySelector('input[name="source"]:checked').value;
var body=new URLSearchParams({name:f.elements["name"].value.trim(),mobile:digits(f.elements["mobile"].value.trim()),department:f.elements["department"].value,date:f.elements["date"].value,source:src});
var b=document.getElementById("bookBtn");b.disabled=true;
fetch(NILECARE_SCRIPT_URL,{method:"POST",mode:"no-cors",body:body}).then(function(){
say("Booked. The reception team will call you to confirm.","تم الحجز. الاستقبال هيكلمك يأكد.",false);
f.reset();
}).catch(function(){
say("Could not send. Check your connection and try again.","الإرسال فشل. اتأكد من النت وجرّب تاني.",true);
}).then(function(){b.disabled=false});
});

})();
