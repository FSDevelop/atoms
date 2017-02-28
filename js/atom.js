var Atom = function(params) {
    this.index = atoms.length + 1;
    this.size = ATOM_SIZE;
    this.diameter = this.size * 2;
    this.create();
    this.freeze = false;
};

Atom.prototype.setState = function() {
    var newPosition = true;
    this.direction = Math.floor(Math.random() * 360);
    
    // avoid overlapping atoms
    while (newPosition) {
        var match = false;
        var distance = this.size * 5;
        
        // position avoiding canvas limits
        this.x = parseFloat(Math.floor(Math.random() * (CANVAS_WIDTH - this.diameter)) + this.size);
        this.y = parseFloat(Math.floor(Math.random() * (CANVAS_HEIGHT - this.diameter)) + this.size);
    
        if (atoms.length > 0) {
            for (var i = 0; i < atoms.length; i++) {
                if (Math.abs(this.x - atoms[i].x) < distance && 
                    Math.abs(this.y - atoms[i].y) < distance) {
                    match = true;
                    break;
                }
            }
        }
        
        newPosition = match;
    }
};

Atom.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
};

Atom.prototype.create = function() {
    this.setState();
    this.draw();
};

Atom.prototype.advance = function() {
    if (!this.freeze) {
        var d = this.direction;
        var move = (d <= 180) ? (1 / 90 * d - 1) : ((1 / 90 * d - 3) * -1);
        
        this.y += move;
        this.x += (d <= 180) ? 1 - Math.abs(move) : -1 + Math.abs(move);
        
        // horizontal wall collision
        if (this.x >= CANVAS_WIDTH - this.size || this.x <= this.size) {
            this.direction = 360 - d;
        }
        
        d = this.direction;
        
        // vertical wall collision
        if (this.y >= CANVAS_HEIGHT - this.size || this.y <= this.size) {
            if (this.y >= CANVAS_HEIGHT - this.size) {
                if (d >= 180) {
                    this.direction = 360 + (180 - d);
                } else {
                    this.direction = 180 - d;
                }
                this.y -= 1;
            } else if (this.y <= this.size) {
                if (d >= 180) {
                    this.direction = 180 + (360 - d);
                } else {
                    this.direction = 2 * d;
                }
                this.y += 1;
            }
        }
        
        // atoms collision
        if (atoms.length > 0) {
            for (var i = 0; i < atoms.length; i++) {
                if (Math.abs(this.x - atoms[i].x) < this.diameter && 
                    Math.abs(this.y - atoms[i].y) < this.diameter && 
                    this.index != atoms[i].index) {
                        
                    break;
                }
            }
        }
    }
};
