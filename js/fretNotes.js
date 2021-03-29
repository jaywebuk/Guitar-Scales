/**
 *
 * @author Jason Robinson
 * @copyright Jason Robinson 2017 - 2021
 *
 **/

const populateString = (start, notes) => {
	let string = {};
	xx = start;
	for (let ii = 0; ii < 13; ii++, xx++) {
		if (xx == 12) xx = 0;
		string[ii] = notes[xx];
		string[ii + 12] = notes[xx];
	}
	return string;
};

let notes = [
		["A"],
		["Bb", "A#"],
		["B", "Cb"],
		["C", "B#"],
		["Db", "C#"],
		["D"],
		["Eb", "D#"],
		["E", "Fb"],
		["F", "E#"],
		["Gb", "F#"],
		["G"],
		["Ab", "G#"]
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

Estring = populateString(7, notes);
Bstring = populateString(2, notes);
Cstring = populateString(3, notes);
Fstring = populateString(8, notes);
Gstring = populateString(10, notes);
Dstring = populateString(5, notes);
Astring = populateString(0, notes);
fSharpString = populateString(9, notes);