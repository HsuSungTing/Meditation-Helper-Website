let song_ary=[{
    name:"I. Start to Feel Your Body",
    img:"main_img1.jpg",
    path:"guide_part1.mp3"
},{
    name:"II. Connect to Your Being",
    img:"main_img2.jpg",
    path:"guide_part2.mp3"
},{
    name:"III. The Power of Being Now",
    img:"main_img3.jpg",
    path:"guide_part3.mp3"
}];
let track_img=document.querySelector("#track_img");
let track_music=document.querySelector('#play_mp3');
let track_title=document.querySelector('#left_title');
let icon_switch=document.querySelector('#play_mp3');
let slider=document.querySelector('#duration_btn');
let vol_bar=document.querySelector('#vol_btn');
let vol_value=document.querySelector('#vol_value');

let auto_bool=0;
let start_bool=0;
let guide_bool=0;

//-----------------------------
let track = document.createElement('audio');
let track_ct=0;
//document.body.style.backgroundImage = "url('yoga_1200.jpg')";
document.body.style.backgroundSize="100% 100%"
load_data(track_ct);

function load_data(track_ct){
    track.src=song_ary[track_ct].path;
    track_img.src=song_ary[track_ct].img;
    track_title.innerHTML=song_ary[track_ct].name;
    let timer = setInterval(background_run, 1000);
    track.load();//好像會重制
}
//two function use setinterval, one is in load_data, the other is in playsong()
function start_or_stop(){
    if(start_bool==0){
        play_song();
        start_bool=1;
    }
    else{
        stop_song();
        start_bool=0;
    }
}
function play_song(){
    if(int!==null){
        clearInterval(int);
    }
    //開始計時，以每秒一次去執行display
    int = setInterval(displayTimer,1000);//window.setinterval()也可以
    track.play();
    icon_switch.innerHTML='<i class="fa fa-pause" aria-hidden="true"></i>';
}
function volume_change(){
    //先拉條，拉條一動就會直接改動到value
    vol_value.innerHTML=vol_bar.value;
    vol_bar.innerHTML=vol_bar.value;
    track.volume=vol_bar.value/100;//track.volumeinput的值是0到1
}
function stop_song(){
    track.pause();
    clearInterval(int);//暫停計時，暫時不以每秒一次去執行display
    icon_switch.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
}   

function pre_song(){
    if(track_ct!=0){
        track_ct--;
        if(track_ct==0){
            document.body.style.backgroundImage = "url('main_img1.jpg')";
        }
        else if(track_ct==1){
            document.body.style.backgroundImage = "url('main_img2.jpg')";
        }
        else if(track_ct==2){
            document.body.style.backgroundImage = "url('main_img3.jpg')";
        }
    }
    load_data(track_ct);
    start_bool=0;
    icon_switch.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
    stop_song();
    }

function next_song(){
    if(track_ct<2){
        track_ct++;
    }
    if(track_ct==0){
        document.body.style.backgroundImage = "url('main_img1.jpg')";
    }
    else if(track_ct==1){
        document.body.style.backgroundImage = "url('main_img2.jpg')";
    }
    else if(track_ct==2){
        document.body.style.backgroundImage = "url('main_img3.jpg')";
    }
    load_data(track_ct);
    start_bool=0;
    icon_switch.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
    stop_song();
}

function auto_play(){
    auto_bool=1;
    track_ct=0;//從頭播放
    load_data(track_ct);
    stop_song();
    time_set_zero();
    play_song();
}

function change_time(){
    stop_song();
    let slider_position = track.duration * (slider.value / 10000);
	track.currentTime = slider_position;
    stop_song();
    play_song();
}

function background_run() {
	let position = 0;

    // console.log(track.currentTime);
    // console.log("track.ended"+track.ended);
    // console.log("auto_bool"+auto_bool);
    // console.log("start_bool:"+start_bool);
	if (track.duration!=0) {
		position = track.currentTime * (10000 / track.duration);
		slider.value = position;
	}
    if(track.ended&&auto_bool&&track_ct<2){
        next_song();
        start_or_stop();
    }
    else if(track_ct==2&&track.ended==1){
        track.pause();
        icon_switch.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
    }
}

//--------------------timer-------------------------
let hr_ob=document.querySelector("#hr_id");
let min_ob=document.querySelector("#min_id");
let sec_ob=document.querySelector("#sec_id");
let int = null;
let hr=0,min=0,sec=0;

function time_set_zero(){
    hr_ob.innerHTML="Total 00:";
    min_ob.innerHTML="00:";
    sec_ob.innerHTML="00";//finish
    sec=0,min=0,hr=0;
}
document.getElementById("reset_id").addEventListener("click", ()=>{
    stop_song();
    time_set_zero();
});
function displayTimer(){
    sec++;
    if(sec>=60){
        min++;
        sec-=60;
    }
    if(min>=60){
        hr++;
        min-=60;
    }
    if(sec>=10){
        sec_ob.innerHTML=sec;
    }
    else{
        sec_ob.innerHTML="0"+sec;
    }
    if(min>=10){
        min_ob.innerHTML=min+":";
    }
    else{
        min_ob.innerHTML="0"+min+":";
    }
    if(hr>=10){
        hr_ob.innerHTML="Total"+hr+":";
    }
    else{
        hr_ob.innerHTML="Total 0"+hr+":";
    }
}
//-----------showing toutorial------------
function show_guide(){
    if(track_ct==0&&guide_bool==0){//原本是非導覽模式
        track_img.src="instruction1.jpg";
        guide_bool=1;
    }
    else if(track_ct==0&&guide_bool==1){//原本是導覽模式
        track_img.src="main_img1.jpg";
        guide_bool=0;
    }

    if(track_ct==1&&guide_bool==0){//原本是非導覽模式
        track_img.src="instruction2.jpg";
        guide_bool=1;
    }
    else if(track_ct==1&&guide_bool==1){//原本是導覽模式
        track_img.src="main_img2.jpg";
        guide_bool=0;
    }

    if(track_ct==2&&guide_bool==0){//原本是非導覽模式
        track_img.src="instruction3.jpg";
        guide_bool=1;
    }
    else if(track_ct==2&&guide_bool==1){//原本是導覽模式
        track_img.src="main_img3.jpg";
        guide_bool=0;
    }
}
