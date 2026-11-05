console.log("jede to");

var vyluka = [];
var preslo_ich = 0;

window.addEventListener('resize', function(event){
	reloadVrstvaPod();
});

function reloadVrstvaPod() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			evalReloadVrstvaPod(this);
		}
	};
	xmlhttp.open("GET", "photos.xml", true);
	xmlhttp.send();
}
function evalReloadVrstvaPod(xml) {
	var i;
	var xmlDoc = xml.responseXML;
	var x = xmlDoc.getElementsByTagName("photo");
	var table="<table><tr>";
	vyluka = [];
	preslo_ich = 0;
	for (i = 0; i < x.length; i++) {
		if(document.getElementById("textInputFilter").value != "")
			if(!x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue.includes(document.getElementById("textInputFilter").value) && !x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue.includes(document.getElementById("textInputFilter").value)){
				vyluka.push(i);
				continue;
			}
		table += "<td>" + "<button onclick=\"reloadVrstvaNad("+String(i)+")\"><img class=\"sneakCls\" src=\"" +
		x[i].getElementsByTagName("src")[0].childNodes[0].nodeValue + "\"></button><br>" +
		"</td>";
		if((preslo_ich+1) % Math.floor($( window ).width() / 230) == 0){
			table += "</tr><tr>";
		}
		preslo_ich += 1;
	}
	table += "</tr></table><br><br><br>"
	document.getElementById("vrstvaPod").innerHTML = table;
}

function reloadVrstvaNad(state){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			evalReloadVrstvaNad(this, state);
		}
	};
	xmlhttp.open("GET", "photos.xml", true);
	xmlhttp.send();
}
function evalReloadVrstvaNad(xml, state) {
	document.getElementById("vrstvaNad").innerHTML = "";
	document.getElementById("vrstvaNad").style.display = "block";
	
	var i;
	var xmlDoc = xml.responseXML;
	var x = xmlDoc.getElementsByTagName("photo");
	var tbl = "<table table-layout=\"fixed\">";
	tbl += "<tr>";
	tbl += "<td><button onclick=\"autoplay()\">Auto</button></td>";
	tbl += "<td>" + x[state].getElementsByTagName("title")[0].childNodes[0].nodeValue + "</td>";
	tbl += "<td><button onclick=\"cleose()\">X</button></td>";
	tbl += "</tr>";
	tbl += "<tr>";
	tbl += "<td><button onclick=\"back("+x.length+", "+state+")\"><-</button></td>";
	tbl += "<td><img id=\"nadObrCls\" src=\""+x[state].getElementsByTagName("src")[0].childNodes[0].nodeValue+"\"</td>";
	tbl += "<td><button id=\"FH\" onclick=\"fore("+x.length+", "+state+")\">-></button></td>";
	tbl += "</tr>";
	tbl += "<tr>"
	tbl += "<td></td>";
	tbl += "<td width=\"1px\">" + x[state].getElementsByTagName("description")[0].childNodes[0].nodeValue +"</td>"
	tbl += "<td></td>";
	tbl += "</tr>"
	tbl += "</table>"
	
	document.getElementById("vrstvaNad").innerHTML = tbl;
}
ap = -1;
function apcore(){
	$("#FH").click();
}
function autoplay(){
	if(ap == -1){
		ap = setInterval(apcore, 2000);
	}
	else{
		clearInterval(ap);
		ap = -1;
	}
}
function cleose(){
	if(ap != -1){
		clearInterval(ap);
		ap = -1;
	}
	document.getElementById("vrstvaNad").innerHTML = "";
	document.getElementById("vrstvaNad").style.display = "none";
}
function back(max, state){
	state -= 1;
	if(state == -1) state = max-1;
	while(vyluka.includes(state)){
		state -= 1;
		if(state == -1) state = max-1;
	}
	reloadVrstvaNad(state);
}
function fore(max, state){
	state += 1;
	if(state == max) state = 0;
	while(vyluka.includes(state)){
		state += 1;
		if(state == max) state = 0;
	}
	reloadVrstvaNad(state);
}