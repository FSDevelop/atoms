var atoms = [];

init();

function init() {
    generateAtoms();
};

function generateAtoms() {
    var atom;
    for (var i = 0; i < INITIAL_ATOMS; i++) {
        atom = new Atom();
        atom.draw();
        atoms.push(atom);
    }
};

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
};

function moveAtoms() {
    for (var i = 0; i < atoms.length; i++) {
        atoms[i].advance();
        atoms[i].draw();
    }
};

var render = function() {
    moveAtoms();
};

var game = function() {
    clear();
    render();
};

setInterval(game, 10);
