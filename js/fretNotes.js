const populateString = (string, start, finish) => {
  for (ii = 0, xx = start; xx <= finish; ii++, xx++) {
    window[string][ii] = notes[xx];
    window[string][ii + 12] = notes[xx];
  }
};

var notes = {
    0: ["A"],
    1: ["Bb", "A#"],
    2: ["B", "Cb"],
    3: ["C", "B#"],
    4: ["Db", "C#"],
    5: ["D"],
    6: ["Eb", "D#"],
    7: ["E", "Fb"],
    8: ["F", "E#"],
    9: ["Gb", "F#"],
    10: ["G"],
    11: ["Ab", "G#"],
    12: ["A"],
    13: ["Bb", "A#"],
    14: ["B", "Cb"],
    15: ["C", "B#"],
    16: ["Db", "C#"],
    17: ["D"],
    18: ["Eb", "D#"],
    19: ["E", "Fb"],
    20: ["F", "E#"],
    21: ["Gb", "F#"],
    22: ["G"],
    23: ["Ab", "G#"],
  },
  Estring = {},
  Bstring = {},
  Cstring = {},
  Fstring = {},
  Gstring = {},
  Dstring = {},
  Astring = {},
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

populateString("Estring", 7, 19);
populateString("Bstring", 2, 14);
populateString("Cstring", 3, 15);
populateString("Fstring", 8, 20);
populateString("Gstring", 10, 22);
populateString("Dstring", 5, 17);
populateString("Astring", 0, 12);
populateString("fSharpString", 9, 21);