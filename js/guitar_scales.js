/**
 *
 * @author Jason Robinson
 * @copyright Jason Robinson 2017 - 2020
 *
 */

const docReady = () => {
  getScale(
    document.getElementById("keySelect"),
    document.getElementById("modeSelect"),
    document.getElementById("tuningSelect")
  );
};

$(document).on({
  ajaxStart: () => {
    $("#loading").fadeIn("fast");
  },
  ajaxStop: () => {
    $("#loading").fadeOut("fast");
  },
});

let show_notes = true,
  show_frets = true,
  chordBody,
  thisIsAMode = false;

const show_frets_notes = (showThis) => {
  const fret_notes = $(".fretNote");
  const fret_nums = $(".fret-num");
  switch (showThis) {
    case "show-notes":
      if (show_notes === true) {
        for (ii = 0; ii < fret_notes.length; ii++) {
          $(fret_notes[ii]).css("visibility", "hidden");
          show_notes = false;
        }
      } else {
        for (ii = 0; ii < fret_notes.length; ii++) {
          $(fret_notes[ii]).css("visibility", "visible");
          show_notes = true;
        }
      }
      break;
    case "show-frets":
      if (show_frets === true) {
        for (ii = 0; ii < fret_nums.length; ii++) {
          $(fret_nums[ii]).css("visibility", "hidden");
          show_frets = false;
        }
      } else {
        for (ii = 0; ii < fret_nums.length; ii++) {
          $(fret_nums[ii]).css("visibility", "visible");
          show_frets = true;
        }
      }
      break;
  }
};

$(".button").click(function () {
  show_frets_notes(this.id);
});

const clearBoard = () => {
  const finger = $(".finger");
  const finger0 = $(".finger0");

  for (let ii = 0; ii < finger.length; ii++) {
    $(finger[ii]).css("visibility", "hidden");
    $(finger[ii]).children(1).css("display", "none");
    $(finger[ii]).css("backgroundColor", "darkgreen");
  }
  for (let ii = 0; ii < finger0.length; ii++) {
    $(finger0[ii]).css("visibility", "hidden");
    $(finger0[ii]).css("backgroundColor", "darkgreen");
  }
  return true;
};

const changeFingerboard = (wood) => {
  const dots = $(".dots");
  const necks = $(".neck");
  if (wood.value === "maple") {
    for (ii = 0; ii < dots.length; ii++) {
      $(dots[ii]).css("backgroundColor", "#333");
    }
    for (ii = 0; ii < necks.length; ii++) {
      $(necks[ii]).css("backgroundColor", "#ffe5cc");
    }

    $("#fretNut").css("borderColor", "#000");
    return;
  }
  if (wood.value === "rosewood") {
    for (ii = 0; ii < dots.length; ii++) {
      $(dots[ii]).css("backgroundColor", "#cccccc");
    }
    for (ii = 0; ii < necks.length; ii++) {
      $(necks[ii]).css("backgroundColor", "#460e00");
    }
    $("#fretNut").css("borderColor", "#FAEBD7");
    return;
  }
  if (wood.value === "ebony") {
    for (ii = 0; ii < dots.length; ii++) {
      $(dots[ii]).css("backgroundColor", "#cccccc");
    }
    for (ii = 0; ii < necks.length; ii++) {
      $(necks[ii]).css("backgroundColor", "#160b03");
    }
    $("#fretNut").css("borderColor", "#FAEBD7");
  }
};

