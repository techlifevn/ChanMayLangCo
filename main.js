const playlist = [
    "https://vnso-zn-24-tf-a128-z3.zmdcdn.me/1c07b055d99ed4c490da0a2bfcf6aba6?authen=exp=1756004215~acl=/1c07b055d99ed4c490da0a2bfcf6aba6*~hmac=5ac12dacfd3a40a9f1e45351e8953a91",
    "https://vnso-zn-23-tf-a128-z3.zmdcdn.me/0a756c6aa905ddfbeed3f5f0bd8e9e7a?authen=exp=1756003560~acl=/0a756c6aa905ddfbeed3f5f0bd8e9e7a*~hmac=473798a7fdf6637f7252cdabfa5be82b",
    "https://vnso-pt-51-tf-a128-z3.zmdcdn.me/8f761bc1f010506cef411d33af6fa239?authen=exp=1756002956~acl=/8f761bc1f010506cef411d33af6fa239*~hmac=1f635fb71ff528e13435774fe273125d",
]

const audio = document.getElementById('audio')

function safePlay(audioElement = HTMLElement, playlist = []) {
    let nextAudio = new Audio();
    let index = 0;
    audioElement.src = playlist[index];

    const playAudio = () => {
        return audioElement.play()
            .then(() => {
                console.log("✅ Play thành công");
                let nextIndex = (index + 1) % playlist.length;
                nextAudio.src = playlist[nextIndex];
                nextAudio.preload = "auto";
                return true;
            })
            .catch(err => {
                console.log("⚠️ Play bị chặn:", err);
                return false;
            });
    };

    const unlock = () => {
        playAudio().then(success => {
            if (success) {
                document.removeEventListener("click", unlock);
                document.removeEventListener("keydown", unlock);
                document.removeEventListener("touchstart", unlock);
            }
        });
    };

    document.addEventListener("click", unlock);
    document.addEventListener("keydown", unlock);
    document.addEventListener("touchstart", unlock);

    audioElement.addEventListener('ended', () => {
        index++;
        if (index < playlist.length) {
            audioElement.src = playlist[index]
            audioElement.play()
        }
        else {
            index = 0;
            audioElement.src = playlist[index]
            audioElement.play()
        }

        let nextIndex = (index + 1) % playlist.length
        nextAudio.src = playlist[nextIndex]
        nextAudio.preload = "auto"
    })
}

safePlay(audio, playlist)