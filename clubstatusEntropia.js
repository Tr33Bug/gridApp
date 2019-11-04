const proxy = "https://bypasscors.herokuapp.com/api/?url=";
const clubEntropia = `${proxy}http://club.entropia.de/status.json`;
let statusHTML = document.querySelector('.status');
var timer = setInterval(getStatus, 10000);
getStatus();

function getStatus() {
    fetch(clubEntropia)
        .then(data => {

            data.json().then(text => {
                console.log(text);
                statusHTML.textContent = text.club_offen;
            })

        });
}
