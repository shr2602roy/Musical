let audio = new Audio('music/Moh_Moh_Ke_Dhaage.mp3')

let songList = [
    { name: "Moh Moh Ke Dhaage", filePath: "music/Moh_Moh_Ke_Dhaage.mp3", imgPath: "img/music.avif", artist: "Monali Thakur" },
    { name: "Duniyaa", filePath: "music/Duniyaa.mpeg", imgPath: "img/music2.jpg", artist: "Akhil" },
    { name: "Kabira", filePath: "music/Kabira.mpeg", imgPath: "img/music3.jpg", artist: "Arijit Singh" },
    { name: "Kaise Hua", filePath: "music/Kaise Hua.mpeg", imgPath: "img/music4.jpg", artist: "Vishal Mishra" },
    { name: "Give Me Some Sunshine", filePath: "music/Give Me Some Sunshine.mpeg", imgPath: "img/music5.jpg", artist: "Sharman Joshi and Suraj Jagan" },
    { name: "Mast Magan", filePath: "music/Mast Magan.mpeg", imgPath: "img/music6.jpg", artist: "Arijit Singh and Chinmayi" }
]

//CHANGE SONG
let next = document.getElementById('next')
let prev = document.getElementById('prev')
var i=0
// Array.from(songList).forEach(function (element, i) {
// })


function changeSong(i) {
    document.getElementById('musicImg').src = songList[i].imgPath
    document.getElementsByTagName('h5')[0].innerText = `${songList[i].name}`
    document.getElementsByTagName('p')[0].innerText = `${songList[i].artist}`
    icons.classList.remove("fa-play");
    icons.classList.add("fa-pause");
    audio.src = songList[i].filePath
    audio.currentTime = 0
    audio.play()
    // console.log(audio.duration)
}

audio.onended = (e) => {
    changeSong(i++)
};

next.onclick = (e) => {
    i++
    if(i==songList.length) i=0
    changeSong(i)
    setTimeout(function(){
        duration()
    }, 3500);
};

prev.onclick = (e) => {
    i--
    if(i<0) i=songList.length-1
    changeSong(i)
    setTimeout(function(){
        duration()
    }, 3500);
};

//PLAY-PAUSE BUTTONS
let icons = document.getElementById('play');
let audioSeek = document.getElementById('audioSeek')

icons.addEventListener('click', function (e) {
    if (audio.paused) {
        icons.classList.remove("fa-play");
        icons.classList.add("fa-pause");
        audio.play()
    } else {
        icons.classList.remove("fa-pause");
        icons.classList.add("fa-play");
        audio.pause()
    }

})

//UPDATE TIME
let curTime = document.getElementsByTagName('h6')
let dur = document.getElementsByTagName('h6')

function updateTime() {
    var min = Math.trunc((audio.currentTime)/60)
    var sec = Math.trunc((audio.currentTime)%60)
    if(sec>=0 && sec<=9) curTime[0].innerText = `${min}:0${sec}`
    else curTime[0].innerText = `${min}:${sec}`
}

function duration() {
    var min = Math.trunc((audio.duration)/60)
    var sec = Math.trunc((audio.duration)%60)
    if(sec>=0 && sec<=9) dur[2].innerText = `${min}:0${sec}`
    else dur[2].innerText = `${min}:${sec}`
}

audio.ontimeupdate = (e) => {
    audioSeek.value = ((audio.currentTime) / (audio.duration)) * 100
    updateTime()
    // console.log(audio.duration)
};

//CHANGE SEEKBAR
audioSeek.onchange = (e) => {
    audio.currentTime = ((audioSeek.value) / 100) * (audio.duration)
    // console.log('seeked')
};

audio.onended = (e) => {
    changeSong(i++)
}

//VOLUME
let vol = document.getElementById('volumeChange')
let volSlider = document.getElementById('volSlider')
vol.onchange = (e) => {
    if(vol.value > 30 && volSlider.classList.contains('fa-volume-low')) {
        volSlider.classList.remove('fa-volume-low')
        volSlider.classList.add('fa-volume-high') 
    } else if(vol.value > 30 && volSlider.classList.contains('fa-volume-xmark')) {
        volSlider.classList.remove('fa-volume-xmark')
        volSlider.classList.add('fa-volume-high') 
    } else if(vol.value == 0 && volSlider.classList.contains('fa-volume-low')) {
        volSlider.classList.remove('fa-volume-low')
        volSlider.classList.add('fa-volume-xmark') 
    } else if(vol.value == 0 && volSlider.classList.contains('fa-volume-high')){
        volSlider.classList.remove('fa-volume-high')
        volSlider.classList.add('fa-volume-xmark') 
    } else if(vol.value <= 30 && volSlider.classList.contains('fa-volume-xmark')){
        volSlider.classList.remove('fa-volume-xmark')
        volSlider.classList.add('fa-volume-low') 
    } else if(vol.value <= 30 && volSlider.classList.contains('fa-volume-high')){
        volSlider.classList.remove('fa-volume-high')
        volSlider.classList.add('fa-volume-low') 
    } 
    audio.volume = vol.value/100
};

//REPEAT
let repeat = document.getElementById('repeat')
let r=0
repeat.onclick  = (e) => {
    if(r==0) {
        repeat.style.color = "black"
        audio.loop = true
        r=1
    }
    else {
        repeat.style.color = "grey"
        audio.loop = false
        r=0
    }
};