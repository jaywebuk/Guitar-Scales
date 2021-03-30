/**
 *
 * @author Jason Robinson
 * @copyright Jason Robinson 2016 - 2021
 *
 **/

var eId = document.getElementById.bind(document);

const status = response => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};

const json = response => {
    return response.json();
};

let showNotes = true,
    showFrets = true,
    key = "E",
    majorScale,
    scale,
    scaleMode = "Major",
    tuning = "standardE",
    scaleData,
    chordNums = {};

const show_frets_notes = showThis => {
    const fret_notes = document.querySelectorAll(".fretNote");
    const fret_nums = document.querySelectorAll(".fret-num");
    switch (showThis) {
        case "show-notes":
            if (showNotes === true) {
                fret_notes.forEach((el) => {
                    el.style.visibility = "hidden";
                });
                showNotes = false;
            } else {
                fret_notes.forEach((el) => {
                    el.style.visibility = "visible";
                });
                showNotes = true;
            }
            break;
        case "show-frets":
            if (showFrets === true) {
                fret_nums.forEach((el) => {
                    el.style.visibility = "hidden";
                });
                showFrets = false;
            } else {
                fret_nums.forEach((el) => {
                    el.style.visibility = "visible";
                });
                showFrets = true;
            }
            break;
    }
};

const frets_note_buttons = document.querySelectorAll(".button");
frets_note_buttons.forEach((el) => {
    el.addEventListener("click", () => {
        show_frets_notes(el.id);
    });
});

const clearBoard = () => {
    const finger = document.querySelectorAll(".finger");
    const finger0 = document.querySelectorAll(".finger0");

    finger.forEach((el) => {
        el.style.visibility = "hidden";
        el.childNodes[1].style.display = "none";
        el.style.backgroundColor = "darkgreen";
    });

    finger0.forEach((el) => {
        el.style.visibility = "hidden";
        el.style.backgroundColor = "darkgreen";
    });
    return true;
};

const changeMode = thisMode => {
    scaleMode = thisMode;
    displayScale();
};

const changeTuning = thisTuning => {
    tuning = thisTuning;
    displayScale();
};

const changeFingerboard = wood => {
    const dots = document.querySelectorAll(".dots");
    const necks = document.querySelectorAll(".neck");
    switch (wood.value) {
        case "rosewood":
            neckColor = "#460e00";
            dotColor = "#ccc";
            fretNutColor = "#FAEBD7";
            break;
        case "ebony":
            neckColor = "#160b03";
            dotColor = "#ccc";
            fretNutColor = "#FAEBD7";
            break;
        default:
            neckColor = "#ffe5cc";
            dotColor = "#333";
            fretNutColor = "#000";
            break;
    }

    necks.forEach((el) => {
        el.style.backgroundColor = neckColor;
    });
    dots.forEach((el) => {
        el.style.backgroundColor = dotColor;
    });

    eId("fretNut").style.borderColor = fretNutColor;
};

