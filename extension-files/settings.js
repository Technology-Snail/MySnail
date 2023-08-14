async function getJSON(URL) {
    const req = new Request(URL);
    const res = (await fetch(req)).json();
    return res;
}

const snailJudge = new brain.NeuralNetwork();
var trainingData;

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
    document.getElementById("randomize").addEventListener('click', function() {
        document.getElementById("randomize").disabled = "true";
        document.documentElement.style.cursor = "progress";
        getJSON("https://raw.githubusercontent.com/Technology-Snail/MySnail-Chrome-Extension/main/resources/ai_snail_training_data.json").then(function(x) {
            trainingData = x;
            snailJudge.train(trainingData);
            randomize();
            document.getElementById("randomize").disabled = '';
            document.documentElement.style.cursor = "default";
        });
    }, false);
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

function red(Color) { return Math.round(100*parseInt(Color.substr(1, 2), 16)/255)/100; }
function grn(Color) { return Math.round(100*parseInt(Color.substr(3, 2), 16)/255)/100; }
function blu(Color) { return Math.round(100*parseInt(Color.substr(5, 2), 16)/255)/100; }

function randomize() {
    var c1, c2, c3, c4, quality;
    for (var i = 1; i > 0.5; i *= 0.99) {
        c1 = generateColor();
        c2 = generateColor();
        c3 = generateColor();
        c4 = generateColor();
        var decree = snailJudge.run([red(c1), grn(c1), blu(c1), red(c2), grn(c2), blu(c2), red(c3), grn(c3), blu(c3), red(c4), grn(c4), blu(c4)]);
        quality = decree.good;
        if (quality > i) {
            i = 0;
        }
    }
    console.log("AI Sucessfully Generated Random Snail of Quality:");
    console.log(quality*100);
    document.getElementById("innerShellColor").value = c1;
    document.getElementById("shellColor").value = c2;
    document.getElementById("bodyColorLow").value = c3;
    document.getElementById("bodyColorHigh").value = c4;
    updateStorage();
}

mySnail.frozen = true;
