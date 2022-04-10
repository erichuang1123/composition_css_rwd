window.onload = function(){
    const h1 = document.querySelector('.h1');
    const topBtn = document.querySelector('.top_btn');
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
    const headerLi = document.querySelectorAll('.main_header ul li ');
    const evaliateWrap = document.querySelector('.evaluate_wrap');
    const clientsWrap2 = document.querySelector('.clients_wrap.wrap2');
    const sectionScroll = [...document.querySelectorAll('section.scroll')];
    h1.addEventListener('click',()=>window.location.reload());
    coachesWrap.style.height = `${coachesItem[0].offsetHeight + 50}px`;
    let menuActive = false;
    let iconActive = false;
    let btnTop = false;
    let nowScroll = window.scrollY;
    let timer = null;
    let nowOffset = 0; //手機左右移動開始點
    let prevNumber = {num : 0,clientsNum : 0,clientsNum : 0};//用來記前一個數字
    function resize(){
        coachesWrap.style.height = `${coachesItem[0].offsetHeight + 75}px`;
    }
    function moveFn(index){
        timer = setInterval(() => {
            if(nowScroll < sectionScroll[index].offsetTop){
                nowScroll += 60;
                window.scrollTo(0,nowScroll);
                if(nowScroll >= sectionScroll[index].offsetTop){
                    window.scrollTo(0,sectionScroll[index].offsetTop);
                    clearInterval(timer);
                }
            }else{
                nowScroll -= 60;
                window.scrollTo(0,nowScroll);
            }
        }, 5);
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
        console.log(index);
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
            changeItem(index,coachesItem,'num',coachesPage)
        })
    })
    coachesleft.addEventListener('click',function(){
        changeItem(NumChange(prevNumber['num']-1,coachesItem),coachesItem,'num',coachesPage);
    })
    coachesRight.addEventListener('click',function(){
        changeItem(NumChange(prevNumber['num']+1,coachesItem),coachesItem,'num',coachesPage);
    })
    clientsPage.forEach((e,index)=>{
        e.addEventListener('click',function(){
            changeItem(NumChange(index,clientsPage),clientsEvaluate,'clientsNum',clientsPage);
            changeItem(NumChange(index,clientsPage),clientsItem,'clientsNum',clientsPage);
        })
    }) 
    clientsItem.forEach((e,index)=>{
        e.addEventListener('click',()=>{
            changeItem(NumChange(index,Array(3)),clientsEvaluate,'clientsNum',clientsPage);
            changeItem(NumChange(index,Array(3)),clientsItem,'clientsNum',clientsPage);
        })
    })
    // 回歸上方按鈕偵測
    window.addEventListener('scroll',()=>{
        btnTop = window.scrollY >= window.innerHeight ? true : false;
        console.log();
        if(btnTop){
            topBtn.classList.add('active');
        }else{
            topBtn.classList.remove('active');
        }
    })
    topBtn.addEventListener('click',()=>{
        nowScroll = window.scrollY;
        moveFn(0);
    })
    // 計算absolute區塊更新高度coaches
    window.addEventListener('resize',resize);
    headerLi.forEach((dom,index)=>{
        dom.addEventListener('click',()=>{
            moveFn(index);
            headerUl.classList.remove('active');
            closeBtn.classList.remove('active');
        })
    })
    function mouseMoveFn(e){
        let {pageX} = e;
        pageX = Math.floor((pageX / this.offsetWidth) * 50)
        evaliateWrap.style.transform = 'translateX('+ pageX +'px)';
        clientsWrap2.style.transform = 'translateX('+ pageX +'px)';
    }
    function mouseDownFn(arr,down,move,leave){
        arr.addEventListener(down,(e)=>{
            nowOffset = e.pageX;
            arr.addEventListener(move,mouseMoveFn)
            arr.addEventListener(leave,()=>{
                arr.removeEventListener(move,mouseMoveFn)    
            })
        })
    }
    function mouseUpFn(arr,up,mousemove){
        arr.addEventListener(up,(e)=>{
            if(nowOffset - e.pageX > arr.offsetWidth/3){
                changeItem(NumChange(prevNumber['clientsNum']+1,clientsPage),clientsEvaluate,'clientsNum',clientsPage);
                changeItem(NumChange(prevNumber['clientsNum'],clientsPage),clientsItem,'clientsNum',clientsPage);
            }else if(e.pageX - nowOffset > arr.offsetWidth/3){
                changeItem(NumChange(prevNumber['clientsNum']-1,clientsPage),clientsEvaluate,'clientsNum',clientsPage);
                changeItem(NumChange(prevNumber['clientsNum'],clientsPage),clientsItem,'clientsNum',clientsPage);
            }
            arr.removeEventListener(mousemove,mouseMoveFn)
            evaliateWrap.style.transform = '';
            clientsWrap2.style.transform = '';
        })
    }
    // 手機平板畫面拖動移動
    // 文字移動偵測
    mouseDownFn(evaliateWrap,'mousedown','mousemove','mouseleave');
    mouseDownFn(evaliateWrap,'touchstart','touchmove','touchleave');
    mouseUpFn(evaliateWrap,'mouseup','mousemove');
    mouseUpFn(evaliateWrap,'touchend','touchmove');
    // 圖片移動偵測
    mouseDownFn(clientsWrap2,'mousedown','mousemove','mouseleave');
    mouseDownFn(clientsWrap2,'touchstart','touchmove','touchleave');
    mouseUpFn(clientsWrap2,'mouseup','mousemove');
    mouseUpFn(clientsWrap2,'touchend','touchmove');

}