var publicurl = "http://127.0.0.1:8000/quiz/"
var createdQid;
function createquiz(){
		var postQ = {
			"name": $("#q-name").val(),
			"description": $("#description").val(),
		}
		console.log(postQ);
		$.ajax({
					  url:publicurl+"create_quiz/",
					  type:"POST",
					  contentType: "application/json",
					  data:JSON.stringify(postQ),
					  dataType: "json",
					  success: function(res){
					    document.getElementById("quest-card").style.display = "block";
					    document.getElementById("card-questions").style.display = "block";
					    createdQid = res["id"];
					  },
					  error: function(e) {
					    console.log(e);
					  },
					});
	}


var questcount = 0;
function createquest(){

	if(questcount<10){	
	var postQ = {
			"question": $("#question").val(),
			"mcq": $("#mcq").val().split(','),
			"answer": $("#answer").val().split(','),
		}
		$.ajax({
					  url:publicurl+"create_question/"+createdQid,
					  type:"POST",
					  contentType: "application/json",
					  data:JSON.stringify(postQ),
					  dataType: "json",
					  success: function(){
					    $("#quest-card input").val('');
					    getallquest();
					  },
					  error: function(e) {
					    console.log(e);
					  },
					});
		questcount=questcount+1;
	}
	else{
		alert("Only 10 questions can be added for a single Quiz");
	}

}	
var quesresp,renderquest,allquiz,renderquiz,indexQresp,renderindquest;
function getallquest(){
	
	$.ajax({
					  url:publicurl+"getallquestion/"+createdQid,
					  type:"GET",
					  contentType: "application/json",
					  dataType: "json",
					  success: function(res){
					  	$("#renderquest").empty();
					  	quesresp = res;
					  	renderquest = '';
					  	for (var i in quesresp){
					  		renderquest+='<div id = "questhere"><h4>'+quesresp[i]["question"]+'</h4><h5>Options :</h5>'
					  		for(var k in quesresp[i]["mcq"]){
					  			renderquest+='<p>'+quesresp[i]["mcq"][k]+'</p>';
					  		}
					  		renderquest +='<h5>Answers :</h5>'
					  		for(var t in quesresp[i]["answer"]){
					  			renderquest+='<p>'+quesresp[i]["answer"][t]+'</p>';
					  		}
					  		renderquest+='</div>'
					  		
					  	}
					  	$("#renderquest").append(renderquest)
					  }
					});
}

function getallindexquest(e){
	
	$.ajax({
					  url:publicurl+"getallquestion/"+e,
					  type:"GET",
					  contentType: "application/json",
					  dataType: "json",
					  success: function(res){
					  	$("#indexquest").empty();
					  	indexQresp = res;
					  	renderindquest = '';
					  	for (var i in indexQresp){
					  		renderindquest+='<div id = "questhere"><h4>'+indexQresp[i]["question"]+'</h4><h5>Options :</h5>'
					  		for(var k in indexQresp[i]["mcq"]){
					  			renderindquest+='<p>'+indexQresp[i]["mcq"][k]+'</p>';
					  		}
					  		renderindquest +='<h5>Answers :</h5>'
					  		for(var t in indexQresp[i]["answer"]){
					  			renderindquest+='<p>'+indexQresp[i]["answer"][t]+'</p>';
					  		}
					  		renderindquest+='</div>'
					  		
					  	}
					  	$("#indexquest").append(renderindquest)
					  }
					});
	document.getElementById("indexquestions").style.display = "block";
}
function closetab(){
	document.getElementById("indexquestions").style.display = "none";
}

function renderallquiz(){
	$("#allquiz").empty();
	$.ajax({
					  url:publicurl+"get_quiz/",
					  type:"GET",
					  contentType: "application/json",
					  dataType: "json",
					  success: function(res){
					  	allquiz = res;
					  	for(var i in allquiz){
					  		renderquiz = '';
					  		renderquiz+='<div class="card" qid="'+i+'" onclick="openquiz(this)">'
  							renderquiz+='<div class="container">'
    						renderquiz+='<h4><b>'+allquiz[i]["name"]+'</b></h4>' 
    						renderquiz+='<p>'+allquiz[i]["description"]+'</p></div></div>' 
    						$("#allquiz").append(renderquiz);
					  	}
					  }
					});
	

}


var quizid,getquizz,inquiz;
function openquiz(e){
	localStorage.setItem("quid",e.getAttribute("qid"));
	if(localStorage.getItem("quser") == "superadmin")
	{

	getallindexquest(e.getAttribute("qid"));
		}
		else{
	window.location.href = "../test/"
}
}

