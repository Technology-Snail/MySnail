var mySnail_version = "2.0.0";

var noprint = document.createElement("style");
noprint.innerHTML = "@media print {.mySnail{display:none !important}}";
document.head.appendChild(noprint);

class mySnail {
    constructor(Freeze = false, InfoFromPopup = true, Size = 0.25, Speed = 0.4, Colors = ["#00f2ff", "#003fff", "#ffaa00", "#ffe500"]) {
        this.randomID = Math.random().toString(16).slice(2);
        this.gotSizeInfo = false;
        this.speed = Speed;
        this.frozen = Freeze;
        this.queuing = [];
        this.readingSpeed = 0.044;
        this.wordBubble = document.createElement("div");
        this.wordBubble.style = "cursor:alias;position:fixed;overflow:visible;padding:12px;background-color:white;border:solid black 2px;border-radius:21px;border-bottom-right-radius:0px;box-shadow:#000a -2px 5px 5px;font-family:'Arial Rounded MT Bold','Asap SemiBold','Rounded Mplus 1c Bold',FairyMuffinRoundPop,'Gill Sans','Trebuchet MS',sans-serif;font-size:12pt;width:270px;color:black;margin-bottom:0px;bottom:-5px;right:-1000px;display:none";
        this.wordBubble.classList = ["mySnail"];
        this.wordBubble.title = "Click to close";
        this.wordBubble.onclick = () => {
            window.clearTimeout(this.stopSpeaking);
            this.hideBubble();
        }
        this.snail = document.createElement("div");
        this.snail.innerHTML = '<svg width="175px" height="90px" style="background:none" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs><linearGradient id="'+this.randomID+'_mySnail_snailBodyGradient" spreadMethod="pad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ffe500" stop-opacity="1"/><stop offset="1" stop-color="#ffaa00" stop-opacity="1"/></linearGradient><radialGradient cx="0.5" cy="0.5" id="'+this.randomID+'_mySnail_snailShellGradient" r="0.5" spreadMethod="pad"><stop offset="0" stop-color="#00f2ff" stop-opacity="1"/><stop offset="1" stop-color="#003fff" stop-opacity="1"/></radialGradient></defs><g transform="scale(0.25 0.25)"><g><g><polygon fill="#ffe500" points="613.5501098632812,95.53179931640625 460.68084716796875,100.63578796386719 460.68084716796875,90.42781066894531 613.5501098632812,95.53179931640625 " stroke="#000000" stroke-width="0" transform="rotate(-89.9363 537.115 95.5318)"/><circle cx="537.214286" cy="24.642857" fill="#ffe500" r="7" stroke="#000000" stroke-width="0"/><circle cx="537.17" cy="25" fill="#000000" opacity="0.7" r="5" stroke-width="0"/><animatetransform attributename="transform" type="rotate" values="7 538.5 167.5;30 538.5 167.5;7 538.5 167.5" dur="2.7s" repeatCount="indefinite"/></g><g><polygon fill="#ffe500" points="663.9853515625,103.45901489257812 511.1160583496094,108.74237060546875 511.1160583496094,98.1756591796875 663.9853515625,103.45901489257812 " stroke="#000000" stroke-width="0" transform="rotate(-68.3194 587.551 103.459)"/><circle cx="613.214286" cy="38.5" fill="#ffe500" r="7" stroke="#000000" stroke-width="0"/><circle cx="613.33331" cy="38.7" fill="#000000" opacity="0.7" r="5" stroke-width="0"/><animatetransform attributename="transform" type="rotate" values="12 562.5 167.5;30 562.5 167.5;12 562.5 167.5" dur="2.7s" repeatCount="indefinite"/></g><path d="m163.368212,305.262973l-162.368212,54.59702l385.806247,0c26.172469,0.80153 32.473641,-4.59228 40.228539,-7.6538c7.754898,-3.0615 31.988958,-12.24605 56.223018,-30.61514c24.23406,-18.36909 43.621306,-37.75869 61.069832,-66.33282c17.448526,-28.57414 22.317935,-43.02544 24.718742,-53.57652c2.400816,-10.55108 0.484682,-19.89984 -0.969355,-24.49211c-1.454057,-4.59227 -9.18635,-12.70157 -15.487211,-14.28707c-6.300861,-1.5855 -18.767059,-1.57872 -28.94534,7.03405c-10.178281,8.61277 -21.968777,21.02983 -35.055172,34.80665c-13.086395,13.77682 -25.688107,27.04338 -43.621315,33.67676c-17.933199,6.63329 -87.728496,37.21217 -163.822414,48.61515c-76.093919,11.40298 -117.777358,18.22793 -117.777358,18.22793l-0.000001,-0.0001z" fill="url(#'+this.randomID+'_mySnail_snailBodyGradient)" stroke="#000000" stroke-width="0"/><path d="m361.670272,270.180469c25.29,-83.30195 117.40171,-72.27745 94.39624,-120.97221c-23.00549,-48.69478 -43.14098,-71.11049 -67.97228,-90.85865c-24.8313,-19.74816 -65.64113,-39.89605 -107.72158,-42.90429c-42.08046,-3.00824 -83.24078,2.45884 -125.89957,22.99591c-42.65879,20.53708 -71.73613,55.90715 -84.93687,90.65911c-13.20074,34.75196 -14.11622,69.3778 -9.03773,98.21888c5.07848,28.84106 17.98048,53.17841 34.84439,74.01823c16.86391,20.83983 38.17815,37.04098 78.08951,47.13716c39.91138,10.09617 65.43926,5.18866 85.90439,0.93363c20.46514,-4.25505 52.41772,-18.15107 67.49728,-31.97995c15.07959,-13.82886 31.08454,-31.08669 38.61227,-58.16827c7.52773,-27.0816 10.18726,-51.58478 -2.6448,-85.22298c-12.83206,-33.63819 -35.03291,-54.24576 -71.69744,-64.83234c-36.66452,-10.58657 -77.49438,-7.9096 -105.49931,9.11055c-28.00493,17.02016 -42.59616,37.48875 -45.91655,67.48432c-3.32039,29.99557 7.20064,48.66875 16.36361,60.16397c9.16296,11.49523 29.33394,29.14189 62.32332,30.85606c32.98938,1.71419 59.53109,-10.81277 72.58216,-27.58879c13.05106,-16.77602 14.18166,-43.38196 6.36225,-59.05621c-7.81941,-15.67427 -24.99549,-26.77515 -45.46063,-26.77515c-20.46514,0 -37.12442,11.17657 -38.7326,22.67179c-1.60816,11.49522 9.65057,22.0061 17.72891,25.19738" fill="url(#'+this.randomID+'_mySnail_snailShellGradient)" stroke="#ffffff" stroke-width="2" transform="rotate(30 258.68 184.55)"/><path d="m527.7,186.7c0,0 5.33333,11 13.33333,12c8,1 12,-3 17,-9.33333" fill-opacity="0" opacity="0.5" stroke="#000000" stroke-width="2" transform="rotate(4.26477 542.833 192.743)"/></g></g></svg>';
        this.snail.style = 'position:fixed;margin-bottom:0px;bottom:-5px;left:-1000px;padding:0px;pointer-events:none;background:none';
        this.snail.classList = ["mySnail"];
        if (InfoFromPopup) {
            this.getInfoFromPopup();
        } else {
            this.speed = Speed * (1 + 0.2*Math.cos(Math.random()*Math.PI));
            this.setSize(Size);
            this.setColors(Colors);
            this.x = -700 * this.size;
            this.gotSizeInfo = true;
        }
        document.documentElement.appendChild(this.snail);
        document.documentElement.appendChild(this.wordBubble);
        this.interval = window.setInterval(() => {
            if (!this.frozen) {
                this.x += this.speed;
                this.wordBubble.style.right = (window.innerWidth - this.x - this.size*470).toString() + "px";
            } else {
                this.x = 0;
            }
            this.snail.style.left = this.x.toString()+"px";
            if (this.x > window.innerWidth || this.x < -700*this.size) { this.x = -700*this.size; }
            if (this.queuing.length > 0) {
                if (!document.hidden && this.visible() && snail.x > 270 && snail.x < 0.7*window.innerWidth && !this.showingBubble()) {
                    var snailMessage = this.queuing.pop();
                    this.text(snailMessage);
                }
            }
        }, 15); // 70fps
    }
    setSize(newSize) {
        this.size = newSize;
        this.snail.children[0].style.height = (360 * newSize).toString();
        this.snail.children[0].style.width = (700 * newSize).toString();
        this.snail.children[0].children[1].attributes.transform.value = "scale(" + newSize.toString() + " " + newSize.toString() + ")";
        this.wordBubble.style.bottom = (400 * newSize).toString() + "px";
    }
    setColors(colorList = ["#00f2ff", "#003fff", "#ffaa00", "#ffe500"]) {
        this.snail.children[0].children[0].children[1].children[0].attributes[1].value = colorList[0]; // Inner shell colour
        this.snail.children[0].children[0].children[1].children[1].attributes[1].value = colorList[1]; // Outer shell colour
        this.snail.children[0].children[0].children[0].children[1].attributes[1].value = colorList[2]; // Lower body colour
        this.snail.children[0].children[0].children[0].children[0].attributes[1].value = colorList[3]; // Upper body colour
        // Antennae colour:
        this.snail.children[0].children[1].children[0].children[0].children[0].attributes.fill.value = colorList[3];
        this.snail.children[0].children[1].children[0].children[0].children[1].attributes.fill.value = colorList[3];
        this.snail.children[0].children[1].children[0].children[1].children[0].attributes.fill.value = colorList[3];
        this.snail.children[0].children[1].children[0].children[1].children[1].attributes.fill.value = colorList[3];
    }
    getInfoFromPopup() {
        chrome.storage.sync.get(['innerShellColor','shellColor','bodyColorLow','bodyColorHigh','snailSize','snailSpeed','showSnail']).then((result) => {
            if (result.shellColor == undefined) {
                this.setColors(["#00f2ff", "#003fff", "#ffaa00", "#ffe500"]);
            } else {
                this.setColors([result.innerShellColor, result.shellColor, result.bodyColorLow, result.bodyColorHigh]);
            }
            if (result.snailSize == undefined) {
                this.setSize(0.25);
            } else {
                this.setSize(parseInt(result.snailSize)/100);
            }
            if (result.snailSpeed == undefined) {
                this.speed = 0.4;
            } else {
                this.speed = parseInt(result.snailSpeed)/100;
            }
            this.speed *= 1 + 0.2*Math.cos(Math.random()*Math.PI);
            if (!this.gotSizeInfo) {
                this.x = -700 * this.size;
                this.gotSizeInfo = true;
            }
            if (result.showSnail == false) {
                this.hide();
            } else {
                this.show();
            }
        });
        chrome.storage.sync.onChanged.addListener(() => {
            this.getInfoFromPopup();
        });
    }
    hide() {
        this.snail.style.display = "none";
    }
    show() {
        this.snail.style.display = '';
    }
    visible() {
        return !(this.snail.style.display == "none");
    }
    hideBubble() {
        this.wordBubble.style.display = "none";
    }
    showBubble() {
        this.wordBubble.style.display = '';
    }
    showingBubble() {
        return !(this.wordBubble.style.display == "none");
    }
    getText() {
        return this.wordBubble.innerHTML;
    }
    text(words, durationSeconds = 0) {
        this.wordBubble.innerHTML = words;
        this.showBubble();
        if (durationSeconds != 0) {
            this.stopSpeaking = window.setTimeout(() => {
                this.hideBubble();
            }, 1000*durationSeconds);
        }
    }
    queue(message) {
        this.queuing.push(message);
    }
}

