/**
 *
 * @author Jason Robinson
 * @copyright Jason Robinson 2016 - 2021
 *
 **/

const eId = document.getElementById.bind(document);

// CREATE GLOBAL VARIABLES AND OBJECTS \\

const notes = [
		["A"],
		["A#", "Bb"],
		["B", "Cb"],
		["B#", "C"],
		["C#", "Db"],
		["D"],
		["D#", "Eb"],
		["E", "Fb"],
		["E#", "F"],
		["F#", "Gb"],
		["G"],
		["G#", "Ab"],
	],
	MajorChords = ["Major", "Minor", "Minor", "Major", "Major", "Minor", "Dim"],
	NaturalMinorChords = [
		"Minor",
		"Dim",
		"Major",
		"Minor",
		"Minor",
		"Major",
		"Major",
	],
	MelodicMinorChords = [
		"Minor",
		"Minor",
		"Aug",
		"Major",
		"Major",
		"Dim",
		"Dim",
	],
	HarmonicMinorChords = [
		"Minor",
		"Dim",
		"Aug",
		"Minor",
		"Major",
		"Major",
		"Dim",
	],
	MinorPentatonicChords = [
		"Power-5",
		"Power-5",
		"Power-5",
		"Power-5",
		"Power-5",
	],
	BluesChords = [];

const neckWood = {
	rosewood: {
		neckColor: "#460e00",
		dotColor: "#ccc",
		fretNutColor: "#FAEBD7",
	},
	ebony: {
		neckColor: "#160b03",
		dotColor: "#ccc",
		fretNutColor: "#FAEBD7",
	},
	maple: {
		neckColor: "#ffe5cc",
		dotColor: "#333",
		fretNutColor: "#000",
	},
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

/// CREATE THE FUNCTIONS \\\

const populateString = (fretNote, notes) => {
	let string = {};

	for (let ii = 0; ii < 13; ii++, fretNote++) {
		if (fretNote == 12) fretNote = 0;
		string[ii] = notes[fretNote];
		string[ii + 12] = notes[fretNote];
	}

	return string;
};

const statusResponse = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response);
	} else {
		return Promise.reject(new Error(response.statusText));
	}
};

const json = (response) => {
	return response.json();
};

const show_frets_notes = (showThis) => {
	const fret_notes = document.querySelectorAll(".fretNote");
	const fret_nums = document.querySelectorAll(".fret-num");
	switch (showThis) {
		case "show-notes":
			if (showNotes === true) {
				fret_notes.forEach((el) => {
					el.style.visibility = "hidden";
				});
				showNotes = false;
				break;
			}
			fret_notes.forEach((el) => {
				el.style.visibility = "visible";
			});
			showNotes = true;
			break;
		case "show-frets":
			if (showFrets === true) {
				fret_nums.forEach((el) => {
					el.style.visibility = "hidden";
				});
				showFrets = false;
				break;
			}
			fret_nums.forEach((el) => {
				el.style.visibility = "visible";
			});
			showFrets = true;
			break;
	}
};

let eString = populateString(7, notes);
let bString = populateString(2, notes);
let cString = populateString(3, notes);
let fString = populateString(8, notes);
let gString = populateString(10, notes);
let dString = populateString(5, notes);
let aString = populateString(0, notes);
let fSharpString = populateString(9, notes);

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

const changeMode = (thisMode) => {
	scaleMode = thisMode;
	displayScale();
};

const changeTuning = (thisTuning) => {
	tuning = thisTuning;
	displayScale();
};

const changeFingerboard = (wood) => {
	const dots = document.querySelectorAll(".dots");
	const necks = document.querySelectorAll(".neck");

	necks.forEach((el) => {
		el.style.backgroundColor = neckWood[wood.value].neckColor;
	});
	dots.forEach((el) => {
		el.style.backgroundColor = neckWood[wood.value].dotColor;
	});

	eId("fretNut").style.borderColor = neckWood[wood.value].fretNutColor;
};

const getScale = (thisKey) => {
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
		.then(statusResponse)
		.then(json)
		.then(function (data) {
			eId("loading").style.display = "none";
			scaleData = data;
			displayScale();
		})
		.catch(function (error) {
			console.error("Request failed", error);
		});
};

