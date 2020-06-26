/**
 *
 * @author Jason Robinson
 * @copyright Jason Robinson 2017 - 2020
 *
 */

const docReady = () => {
    getScale(key);
};

let show_notes = true,
    show_frets = true,
    chordBody,
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
            if (show_notes === true) {
                fret_notes.forEach(el => {
                    el.style.visibility = "hidden";
                });
                show_notes = false;
            } else {
                fret_notes.forEach(el => {
                    el.style.visibility = "visible";
                });
                show_notes = true;
            }
            break;
        case "show-frets":
            if (show_frets === true) {
                fret_nums.forEach(el => {
                    el.style.visibility = "hidden";
                });
                show_frets = false;
            } else {
                fret_nums.forEach(el => {
                    el.style.visibility = "visible";
                });
                show_frets = true;
            }
            break;
    }
};

const frets_note_buttons = document.querySelectorAll(".button");
frets_note_buttons.forEach(el => {
    el.addEventListener("click", () => {
        show_frets_notes(el.id);
    });
});

const clearBoard = () => {
    const finger = document.querySelectorAll(".finger");
    const finger0 = document.querySelectorAll(".finger0");

    finger.forEach(el => {
        el.style.visibility = "hidden";
        el.childNodes[1].style.display = "none";
        el.style.backgroundColor = "darkgreen";
    });

    finger0.forEach(el => {
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

    necks.forEach(el => {
        el.style.backgroundColor = neckColor;
    });
    dots.forEach(el => {
        el.style.backgroundColor = dotColor;
    });

    document.querySelector("#fretNut").style.borderColor = fretNutColor;
};

const getScale = thisKey => {
    key = thisKey;
    document.querySelector("#loading").style.display = "block";

    switch (key) {
        case "Db":
            document.querySelector("#Natural_Minor").setAttribute("disabled", "disabled");
            document.querySelector("#Natural_Minor").textContent = "Natural Minor - Use C#";
            document.querySelector("#Natural_Minor").style.fontSize = "1.1rem";
            document.querySelector("#Harmonic_Minor").setAttribute("disabled", "disabled");
            document.querySelector("#Harmonic_Minor").textContent = "Harmonic Minor - Use C#";
            document.querySelector("#Harmonic_Minor").style.fontSize = "1.1rem";
            document.querySelector("#Melodic_Minor").setAttribute("disabled", "disabled");
            document.querySelector("#Melodic_Minor").textContent = "Melodic Minor - Use C#";
            document.querySelector("#Melodic_Minor").style.fontSize = "1.1rem";
            if (
                document.querySelector("#modeSelect").selectedIndex === 7 ||
                document.querySelector("#modeSelect").selectedIndex === 8 ||
                document.querySelector("#modeSelect").selectedIndex === 9
            ) {
                document.querySelector("#modeSelect").selectedIndex = 0;
                scaleMode = "Major";
            }
            break;
        default:
            document.querySelector("#Natural_Minor").removeAttribute("disabled");
            document.querySelector("#Natural_Minor").textContent = "Natural Minor";
            document.querySelector("#Natural_Minor").style.fontSize = "";
            document.querySelector("#Harmonic_Minor").removeAttribute("disabled");
            document.querySelector("#Harmonic_Minor").textContent = "Harmonic Minor";
            document.querySelector("#Harmonic_Minor").style.fontSize = "";
            document.querySelector("#Melodic_Minor").removeAttribute("disabled");
            document.querySelector("#Melodic_Minor").textContent = "Melodic Minor";
            document.querySelector("#Melodic_Minor").style.fontSize = "";
            break;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `get_scale.php?key=${key.replace("#", "sharp")}`, true);
    xhr.responseType = "json";
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send();
    xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector("#loading").style.display = "none";
            scaleData = xhr.response;
            displayScale();
        } else {
            console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            document.querySelector("#loading").style.display = "none";
        }
    };
    xhr.onerror = () => {
        console.error(xhr.statusText);
    };
};