function todayID() {
    var today = new Date();
    return (367*today.getFullYear() + 32*today.getMonth() + today.getDate()).toString();
}

async function getJSON(URL) {
    const req = new Request(URL);
    req.cache = "no-store";
    try {
        const res = (await fetch(req)).json();
        return res;
    } catch(err) {
        return {"error" : err};
    }
}

const snail = new mySnail();

chrome.storage.sync.get(['ss_battery','ss_mysnail','ss_water','ss_screentime','ss_funfact','ss_news','snail_lastFunfact','snail_lastNews']).then((result) => {
    whatSnailShouldSay = result;
    if (whatSnailShouldSay.ss_news == undefined) {
        whatSnailShouldSay = {'ss_battery' : true, 'ss_mysnail' : true, 'ss_water' : true, 'ss_screentime' : true, 'ss_funfact' : true, 'ss_news' : true};
        chrome.storage.sync.set(whatSnailShouldSay);
    }
});

window.addEventListener("load", () => {
    navigator.getBattery().then(function(battery) {
        battery.onlevelchange = () => {
            if (whatSnailShouldSay.ss_battery && !battery.charging && battery.level <= 0.05 && battery.level > 0) {
                if (battery.level <= 0.01) {
                    snail.queue("YOUR COMPUTER BATTERY IS AT 1%!  PLUG IN YOUR COMPUTER IMMEDIATELY!");
                } else if (Math.random() > 0.5) {
                    snail.queue("Plug in your computer soon!  You are at " + Math.round(100*battery.level).toString() + "% right now.", 7);
                } else {
                    snail.queue("Your computer battery is at " + Math.round(100*battery.level).toString() + "%.  You may want to charge your computer soon.", 7);
                }
            }
        }
        battery.onchargingchange = () => {
            if (battery.charging) {
                if (snail.getText().toLowerCase().indexOf("your computer") != -1) {
                    snail.hideBubble();
                }
            } else if (battery.level <= 0.1) {
                snail.queue("Your computer has come unplugged and is not currently charging, but the battery is at " + Math.round(100*battery.level).toString() + "%.  You may want to plug your computer back in.", 7);
            }
        }
    });
    if (whatSnailShouldSay.ss_funfact || whatSnailShouldSay.ss_news) {
        getJSON("https://sheets.googleapis.com/v4/spreadsheets/1dg2Js_kdY-Y-EAkjrBOrHJosHM8yPHLN1oZB5a9SXXk/values/by_date!C2:E?key=AIzaSyAQnxcD0daH7TggZSWS_RyvTBE6y2FakZE&majorDimension=COLUMNS").then(function(x) {
            if (x.error == undefined) {
                if (x.values[0].indexOf(todayID()) != -1) {
                    if (whatSnailShouldSay.ss_funfact && whatSnailShouldSay.snail_lastFunfact != todayID()) {
                        snail.queue(x.values[1][x.values[0].indexOf(todayID())]);
                        snailFunfactWait = window.setInterval(function() {
                            if (snail.queuing.length == 0) {
                                chrome.storage.sync.set({'snail_lastFunfact' : todayID()});
                                window.clearInterval(snailFunfactWait);
                            }
                        }, 2000);
                    }
                    if (whatSnailShouldSay.ss_news && whatSnailShouldSay.snail_lastNews != todayID() && parseInt(Date.call().slice(16,18)) >= 12 && x.values[2][x.values[0].indexOf(todayID())]) {
                        snail.queue(x.values[2][x.values[0].indexOf(todayID())]);
                        snailNewsWait = window.setInterval(function() {
                            if (snail.queuing.length == 0) {
                                chrome.storage.sync.set({'snail_lastNews' : todayID()});
                                window.clearInterval(snailNewsWait);
                            }
                        }, 2000);
                    }
                } else {
                    console.warn("A fun fact has not been posted to the snail's system for today.  Please contact email.technologysnail@gmail.com immediately to let us know.");
                }
            }
        });
    }
    if (whatSnailShouldSay.ss_mysnail) {
        getJSON("https://sheets.googleapis.com/v4/spreadsheets/1dg2Js_kdY-Y-EAkjrBOrHJosHM8yPHLN1oZB5a9SXXk/values/live!B:D?key=AIzaSyAQnxcD0daH7TggZSWS_RyvTBE6y2FakZE&majorDimension=ROWS").then(function(x) {
            if (x.error == undefined) {
                if (x.values[0][0] != mySnail_version && x.values[0][1] == "TRUE") {
                    snail.queue(x.values[0][2]);
                }
            }
        });
    }
});
