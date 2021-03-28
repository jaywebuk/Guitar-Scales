const populateString = (start, finish) => {
	let string = {};
	for (ii = 0, xx = start; xx <= finish; ii++, xx++) {
		string[ii] = notes[xx];
		string[ii + 12] = notes[xx];
	}
	// console.log(string);
	return string;
};

var notes = [
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
		["Ab", "G#"],
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
		["Ab", "G#"],
	],
	/* Estring = {},
	Bstring = {},
	Cstring = {},
	Fstring = {},
	Gstring = {},
	Dstring = {},
	Astring = {}, */
	fSharpString = {},
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

Estring = populateString(7, 19);
console.log(Estring);
// populateString(Bstring = {}, 2, 14);
// populateString("Cstring", 3, 15);
// populateString("Fstring", 8, 20);
// populateString("Gstring", 10, 22);
// populateString("Dstring", 5, 17);
Astring = populateString(0, 12);
console.log(Astring);

// populateString("fSharpString", 9, 21);