const getScale = thisKey => {
    key = thisKey;
    eId("loading").style.display = "block";
    const modeSelect = eId("modeSelect");
    const Natural_Minor = eId("Natural_Minor");
    const Harmonic_Minor = eId("Harmonic_Minor");
    const Melodic_Minor = eId("Melodic_Minor");

    switch (key) {
        case "Db":
            Natural_Minor.setAttribute("disabled", "disabled");
            Natural_Minor.textContent = "Natural Minor - Use C#";
            Natural_Minor.style.fontSize = "1.1rem";
            Harmonic_Minor.setAttribute("disabled", "disabled");
            Harmonic_Minor.textContent = "Harmonic Minor - Use C#";
            Harmonic_Minor.style.fontSize = "1.1rem";
            Melodic_Minor.setAttribute("disabled", "disabled");
            Melodic_Minor.textContent = "Melodic Minor - Use C#";
            Melodic_Minor.style.fontSize = "1.1rem";
            if ([7, 8, 9].indexOf(modeSelect.selectedIndex) !== -1) {
                modeSelect.selectedIndex = 0;
                scaleMode = "Major";
            }
            break;
        default:
            Natural_Minor.removeAttribute("disabled");
            Natural_Minor.textContent = "Natural Minor";
            Natural_Minor.style.fontSize = "";
            Harmonic_Minor.removeAttribute("disabled");
            Harmonic_Minor.textContent = "Harmonic Minor";
            Harmonic_Minor.style.fontSize = "";
            Melodic_Minor.removeAttribute("disabled");
            Melodic_Minor.textContent = "Melodic Minor";
            Melodic_Minor.style.fontSize = "";
            break;
    }

    fetch(`get_scale.php?key=${key.replace("#", "sharp")}`)
        .then(status)
        .then(json)
        .then(function (data) {
            eId("loading").style.display = "none";
            scaleData = data;
            displayScale();
        }).catch(function (error) {
            console.error('Request failed', error);
        });
};