var qarray;
function getquiz(){
	$("#stquiz").empty();
	quizid = localStorage.getItem("quid");
	console.log(quizid);
	$.ajax({
					  url:publicurl+"get_quiz/",
					  type:"GET",
					  contentType: "application/json",
					  dataType: "json",
					  success: function(res){
					  	getquizz = res;
					  	qarray = getquizz[quizid]["prop"];
					  	inquiz = '';
					  		inquiz+='<div class="card" qid="'+quizid+'" >'
  							inquiz+='<div class="container">'
    						inquiz+='<h4><b>'+getquizz[quizid]["name"]+'</b></h4>' 
    						inquiz+='<p>'+getquizz[quizid]["description"]+'</p>'
    						inquiz+='<button onclick="startquiz()">Start Quiz</button></div></div>' 
    						$("#stquiz").append(inquiz);}
    					});

}

function startquiz(){
console.log(qarray[0]);
renderqcard(qarray[0]);
starttimer();
}

var questionrender;quesresp;qcount=0;
var answers;
function renderqcard(e){
	qcount=qcount+1;
	$("#question-card").empty()
	$.ajax({
					  url:publicurl+"getquestion/"+e,
					  type:"GET",
					  contentType: "application/json",
					  dataType: "json",
					  success: function(res){
					  	quesresp = res;
					  	console.log(quesresp)
					  	answers = quesresp["answer"];
					  	questionrender='';
					  	questionrender+='<div class="card" >'
  							questionrender+='<div class="container">'
    						questionrender+='<h4><b>'+quesresp["question"]+'</b></h4>'
    						for (var i in quesresp["mcq"]){
    							questionrender+='<p><input type="checkbox" onclick="answerval(this)" value="'+quesresp["mcq"][i]+'">'+quesresp["mcq"][i]+'</p>'
    						}
    						questionrender+='<div id="showanswers"> <p>Incorrect, the right Answers are:</p>';
    						 for (var i in quesresp["answer"]){
    							questionrender+='<p>'+quesresp["answer"][i]+'</p>'
    						}questionrender+='</div>';
    						questionrender+='<a class="subans" onclick="subquiz()">Submit Answer</a>'
    						questionrender+='<a class="nbut" id="nbut" onclick="nextquiz()">Next</a></div></div>' 
    						$("#question-card").append(questionrender);
					  }
					});

}

function nextquiz(){
	check = [];
	if(qcount < qarray.length){
		renderqcard(qarray[qcount]);
	}
	else{
			document.getElementById("nbut").style.display="none";
			document.getElementById("finish").style.display="block";
	}

}
var check = []
function answerval(el){
	check.push(el.getAttribute("value"))
	console.log(check);
}


var sec = 0;
var totaltime;
function pad(val) {
    return val > 9 ? val : "0" + val;
}
var timer;
function starttimer(){
 timer = setInterval(function () {
    document.getElementById("seconds").innerHTML = pad(++sec % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    totaltime =pad(parseInt(sec / 60, 10))+'m '+ pad(++sec % 60)+'s ';
}, 1000);

}
// setTimeout(function () {
//     clearInterval(timer);
// }, 11000);




var your_result;
var right = 0;
var wrong = 0;
function subquiz(){
	var flag = "true";
	check = check.sort();
	answers = answers.sort();
	if(check.length == answers.length){
			for (var i=0; i < answers.length; i++ ){
				if (check[i] !== answers[i]) {
	            alert("incorrect");
	            flag = "false";
	            wrong = wrong+1
	            document.getElementById("showanswers").style.display="block";
	            break
	         }
			}
	}
	else{
		alert("incorrect");
		document.getElementById("showanswers").style.display="block";
		flag = "false";
		wrong = wrong+1
	}
	if(flag=="true"){
		alert("correct");
		right =right+1;
	}
	
}

function finish(){
console.log(right,wrong,totaltime);
clearInterval(timer);	
var postQ = {
			"right": right,
			"wrong": wrong,
			"time":totaltime
		}
		console.log(postQ);
		$.ajax({
					  url:publicurl+"store_result/"+localStorage.getItem("quid")+"/"+localStorage.getItem("quser"),
					  type:"POST",
					  contentType: "application/json",
					  data:JSON.stringify(postQ),
					  dataType: "json",
					  success: function(res){
					  	$("#question-card").empty();
					  		console.log(res);
					  	$("#question-card").append('<table><tr><td>Correct Answers : '+res["right"]+'</td><td>Incorrect Answers : '+res["wrong"]+'</td><td>Time taken : '+res["time"]+'</td></tr></table>')	
					  	document.getElementById("finish").style.display="none";
					  	document.getElementById("back").style.display="block";	
					  }
					});
}



function back(){
	window.location.href="../index/";
}


window.onload = renderallquiz(),getquiz();