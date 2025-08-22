const optionA = document.querySelector(".option-A");
const optionB = document.querySelector(".option-B");
const result = document.querySelector("#result");
const photoA = document.querySelector("#photoA")
const photoB = document.querySelector("#photoB")


let currentindex = 0;
const photos = [
    {A : "option a.jpg", B : "option b.jpg"},
    {A : "option aa.webp", B : "option b.jpg"},
    {A : "B.jpg", B : "A.jpg"},
    {A : "option b.jpg", B : "B.jpg"},
    {A : "optio bb.jpg", B : "A.jpg"},
]

function option(html) {
    result.innerHTML = "you click on " + html;
}

function nextPhotos(){
    currentindex++
    if(currentindex >= photos.length){
        currentindex = 0;
    }

    photoA.src = photos[currentindex].A
    photoB.src = photos[currentindex].B
    result.innerHTML = ""
}


optionA.addEventListener("click", () => {
    let html = `<p class="labelB">Option A</p>`;
    option(html)
});


optionB.addEventListener("click", () => {
    let html = `<p class="labelA">Option B</p>`;
    option(html);
})

