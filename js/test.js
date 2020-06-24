
let xhr = new XMLHttpRequest();

xhr.open("GET", "js/Major_Scales.json", true);
xhr.send();

xhr.onload = () => {
    if (xhr.status !== 200) {
        console.error(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
        let data = JSON.parse(xhr.responseText)
        console.log(data[0].MajorScale);        
    }
};
xhr.onerror = () => {
    console.error(xhr.statusText);
};

// console.log(MajorScale);