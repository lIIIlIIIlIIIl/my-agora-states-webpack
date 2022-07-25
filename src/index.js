const agoraStatesDiscussions = require ('./data.js').agoraStatesDiscussions;
require('./style.css');

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //first-div
  const img = document.createElement("img");
  img.className = 'discussion__avatar--image';
  img.src = obj.avatarUrl;
  img.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(img);

  // secound-div
  const sec_h2 = document.createElement('h2');
  sec_h2.className = 'discussion__title';

  const sec_a = document.createElement('a');
  sec_a.href = obj.url;
  sec_a.textContent = obj.title;
  sec_h2.append(sec_a);

  const sec_pre_story = document.createElement('pre');
  sec_pre_story.className = 'discussion__story';
  sec_pre_story.textContent = obj.story;

  const sec_div = document.createElement('div');
  sec_div.className = "discussion__information";
  sec_div.textContent = `${obj.author} / ${obj.createdAt}`;

  discussionContent.append(sec_h2, sec_pre_story, sec_div);


  // third-div
  const third_input = document.createElement('input');
  third_input.type = 'checkbox';
  discussionAnswered.append(third_input);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
// render(ul);


// Make Items
// 디스커션 추가 기능


// input에 내용을 작성 한 후 버튼을 누름
// 안에 있는 정보가 data에 들어감.
// agoraStatesDiscussions는 array ----> object로 만들어서  앞에다가 push해줘야함.

const input_name = document.querySelector('#name');
const input_title = document.querySelector('#title');
const input_story = document.querySelector('#story');
const button = document.querySelector('#button');
const message__name = document.querySelector('#mesaage__name');
const message__title = document.querySelector('#message__title');
const message__story = document.querySelector('#message__story');


const baseURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";


const reset = function(){
  input_name.value = '';
  input_story.value = '';
  input_title.value = '';
}


button.addEventListener('click',function(e){
  e.preventDefault();

  const makeData = {
    avatarUrl : `${baseURL}${Math.floor(Math.random() * 300)}.png`,
    author : input_name.value,
    createdAt : new Date(new Date().getTime()).toLocaleString(),
    title : input_title.value,
    story : input_story.value
    };

    if(input_name.value.length < 3){
      input_name.focus();
      message__name.classList.remove('hide');
    } else if(input_title.value.length === 0){
      input_title.focus();
      message__title.classList.remove('hide');
    } else if(input_story.value.length < 10){
      input_story.focus();
      message__story.classList.remove('hide');
    } 
    else{
      agoraStatesDiscussions.unshift(makeData);
      const addLi = convertToDiscussion(agoraStatesDiscussions[0]);
      ul.prepend(addLi);
      saveQuestion();
      reset();

      DisplayList(agoraStatesDiscussions, ul, rows, 1);
      const current_btn = document.querySelectorAll('#pagination button');
      for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }
      current_btn[0].classList.add('active');
    }


});

input_name.addEventListener('keyup',()=>{
  input_name.value.length < 3 && input_name.value.length > 0 ? message__name.classList.remove('hide') : message__name.classList.add('hide')
})

input_title.addEventListener('keyup',()=>{
  input_title.value.length < 5 && input_title.value.length > 0 ? message__title.classList.remove('hide') : message__title.classList.add('hide')
})

input_story.addEventListener('keyup',()=>{
  input_story.value.length < 10 && input_story.value.length > 0 ? message__story.classList.remove('hide') : message__story.classList.add('hide')
})


// Pagination


const pagination_element = document.querySelector('#pagination');

let current_page = 1;
const rows = 10;

const DisplayList = (items, wrapper, rows_per_page, page)=>{
    wrapper.innerHTML = "";
    page--;

    const start = rows_per_page * page;
    const end = start + rows_per_page;
    const paginatedItems = items.slice(start, end);

    for(let i=0; i < paginatedItems.length; i++){
        
        const item = paginatedItems[i];

        const item_element = convertToDiscussion(item);
        
        wrapper.appendChild(item_element);

    }
}

const setupPagination = (items, wrapper, rows_per_page) => {
    wrapper.innerHTML = "";
    const page_count = Math.ceil(items.length / rows_per_page);
    
    for(let i=1; i < page_count +1; i++){
        const btn = paginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

const paginationButton = (page, items) => {
    const button = document.createElement('button');
    button.textContent = page;
    
    if(current_page === page) button.classList.add('active');

    button.addEventListener('click', function(){
        current_page = page;
        DisplayList(items, ul, rows, current_page);

        const current_btn = document.querySelector('#pagination button.active');
        current_btn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}

const leftBtn = document.querySelector('#left__btn');
const rightBtn = document.querySelector('#right__btn');

leftBtn.addEventListener('click', () => {
    current_page--;
    if(current_page < 1){
        current_page = 1;
    }
    DisplayList(agoraStatesDiscussions, ul, rows, current_page);


    const current_btn = document.querySelectorAll('#pagination button');
    for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }

    current_btn[current_page-1].classList.add('active');


})

rightBtn.addEventListener('click', () => {
    const current_btn = document.querySelectorAll('#pagination button');

    current_page++;
    if(current_page > current_btn.length){
        current_page = current_btn.length;
    }
    DisplayList(agoraStatesDiscussions, ul, rows, current_page);


    for(let i=0; i<current_btn.length; i++){
        current_btn[i].classList.remove('active');
      }

    current_btn[current_page-1].classList.add('active');
})


DisplayList(agoraStatesDiscussions, ul, rows, current_page);
setupPagination(agoraStatesDiscussions, pagination_element, rows);

// Save Local

const question__KEY = "question";

// lacalstorage에 저장하기 ---> 저장할 때 string으로 저장해야하기 때문에 객체를 문자열로 바꾸는 과정 필요
const saveQuestion = () => {
    localStorage.setItem(question__KEY, JSON.stringify(agoraStatesDiscussions));
}

// lacalstorage에 저장된 내용을 불러오기
const savedQuestion = localStorage.getItem(question__KEY);

// lacalstorage에서 불러온 문자열을 다시 객체로 바꾸기
// lacalstorage에 저장된 내용이 비어있다면, null을 반환하기 때문에 if문을 사용
if(savedQuestion){
    const parsedQuestion = JSON.parse(savedQuestion);
    agoraStatesDiscussions = parsedQuestion;
    parsedQuestion.forEach(element => {
        DisplayList(parsedQuestion, ul, rows, current_page);
    });
}



// localstorage에서 저장된 내용을 가져오기 ---> localStorage.getItem()
// array, object를 string으로 바꾸기 --> JSON.stringify()
// string을 array로 바꾸기 ---> JSON.parse()
// forEach는 array의 각 item에 대해 function을 실행하게 해준다.

