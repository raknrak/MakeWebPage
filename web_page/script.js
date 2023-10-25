// text-iife(정의와 동시에 실행되는 함수)
//텍스트 타이핑 효과구현

//span 요소 노드 가져오기
(function(){
    const spanEl = document.querySelector("main h2 span");

//화면에 표시할 문장 배열
const txtArr = ['Web Publisher', 'Front-End Developer', 'Web UI Designer', 'UX Designer', 'Back-End Developer'];

//배열의 인덱스 초기값
let index = 0;

//화면에 표시할 분장 배열에서 요소를하나 가져온 뒤, 배열로 만들기
//currentTxt변수에 할당된 배열 요소를 앞에서부터 한 개씩 출력하기
//한 글짜식 작성되는 것처럼 보임
//split()메소드로 문장을 문자 단위로("")쪼개서 배열로 만든 뒤 currentTxt 변수에 할당
let currentTxt = txtArr[index].split("");

//writeTxt()함수를 만들어서 배열 요소를 한 개씩 출력하기
function writeTxt(){ //텍스트 출력

    //배열의 요소를 앞에서부터 한 개씩 출력할 때 shift()메소드 사용
    //배열의 맨 앞 요소출 추출하고, 추출 요소를 배열에서 삭제함
    spanEl.textContent  += currentTxt.shift(); 

    //배열의길이가 0이 아니라면 writeTxt함수를 반복 호출
    if(currentTxt.length !== 0){ 

      //일정 시간이 흐른 뒤 write() 함수호출
        setTimeout(writeTxt, Math.floor(Math.random() * 100)); //글자 속도 매번 달라짐
    }else{//currentTxt배열이 빈 상태에서 else 실행(모든 텍스트가 화면에 출력됨)
        
      //화면에 표시된 텍스트를 split()메소드로 다시 단어 위로 분리해 배열에 할당
        currentTxt = spanEl.textContent.split("");
        setTimeout(deleteTxt, 3000);//3초 뒤에 텍스트를 지움
    }
}
function deleteTxt(){//텍스트 삭제

  //pop()메소드로 배열 요소를 끝에서부터 한 개씩 삭제     
  currentTxt.pop();

  //join()메소드로 현재 배열에 있는 요소를 하나의 문자열로 합침
  //문자열에 span요소의 텍스트로 할당
  //한 글자가 삭제된 것처럼 보임
  spanEl.textContent = currentTxt.join("");

  //currentTXT 변수에 할당된 배열이 비어있는지 확인
  if(currentTxt.length !== 0){
    //값이 남아 있으면 다시 deleteTxt() 함수 호출
    setTimeout(deleteTxt, Math.floor(Math.random() * 100))//호출 시간 무작위 설정
  }else{//모든 배열이 삭제되면 else 실행

    //숫자를 1증가시키는 이유는 순자가 문장이 담긴 배열(txtArr)의 길이를 넘지 않게 하기 위해서
    //1을 증가시키면 새로운 문장을 가져옴
    index = (index + 1) % txtArr.length;
    //currentTxt변수에 배열 할당
    currentTxt = txtArr[index].split("");
    writeTxt();//메소드를 호출하여 무한 반목
  }
}
writeTxt();
})(); //즉시 실행되는 함수로 감싸기
//텍스트 타이핑 효과 개선
// end text-iife

// Scroll

// 스크롤을 아래로 내리면 CSS header태그에 active 클래스 추가 및 삭제
const headerEl = document.querySelector("header");
window.addEventListener('scroll', function(){
  //스크롤을 하면 이벤트가 계속 발생하므로 requestAnimationFrame() 메소드로 스크롤 이벤트 최적화
  requestAnimationFrame(scrollCheck);
});
function scrollCheck(){
  //스크롤 위치는 window 객체의 pageYoffset 속성으로 참조
  let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
  if(browerScrollY > 0){
    //속성값이 0보다 크면 스크롤됐다고 볼 수 있으므로 이를 조건으로 active클래스를 추가하거나 삭제
    headerEl.classList.add("active");
  }else{
    headerEl.classList.remove("active");
  }
}
//end Scroll

// Move
// 애니메이션 스크롤 이동
const animationMove = function(selector){

    //selector 매개변수로 이동할 대상 요소 노드 가져오기
    const targetEl = document.querySelector(selector);

    //현재 웹 브라우저의 스크롤 정보 Y값
    const browserScrollY = window.pageYOffset;

    //이동할 위치 Y값
    const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;

    //scrollTo() 메소드에 behavior 속성을 사용하면 애니메이션 효과를 적용하여 스크롤을 부드럽게 이동할 수 있음
    window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
};

//스크롤 이벤트 연결
// data-target속성으로 animation-Scroll과 target속성
const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']"); 
for(let i = 0; i < scollMoveEl.length; i++){
  scollMoveEl[i].addEventListener('click', function(e){
    const target = this.dataset.target;
    animationMove(target);
  });
}
/* end Move */