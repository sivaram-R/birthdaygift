/* ==========================================
   PERSONAL CONFIGURATION
========================================== */

const CONFIG = {

    name: "Deepika",

    from: "Someone Who Loves You Madly",

    /*
       IMPORTANT:

       This is interpreted using the visitor's
       local browser timezone.

       Current value = September 19, 2026 at midnight.
    */
    birthday: "2026-09-19T00:00:00",

    messages: [

        "Your smile makes my days better 💛",

        "You actually are the best thing that happened to me.",

        "You are stronger than you realize idiot 😤",

        "All I need is your love and your presence in my life.",

        "We will live happily for more than 100 years ✨"

    ],

    photos: [

        [
            "assets/photos/photo1.jpg",
            "A favorite memory"
        ],

        [
            "assets/photos/photo2.jpg",
            "That unforgettable day"
        ],

        [
            "assets/photos/photo3.jpg",
            "A moment worth keeping"
        ],

        [
            "assets/photos/photo4.jpg",
            "Just us being us"
        ],

        [
            "assets/photos/photo5.jpg",
            "More memories to come"
        ]

    ],

    letter: `Dear Deepika Sivaram,
Yeah, you heard it right 😤 Happy birthday my love mutta kutty 🐥
You are so so out of my reach to hug you,
but here is my soul hug 🫂and of course ummmmmmmmmaaaaaa 💋. 
You did actually omg, you seriously are in a different country for this birthday 🎈
Anyway, it is sad for me because it was never like this.I always saw you in person on your birthday,
even when you didn't talk with me.But this one feels different 🫠Seri okay, romba pesala.
I'm happy for you and proud of you for being so strong and independent. I know you are going through a lot of things in your life, but I want you to know that I am always here for you. You are my everything and I will always love you ❤️
Please come fast to me, I miss you so much 😭 or i will come and marry you there pathuka!!😗
With all my love,
Sivaram ❤️`
};


/* ==========================================
   GET ELEMENTS
========================================== */

const screens =
    [...document.querySelectorAll(".screen")];

const music =
    document.getElementById("music");

const beginButton =
    document.getElementById("beginButton");

const musicButton =
    document.getElementById("musicBtn");

let currentScreen = 0;


/* ==========================================
   PERSONAL DETAILS
========================================== */

document
    .querySelectorAll("[data-name]")
    .forEach(element => {

        element.textContent =
            CONFIG.name;

    });


document
    .querySelectorAll("[data-from]")
    .forEach(element => {

        element.textContent =
            CONFIG.from;

    });


document
    .getElementById("letterCopy")
    .textContent =
    CONFIG.letter;


/* ==========================================
   SCREEN NAVIGATION
========================================== */

function showScreen(number) {

    if (
        number < 0 ||
        number >= screens.length
    ) {
        return;
    }

    screens[currentScreen]
        .classList
        .remove("active");

    currentScreen = number;

    screens[currentScreen]
        .classList
        .add("active");

}


/* ==========================================
   START BUTTON + MUSIC
========================================== */

beginButton.addEventListener(
    "click",
    async () => {

        /*
           The button click counts as a real user
           interaction, so browsers are much more
           likely to permit audio playback.
        */

        try {

            await music.play();

            musicButton.textContent =
                "🔊 Music on";

        } catch (error) {

            console.log(
                "Music autoplay blocked:",
                error
            );

        }

        showScreen(1);

    }
);


/* ==========================================
   NORMAL NEXT BUTTONS
========================================== */

document
    .querySelectorAll("[data-next]")
    .forEach(button => {

        /*
           Begin button does not use this because
           it has special music logic above.
        */

        if (
            button === beginButton
        ) {
            return;
        }

        button.addEventListener(
            "click",
            () => {

                showScreen(
                    currentScreen + 1
                );

            }
        );

    });


/* ==========================================
   COUNTDOWN "PEEK" BUTTON
========================================== */

document
    .getElementById("peek")
    .addEventListener(
        "click",
        () => {

            /*
               Screen 2 = Cake
            */

            showScreen(2);

        }
    );


/* ==========================================
   BALLOONS
========================================== */

const balloonContainer =
    document.getElementById("balloons");

const balloonNext =
    document.getElementById("balloonNext");


