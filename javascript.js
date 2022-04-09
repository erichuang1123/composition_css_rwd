window.onload = function(){
    const menuBtn = document.querySelector('.menu_btn');
    const headerUl = document.querySelector('.main_header ul');
    const closeBtn = document.querySelector('.close_btn');
    const iconBtn = document.querySelector('.main_header .icon_btn');
    const iconWrap = document.querySelector('.header_wrap .icon_wrap');
    const coachesPage = [...document.querySelectorAll('.section_coaches .page')];
    const coachesItem = [...document.querySelectorAll('.section_coaches .coaches_item')];
    const coachesWrap = document.querySelector('.coaches_wrap');
    const coachesleft = document.querySelector('.section_coaches .rwd_control .left');
    const coachesRight = document.querySelector('.section_coaches .rwd_control .right');
    const clientsEvaluate = document.querySelectorAll('.clients_evaluate');
    const clientsPage = document.querySelectorAll('.section_clients .page');
    const clientsItem = document.querySelectorAll('.clients_item');
    coachesWrap.style.height = `${coachesItem[0].offsetHeight + 50}px`;
    let menuActive = false;
    let iconActive = false;
    // let coachesIndex = 0;
    let nowSize = window.innerWidth;
    //用來記前一個數字
    let prevNumber = {num : 0,clientsNum : 0,clientsNumRwd : 0};
    function resize(){
        nowSize = this.innerWidth;
        coachesWrap.style.height = `${coachesItem[0].offsetHeight + 75}px`;
    }
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
    function calculate(index,arr){
        let prev = 0;
        let next = 0;
        if(index + 1 < arr.length){
            next = index + 1;
        }else{
            next = 0;
        }
        if(index - 1 >= 0){
            prev = index - 1;
        }else{
            prev = arr.length - 1;
        }
        return {prev,next};
    }
    // (現在位置,要改的arr,前一個數字,點點的arr)
    function changeItem(index,arr,number,pageArr){
        idx = index;
        let {prev,next} = calculate(idx,arr);
        arr.forEach(e=>{
            e.classList.remove('prev');
            e.classList.remove('next');
            e.classList.remove('opacity');
            e.classList.remove('active');
        })
        // 手機畫面透明度
        if(prevNumber[number] < idx){
            arr[next].classList.add('opacity');
        }else{
            arr[prev].classList.add('opacity');
        }
        // 桌機後面的透明度調整
        if(Math.abs(idx - prevNumber[number]) > 1){
            arr[next].classList.remove('opacity');
            arr[prev].classList.remove('opacity');
            if(idx - prevNumber[number] > 1){
                let {next} = calculate(idx - 2,arr);
                arr[next].classList.add('opacity')
            }
            if(idx - prevNumber[number] < -1){
                let {prev} = calculate(idx + 2,arr);
                arr[prev].classList.add('opacity');
            }
        }
        arr[idx].classList.add('active');
        arr[prev].classList.add('prev');
        arr[next].classList.add('next');
        arr.forEach(e=>{
            if(!e.classList.contains('prev') && !e.classList.contains('active') && !e.classList.contains('next')){
                e.classList.add('opacity');
            }
        })
        pageArr.forEach(e=>{
            e.classList.remove('active');
        })
        pageArr[idx].classList.add('active');
        prevNumber[number] = idx;
        resize();
    }
    function NumChange(index,arr){
        let answer = index;
        if(index > arr.length - 1){
            return answer = 0;
        }else if(index < 0){
            return answer = arr.length - 1;
        }else{
            return answer;
        }
    }
    coachesPage.forEach((e,index)=>{
        e.addEventListener('click',function(){
            changeItem(index,coachesItem,prevNumber['num'],coachesPage)
        })
    })
    coachesleft.addEventListener('click',function(){
        changeItem(NumChange(prevNumber['num']-1,coachesItem),coachesItem,prevNumber['num'],coachesPage);
    })
    coachesRight.addEventListener('click',function(){
        changeItem(NumChange(prevNumber['num']+1,coachesItem),coachesItem,prevNumber['num'],coachesPage);
    })
    clientsPage.forEach((e,index)=>{
        e.addEventListener('click',function(){
            changeItem(NumChange(index,clientsPage),clientsEvaluate,prevNumber['clientsNum'],clientsPage);
            changeItem(NumChange(index,clientsPage),clientsItem,prevNumber['clientsNum'],clientsPage);
        })
    })
    if(nowSize >= 1200){    
        clientsItem.forEach((e,index)=>{
            e.addEventListener('click',()=>{
                changeItem(NumChange(index,Array(3)),clientsEvaluate,prevNumber['clientsNum'],clientsPage);
                changeItem(NumChange(index,Array(3)),clientsItem,prevNumber['clientsNumRwd'],clientsPage);
            })
        })
    }
    // 計算absolute區塊更新高度coaches
    window.addEventListener('resize',resize);
}
