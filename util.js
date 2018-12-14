var seed = Math.random() * 51413;

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function numToHexColor(num) {
    str = num.toString(16);
    return "0".repeat(6 - str.length) + str
}

function hexToNumColor(hex) {
    return parseInt(hex, 16)
}
