async function getJSON(URL) {
    const req = new Request(URL);
    try {
        const res = (await fetch(req)).json();
        return res;
    } catch(err) {
        return {"error" : err};
    }
}

function $(elementID) {
    return document.getElementById(elementID);
}

const snailJudge = new brain.NeuralNetwork();
var snailJudgeTrained = false;
var trainingData;

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['innerShellColor','shellColor','bodyColorLow','bodyColorHigh','snailSize','snailSpeed','ss_battery','ss_mysnail','ss_water','ss_screentime','ss_funfact','ss_news','showSnail']).then((result) => {
        if (result.innerShellColor == undefined) {
            revert();
        } else {
            document.body.style.backgroundColor = (result.innerShellColor);
            $('innerShellColor').value = result.innerShellColor;
            $('shellColor').value = result.shellColor;
            $('bodyColorLow').value = result.bodyColorLow;
            $('bodyColorHigh').value = result.bodyColorHigh;
            $('sizeAdjust').value = parseInt(result.snailSize);
            $('sizeAdjust').value = parseInt(result.snailSize);
            $('snailSpeed').value = parseInt(result.snailSpeed);
        }
        if (result.ss_news == undefined) {
            chrome.storage.sync.set({'ss_battery' : true, 'ss_mysnail' : true, 'ss_water' : true, 'ss_screentime' : true, 'ss_funfact' : true, 'ss_news' : true});
        } else if ($("speech") != null) {
            $('ss_battery').checked = result.ss_battery;
            $('ss_mysnail').checked = result.ss_mysnail;
            $('ss_water').checked = result.ss_water;
            $('ss_screentime').checked = result.ss_screentime;
            $('ss_funfact').checked = result.ss_funfact;
            $('ss_news').checked = result.ss_news;
        }
        if ($("showSnail") != null) {
            $("showSnail").checked = result.showSnail;
        }
    });
    $("sliders").addEventListener('click', updateStorage, false);
    $("submit").addEventListener('click', updateStorage, false);
    $("sliders").addEventListener('input', function() {
        snail.setSize($("sizeAdjust").value/100);
        snail.speed = $("snailSpeed").value/100;
        if (
            $("sizeAdjust").value == $("sizeAdjust").min ||
            $("sizeAdjust").value == $("sizeAdjust").max ||
            $("snailSpeed").value == $("snailSpeed").min ||
            $("snailSpeed").value == $("snailSpeed").max
        ) {
            updateStorage();
        }
    }, false);
    if ($("speech") != null) {
        $("speech").addEventListener('input', function() {
            chrome.storage.sync.set({
                'ss_battery' : $('ss_battery').checked,
                'ss_mysnail' : $('ss_mysnail').checked,
                'ss_water' : $('ss_water').checked,
                'ss_screentime' : $('ss_screentime').checked,
                'ss_funfact' : $('ss_funfact').checked,
                'ss_news' : $('ss_news').checked
            });
        }, false);
    }
    if ($("showSnail") != null) {
        $("showSnail").addEventListener('input', function() {
            setTimeout(function() {
                chrome.storage.sync.set({'showSnail' : $("showSnail").checked });
            }, 700);
        }, false);
    }
    $("revert").addEventListener('click', revert, false);
    $("randomize").addEventListener('click', function() {
        $("randomize").disabled = "true";
        document.documentElement.style.cursor = "progress";
        if (!snailJudgeTrained) {
            getJSON("https://technology-snail.github.io/MySnail/resources/ai_snail_training_data.json").then(function(x) {
                if (x.error == undefined) {
                    setTimeout(function() {
                        trainingData = x;
                        snailJudge.train(trainingData);
                        snailJudgeTrained = true;
                        randomize();
                        $("randomize").disabled = '';
                        document.documentElement.style.cursor = "default";
                    }, 500);
                } else {
                    if (confirm("ERROR!\n\nSomething went wrong while fetching the snail judge's training data.  The snail judge is an AI that is meant to determine what color combinations go well together, and it is necessary for nicely randomizing the colors on your snail.\n\nWould you like to randomize without the AI this time? (Color combo may be terrible, but you can always change it.)")) {
                        $("innerShellColor").value = generateColor();
                        $("shellColor").value = generateColor();
                        $("bodyColorLow").value = generateColor();
                        $("bodyColorHigh").value = generateColor();
                        updateStorage();
                    }
                }
            });
        } else {
            setTimeout(function() {
                randomize();
                $("randomize").disabled = '';
                document.documentElement.style.cursor = "default";
            }, 500);
        }
    }, false);
},false);

function updateStorage() {
    document.body.style.backgroundColor = $("innerShellColor").value;
    chrome.storage.sync.set({
        'innerShellColor' : $("innerShellColor").value,
        'shellColor' : $("shellColor").value,
        'bodyColorLow' : $("bodyColorLow").value,
        'bodyColorHigh' : $("bodyColorHigh").value,
        'snailSize' : $("sizeAdjust").value,
        'snailSpeed' : $("snailSpeed").value
    });
    snail.getInfoFromPopup();
}

function revert() {
    if (confirm("Are you sure you want to revert your snail to default?  The snail's colors, size, and speed will all be changed to their default values.")) {
        $("innerShellColor").value = "#00f2ff";
        $("shellColor").value = "#003fff";
        $("bodyColorLow").value = "#ffaa00";
        $("bodyColorHigh").value = "#ffe500";
        $("sizeAdjust").value = "25";
        $("snailSpeed").value = "20";
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
    $("innerShellColor").value = c1;
    $("shellColor").value = c2;
    $("bodyColorLow").value = c3;
    $("bodyColorHigh").value = c4;
    updateStorage();
}
