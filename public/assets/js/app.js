// DATA
let targetLive = "jewa_tiktok";
let connection = new TikTokIOConnection(undefined);
let loaderWords = [];
let selectedWord = null;

// START
$(document).ready(() => {
    // Resize
    function resizeContainer() {
        let height = window.innerHeight;
        let width = Math.round((9 / 16) * height);
        $("#gameSize").html(width + 'x' + height);
        $(".container").outerWidth(width);
        $(".background").outerWidth(width);
        $(".printer").outerWidth(width);
        $(".animation").outerWidth(width);
        $("#paper").outerHeight($("#paperContainer").outerHeight() - 20);
    }
    resizeContainer();
    $(window).resize(function() {
        resizeContainer();
    });

    // Load game
    loadGame();

    // Resize
    $("#refreshSize").click(function(e) {
        resizeContainer();
    });

    // Connect
    $("#targetConnect").click(function(e) {
        let targetLive = $("#targetUsername").val();
        connect(targetLive);
    });
})

/*
* GAME PLAY
*/

function loadGame() {
    // Check
    if (loaderWords.length <= 0) {
        loaderWords = shuffle(WORDS);
    }

    // Load
    selectedWord = loaderWords.pop();

    // Set
    $("#textGuess").html(censor(selectedWord));

    // Timeout
    let timeout = Number.parseInt(60000 * 5); // 5 Mins
    setTimeout(function() {
        loadGame()
    }, timeout);
}

function checkWinner(data, msg) {
    // Check
    if (selectedWord.toLowerCase() == msg.toLowerCase()) {
        // Set winner
        $("#textWinner").html("@" + data.uniqueId);

        // Print Photo
        addPhoto(data, "winner");

        // Sound
        playSound(4);

        // Reload game
        loadGame();
    }
}


/*
* LIVE TIKTOK
*/

function connect(targetLive) {
    if (targetLive !== '') {
        $('#stateText').text('Connecting...');
        $("#usernameTarget").html("@"+targetLive);
        connection.connect(targetLive, {
            enableExtendedGiftInfo: true
        }).then(state => {
            $('#stateText').text(`Connected to roomId ${state.roomId}`);
        }).catch(errorMessage => {
            $('#stateText').text(errorMessage);
        })
    } else {
        alert('no username entered');
    }
}

function sanitize(text) {
    return text.replace(/</g, '&lt;')
}

function isPendingStreak(data) {
    return data.giftType === 1 && !data.repeatEnd;
}

function playSound(mode) {
    try {
        document.getElementById("sfx"+mode).play();
    } catch (error) {
        $("#soundStatus").html("Sund: " + error);
    }
}

function addContent(payload) {
    // Container
    let content = $('#paper');
    content.append("<div class='item'>" + payload + "</div>");

    // Scroll top bottom
    content.animate({ scrollTop: content.get(0).scrollHeight}, 200);
}

function addMessage(data, msg) {
    // DATA
    let userName = data.uniqueId;
    let message = sanitize(msg);

    // Add
    addContent("<span style='font-weight: bold;'>" + userName + "</span>: " + message);

    // Sound
    playSound(1);
}

function addPhoto(data, mode) {
    // DATA
    let userName = data.uniqueId;
    let userAvatar = data.profilePictureUrl;

    // Add
    if (mode == "winner") {
        addContent(
            `<div style="text-align:center;font-size: 1.25rem;">
                <div style='padding-bottom:.25rem;'>Hooray 🎉🎉🎉</div>
                <div style='padding-bottom:.5rem;font-weight: bold;'>`+userName+`</div>
                <div>
                    <img src="`+userAvatar+`" style="width:128px;height:128px;border-radius: 15px;"/>
                </div>
            </div>`
        );
    } else {
        addContent(
            `<div style="text-align:center;font-size: 1.25rem;">
                <div style='padding-bottom:.25rem;'>Thanks for ordering HQ Print</div>
                <div style='padding-bottom:.5rem;font-weight: bold;'>`+userName+`</div>
                <div>
                    <img src="`+userAvatar+`" style="width:128px;height:128px;border-radius: 15px;"/>
                </div>
            </div>`
        );
    }

    // Sound
    playSound(3);
}

function addGift(data) {
    // DATA
    let userName = data.uniqueId;
    let giftPictureUrl = data.giftPictureUrl;
    let giftName = data.giftName;
    let giftRepeat = data.repeatCount;
    let giftTotal = (data.diamondCount * data.repeatCount);

    // Check
    if (giftTotal >= 30) {
        // Print Photo
        addPhoto(data);

    } else {
        // Add
        addContent(
            `<div style="text-align:center;font-size: 1.25rem;"><div style='padding-bottom:.5rem;'>Thank you <span style='font-weight: bold;'>`+userName+`!</span></div>
            <div style='font-weight: bold;padding-bottom:.5rem;'><img src="`+giftPictureUrl+`" style="width:32px;height:32px;"/> Sent `+giftName+`</div>
            x`+giftRepeat.toLocaleString()+` worth `+giftTotal.toLocaleString()+` coins!</div>`
        );

        // Sound
        playSound(2);
    }
}

// New chat comment received
connection.on('chat', (data) => {
    addMessage(data, data.comment);
    checkWinner(data, data.comment);
})

// New gift received
connection.on('gift', (data) => {
    if (!isPendingStreak(data) && data.diamondCount > 0) {
        addGift(data);
    }
})

// Like
connection.on('like', (data) => {
    if (typeof data.likeCount === 'number') {
        addMessage(data, data.label.replace('{0:user}', '').replace('likes', `${data.likeCount} likes`));
    }
})

// Share, Follow
connection.on('social', (data) => {
    addMessage(data, data.label.replace('{0:user}', ''));
})

// End
connection.on('streamEnd', () => {
    $('#stateText').text('Stream ended.');
})