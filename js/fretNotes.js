/**
 *
 * @author Jason Robinson
 * @copyright Jason Robinson 2016 - 2021
 *
 **/

const populateString = (fretNote, notes) => {

	let string = {};

	for (let ii = 0; ii < 13; ii++, fretNote++) {
		if (fretNote == 12) fretNote = 0;
		string[ii] = notes[fretNote];
		string[ii + 12] = notes[fretNote];
	}

	return string;

};

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
	MajorChords = [
		"Major",
		"Minor",
		"Minor",
		"Major",
		"Major",
		"Minor",
		"Dim",
	],
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