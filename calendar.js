
const today = new Date();
let currentDate = new Date(today.getFullYear(),today.getMonth(),today.getDate())


function createMonth(date){
	const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	const monthCalendar = document.createElement("div");
	monthCalendar.classList.add("monthCalendar");
	monthCalendar.innerHTML =
		`<div class="monthCalendar_label">
		<h2 class="month">${date.toLocaleDateString("en-US",{month:"long"})}</h2>
		<h2 class="year">${date.getFullYear()}</h2>` +
		weekdays.map(day => `<h3>${day}</h3>` ).join('') +
		`</div>
		<div class="monthCalendar_dates"></div>`;
	document.body.appendChild(monthCalendar);
	createDays(date);
	month_year(0,0,12);
	month_year(1,2000,2031);
}


function createDays(date){
	const calendargrid = document.getElementsByClassName("monthCalendar_dates")[0];
	let selectedMonth = new Date(date.getFullYear(),date.getMonth(),1);
	if(selectedMonth.getDay() > 0){
		for (let empty = 0; empty<selectedMonth.getDay(); empty++){
			const emptydate = document.createElement("h4");
			calendargrid.appendChild(emptydate);
		}
	}
	for(let day = 1; day<=countMonthDays(date); day++){
		const thisday = document.createElement("h4");
		thisday.className = "date-numbers";
		thisday.innerText = day;
		calendargrid.appendChild(thisday);
		thisday.addEventListener("click",()=>{
			selectDay();
			thisday.style.color = "green";
		});
	}
}


function countMonthDays(date){
	let totaldays = date.getDate();
	let datecount = date;
	while(datecount.getMonth() === date.getMonth()){
		totaldays += 1;
		datecount = new Date(datecount.getFullYear(),datecount.getMonth(),totaldays);
	}
	return totaldays-1;
}


function selectDay(){
	const dates = document.querySelectorAll(".date-numbers");
	for(let d = 0; d < dates.length; d++){
		dates[d].style.color = "black";
	}
	if(currentDate.getFullYear() === new Date().getFullYear() && currentDate.getMonth() === new Date().getMonth()){
		dates[currentDate.getDate()-1].style.color = "orange";
	}
}


function month_year(t,inicio,fim){ // t=0 is month ; t=1 is year
	const calendar = document.getElementsByClassName("monthCalendar_label")[0];
	let month_generator = new Date(today.getFullYear(),0);
	let elemento = document.createElement("select");
	if(t === 0){
		elemento.className = "monthlist";
	}else{
		elemento.className = "yearlist";
	}
	const nullitem = document.createElement("option");
	elemento.appendChild(nullitem);

	for(let i=inicio; i<fim; i++){
		const item = document.createElement("option");
		item.value = i;
		if(t === 0){
			item.innerText = month_generator.toLocaleDateString("en-US",{month:"long"});
			month_generator.setMonth(month_generator.getMonth()+1);
		}else{
			item.innerText = item.value;
		}
		elemento.appendChild(item);
	}
	calendar.appendChild(elemento);
	change_month_year(t);
}

function change_month_year(x){
	const month_yearSelect = document.querySelectorAll("select");
	month_yearSelect[x].addEventListener("change",()=>{
		var index = month_yearSelect[x].selectedIndex;
		var opt = month_yearSelect[x].options;
		document.getElementsByClassName("monthCalendar")[0].remove();
		if(x == 0){ // M
			currentDate.setMonth(opt[index].value);
			executingCalendar();
		}else{ // Y
			currentDate.setYear(opt[index].value);
			executingCalendar();
		}
	});
}


const executingCalendar = (data_atual=currentDate) => {
	createMonth(data_atual);
	selectDay();
}


executingCalendar();



/*
function myFunction() {
  var x = document.getElementById("mySelect").selectedIndex;
  var y = document.getElementById("mySelect").options;
  alert("Index: " + y[x].index + " is " + y[x].text);
}
*/
// NAO POSSI
// MES ATUAL 