CONFIG.messages.forEach(
    (message, index) => {

        const wrap =
            document.createElement("div");

        wrap.className =
            "balloon-wrap";


        const balloon =
            document.createElement("button");

        balloon.className =
            "balloon";

        balloon.type =
            "button";

        balloon.textContent =
            "♥";


        balloon.setAttribute(
            "aria-label",
            `Reveal message ${index + 1}`
        );


        const messageBox =
            document.createElement("div");

        messageBox.className =
            "balloon-msg";

        messageBox.textContent =
            message;


        balloon.addEventListener(
            "click",
            () => {

                /*
                   Prevent clicking the same
                   balloon repeatedly.
                */

                if (
                    wrap.classList.contains(
                        "show"
                    )
                ) {
                    return;
                }


                balloon.classList.add(
                    "pop"
                );


                /*
                   Wait until the balloon
                   disappears, then reveal
                   the message card.
                */

                setTimeout(
                    () => {

                        wrap.classList.add(
                            "show"
                        );


                        checkAllBalloons();

                    },
                    300
                );

            }
        );


        wrap.appendChild(
            balloon
        );

        wrap.appendChild(
            messageBox
        );


        balloonContainer.appendChild(
            wrap
        );

    }
);


/* ==========================================
   CHECK BALLOONS
========================================== */

function checkAllBalloons() {

    const opened =
        document.querySelectorAll(
            ".balloon-wrap.show"
        ).length;


    if (
        opened === CONFIG.messages.length
    ) {

        balloonNext.classList.remove(
            "hidden"
        );

    }

}


/* ==========================================
   BALLOON NEXT
========================================== */

balloonNext.addEventListener(
    "click",
    () => {

        /*
           Memories is screen 4.
        */

        showScreen(4);

    }
);


/* ==========================================
   PHOTO GALLERY
========================================== */

const gallery =
    document.getElementById("gallery");


CONFIG.photos.forEach(
    ([source, caption], index) => {

        const photo =
            document.createElement("div");

        photo.className =
            "photo";


        const image =
            document.createElement("img");

        image.src =
            source;

        image.alt =
            caption;

        image.loading =
            "lazy";


        const text =
            document.createElement("span");

        text.textContent =
            caption;


        /*
           Instead of showing a broken image
           icon, just hide the image.
        */

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

            }
        );


        photo.appendChild(
            image
        );

        photo.appendChild(
            text
        );


        gallery.appendChild(
            photo
        );

    }
);


/* ==========================================
   LETTER
========================================== */

const envelope =
    document.getElementById("envelope");

const openLetterButton =
    document.getElementById("openLetter");

const letterCopy =
    document.getElementById("letterCopy");

const finishButton =
    document.getElementById("finish");


openLetterButton.addEventListener(
    "click",
    () => {

        /*
           Prevent multiple clicks.
        */

        if (
            envelope.classList.contains(
                "open"
            )
        ) {
            return;
        }


        envelope.classList.add(
            "open"
        );


        openLetterButton.style.display =
            "none";


        setTimeout(
            () => {

                letterCopy.classList.add(
                    "show"
                );

                finishButton.classList.remove(
                    "hidden"
                );

            },
            700
        );

    }
);


/* ==========================================
   FINISH BUTTON
========================================== */

finishButton.addEventListener(
    "click",
    () => {

        /*
           Final screen = index 6
        */

        showScreen(6);

    }
);


/* ==========================================
   MUSIC BUTTON
========================================== */

musicButton.addEventListener(
    "click",
    async () => {

        try {

            if (
                music.paused
            ) {

                await music.play();

                musicButton.textContent =
                    "🔊 Music on";

            }

            else {

                music.pause();

                musicButton.textContent =
                    "🔇 Music off";

            }

        }

        catch (error) {

            console.log(
                "Music error:",
                error
            );

        }

    }
);


/* ==========================================
   COUNTDOWN
========================================== */

function updateCountdown() {

    const target =
        new Date(
            CONFIG.birthday
        ).getTime();


    const now =
        Date.now();


    const difference =
        Math.max(
            0,
            target - now
        );


    if (
        difference <= 0
    ) {

        document
            .getElementById("days")
            .textContent =
            "00";

        document
            .getElementById("hours")
            .textContent =
            "00";

        document
            .getElementById("minutes")
            .textContent =
            "00";

        document
            .getElementById("seconds")
            .textContent =
            "00";


        document
            .getElementById("countdownText")
            .textContent =
            "It’s officially your day. 💛";


        return;

    }


    let totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    totalSeconds %=
        86400;


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    totalSeconds %=
        3600;


    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds % 60;


    document
        .getElementById("days")
        .textContent =
        String(days)
            .padStart(2, "0");


    document
        .getElementById("hours")
        .textContent =
        String(hours)
            .padStart(2, "0");


    document
        .getElementById("minutes")
        .textContent =
        String(minutes)
            .padStart(2, "0");


    document
        .getElementById("seconds")
        .textContent =
        String(seconds)
            .padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);