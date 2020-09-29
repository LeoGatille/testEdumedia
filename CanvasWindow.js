class CanvasWindow {
    constructor(width, height) {
        this.canvas = document.getElementById('myCanvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
        this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;
        this.canvas.addEventListener('mousedown', (event) => {
            this.getClickedCircle(event);
        });
        window.addEventListener('mouseup', (event) => {
            this.stopDragging();
        });
        this.canvas.addEventListener('mousemove', (event) => {
            this.recordMouseMove(event);
        })
        this.createInitialsCircles();
    }
    canvas;
    context;
    canvasPosLeft;
    canvasPosTop;
    draggableCircles = [];
    referenceCircle;
    draggedCircle;
    frameRequest;
    colorTxt;
    canvasWidth = () => {
        return this.canvas.width;
    }
    canvasHeight = () => {
        return this.canvas.height;
    }
    getClosestItem() {
        return this.descendingDistanceSort(this.getItemsDistances(this.referenceCircle, this.draggableCircles))[0];
    }
    descendingDistanceSort(itemsNdistances) {
        return itemsNdistances.sort((a, b) => {
            return b.distance - a.distance;
        });
    }
    getItemsDistances(ref, items) {
        return items.map(item => {
            return { item, distance: item.getEdgeToEdgeDistance(ref) };
        });
    }
    createInitialsCircles() {
        this.referenceCircle = new ColoredCircle('black', this.context, 20, true);
        this.draggableCircles.push(new ColoredCircle('blue', this.context, 50));
        this.draggableCircles.push(new ColoredCircle('red', this.context, 50));
        this.draggableCircles.push(new ColoredCircle('green', this.context, 50));
    }
    getClickedCircle(event) {
        const canvasClickX = event.pageX - this.canvasPosLeft;
        const canvasClickY = event.pageY - this.canvasPosTop;
        this.draggableCircles.forEach((draggableCircle) => {
            if (draggableCircle.getDistance(canvasClickX, canvasClickY) <= draggableCircle.radius) {
                this.draggedCircle = draggableCircle;
            }
        })
    }
    stopDragging() {
        if (!this.draggedCircle) {
            return;
        }
        this.draggedCircle.stopDragging()
        this.draggedCircle = null;
    }
    recordMouseMove(event) {
        if (!this.draggedCircle) {
            return;
        }
        this.draggedCircle.editPosition(event.pageX, event.pageY);
        this.frameRequest = requestAnimationFrame(() => this.setCanvasAnimation());
    }
    setCanvasAnimation = () => {
        this.clearCanvas();
        this.referenceCircle.createCircle();
        this.draggableCircles.forEach(circle => {
            circle.createCircle();
        })
        this.setText(this.getClosestItem().item.color);
    }
    setText(text) {
        this.context.font = '30px Arial';
        this.context.textAlign = 'center';
        this.context.fillStyle = text;
        this.context.fillText(text, (this.canvasWidth() / 2), 70);
        console.log('width => ', this.canvasWidth(), 'height => ', this.canvasHeight());
    }
    clearCanvas() {
        this.context.clearRect(0, 0, 1024, 768);
    }
}