const showfinger = (finger, fretNum, scale) => {
	let stringNote = eId(finger + fretNum);
	stringNote.style.visibility = "visible";
	stringNote.childNodes[1].style.display = "inline";
	stringNote.childNodes[1].textContent = scale;
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
			E2 = eString;
			A = aString;
			D = dString;
			G = gString;
			B = bString;
			E = eString;
			break;
		case "dropD":
			E2 = dString;
			A = aString;
			D = dString;
			G = gString;
			B = bString;
			E = eString;
			break;
		case "openD":
			E2 = dString;
			A = aString;
			D = dString;
			G = fSharpString;
			B = aString;
			E = dString;
			break;
		case "dropC":
			E2 = cString;
			A = gString;
			D = cString;
			G = fString;
			B = aString;
			E = dString;
			break;
		case "DADGAD":
			E2 = dString;
			A = aString;
			D = dString;
			G = gString;
			B = aString;
			E = dString;
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
	eId("scaleTitle").textContent = `${scale[noteShift]} ${scaleMode.replace("_" , " ")}`;
	eId("notes").innerHTML = "";

	for (let fretNum = 0; fretNum < 25; fretNum++) {
		eId("fret" + fretNum).style.backgroundColor = "";
		if (fretNum < scale.length + 1) {
			if (fretNum === 0) {
				eId("notes").innerHTML += `<span class="rootNote">${
					scale[fretNum + noteShift]
				}</span> `;
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
					showfinger("E1F", fretNum, scale[jj]);

					if (E[fretNum][ii] === scale[0 + fretShift]) {
						eId("E1F" + fretNum).style.backgroundColor = "#005bb1";
					}
				}

				if (B[fretNum][ii] === scale[jj]) {
					showfinger("BF", fretNum, scale[jj]);

					if (B[fretNum][ii] === scale[0 + fretShift]) {
						eId("BF" + fretNum).style.backgroundColor = "#005bb1";
					}
				}

				if (G[fretNum][ii] === scale[jj]) {
					showfinger("GF", fretNum, scale[jj]);

					if (G[fretNum][ii] === scale[0 + fretShift]) {
						eId("GF" + fretNum).style.backgroundColor = "#005bb1";
					}
				}

				if (D[fretNum][ii] === scale[jj]) {
					showfinger("DF", fretNum, scale[jj]);

					if (D[fretNum][ii] === scale[0 + fretShift]) {
						eId("DF" + fretNum).style.backgroundColor = "#005bb1";
					}
				}

				if (A[fretNum][ii] === scale[jj]) {
					showfinger("AF", fretNum, scale[jj]);

					if (A[fretNum][ii] === scale[0 + fretShift]) {
						eId("AF" + fretNum).style.backgroundColor = "#005bb1";
					}
				}

				if (E2[fretNum][ii] === scale[jj]) {
					showfinger("E2F", fretNum, scale[jj]);

					if (E2[fretNum][ii] === scale[0 + fretShift]) {
						eId("E2F" + fretNum).style.backgroundColor = "#005bb1";
					}
				}
			}
		}
	}
	if (thisIsAMode === true) {
		eId("scaleTitle").textContent += ` '${scale[0]}'`;
	}

	switch (tuning) {
		case "dropD":
			eId("notes").textContent += ' "Drop D"';
			break;
		case "openD":
			eId("notes").textContent += ' "Open D"';
			break;
		case "dropC":
			eId("notes").textContent += ' "Drop C"';
			break;
		case "DADGAD":
			eId("notes").textContent += ' "DADGAD"';
			break;
		default:
			eId("notes").textContent += ' "Standard E"';
	}

	if (scaleMode === "Blues") {
		eId("chords-body").textContent = "CHORDS COMING SOON";
	} else {
		eId("chords-body").innerHTML = "";
		let div, h2, img;
		for (let ii = 0; ii < chords.length; ii++) {
			let folder = scale[ii];

			div = document.createElement("div");
			div.id = "chord" + ii;
			div.classList = "chord-container";
			div.dataset.key = "scale" + ii;
			div.dataset.mode = "chords" + ii;
			eId("chords-body").appendChild(div);

			div.addEventListener("click", chord_click);

			h2 = document.createElement("h2");
			h2.textContent = `${scale[ii]} ${chords[ii]}`
			eId("chord" + ii).appendChild(h2);

			img = document.createElement("img");
			img.src = `images/Chords/${folder.replace("#", "sharp").replace("b", "flat")}/
			${chords[ii]}/${scale[ii].replace("#", "sharp").replace("b", "flat")}_${chords[ii].replace("#", "sharp").replace("b", "flat")}1.png`;
			img.alt = `${scale[ii]} ${chords[ii]}`;
			console.log(img);
			eId("chord" + ii).appendChild(img);
		}
	}

	let chordContainers = document.querySelectorAll(".chord-container");
	/* chordContainers.forEach((el) => {
		el.addEventListener("click", chord_click);
	}); */

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
	document
		.querySelector(".chord-container")
		.removeEventListener("click", chord_click);
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

		fetch(
			`count_files.php?key=${key
				.replace("#", "sharp")
				.replace("b", "flat")}&mode=${mode}`
		)
			.then(statusResponse)
			.then(json)
			.then(function (data) {
				eId("loading").style.display = "none";
				chordNums = {
					...chordNums,
					[key + mode]: data,
				};
				drawChords(data, key, mode);
			})
			.catch(function (error) {
				console.error("Request failed", error);
			});
	}
}

const drawChords = (numChords, key, mode) => {
	console.log(numChords);
	let elem1, elem2;
	for (let ii = 0; ii < numChords; ii++) {
		elem1 = document.createElement("div");
		elem1.classList = "more-chord-container";
		eId("more-chords-body").appendChild(elem1);
		elem2 = document.createElement("img");
		elem2.id = `${key.replace("#", "sharp").replace("b", "flat")}${ii}`;
		elem2.classList = "chord-image more-chord-image";
		elem2.src = `images/Chords/${key
			.replace("#", "sharp")
			.replace("b", "flat")}/${mode}/${key
			.replace("#", "sharp")
			.replace("b", "flat")}_${mode}${ii + 1}.png`;
		elem2.addEventListener("click", (event) => {
			zoom(event.target);
		});
		elem1.appendChild(elem2);
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
