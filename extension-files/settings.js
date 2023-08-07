document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['innerShellColor']).then((result) => {
        if (result.innerShellColor == undefined) {
            revert();
        } else {
            document.body.style.backgroundColor = (result.innerShellColor);
            document.getElementById('innerShellColor').value = (result.innerShellColor);
            chrome.storage.sync.get(['shellColor']).then((result) => {
                document.getElementById('shellColor').value = (result.shellColor);
            });
            chrome.storage.sync.get(['bodyColorLow']).then((result) => {
                document.getElementById('bodyColorLow').value = (result.bodyColorLow);
            });
            chrome.storage.sync.get(['bodyColorHigh']).then((result) => {
                document.getElementById('bodyColorHigh').value = (result.bodyColorHigh);
            });
            chrome.storage.sync.get(['snailSize']).then((result) => {
                document.getElementById('sizeAdjust').value = parseInt(result.snailSize);
            });
            chrome.storage.sync.get(['snailSize']).then((result) => {
                document.getElementById('sizeAdjust').value = parseInt(result.snailSize);
            });
            chrome.storage.sync.get(['snailSpeed']).then((result) => {
                document.getElementById('snailSpeed').value = parseInt(result.snailSpeed);
            });
        }
    });
    document.getElementById("sliders").addEventListener('click', updateStorage, false);
    document.getElementById("submit").addEventListener('click', updateStorage, false);
    document.getElementById("revert").addEventListener('click', revert, false);
    document.getElementById("randomize").addEventListener('click', randomize, false);
},false);

function updateStorage() {
    document.body.style.backgroundColor = document.getElementById("innerShellColor").value;
    chrome.storage.sync.set({'innerShellColor' : document.getElementById("innerShellColor").value});
    chrome.storage.sync.set({'shellColor' : document.getElementById("shellColor").value});
    chrome.storage.sync.set({'bodyColorLow' : document.getElementById("bodyColorLow").value});
    chrome.storage.sync.set({'bodyColorHigh' : document.getElementById("bodyColorHigh").value});
    chrome.storage.sync.set({'snailSize' : document.getElementById("sizeAdjust").value});
    chrome.storage.sync.set({'snailSpeed' : document.getElementById("snailSpeed").value});
    mySnail.getInfoFromPopup();
    mySnail.frozen = true;
}

function revert() {
    document.getElementById("innerShellColor").value = "#00f2ff";
    document.getElementById("shellColor").value = "#003fff";
    document.getElementById("bodyColorLow").value = "#ffaa00";
    document.getElementById("bodyColorHigh").value = "#ffe500";
    document.getElementById("sizeAdjust").value = "25";
    document.getElementById("snailSpeed").value = "20";
    updateStorage();
}

function generateColor() {
    var output = '';
    for (i = 0; i < 6; i++) {
        output += (Math.floor(Math.random()*16).toString(16));
    }
    return "#" + output;
}

function randomize() {
    document.getElementById("innerShellColor").value = generateColor();
    document.getElementById("shellColor").value = generateColor();
    document.getElementById("bodyColorLow").value = generateColor();
    document.getElementById("bodyColorHigh").value = generateColor();
    updateStorage();
}

mySnail.frozen = true;