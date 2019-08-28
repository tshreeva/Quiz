window.onload=function(){
	getQuizQuestion();
}
function getQuizQuestion(){
var xhttp=new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState===4 && this.status===200){
				var response=JSON.parse(this.responseText).results;
				onRenderQuiz(response);
			}else if(this.readyState===4){
				//error
			}
		};
	xhttp.open('get','https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple',true);
	xhttp.send();
}

function onRenderQuiz(data){
	var quiz='';
	data.forEach(function(value){
		quiz=quiz+'<div><div id="question">'+
		value.question+
'</div>'+
'<div id="answer">'+
	getAnswerList(value)+
'</div></div>'
	});
	document.getElementById('quizList').innerHTML=quiz;
}
function checkCorrectAnswer(answer,correct_answer){
if(answer==correct_answer){
	alert('ok')
}else{
	alert('not ok')
}
}
function getAnswerList(qList){
	var answer=qList.incorrect_answers;
	answer.push(qList.correct_answer);
	var answers=''
shuffle(answer).forEach(function(answer,key){
answers=answers+
'<div onclick="checkCorrectAnswer(\''+answer+'\',\''+qList.correct_answer+'\')">'+answer+'</div>';
});
return answers;
}
function shuffle(arra1){
	var ctr=arra1,length,temp,index;

	while(ctr>0){
		index=Math.floor(Math.random()*ctr);
		ctr--;
		temp=arra1[ctr];
		arra1[ctr]=arra1[index];
		arra1[index]=temp;
	}
	return arra1;
}