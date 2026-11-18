// Login page (demo only: no real accounts yet).
var pw=document.getElementById("p");
document.getElementById("showPw").addEventListener("change",function(e){pw.type=e.target.checked?"text":"password"});
document.getElementById("loginForm").addEventListener("submit",function(e){
e.preventDefault();
document.getElementById("loginMsg").hidden=false;
});
