const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        body: JSON.stringify({text: "this is comment", rating: "5"}),
    });
};

if(form){
    form.addEventListener("submit", handleSubmit);
}