const displayScale = () => {
    majorScale = scaleData.Major;
    scale = scaleData[scaleMode];
    clearBoard();
    let fretShift = 0,
        noteShift = 0,
        E2,
        A,
        D,
        G,
        B,
        E,
        chords = MajorChords,
        thisIsAMode = false;

    switch (tuning) {
        case "standardE":
            E2 = Estring;
            A = Astring;
            D = Dstring;
            G = Gstring;
            B = Bstring;
            E = Estring;
            break;
        case "dropD":
            E2 = Dstring;
            A = Astring;
            D = Dstring;
            G = Gstring;
            B = Bstring;
            E = Estring;
            break;
        case "openD":
            E2 = Dstring;
            A = Astring;
            D = Dstring;
            G = fSharpString;
            B = Astring;
            E = Dstring;
            break;
        case "dropC":
            E2 = Cstring;
            A = Gstring;
            D = Cstring;
            G = Fstring;
            B = Astring;
            E = Dstring;
            break;
        case "DADGAD":
            E2 = Dstring;
            A = Astring;
            D = Dstring;
            G = Gstring;
            B = Astring;
            E = Dstring;
            break;
    }

    switch (scaleMode) {
        case "Natural Minor":
            chords = NaturalMinorChords;
            break;
        case "Harmonic Minor":
            chords = HarmonicMinorChords;
            break;
        case "Melodic Minor":
            chords = MelodicMinorChords;
            break;
        case "Minor Pentatonic":
            chords = MinorPentatonicChords;
            break;
        case "Blues":
            chords = BluesChords;
            break;
        case "Dorian":
            fretShift = noteShift = 1;
            scale = scaleData.Major;
            thisIsAMode = true;
            break;
        case "Phrygian":
            fretShift = noteShift = 2;
            scale = scaleData.Major;
            thisIsAMode = true;
            break;
        case "Lydian":
            fretShift = noteShift = 3;
            scale = scaleData.Major;
            thisIsAMode = true;
            break;
        case "Mixolydian":
            fretShift = noteShift = 4;
            scale = scaleData.Major;
            thisIsAMode = true;
            break;
        case "Aeolian":
            fretShift = noteShift = 5;
            scale = scaleData.Major;
            thisIsAMode = true;
            break;
        case "Locrian":
            fretShift = noteShift = 6;
            scale = scaleData.Major;
            thisIsAMode = true;
            break;
    }
    eId("Dorian").textContent = `${majorScale[1]} Dorian`;
    eId("Phrygian").textContent = `${majorScale[2]} Phrygian`;
    eId("Lydian").textContent = `${majorScale[3]} Lydian`;
    eId("Mixolydian").textContent = `${majorScale[4]} Mixolydian`;
    eId("Aeolian").textContent = `${majorScale[5]} Aeolian`;
    eId("Locrian").textContent = `${majorScale[6]} Locrian`;
    eId("scaleTitle").textContent = `${scale[noteShift]} ${scaleMode.replace("_", " ")}`;
    eId("notes").innerHTML = "";

    for (let fretNum = 0; fretNum < 25; fretNum++) {
        eId("fret" + fretNum).style.backgroundColor = "";
        if (fretNum < scale.length + 1) {
            if (fretNum === 0) {
                eId("notes").innerHTML += `<span class="rootNote">${scale[fretNum + noteShift]}</span> `;
            } else if (fretNum > 0 && fretNum < scale.length) {
                if (fretNum + noteShift >= scale.length) {
                    noteShift -= scale.length;
                }

                eId("notes").textContent += `${scale[fretNum + noteShift]} `;
            } else if (fretNum === scale.length) {
                if (fretNum + noteShift >= scale.length) {
                    noteShift -= scale.length;
                }
            }
        }
        for (let jj = 0; jj < scale.length; jj++) {
            for (let ii = 0; ii < 3; ii++) {
                if (E[fretNum][ii] === scale[jj]) {
                    let E1F = eId("E1F" + fretNum);
                    E1F.style.visibility = "visible";
                    E1F.childNodes[1].style.display = "inline";
                    E1F.childNodes[1].textContent = scale[jj];

                    if (E[fretNum][ii] === scale[0 + fretShift]) {
                        E1F.style.backgroundColor = "#005bb1";
                    }
                }

                if (B[fretNum][ii] === scale[jj]) {
                    let BF = eId("BF" + fretNum);
                    BF.style.visibility = "visible";
                    BF.childNodes[1].style.display = "inline";
                    BF.childNodes[1].textContent = scale[jj];

                    if (B[fretNum][ii] === scale[0 + fretShift]) {
                        BF.style.backgroundColor = "#005bb1";
                    }
                }

                if (G[fretNum][ii] === scale[jj]) {
                    GF = eId("GF" + fretNum);
                    GF.style.visibility = "visible";
                    GF.childNodes[1].style.display = "inline";
                    GF.childNodes[1].textContent = scale[jj];

                    if (G[fretNum][ii] === scale[0 + fretShift]) {
                        GF.style.backgroundColor = "#005bb1";
                    }
                }

                if (D[fretNum][ii] === scale[jj]) {
                    DF = eId("DF" + fretNum);
                    DF.style.visibility = "visible";
                    DF.childNodes[1].style.display = "inline";
                    DF.childNodes[1].textContent = scale[jj];

                    if (D[fretNum][ii] === scale[0 + fretShift]) {
                        DF.style.backgroundColor = "#005bb1";
                    }
                }

                if (A[fretNum][ii] === scale[jj]) {
                    AF = eId("AF" + fretNum);
                    AF.style.visibility = "visible";
                    AF.childNodes[1].style.display = "inline"
                    AF.childNodes[1].textContent = scale[jj];

                    if (A[fretNum][ii] === scale[0 + fretShift]) {
                        AF.style.backgroundColor = "#005bb1";
                    }
                }

                if (E2[fretNum][ii] === scale[jj]) {
                    E2F = eId("E2F" + fretNum);
                    E2F.style.visibility = "visible";
                    E2F.childNodes[1].style.display = "inline";
                    E2F.childNodes[1].textContent = scale[jj];

                    if (E2[fretNum][ii] === scale[0 + fretShift]) {
                        E2F.style.backgroundColor = "#005bb1";
                    }
                }
            }
        }
    }
    if (thisIsAMode === true) {
        eId("scaleTitle").textContent += ` '${scale[0]}'`;
    }

    if (tuning === "standardE") {
        eId("notes").textContent += ' "Standard E"';
    }
    if (tuning === "dropD") {
        eId("notes").textContent += ' "Drop D"';
    }
    if (tuning === "openD") {
        eId("notes").textContent += ' "Open D"';
    }
    if (tuning === "dropC") {
        eId("notes").textContent += ' "Drop C"';
    }
    if (tuning === "DADGAD") {
        eId("notes").textContent += ' "DADGAD"';
    }

    if (scaleMode === "Blues") {
        eId("chords-body").textContent = "CHORDS COMING SOON";
    } else {
        eId("chords-body").innerHTML = "";
        for (let ii = 0; ii < chords.length; ii++) {
            let folder = scale[ii];
            eId("chords-body").innerHTML += `<div id="chord${ii}" class="chord-container" data-key="${scale[ii]}" data-mode="${chords[ii]}"></div>`;
            eId("chord" + ii).innerHTML += `<h2>${scale[ii]} ${chords[ii]}</h2>`;
            eId("chord" + ii).innerHTML +=
                '<img class="chord-image" src="images/Chords/' +
                folder.replace("#", "sharp").replace("b", "flat") +
                "/" +
                chords[ii] +
                "/" +
                scale[ii].replace("#", "sharp").replace("b", "flat") +
                "_" +
                chords[ii].replace("#", "sharp").replace("b", "flat") +
                '1.png" alt="' +
                scale[ii] +
                " " +
                chords[ii] +
                '">';
        }
    }

    let chordContainers = document.querySelectorAll(".chord-container");
    chordContainers.forEach((el) => {
        el.addEventListener("click", chord_click);
    });

    eId("more-chords-close").addEventListener("click", () => {
        eId("more-chords").style.display = "none";
        chordContainers.forEach((el) => {
            el.addEventListener("click", chord_click);
            el.style.opacity = "1";
        });
    });
};