const displayScale = () => {
    majorScale = scaleData["Major"];
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
        case "HarmonicMinor":
            chords = HarmonicMinorChords;
            break;
        case "MelodicMinor":
            chords = MelodicMinorChords;
            break;
        case "Minor Pentatonic":
            chords = MinorPentatonicChords;
            break;
        case "Blues":
            chords = BluesChords;
            break;
        case "Dorian":
            fretShift = 1;
            noteShift = 1;
            scale = scaleData["Major"];
            thisIsAMode = true;
            break;
        case "Phrygian":
            fretShift = 2;
            noteShift = 2;
            scale = scaleData["Major"];
            thisIsAMode = true;
            break;
        case "Lydian":
            fretShift = 3;
            noteShift = 3;
            scale = scaleData["Major"];
            thisIsAMode = true;
            break;
        case "Mixolydian":
            fretShift = 4;
            noteShift = 4;
            scale = scaleData["Major"];
            thisIsAMode = true;
            break;
        case "Aeolian":
            fretShift = 5;
            noteShift = 5;
            scale = scaleData["Major"];
            thisIsAMode = true;
            break;
        case "Locrian":
            fretShift = 6;
            noteShift = 6;
            scale = scaleData["Major"];
            thisIsAMode = true;
            break;
    }
    document.querySelector("#Dorian").textContent = `${majorScale[1]} Dorian`;
    document.querySelector("#Phrygian").textContent = `${majorScale[2]} Phrygian`;
    document.querySelector("#Lydian").textContent = `${majorScale[3]} Lydian`;
    document.querySelector("#Mixolydian").textContent = `${majorScale[4]} Mixolydian`;
    document.querySelector("#Aeolian").textContent = `${majorScale[5]} Aeolian`;
    document.querySelector("#Locrian").textContent = `${majorScale[6]} Locrian`;
    document.querySelector("#scaleTitle").textContent = `${scale[noteShift]} ${scaleMode.replace("_", " ")}`;
    document.querySelector("#notes").innerHTML = "";

    for (let fretNum = 0; fretNum < 25; fretNum++) {
        document.querySelector("#fret" + fretNum).style.backgroundColor = "";
        if (fretNum < scale.length + 1) {
            if (fretNum === 0) {
                document.querySelector("#notes").innerHTML += `<span class="rootNote">${scale[fretNum + noteShift]}</span> `;
            } else if (fretNum > 0 && fretNum < scale.length) {
                if (fretNum + noteShift >= scale.length) {
                    noteShift -= scale.length;
                }

                document.querySelector("#notes").textContent += `${scale[fretNum + noteShift]} `;
            } else if (fretNum === scale.length) {
                if (fretNum + noteShift >= scale.length) {
                    noteShift -= scale.length;
                }
            }
        }
        for (let scaleNote in scale) {
            for (let ii = 0; ii < 3; ii++) {
                if (E[fretNum][ii] === scale[scaleNote]) {
                    document.querySelector("#E1F" + fretNum).style.visibility = "visible";
                    document.querySelector("#E1F" + fretNum).childNodes[1].style.display = "inline";
                    document.querySelector("#E1F" + fretNum).childNodes[1].textContent = scale[scaleNote];

                    if (E[fretNum][ii] === scale[0 + fretShift]) {
                        document.querySelector("#E1F" + fretNum).style.backgroundColor = "#005bb1";
                    }
                }

                if (B[fretNum][ii] === scale[scaleNote]) {
                    document.querySelector("#BF" + fretNum).style.visibility = "visible";
                    document.querySelector("#BF" + fretNum).childNodes[1].style.display = "inline";
                    document.querySelector("#BF" + fretNum).childNodes[1].textContent = scale[scaleNote];

                    if (B[fretNum][ii] === scale[0 + fretShift]) {
                        document.querySelector("#BF" + fretNum).style.backgroundColor = "#005bb1";
                    }
                }

                if (G[fretNum][ii] === scale[scaleNote]) {
                    document.querySelector("#GF" + fretNum).style.visibility = "visible";
                    document.querySelector("#GF" + fretNum).childNodes[1].style.display = "inline";
                    document.querySelector("#GF" + fretNum).childNodes[1].textContent = scale[scaleNote];

                    if (G[fretNum][ii] === scale[0 + fretShift]) {
                        document.querySelector("#GF" + fretNum).style.backgroundColor = "#005bb1";
                    }
                }

                if (D[fretNum][ii] === scale[scaleNote]) {
                    document.querySelector("#DF" + fretNum).style.visibility = "visible";
                    document.querySelector("#DF" + fretNum).childNodes[1].style.display = "inline";
                    document.querySelector("#DF" + fretNum).childNodes[1].textContent = scale[scaleNote];

                    if (D[fretNum][ii] === scale[0 + fretShift]) {
                        document.querySelector("#DF" + fretNum).style.backgroundColor = "#005bb1";
                    }
                }

                if (A[fretNum][ii] === scale[scaleNote]) {
                    document.querySelector("#AF" + fretNum).style.visibility = "visible";
                    document.querySelector("#AF" + fretNum).childNodes[1].style.display = "inline";
                    document.querySelector("#AF" + fretNum).childNodes[1].textContent = scale[scaleNote];

                    if (A[fretNum][ii] === scale[0 + fretShift]) {
                        document.querySelector("#AF" + fretNum).style.backgroundColor = "#005bb1";
                    }
                }

                if (E2[fretNum][ii] === scale[scaleNote]) {
                    document.querySelector("#E2F" + fretNum).style.visibility = "visible";
                    document.querySelector("#E2F" + fretNum).childNodes[1].style.display = "inline";
                    document.querySelector("#E2F" + fretNum).childNodes[1].textContent = scale[scaleNote];

                    if (E2[fretNum][ii] === scale[0 + fretShift]) {
                        document.querySelector("#E2F" + fretNum).style.backgroundColor = "#005bb1";
                    }
                }
            }
        }
    }
    if (thisIsAMode === true) {
        document.querySelector("#scaleTitle").textContent += ` '${scale[0]}'`;
    }

    if (tuning === "standardE") {
        document.querySelector("#notes").textContent += ' "Standard E"';
    }
    if (tuning === "dropD") {
        document.querySelector("#notes").textContent += ' "Drop D"';
    }
    if (tuning === "openD") {
        document.querySelector("#notes").textContent += ' "Open D"';
    }
    if (tuning === "dropC") {
        document.querySelector("#notes").textContent += ' "Drop C"';
    }
    if (tuning === "DADGAD") {
        document.querySelector("#notes").textContent += ' "DADGAD"';
    }

    if (scaleMode === "Blues") {
        document.querySelector("#chords-body").textContent = "CHORDS COMING SOON";
    } else {
        document.querySelector("#chords-body").innerHTML = "";
        for (let ii in chords) {
            let folder = scale[ii];
            document.querySelector(
                "#chords-body"
            ).innerHTML += `<div id="chord${ii}" class="chord-container" data-key="${scale[ii]}" data-mode="${chords[ii]}"></div>`;
            document.querySelector("#chord" + ii).innerHTML += `<h2>${scale[ii]} ${chords[ii]}</h2>`;
            document.querySelector("#chord" + ii).innerHTML +=
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
    chordContainers.forEach(el => {
        el.addEventListener("click", chord_click);
    });

    document.querySelector("#more-chords-close").addEventListener("click", () => {
        document.querySelector("#more-chords").style.display = "none";
        chordContainers.forEach(el => {
            el.addEventListener("click", chord_click);
            el.style.opacity = "1";
        });
    });
};

chord_click = function () {
    document.querySelector("#more-chords-body").innerHTML = "";
    let data = 0;
    let keyExists = false;

    const key = this.dataset.key;
    const mode = this.dataset.mode;
    const keyText = key.replace("-", " / " + key.substr(0, key.indexOf("P")));
    document.querySelector("#more-chords-body").textContent = "";
    document.querySelector("#more-chords").style.display = "block";
    document.querySelector(".chord-container").removeEventListener("click", chord_click);
    let chordContainers = document.querySelectorAll(".chord-container");
    chordContainers.forEach(el => {
        el.style.opacity = "0.4";
        el.removeEventListener("click", chord_click);
    });
    document.querySelector("#more-chords-header").textContent = keyText + " " + mode;
    if (Object.keys(chordNums).length > 0) {
        for (thisKey in chordNums) {
            if (thisKey === key + mode) {
                keyExists = true;
                data = chordNums[key + mode];
            }
        }
    }

    if (keyExists === false) {
        document.querySelector("#loading").style.display = "block";
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `count_files.php?key=${key.replace("#", "sharp").replace("b", "flat")}&mode=${mode}`, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.responseType = "text";
        xhr.send();
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.querySelector("#loading").style.display = "none";
                data = xhr.response;
                chordNums = { ...chordNums, [key + mode]: data };
                drawChords(data, key, mode);
            } else {
                console.error(xhr.statusText);
            }
        };
        xhr.onerror = () => {
            console.error(xhr.statusText);
        };
    } else {
        drawChords(data, key, mode);
    }
};

const drawChords = (data, key, mode) => {
    for (let ii = 0; ii < data; ii++) {
        document.querySelector("#more-chords-body").innerHTML +=
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

const zoom = img => {
    document.querySelector("#chord-zoom-image").setAttribute("src", img.src);
    document.querySelector("#more-chords").style.display = "none";
    document.querySelector("#chords-zoom").style.display = "block";
};

document.querySelector("#chords-zoom").addEventListener("click", function () {
    this.style.display = "none";
    document.querySelector("#more-chords").style.display = "block";
});