const getScale = (keyV, modeV, tuningV) => {
  const key = keyV.value;
  const tuning = tuningV.value;
  let mode = "Major",
    scaleMode = modeV[modeV.selectedIndex].id,
    majorScale,
    scale;

  thisIsAMode = false;

  switch (key) {
    case "Db":
      $("#Natural_Minor").attr("disabled", "disabled");
      $("#Harmonic_Minor").attr("disabled", "disabled");
      $("#Melodic_Minor").attr("disabled", "disabled");
      if (
        $("#modeSelect").prop("selectedIndex") === 7 ||
        $("#modeSelect").prop("selectedIndex") === 8 ||
        $("#modeSelect").prop("selectedIndex") === 9
      ) {
        $("#modeSelect").prop("selectedIndex", 0);
        scaleMode = "Major";
      }
      break;
    default:
      $("#Natural_Minor")
        .removeAttr("disabled")
        .html("Natural Minor")
        .css("font-size", "");
      $("#Harmonic_Minor")
        .removeAttr("disabled")
        .html("Harmonic Minor")
        .css("font-size", "");
      $("#Melodic_Minor")
        .removeAttr("disabled")
        .html("Melodic Minor")
        .css("font-size", "");
      break;
  }

  switch (scaleMode) {
    case "Natural_Minor":
      mode = "Natural_Minor";
      break;
    case "Harmonic_Minor":
      mode = "Harmonic_Minor";
      break;
    case "Melodic_Minor":
      mode = "Melodic_Minor";
      break;
    case "Minor_Pentatonic":
      mode = "Minor_Pentatonic";
      break;
    case "Blues":
      mode = "Blues";
      break;
    case "Dorian":
      mode = "Major";
      thisIsAMode = true;
      break;
    case "Phrygian":
      mode = "Major";
      thisIsAMode = true;
      break;
    case "Lydian":
      mode = "Major";
      thisIsAMode = true;
      break;
    case "Mixolydian":
      mode = "Major";
      thisIsAMode = true;
      break;
    case "Aeolian":
      mode = "Major";
      thisIsAMode = true;
      break;
    case "Locrian":
      mode = "Major";
      thisIsAMode = true;
      break;
  }

  $.post(
    `get_scale.php?key=${key.replace("#", "sharp")}&mode=Major`,
    (data, status) => {
      if (status === "success") {
        majorScale = JSON.parse(data);
        if (scaleMode === "Major") {
          scale = majorScale;
          displayScale(majorScale, scale, scaleMode, tuning);
        }
        if (scaleMode !== "Major") {
          $.post(
            `get_scale.php?key=${key.replace("#", "sharp")}&mode=${mode}`,
            (data, status) => {
              scale = JSON.parse(data);
              displayScale(majorScale, scale, scaleMode, tuning);
            }
          );
        }
      }
    }
  );
};

