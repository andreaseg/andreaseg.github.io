document.addEventListener("DOMContentLoaded", onLoadComplete, true);

let styles = ["Travel Blog", "Newspaper"];

let colorAreas = [["primary", ''],
    ["secondary", ''],
    ["accent", ''],
    ["text", "000000"],
    ["text-background", "F0F0F0"],
    ["background", "FFFFFF"]];

let activeColor = '';
let colorPicker = '';

function setStyle(sheetName) {
    document.getElementById("stylesheet").href=sheetName;
}

function setPalette() {
    let cStyle = ''
    colorAreas.forEach(val => {
        cStyle += '.' + val[0] + ' {color:#' + val[1] + '} ';
        cStyle += '.' + val[0] + '-bg {background-color:#' + val[1] + '} ';
        cStyle += '.' + val[0] + '-border {border-color:#' + val[1] + '} ';
    });
    
    document.getElementById("color-stylesheet").innerHTML = cStyle;
}

function styleNameToFileName(styleName) {
    return "styles/" + styleName.toLowerCase().replace(' ', '_') + ".css";
}

function randomHexColor() {
    let col = (Math.floor((0xffffff + 1) * Math.random())).toString(16).toUpperCase();
    while (col.length < 6) {
        col = '0' + col;
    }
    return col;
}

function onLoadComplete(event) {

    colorAreas.forEach(val => {
        let elem = document.getElementById(val[0]);
        if (elem.value == '') {
            if (val[1] == '') {
                val[1] = randomHexColor();
            }
            elem.value = val[1];
        } else {
            val[1] = elem.value;
        }
        elem.addEventListener("input", event => {
            elem.value = elem.value.replace(/[^A-Fa-f0-9]+/g, '');
            if (elem.value.length > 6) {
                elem.value = elem.value.substring(0, 6);
            }
            if(elem.value.length == 6) {
                val[1] = elem.value;
                colorPicker.color.hexString = '#' + elem.value;
                setPalette();
            }
        });
        elem.addEventListener("focus", event => {
            activeColor = val;
            colorPicker.color.hexString = '#' + elem.value;
            document.getElementById("color-picker-container").style.display = "block";
        });
        elem.addEventListener("blur", event => {
            activeColor = '';
            document.getElementById("color-picker-container").style.display = "none";
        });

        let colorPreview = elem.nextSibling.nextSibling;
        colorPreview.addEventListener("click", event => {
            elem.focus();
        });
    });

    setStyle(styleNameToFileName(styles[0]));
    setPalette();

    styles.forEach(style => {
        let button = document.createElement("button");
        button.addEventListener("click", event => {
            setStyle(styleNameToFileName(style))
        });
        button.innerText = style;
        document.getElementById("style-picker").appendChild(button);
    });

    Array.from(document.getElementsByClassName("lorem")).forEach(elem => {
        elem.innerText =" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet viverra accumsan. In nec mi ut magna auctor ultricies. Nunc interdum nunc eu nunc fermentum, et luctus erat eleifend. Morbi sagittis urna id sagittis scelerisque. Donec imperdiet eros in magna tempus eleifend at tincidunt lectus. Etiam ullamcorper rutrum magna non iaculis. Nulla mollis, arcu id pulvinar fermentum, turpis tortor consectetur mauris, quis porttitor orci nulla convallis risus. Cras convallis cursus est ac accumsan. Suspendisse vitae urna id nisl lobortis congue. Vestibulum venenatis feugiat lorem, et semper libero. Sed eget convallis sem. Nulla risus turpis, ultrices quis ante non, lacinia posuere sem. Nullam hendrerit nisi sapien, sit amet rhoncus nisi iaculis a. Phasellus venenatis tellus vitae erat posuere pellentesque.\n\nFusce vulputate velit id purus dignissim aliquet. Sed fringilla, nunc ut dignissim tempor, lectus enim laoreet metus, sed aliquet arcu felis in diam. Fusce non pulvinar orci, ut luctus nibh. Nulla sit amet consectetur metus. Nunc quis tincidunt lorem, eu pretium diam. In non mauris ac metus varius pulvinar vitae vitae enim. Vestibulum non dolor ut est accumsan interdum a at nibh. Suspendisse non ornare risus. Mauris a leo arcu. Cras tristique metus eu orci volutpat posuere. Nullam nec lacus aliquet augue bibendum tincidunt. "
    });

    Array.from(document.getElementsByClassName("lorem-short")).forEach(elem => {
        elem.innerText = "Praesent interdum felis lacus, ut venenatis libero aliquam nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi quis urna quis ipsum rhoncus eleifend. Aliquam sodales rutrum ante quis pretium. Etiam dictum dictum consequat. Suspendisse ut elit blandit, interdum erat vitae, porttitor felis."
    });
    
    colorPicker = new window.iro.ColorPicker('#color-picker-container', {width: 160});
    colorPicker.color.hexString = '#' + document.getElementById(colorAreas[0][0]).value;

    colorPicker.on('color:change', (color, change) => {
        let elem = document.getElementById(activeColor[0]);
        let hex = colorPicker.color.hexString.substring(1,7).toUpperCase();
        if (hex != elem.value.toUpperCase()) {
            elem.value = hex;
            activeColor[1] = hex;
        }
        setPalette();
    });
}