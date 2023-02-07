let hr=0,min=0,sec=0;
let hr_ob=document.querySelector("#hr_id");
let min_ob=document.querySelector("#min_id");
let sec_ob=document.querySelector("#sec_id");
let stop_resume=document.querySelector('#stop_btn');
let track=document.createElement("audio");
let record_box=document.getElementById("keep_time");
record_box.innerText="Time Record";
track.src="page2_bell.mp3";
// let stop_btn_ob=document.querySelector("#stop_btn");
// let reset_btn_ob=document.querySelector("#reset_btn");
// let start_btn_ob=document.querySelector("#start_btn_id");
//---------------------------------------------
let stop_bool=0;//stop鍵未觸發
let int;
var count_down_sec;
let conform_bool=0;//控制start與conform按鍵
let min_set_bool=0,hr_set_bool=0;//if min and hr are both set
let med_dura_hr=0,med_dura_min=0;//紀錄每次input的冥想時間總共多長
function start(){
    if(int!=null){
        clearInterval(int);
    }
    if(min+hr+sec!=0){
        int=setInterval(display_time, 1000);
    }
    else if(min+hr+sec==0){
        reset();
    }
}
function stop(){
    if(stop_bool==0){
        clearInterval(int);//真的暫停
        stop_resume.innerHTML="resume";
        stop_bool=1;
    }
    else if(stop_bool==1){
        int=setInterval(display_time, 1000);//重新開始
        stop_resume.innerHTML="stop";
        stop_bool=0;
    }
}
function reset(){
    hr_ob.innerHTML="00";
    min_ob.innerHTML="00";
    sec_ob.innerHTML="00";//finish
    sec=0,min=0,hr=0;
    min_set_bool=0,hr_set_bool=0,conform_bool=0,stop_bool=0;
    clearInterval(int);
    document.getElementById('start_btn_id').style.display="flex";
    document.getElementById('stop_btn').style.display="none";
    document.getElementById('reset_btn').style.display="none";
    dropbtn_min_ob.innerHTML="min";
    dropbtn_hr_ob.innerHTML="hr";
}

function display_time(){
    if(sec==0&&min==0&&hr==0){
        getTime();
        reset();
        track.load();
        track.play();
    }
    else if(sec==0&&min!=0){//需要從min借位
        if(min>0){
            min--;
            sec=59;
        }
    }
    else if(sec==0&&min==0){//需要從hr借位
        hr--;
        min=59;
        sec=59;
    }
    else{//不用借位直接扣
        sec--;
    }
    //--------------
    if(sec>=10){
        sec_ob.innerHTML=sec;
    }
    else{
        sec_ob.innerHTML="0"+sec;
    }
    if(min>=10){
        min_ob.innerHTML=min;
    }
    else{
        min_ob.innerHTML="0"+min;
    }
    if(hr>=10){
        hr_ob.innerHTML=hr;
    }
    else{
        hr_ob.innerHTML="0"+hr;
    }
}
//-------------------------------
function sub_Function_min() {
    document.getElementById("sub_dropdown_min").classList.toggle("show");
}
function sub_Function_hr() {
    document.getElementById("sub_dropdown_hr").classList.toggle("show");
}

function showDiv() {
    if(conform_bool==0){
        document.getElementById('dropbtn_hr').style.display = "block";
        document.getElementById('dropbtn_min').style.display = "block";
        conform_bool=1;//表示要切換成conform
        start_btn.innerHTML="confirm";
        document.getElementById('stop_btn').style.display="none";
        document.getElementById('reset_btn').style.display="none";
    }
    else if(hr_set_bool==0||min_set_bool==0){//兩個人當中有一人沒設定完成
        if(conform_bool==1){
            document.getElementById('warn_id').style.display = "flex";
        }
    }
    else if(conform_bool&&hr_set_bool&&min_set_bool){//全部設定完成
        start();
        conform_bool=0;
        start_btn.innerHTML="start";
        //兩個選單也要自動fold
        fold_min_menu();
        fold_hr_menu();
        document.getElementById('dropbtn_hr').style.display = "none";
        document.getElementById('dropbtn_min').style.display = "none";
        if(min+sec+hr==0){
            reset();
        }
        else{
            document.getElementById('stop_btn').style.display="flex";
            document.getElementById('reset_btn').style.display="flex";
            document.getElementById('start_btn_id').style.display="none";
            document.getElementById('warn_id').style.display = "none";
        }
    }
}


//--------------input time-------
let dropbtn_min_ob=document.querySelector("#dropbtn_min");
let dropbtn_hr_ob=document.querySelector("#dropbtn_hr");
let start_btn=document.querySelector("#start_btn_id");

function f1_min(){
    dropbtn_min_ob.innerHTML="0.1min";
    // min=1;
    sec=6;
    med_dura_min=1/10;
    min_set_bool=1;
    fold_min_menu();
}
function f5_min(){
    dropbtn_min_ob.innerHTML="0 min";
    // min=1;
    min=0;
    med_dura_min=1;
    min_set_bool=1;
    fold_min_menu();
}
function f2_min(){
    dropbtn_min_ob.innerHTML="10 min";
    min=10;
    med_dura_min=10;
    min_set_bool=1;
    fold_min_menu();
}
function f3_min(){
    dropbtn_min_ob.innerHTML="20 min";
    min=20;
    med_dura_min=20;
    min_set_bool=1;
    fold_min_menu();
}
function f4_min(){
    dropbtn_min_ob.innerHTML="30 min";
    min=30;
    med_dura_min=30;
    min_set_bool=1;
    fold_min_menu();
}


function f1_hr(){
    dropbtn_hr_ob.innerHTML="0 hr";
    hr=0;
    med_dura_hr=0;
    hr_set_bool=1;
    fold_hr_menu();
}
function f2_hr(){
    dropbtn_hr_ob.innerHTML="1 hr";
    hr=1;
    med_dura_hr=1;
    hr_set_bool=1;
    fold_hr_menu();
}
function f3_hr(){
    dropbtn_hr_ob.innerHTML="2 hr";
    hr=2;
    med_dura_hr=2;
    hr_set_bool=1;
    fold_hr_menu();
}
function f4_hr(){
    dropbtn_hr_ob.innerHTML="3 hr";
    hr=3;
    med_dura_hr=3;
    hr_set_bool=1;
    fold_hr_menu();
}
function f5_hr(){
    dropbtn_hr_ob.innerHTML="3 hr";
    hr=4;
    med_dura_hr=4;
    hr_set_bool=1;
    fold_hr_menu();
}

function fold_min_menu(){
    var dropdowns = document.getElementsByClassName("dropdown-content_min");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}

function fold_hr_menu(){
    var dropdowns = document.getElementsByClassName("dropdown-content_hr");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}
//----紀錄時間用-----
function getTime(){
    let date=new Date();
    const month = ["January","February","March","April",
    "May","June","July","August","September",
    "October","November","December"];
    let Y=date.getFullYear();
    let M=month[date.getMonth()];
    let D=date.getDate();
    let hour=date.getHours();
    let minute=date.getMinutes();
    if(med_dura_hr+med_dura_min!=0){
        record_box.innerText+="\n"+"Finish "+med_dura_hr+"hr "+med_dura_min+"min meditation "+"on "+Y+" "+M+" "+D+", at "+hour+":"+minute;
    }
    
}
