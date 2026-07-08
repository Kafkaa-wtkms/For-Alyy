// ==========================================
// ELEMENT
// ==========================================

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yesText = document.getElementById("yesText");

const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const paper = document.querySelector(".paper");
const stars = document.getElementById("stars");
const bgMusic = document.getElementById("bgMusic"); // Ambil element musik

// ==========================================
// SETTINGS
// ==========================================

const TRIGGER_DISTANCE = 140;

const noTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Please?",
    "plss sunda",
    "🥺",
    "kok gitu??",
    "bwoop",
    "plsplsplss",
];

let currentText = 0;
let canEscape = true;
let envelopeOpened = false;

// ==========================================
// NO BUTTON
// ==========================================

document.addEventListener("mousemove", (event)=>{

    if(!canEscape) return;

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(
        event.clientX - centerX,
        event.clientY - centerY
    );

    if(distance < TRIGGER_DISTANCE){

        escapeButton(event.clientX,event.clientY);

    }

});

function escapeButton(mouseX,mouseY){

    canEscape = false;

    let newX;
    let newY;

    do{

        newX = Math.random() * (window.innerWidth - 180);
        newY = Math.random() * (window.innerHeight - 80);

    }while(

        Math.hypot(
            mouseX - newX,
            mouseY - newY
        ) < 250

    );

    noBtn.style.position = "fixed";
    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";

    currentText++;

    if(currentText >= noTexts.length){

        currentText = 0;

    }

    noBtn.textContent = noTexts[currentText];

    setTimeout(()=>{

        canEscape = true;

    },200);

}

// ==========================================
// YES BUTTON
// ==========================================

yesBtn.addEventListener("click", () => {

    // Sembunyikan tombol
    yesBtn.style.opacity = "0";
    noBtn.style.opacity = "0";

    yesBtn.style.pointerEvents = "none";
    noBtn.style.pointerEvents = "none";

    // Lock Screen: Putar musik bg otomatis
    if(bgMusic) {
        bgMusic.play().catch((error) => {
            console.log("Pemutaran musik otomatis tertahan kebijakan browser, dimainkan setelah interaksi lanjutan:", error);
        });
    }

    // Tampilan text respon awal
    yesText.classList.add("show");

    // Pindah ke halaman 2 (Amplop)
    setTimeout(() => {

        page1.classList.remove("active");
        page2.classList.add("active");

    },1800);

});


// ==========================================
// ENVELOPE MANAGEMENT (KLIK 1 & KLIK 2)
// ==========================================

envelope.addEventListener("click", () => {

    // Jika amplop belum pernah dibuka (Klik Pertama)
    if(!envelopeOpened) {
        envelopeOpened = true;

        // Buka tutup amplop
        envelope.classList.add("open");

        // Munculkan bintang-bintang di latar belakang
        createStars();

        // Tampilkan kertas isi surat menyembul ke atas
        setTimeout(() => {
            paper.classList.add("show");
        }, 900);
        
    } else {
        // Jika sudah terbuka dan diklik lagi (Klik Kedua) -> Masuk mode baca fokus
        document.body.classList.add("letter-focus");
    }

});

// ==========================================
// STARS GENERATOR
// ==========================================

function createStars(){

    const STAR_COUNT = 80;

    for(let i = 0; i < STAR_COUNT; i++){

        const star = document.createElement("div");

        star.className = "star";

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        // Ukuran acak
        const size = Math.random() * 3 + 2;

        star.style.width = size + "px";
        star.style.height = size + "px";

        // Jeda kemunculan kelap-kelip
        star.style.animationDelay =
            Math.random() * 3 + "s";

        stars.appendChild(star);

        // Muncul bertahap satu per satu
        setTimeout(() => {

            star.classList.add("show");

        }, i * 45);

    }

}

// ==========================================
// RESPONSIVE
// ==========================================

window.addEventListener("resize", () => {
    // Ruang untuk reset masa mendatang jika diperlukan
});

// ==========================================
// END
// ==========================================