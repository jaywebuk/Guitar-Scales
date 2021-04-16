/**
 *
 * @author Jason Robinson
 * @copyright Jason Robinson 2016 - 2021
 *
 **/

const eId = document.getElementById.bind(document);

// CREATE GLOBAL VARIABLES AND OBJECTS \\

const 
notes = [
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
MajorChords = ["Major", "Minor", "Minor", "Major", "Major", "Minor", "Dim", ],
NaturalMinorChords = ["Minor", "Dim", "Major", "Minor", "Minor", "Major", "Major", ],
MelodicMinorChords = ["Minor", "Minor", "Aug", "Major", "Major", "Dim", "Dim", ],
HarmonicMinorChords = ["Minor", "Dim", "Aug", "Minor", "Major", "Major", "Dim", ],
MinorPentatonicChords = ["Power-5", "Power-5", "Power-5", "Power-5", "Power-5", ],
BluesChords: string[] = [];


const neckWood: {
	[name: string]: {
		[key: string]: string
	}
} = {
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

let scaleData: {
	[property: string]: string[]
}

// let scaleData: scaleData;

let showNotes = true,
	showFrets = true,
	key = "E",
	majorScale,
	scale: string[],
	scaleMode = "Major",
	tuning = "standardE";

let chordNums: {
	[key: string]: number;
} = {};

interface fretString {
	[name: string]: string[];
}

/// CREATE THE FUNCTIONS \\\

const populateString = (fretNote: number, notes: string[][]) => {
	const guitarString: fretString = {};
	
	for (let ii = 0; ii < 13; ii++, fretNote++) {
		if (fretNote == 12)
			fretNote = 0;

		guitarString[ii] = notes[fretNote];
		guitarString[ii + 12] = notes[fretNote];
	}

	return guitarString;
};

const statusResponse = (response: any) => {
	
	if (response.status >= 200 && response.status < 300) 
		return Promise.resolve(response);
	else 
		return Promise.reject(new Error(response.statusText));
	
};

const json = (response: any) => {
	return response.json();
};

const show_frets_notes = (showThis: string) => {
	const fret_notes: NodeListOf<HTMLElement> = document.querySelectorAll(".fretNote");
	const fret_nums: NodeListOf<HTMLElement> = document.querySelectorAll(".fret-num");
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

const eString: fretString = populateString(7, notes);
const bString: fretString = populateString(2, notes);
const cString: fretString = populateString(3, notes);
const fString: fretString = populateString(8, notes);
const gString: fretString = populateString(10, notes);
const dString: fretString = populateString(5, notes);
const aString: fretString = populateString(0, notes);
const fSharpString: fretString = populateString(9, notes);

const frets_note_buttons = document.querySelectorAll(".button");
frets_note_buttons.forEach((el) => {
	el.addEventListener("click", () => {
		show_frets_notes(el.id);
	});
});

const clearBoard = () => {
	const finger: NodeListOf<HTMLElement> = document.querySelectorAll(".finger");
	const finger0: NodeListOf<HTMLElement> = document.querySelectorAll(".finger0");

	finger.forEach((el) => {
		el.style.visibility = "hidden";
		(<HTMLElement>el.childNodes[1]).style.display = "none";
		el.style.backgroundColor = "darkgreen";
	});

	finger0.forEach((el) => {
		el.style.visibility = "hidden";
		el.style.backgroundColor = "darkgreen";
	});
	return true;
};

const changeMode = (thisMode: string) => {
	scaleMode = thisMode;
	displayScale();
};

const changeTuning = (thisTuning: string) => {
	tuning = thisTuning;
	displayScale();
};

const changeFingerboard = (wood: HTMLSelectElement) => {
	
	const woodValue = wood.options[wood.selectedIndex].value;
	const dots: NodeListOf<HTMLElement> = document.querySelectorAll(".dots");
	const necks: NodeListOf<HTMLElement> = document.querySelectorAll(".neck");
	
	necks.forEach(el => {
		el.style.backgroundColor = neckWood[woodValue].neckColor;
	});
	dots.forEach(el => {
		el.style.backgroundColor = neckWood[woodValue].dotColor;
	});

	eId("fretNut").style.borderColor = neckWood[woodValue].fretNutColor;
};

async function getScale(thisKey: string) {
	key = thisKey;
	eId("loading").style.display = "block";
	
	const modeSelect = <HTMLSelectElement>eId("modeSelect");
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
			if ([7, 8, 9].indexOf(modeSelect.options.selectedIndex) !== -1) {
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

	const url = `php/get_scale.php?key=${key.replace("#", "sharp")}`;
	
	try {
		const data = await http<fretString>(url);
		scaleData = data;
		eId("loading").style.display = "none";
		displayScale();
	} catch(error) {
		console.error("Error", error);
	}

}

async function http<T>(request: RequestInfo): Promise<T> {
	const response = await fetch(request);
	if(!response.ok) {
		throw new Error(`error: ${response.status}`);
	}
	return await response.json().catch(() => ({}));
}

const showfinger = (finger: string, fretNum: number, scale: string) => {	
	const stringNote = eId(finger + fretNum);
	stringNote.style.visibility = "visible";
	(<HTMLElement>stringNote.childNodes[1]).style.display = "inline";
	stringNote.childNodes[1].textContent = scale;
};

const displayScale = () => {
	
	majorScale = scaleData.Major;
	scale = scaleData[scaleMode];
	clearBoard();
	
	let 
		noteShift = 0,
		E2: fretString = {},
		A: fretString = {},
		D: fretString = {},
		G: fretString = {},
		B: fretString = {},
		E: fretString = {},
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

	let stringArray = {"E2": E2, "A": A, "D": D, "G": G, "B": B, "E": E};

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
			noteShift = 1;
			scale = scaleData.Major;
			thisIsAMode = true;
			break;
		case "Phrygian":
			noteShift = 2;
			scale = scaleData.Major;
			thisIsAMode = true;
			break;
		case "Lydian":
			noteShift = 3;
			scale = scaleData.Major;
			thisIsAMode = true;
			break;
		case "Mixolydian":
			noteShift = 4;
			scale = scaleData.Major;
			thisIsAMode = true;
			break;
		case "Aeolian":
			noteShift = 5;
			scale = scaleData.Major;
			thisIsAMode = true;
			break;
		case "Locrian":
			noteShift = 6;
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

	const shiftedScale = [...scale];
	const splicedScale = shiftedScale.splice(noteShift);
	const newScale = [...splicedScale,...shiftedScale];

	eId("notes").textContent = newScale.toString().replaceAll(",", " ");

	for (let fretNum = 0; fretNum < 25; fretNum++) {
		eId("fret" + fretNum).style.backgroundColor = "";
					
				for (const [key, value] of Object.entries(stringArray)) {
					for (let ii = 0; ii < value[fretNum].length; ii++) {
						
						if (scale.includes(value[fretNum][ii])) {
							showfinger(key+"F", fretNum, value[fretNum][ii]);

							if (value[fretNum][ii] === newScale[0]) 
								eId(key+"F" + fretNum).style.backgroundColor = "#005bb1";

							break;
						}

					}	
				}
		
		}

	if (thisIsAMode === true) 
		eId("scaleTitle").textContent += ` '${scale[0]}'`;

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

	if (scaleMode === "Blues")
		eId("chords-body").textContent = "CHORDS COMING SOON";
	else {
		eId("chords-body").innerHTML = "";
		let div, h2, img;
		for (let ii = 0; ii < chords.length; ii++) {
			const folder = scale[ii];

			div = document.createElement("div");
			div.id = "chord" + ii;
			div.setAttribute("class", "chord-container");
			div.dataset.key = `${scale[ii]}`;
			div.dataset.mode = `${chords[ii]}`;
			eId("chords-body").appendChild(div);

			div.addEventListener("click", chord_click);

			h2 = document.createElement("h2");
			h2.textContent = `${scale[ii]} ${chords[ii]}`;
			eId("chord" + ii).appendChild(h2);

			img = document.createElement("img");
			img.src = `images/Chords/${folder.replace("#", "sharp").replace("b", "flat")}/
			${chords[ii]}/${scale[ii].replace("#", "sharp").replace("b", "flat")}_${chords[ii].replace("#", "sharp").replace("b", "flat")}1.png`;
			img.alt = `${scale[ii]} ${chords[ii]}`;
			eId("chord" + ii).appendChild(img);
		}
	}

	const chordContainers: NodeListOf<HTMLElement> = document.querySelectorAll(".chord-container");

	eId("more-chords-close").addEventListener("click", () => {
		eId("more-chords").style.display = "none";
		chordContainers.forEach((el) => {
			el.addEventListener("click", chord_click);
			el.style.opacity = "1";
		});
	});
};

async function chord_click(this: HTMLElement) {
	eId("more-chords-body").innerHTML = "";
	let data = 0;
	let keyExists = false;
	
	const key: string = this.dataset.key as string;
	const mode: string = this.dataset.mode as string;
	const keyText = key.replace("-", " / " + key.substr(0, key.indexOf("P")));
	eId("more-chords-body").textContent = "";
	eId("more-chords").style.display = "block";
	document
		.querySelector(".chord-container")
		.removeEventListener("click", chord_click);
	const chordContainers: NodeListOf<HTMLElement> = document.querySelectorAll(".chord-container");
	chordContainers.forEach((el: HTMLElement) => {
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

	if (keyExists === true) 
		drawChords(data, key, mode);
	else {

		eId("loading").style.display = "block";

		fetch(`php/count_files.php?key=${key.replace("#", "sharp").replace("b", "flat")}&mode=${mode}`
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

const drawChords = (numChords: number, key: string, mode: string) => {
	let elem1, elem2;
	for (let ii = 0; ii < numChords; ii++) {
		elem1 = document.createElement("div");
		elem1.setAttribute("class", "more-chord-container");
		eId("more-chords-body").appendChild(elem1);
		elem2 = document.createElement("img");
		elem2.id = `${key.replace("#", "sharp").replace("b", "flat")}${ii}`;
		elem2.setAttribute("class", "chord-image more-chord-image");
		elem2.src = `images/Chords/${key
			.replace("#", "sharp")
			.replace("b", "flat")}/${mode}/${key
			.replace("#", "sharp")
			.replace("b", "flat")}_${mode}${ii + 1}.png`;
		elem2.addEventListener("click", (event) => {
			zoom(event.target as HTMLImageElement);
		});
		elem1.appendChild(elem2);
	}
};

const zoom = (img: HTMLImageElement) => {
	eId("chord-zoom-image").setAttribute("src", img.src);
	eId("more-chords").style.display = "none";
	eId("chords-zoom").style.display = "block";
};

eId("chords-zoom").addEventListener("click", function () {
	this.style.display = "none";
	eId("more-chords").style.display = "block";
});