const displayScale = (majorScale, scale, scaleMode, tuning) => {
  $("#loading").show();
  clearBoard();
  let fretShift = 0,
    noteShift = 0,
    E2,
    A,
    D,
    G,
    B,
    E,
    ii,
    chords = MajorChords;

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
    case "Natural_Minor":
      chords = NaturalMinorChords;
      break;
    case "Harmonic_Minor":
      chords = HarmonicMinorChords;
      break;
    case "Melodic_Minor":
      chords = MelodicMinorChords;
      break;
    case "Minor_Pentatonic":
      chords = MinorPentatonicChords;
      break;
    case "Blues":
      chords = BluesChords;
      break;
    case "Dorian":
      fretShift = 1;
      noteShift = 1;
      break;
    case "Phrygian":
      fretShift = 2;
      noteShift = 2;
      break;
    case "Lydian":
      fretShift = 3;
      noteShift = 3;
      break;
    case "Mixolydian":
      fretShift = 4;
      noteShift = 4;
      break;
    case "Aeolian":
      fretShift = 5;
      noteShift = 5;
      break;
    case "Locrian":
      fretShift = 6;
      noteShift = 6;
      break;
  }

  $("#Dorian").html(`${majorScale[1]} Dorian`);
  $("#Phrygian").html(`${majorScale[2]} Phrygian`);
  $("#Lydian").html(`${majorScale[3]} Lydian`);
  $("#Mixolydian").html(`${majorScale[4]} Mixolydian`);
  $("#Aeolian").html(`${majorScale[5]} Aeolian`);
  $("#Locrian").html(`${majorScale[6]} Locrian`);
  $("#scaleTitle").html(`${scale[noteShift]} ${scaleMode.replace("_", " ")}`);
  $("#notes").html("");

  for (let fretNum = 0; fretNum < 25; fretNum++) {
    $("#fret" + fretNum).css("backgroundColor", "");
    if (fretNum < scale.length + 1) {
      if (fretNum === 0) {
        $("#notes").append(
          `<span class="rootNote">${scale[fretNum + noteShift]}</span>&nbsp;`
        );
      } else if (fretNum > 0 && fretNum < scale.length) {
        if (fretNum + noteShift >= scale.length) {
          noteShift -= scale.length;
        }

        $("#notes").append(`${scale[fretNum + noteShift]}&nbsp;`);
      } else if (fretNum === scale.length) {
        if (fretNum + noteShift >= scale.length) {
          noteShift -= scale.length;
        }
      }
    }
    for (let scaleNote = 0; scaleNote < scale.length; scaleNote++) {
      for (ii = 0; ii < 3; ii++) {
        if (E[fretNum][ii] === scale[scaleNote]) {
          $("#E1F" + fretNum).css("visibility", "visible");
          $("#E1F" + fretNum)
            .children(1)
            .css("display", "inline");
          $("#E1F" + fretNum)
            .children(1)
            .html(scale[scaleNote]);

          if (E[fretNum][ii] === scale[0 + fretShift]) {
            $("#E1F" + fretNum).css("backgroundColor", "#005bb1");
          }
        }

        if (B[fretNum][ii] === scale[scaleNote]) {
          $("#BF" + fretNum).css("visibility", "visible");
          $("#BF" + fretNum)
            .children(1)
            .css("display", "inline");
          $("#BF" + fretNum)
            .children(1)
            .html(scale[scaleNote]);

          if (B[fretNum][ii] === scale[0 + fretShift]) {
            $("#BF" + fretNum).css("backgroundColor", "#005bb1");
          }
        }

        if (G[fretNum][ii] === scale[scaleNote]) {
          $("#GF" + fretNum).css("visibility", "visible");
          $("#GF" + fretNum)
            .children(1)
            .css("display", "inline");
          $("#GF" + fretNum)
            .children(1)
            .html(scale[scaleNote]);

          if (G[fretNum][ii] === scale[0 + fretShift]) {
            $("#GF" + fretNum).css("backgroundColor", "#005bb1");
          }
        }

        if (D[fretNum][ii] === scale[scaleNote]) {
          $("#DF" + fretNum).css("visibility", "visible");
          $("#DF" + fretNum)
            .children(1)
            .css("display", "inline");
          $("#DF" + fretNum)
            .children(1)
            .html(scale[scaleNote]);

          if (D[fretNum][ii] === scale[0 + fretShift]) {
            $("#DF" + fretNum).css("backgroundColor", "#005bb1");
          }
        }

        if (A[fretNum][ii] === scale[scaleNote]) {
          $("#AF" + fretNum).css("visibility", "visible");
          $("#AF" + fretNum)
            .children(1)
            .css("display", "inline");
          $("#AF" + fretNum)
            .children(1)
            .html(scale[scaleNote]);

          if (A[fretNum][ii] === scale[0 + fretShift]) {
            $("#AF" + fretNum).css("backgroundColor", "#005bb1");
          }
        }

        if (E2[fretNum][ii] === scale[scaleNote]) {
          $("#E2F" + fretNum).css("visibility", "visible");
          $("#E2F" + fretNum)
            .children(1)
            .css("display", "inline");
          $("#E2F" + fretNum)
            .children(1)
            .html(scale[scaleNote]);

          if (E2[fretNum][ii] === scale[0 + fretShift]) {
            $("#E2F" + fretNum).css("backgroundColor", "#005bb1");
          }
        }
      }
    }
  }
  if (thisIsAMode === true) {
    $("#scaleTitle").append(` '${scale[0]}'`);
  }

  if (tuning === "standardE") {
    $("#notes").append(' "Standard E"');
  }
  if (tuning === "dropD") {
    $("#notes").append(' "Drop D"');
  }
  if (tuning === "openD") {
    $("#notes").append(' "Open D"');
  }
  if (tuning === "dropC") {
    $("#notes").append(' "Drop C"');
  }
  if (tuning === "DADGAD") {
    $("#notes").append(' "DADGAD"');
  }

  if (scaleMode === "Blues") {
    $("#chords-body").html("CHORDS COMING SOON");
  } else {
    $("#chords-body").html("");
    for (ii = 0; ii < chords.length; ii++) {
      const folder = scale[ii];
      $("#chords-body").append(
        `<div id="chord${ii}" class="chord-container" data-key="${scale[ii]}" data-mode="${chords[ii]}"></div>`
      );
      $("#chord" + ii).append(`<h2>${scale[ii]} ${chords[ii]}</h2>`);
      $("#chord" + ii).append(
        '<img class="chord-image" src="images/Chords/' +
          folder.replace("#", "sharp").replace("b", "flat") +
          "/" +
          chords[ii] +
          "/" +
          scale[ii].replace("#", "sharp").replace("b", "flat") +
          "_" +
          chords[ii].replace("#", "sharp").replace("b", "flat") +
          '1.png">'
      );
    }

    $(".chord-container").bind("click", chord_click);

    $("#more-chords-close").click(() => {
      $("#more-chords").hide();
      $(".chord-container").bind("click", chord_click);
      $(".chord-container").css("opacity", "1");
    });
  }
  $("#neck-container").clone().appendTo("#neckClone");
};

function chord_click() {
  const key = this.dataset.key;
  const mode = this.dataset.mode;
  const keyText = key.replace("-", " / " + key.substr(0, key.indexOf("P")));
  $("#more-chords-body").html("");
  $("#more-chords").show();
  $(".chord-container").unbind("click").css("opacity", "0.4");
  $("#more-chords-header").html(keyText + " " + mode);
  $.get(
    "get_files.php?key=" +
      key.replace("#", "sharp").replace("b", "flat") +
      "&mode=" +
      mode,
    (data) => {
      $("#more-chords-body").html("");
      for (let ii = 0; ii < data; ii++) {
        $("#more-chords-body").append(
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
            '.png" onclick="javascript:zoom(this)"></div>'
        );
      }
    }
  );
}

const zoom = (img) => {
  $("#chord-zoom-image").attr("src", img.src);
  $("#more-chords").hide();
  $("#chords-zoom").show();
};

$("#chords-zoom").click(function () {
  $(this).hide();
  $("#more-chords").show();
});
