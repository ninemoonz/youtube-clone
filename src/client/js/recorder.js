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

    await ffmpeg.run("-i", "recording.webm", "-ss", "00:00:01", "-frames:v", "1", "thumbnail.jpg");

    const mp4File = ffmpeg.FS("readFile", "output.mp4");
    const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");
    
    const mp4Blob = new Blob([mp4File.buffer], {type: "video/mp4"});
    const thumbBlob = new Blob([thumbFile.buffer], {type: "image/jpg"});

    const mp4Url = URL.createObjectURL(mp4Blob);
    const jpgUrl = URL.createObjectURL(thumbBlob);
    
    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "MyRecord.mp4";
    document.body.appendChild(a);
    a.click();
    
    const thumbA = document.createElement("a");
    thumbA.href = jpgUrl;
    thumbA.download = "thumbNail.jpg";
    document.body.appendChild(thumbA);
    thumbA.click();

    //Delet file in MEMFS (In-memory-filesystem)
    ffmpeg.FS("unlink", "recording.webm");
    ffmpeg.FS("unlink", "output.mp4");
    ffmpeg.FS("unlink", "thumbnail.jpg");

    //revokeObjectUrl
    URL.revokeObjectURL(videoFile);
    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(jpgUrl);

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