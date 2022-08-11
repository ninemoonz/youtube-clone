import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");


let stream;
let recorder;
let videoFile;

const handleDownload = async () => {

    const ffmpeg =  createFFmpeg({corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',  log: true });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile)); //File System

    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    const mp4File = ffmpeg.FS("readFile", "output.mp4");

    //unsigned number = 1, 22, 3, 4, 5
    //signed number = -2, -234
    
    const mp4Blob = new Blob([mp4File.buffer], {type: "video/mp4"});

    const mp4Url = URL.createObjectURL(mp4Blob);

    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "MyRecord.mp4";
    document.body.appendChild (a);
    a.click();
}

const handleStop = () => {
    startBtn.innerText = "Download Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();


}

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      videoFile = URL.createObjectURL(event.data);
      video.srcObject = null;
      video.src = videoFile;
      video.loop = true;
      video.play();
    };
    recorder.start();
  };

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false, 
        video: true,
    });
    video.srcObject = stream;
    video.play();
}

init();

startBtn.addEventListener("click", handleStart);