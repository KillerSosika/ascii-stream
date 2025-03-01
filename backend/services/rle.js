function rleEncode(input) {
    return input.replace(/(.)\1+/g, (match, char) => char + match.length);
}

function rleDecode(input) {
    return input.replace(/(.)\d+/g, (match, char) => char.repeat(Number(match.slice(1))));
}

module.exports = { rleEncode, rleDecode };
