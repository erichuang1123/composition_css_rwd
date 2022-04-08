const menuBtn = document.querySelector('.menu_btn');
const headerUl = document.querySelector('.main_header ul');
const closeBtn = document.querySelector('.close_btn');
const iconBtn = document.querySelector('.main_header .icon_btn');
const iconWrap = document.querySelector('.header_wrap .icon_wrap');
const coachesPage = [...document.querySelectorAll('.section_coaches .page')];
const coachesItem = [...document.querySelectorAll('.section_coaches .coaches_item')];
let menuActive = false;
let iconActive = false;
let coachesIndex = 0;
function openFn(){
    menuActive = !menuActive;
    if(menuActive){
        headerUl.classList.add('active');
        closeBtn.classList.add('active');
    }else{
        headerUl.classList.remove('active');
        closeBtn.classList.remove('active');
    }
}
menuBtn.addEventListener('click',openFn);
closeBtn.addEventListener('click',openFn);
iconBtn.addEventListener('click',function(){
    iconActive = !iconActive;
    if(iconActive){
        iconWrap.classList.add('active');
    }else{
        iconWrap.classList.remove('active');
    }
});
// let arr = ['0%','-125%','-250%','-375%','-500%'];
coachesPage.forEach((e,index)=>{
    e.addEventListener('click',function(){
        coachesIndex = index;
        // coachesItem.forEach(e=>{
            // e.style.WebkitTransform= `translate(${arr[coachesIndex]})`;
        // })
        coachesPage.forEach(e=>{
            e.classList.remove('active');
        })
        coachesPage[coachesIndex].classList.add('active');
    })
})