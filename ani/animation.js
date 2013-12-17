//timeline-min.js에서 받아온 slide_num 변수와 동기화할 변수 / 코드 무한실행을 피하기 위해, slide_num 변수가 바뀔때만 특정 함수를 실행
var current_num;
//컨테이너의 높이 값을 받아옴
var aniHeight;
//컨테이너 배경을 바꿔주기 위해 클래스를 받음
var container;
//캐릭터 위치 및 프레임 제어용 변수
var g;
var imgChar = new Image();
imgChar.src = "ani/char.png";
var character = {};
var x=0;
var y=0;
var frameX=0;
var frameY=0;

var loop = function(){
	//slide_num 변동 체크 및 동기화
	if(current_num!=slide_num){	
		current_num=slide_num;
	}
	//컨테이너 생성시 백그라운드 생성 및 제어
	if(container[0]!=undefined){
		//백그라운드 생성
		if(container[0].childNodes.length<2){
			charSet();
			var bg = document.createElement('div');
			bg.id="ani-box";
			bg.style.height=aniHeight+15+"px";
			bg.style.background="-webkit-linear-gradient(top, #54d9ff 0%,#ffffff 100%)";
			container[0].appendChild(bg);
			var ch = document.createElement('canvas');
			g = ch.getContext("2d");
			ch.width=48;
			ch.height=48;
			ch.id="ani-char";
			ch.style.top=aniHeight-33+"px";
			ch.style.left=(current_num/22)*100+"%";
			ch.style.width=48+"px";
			ch.style.height=48+"px";
			container[0].appendChild(ch);
		//백그라운드 제어
		} else {
			charSet();
			//지속적으로 백그라운드 높이 동기화
			container[0].childNodes[1].style.height=aniHeight+15+"px";
			//캐릭터 위치 동기화 (x는 지속적으로 변하는 character.x의 값을 향해 따라감)
			x = x+(character.x-x)*0.02;
			container[0].childNodes[2].style.left=x*0.65+"%";
			//브라우져 크기가 바뀌면 캐릭터 위치도 바뀜
			container[0].childNodes[2].style.top=character.y-y+"px";
			//캐릭터 회전값
			if(character.x-x>=0)
				container[0].childNodes[2].style["-webkit-transform"]="rotateY(0deg)";
			else
				container[0].childNodes[2].style["-webkit-transform"]="rotateY(180deg)";
			//캐릭터 애니메이션 제어
			g.clearRect(0, 0, 48, 48);
			frameX += 0.05;
			if(current_num<1){
				if(Math.floor(frameX)>=4) {
					frameX=0;
					if(frameY>0)
						frameY--;
					else
						frameY=0;
				}
			} else if(current_num==1){
				if(frameY<1)
					frameY=1;
				if(Math.floor(frameX)>=4){
					frameX=0;
					if(frameY<1)
						frameY++;
					else if(frameY>1)
						frameY--;
					else
						frameY=1;
				}
			} else if(current_num>=2 && current_num<17){
				if(Math.floor(frameX)>=4){
					frameX=0;
					if(frameY<2)
						frameY++;
					else if(frameY>2)
						frameY--;
					else
						frameY=2;
				}
			} else if(current_num>=17 && current_num<22){
				if(Math.floor(frameX)>=4){
					frameX=0;
					if(frameY<1)
						frameY++;
					else if(frameY>1)
						frameY--;
					else
						frameY=1;
				}
			} else {
				if(Math.floor(frameX)>=4) {
					frameX=0;
					if(frameY>0)
						frameY--;
					else
						frameY=0;
				}
			}
			g.drawImage(imgChar, Math.floor(frameX)*48, Math.floor(frameY)*48, 48, 48, 0, 0, 48, 48);

			//블록 추가&제어
			if(container[0].childNodes.length<6){
				var block1 = document.createElement('div');
				block1.innerHTML="<div id=\"block-canvas\" class=\"block\">canvas</div>";
				block1.className="block-div";
				container[0].appendChild(block1);
				var block2 = document.createElement('div');
				block2.innerHTML="<div id=\"block-javascript\" class=\"block\">javascript</div>";
				block2.className="block-div";
				container[0].appendChild(block2);
				var block3 = document.createElement('div');
				block3.innerHTML="<div id=\"block-css\" class=\"block\">css</div>";
				block3.className="block-div";
				container[0].appendChild(block3);
				var block4 = document.createElement('div');
				block4.innerHTML="<div id=\"block-html\" class=\"block\">html</div>";
				block4.className="block-div";
				container[0].appendChild(block4);
			}
			
			if(current_num<5){
				y=0;
				container[0].childNodes[3].childNodes[0].style.opacity=0;
				container[0].childNodes[4].childNodes[0].style.opacity=0;
				container[0].childNodes[5].childNodes[0].style.opacity=0;
				container[0].childNodes[6].childNodes[0].style.opacity=0;
			} else if(current_num>=5 && current_num<7){
				y=16;
				container[0].childNodes[3].childNodes[0].style.opacity=1;
				container[0].childNodes[4].childNodes[0].style.opacity=0;
				container[0].childNodes[5].childNodes[0].style.opacity=0;
				container[0].childNodes[6].childNodes[0].style.opacity=0;
			} else if(current_num>=7 && current_num<21){
				y=32;
				container[0].childNodes[3].childNodes[0].style.opacity=1;
				container[0].childNodes[4].childNodes[0].style.opacity=1;
				container[0].childNodes[5].childNodes[0].style.opacity=0;
				container[0].childNodes[6].childNodes[0].style.opacity=0;
			} else if(current_num==21){
				y=48;
				container[0].childNodes[3].childNodes[0].style.opacity=1;
				container[0].childNodes[4].childNodes[0].style.opacity=1;
				container[0].childNodes[5].childNodes[0].style.opacity=1;
				container[0].childNodes[6].childNodes[0].style.opacity=0;
			} else {
				y=64;
				container[0].childNodes[3].childNodes[0].style.opacity=1;
				container[0].childNodes[4].childNodes[0].style.opacity=1;
				container[0].childNodes[5].childNodes[0].style.opacity=1;
				container[0].childNodes[6].childNodes[0].style.opacity=1;
			}
			container[0].childNodes[3].style.top=aniHeight-2+"px";
			container[0].childNodes[3].style.left=x*0.65+"%";
			container[0].childNodes[4].style.top=aniHeight-18+"px";
			container[0].childNodes[4].style.left=x*0.65+"%";
			container[0].childNodes[5].style.top=aniHeight-34+"px";
			container[0].childNodes[5].style.left=x*0.65+"%";
			container[0].childNodes[6].style.top=aniHeight-50+"px";
			container[0].childNodes[6].style.left=x*0.65+"%";
		}
	}

	requestAnimationFrame(loop);
}
var charSet = function(){
	var obj={};
	obj.x=(current_num/22)*100;
	obj.y=aniHeight-33;
	character=obj;
}

var init = function(){
	container = document.getElementsByClassName("slider-container-mask");
	loop();
}

window.onload = function(){
	init();
}