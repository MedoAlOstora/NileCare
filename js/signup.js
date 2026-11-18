// Sign up page (demo only: validation, no real accounts yet).
(function(){
var f=document.getElementById("signupForm"),msg=document.getElementById("signupMsg");
function digits(x){return x.replace(/[\u0660-\u0669]/g,function(c){return c.charCodeAt(0)-1632})}
var rules={
sname:function(v){return v.trim().length>=3},
smobile:function(v){return /^01[0125][0-9]{8}$/.test(digits(v.trim()))},
spass:function(v){return v.length>=8},
sconfirm:function(v){return v!==""&&v===document.getElementById("spass").value}
};
function check(k){
var el=document.getElementById(k),ok=rules[k](el.value);
document.getElementById(k+"Err").hidden=ok;
el.setAttribute("aria-invalid",ok?"false":"true");
return ok;
}
f.addEventListener("input",function(e){var k=e.target.id;if(rules[k]&&!document.getElementById(k+"Err").hidden)check(k)});
f.addEventListener("submit",function(e){
e.preventDefault();
var ok=true;
Object.keys(rules).forEach(function(k){if(!check(k))ok=false});
msg.hidden=!ok;
if(!ok){var bad=f.querySelector('[aria-invalid="true"]');if(bad)bad.focus()}
});
})();