function chord_click() {
    eId("more-chords-body").innerHTML = "";
    let data = 0;
    let keyExists = false;

    const key = this.dataset.key;
    const mode = this.dataset.mode;
    const keyText = key.replace("-", " / " + key.substr(0, key.indexOf("P")));
    eId("more-chords-body").textContent = "";
    eId("more-chords").style.display = "block";
    document.querySelector(".chord-container").removeEventListener("click", chord_click);
    let chordContainers = document.querySelectorAll(".chord-container");
    chordContainers.forEach((el) => {
        el.style.opacity = "0.4";
        el.removeEventListener("click", chord_click);
    });
    eId("more-chords-header").textContent = keyText + " " + mode;
    if (Object.keys(chordNums).length > 0) {
        for (const thisKey in chordNums) {
            if (thisKey === key + mode) {
                keyExists = true;
                data = chordNums[key + mode];
            }
        }
    }

    if (keyExists === true) {
        drawChords(data, key, mode);
    } else {
        eId("loading").style.display = "block";

        fetch(`count_files.php?key=${key.replace("#", "sharp").replace("b", "flat")}&mode=${mode}`)
            .then(status)
            .then(json)
            .then(function (data) {
                eId("loading").style.display = "none";
                chordNums = {
                    ...chordNums,
                    [key + mode]: data
                };
                drawChords(data, key, mode);
            }).catch(function (error) {
                console.error('Request failed', error);
            });
    }
}

const drawChords = (data, key, mode) => {
    for (let ii = 0; ii < data; ii++) {
        eId("more-chords-body").innerHTML +=
            '<div class="more-chord-container"><img id="' +
            key.replace("#", "sharp").replace("b", "flat") +
            ii +
            '" class="chord-image more-chord-image" src="images/Chords/' +
            key.replace("#", "sharp").replace("b", "flat") +
            "/" +
            mode +
            "/" +
            key.replace("#", "sharp").replace("b", "flat") +
            "_" +
            mode +
            (ii + 1) +
            '.png" onclick="javascript:zoom(this)"></div>';
    }
};

const zoom = (img) => {
    eId("chord-zoom-image").setAttribute("src", img.src);
    eId("more-chords").style.display = "none";
    eId("chords-zoom").style.display = "block";
};

eId("chords-zoom").addEventListener("click", function () {
    this.style.display = "none";
    eId("more-chords").style.display = "block";
});