class ColoredCircle {
    constructor(color, context, radius, centered = false) {
        this.context = context;
        this.color = color;
        this.radius = radius;
        if (centered) {
            this.posX = 1024 / 2
            this.posY = 768 / 2
        } else {
            //* I do always overuse parenthesis but they helps me to easly get what's happening
            this.posX = Math.floor((this.radius * 2) + Math.random() * ((1024 - (this.radius * 4))));
            this.posY = Math.floor((this.radius * 2) + Math.random() * ((768 - (this.radius * 4))));
        }
        console.log('coloredCircle => ', this);
        this.createCircle();
    }
    posY;
    posX;
    radius;
    context;
    color;
    oldCursorPosX;
    oldCursorPosY;

    createCircle() {
        this.context.beginPath();
        this.context.arc(
            this.posX,
            this.posY,
            this.radius,
            0,
            2 * Math.PI,
        );
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.lineWidth = 10;
        this.context.stroke();
    }
    move(posX, posY) {
        console.log('Dragg');
        this.posX = posX;
        this.posY = posY;
        this.createCircle;
    };
    editPosition(x, y) {
        if (!this.oldCursorPosX && !this.oldCursorPosY) {
            this.oldCursorPosX = x;
            this.oldCursorPosY = y;
            return;
        }
        this.posX = x - (this.oldCursorPosX - this.posX);
        this.posY = y - (this.oldCursorPosY - this.posY);
        this.oldCursorPosX = x;
        this.oldCursorPosY = y;
    }
    stopDragging() {
        this.oldCursorPosX = null;
        this.oldCursorPosY = null;
    }
    getDistance(x, y) {
        return Math.sqrt(this.square(this.posX - x) + this.square(this.posY - y));
    }
    getEdgeToEdgeDistance(ref) {
        //* Do not trust center to center distance if circles are created with different radius lengths
        return (ref.radius + this.radius) - this.getDistance(ref.posX, ref.posY);
    }
    square(a) {
        return a * a;
    }
}