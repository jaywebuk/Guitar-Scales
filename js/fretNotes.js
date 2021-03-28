const populateString = (start, finish, notes) => {
	let string = {};
	for (ii = 0, xx = start; xx <= finish; ii++, xx++) {
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

Estring = populateString(7, 19, notes);
Bstring = populateString(2, 14, notes);
Cstring = populateString(3, 15, notes);
Fstring = populateString(8, 20, notes);
Gstring = populateString(10, 22, notes);
Dstring = populateString(5, 17, notes);
Astring = populateString(0, 12, notes);
fSharpString = populateString(9, 21, notes);