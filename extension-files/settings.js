async function getJSON(URL) {
    const req = new Request(URL);
    try {
        const res = (await fetch(req)).json();
        return res;
    } catch(err) {
        return {"error" : err};
    }
}

const snailJudge = new brain.NeuralNetwork();
var trainingData;

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['innerShellColor','shellColor','bodyColorLow','bodyColorHigh','snailSize','snailSpeed','ss_battery','ss_mysnail','ss_water','ss_screentime','ss_funfact','ss_news']).then((result) => {
        if (result.innerShellColor == undefined) {
            revert();
        } else {
            document.body.style.backgroundColor = (result.innerShellColor);
            document.getElementById('innerShellColor').value = result.innerShellColor;
            document.getElementById('shellColor').value = result.shellColor;
            document.getElementById('bodyColorLow').value = result.bodyColorLow;
            document.getElementById('bodyColorHigh').value = result.bodyColorHigh;
            document.getElementById('sizeAdjust').value = parseInt(result.snailSize);
            document.getElementById('sizeAdjust').value = parseInt(result.snailSize);
            document.getElementById('snailSpeed').value = parseInt(result.snailSpeed);
        }
        if (result.ss_news == undefined) {
            chrome.storage.sync.set({'ss_battery' : true, 'ss_mysnail' : true, 'ss_water' : true, 'ss_screentime' : true, 'ss_funfact' : true, 'ss_news' : true});
        } else {
            document.getElementById('ss_battery').checked = result.ss_battery;
            document.getElementById('ss_mysnail').checked = result.ss_mysnail;
            document.getElementById('ss_water').checked = result.ss_water;
            document.getElementById('ss_screentime').checked = result.ss_screentime;
            document.getElementById('ss_funfact').checked = result.ss_funfact;
            document.getElementById('ss_news').checked = result.ss_news;
        }
    });
    document.getElementById("sliders").addEventListener('click', updateStorage, false);
    document.getElementById("submit").addEventListener('click', updateStorage, false);
    document.getElementById("sliders").addEventListener('input', function() {
        snail.setSize(document.getElementById("sizeAdjust").value/100);
        snail.speed = document.getElementById("snailSpeed").value/100;
    }, false);
        document.getElementById("speech").addEventListener('input', function() {
            chrome.storage.sync.set({
                'ss_battery' : document.getElementById('ss_battery').checked,
                'ss_mysnail' : document.getElementById('ss_mysnail').checked,
                'ss_water' : document.getElementById('ss_water').checked,
                'ss_screentime' : document.getElementById('ss_screentime').checked,
                'ss_funfact' : document.getElementById('ss_funfact').checked,
                'ss_news' : document.getElementById('ss_news').checked
            });
        }, false);
    document.getElementById("revert").addEventListener('click', revert, false);
    document.getElementById("randomize").addEventListener('click', function() {
        document.getElementById("randomize").disabled = "true";
        document.documentElement.style.cursor = "progress";
        getJSON("https://technology-snail.github.io/MySnail/resources/ai_snail_training_data.json").then(function(x) {
            if (x.error == undefined) {
                setTimeout(function() {
                    trainingData = x;
                    snailJudge.train(trainingData);
                    randomize();
                    document.getElementById("randomize").disabled = '';
                    document.documentElement.style.cursor = "default";
                }, 500);
            } else {
                if (confirm("<h1>ERROR:</h1>Something went wrong while fetching the snail judge's training data.  The snail judge is an AI that is meant to determine what color combinations go well together, and is necessary for randomizing the colors on your snail nicely.<h3>Would you like to randomize without the AI this time? (Color combo may be terrible, but you can always change it.)</h3>")) {
                    document.getElementById("innerShellColor").value = generateColor();
                    document.getElementById("shellColor").value = generateColor();
                    document.getElementById("bodyColorLow").value = generateColor();
                    document.getElementById("bodyColorHigh").value = generateColor();
                    updateStorage();
                }
            }
        });
    }, false);
},false);

function updateStorage() {
    document.body.style.backgroundColor = document.getElementById("innerShellColor").value;
    chrome.storage.sync.set({
        'innerShellColor' : document.getElementById("innerShellColor").value,
        'shellColor' : document.getElementById("shellColor").value,
        'bodyColorLow' : document.getElementById("bodyColorLow").value,
        'bodyColorHigh' : document.getElementById("bodyColorHigh").value,
        'snailSize' : document.getElementById("sizeAdjust").value,
        'snailSpeed' : document.getElementById("snailSpeed").value
    });
    snail.getInfoFromPopup();
}

function revert() {
    if (confirm("Are you sure you want to revert your snail to default?  The snail's colors, size, and speed will all be changed to their default values.")) {
        document.getElementById("innerShellColor").value = "#00f2ff";
        document.getElementById("shellColor").value = "#003fff";
        document.getElementById("bodyColorLow").value = "#ffaa00";
        document.getElementById("bodyColorHigh").value = "#ffe500";
        document.getElementById("sizeAdjust").value = "25";
        document.getElementById("snailSpeed").value = "20";
        updateStorage();
    }
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
    while (true) {
        c1 = generateColor();
        c2 = generateColor();
        c3 = generateColor();
        c4 = generateColor();
        var decree = snailJudge.run([red(c1), grn(c1), blu(c1), red(c2), grn(c2), blu(c2), red(c3), grn(c3), blu(c3), red(c4), grn(c4), blu(c4)]);
        quality = decree.good;
        if (quality == 1) {
            break;
        }
    }
    document.getElementById("innerShellColor").value = c1;
    document.getElementById("shellColor").value = c2;
    document.getElementById("bodyColorLow").value = c3;
    document.getElementById("bodyColorHigh").value = c4;
    updateStorage();
}
