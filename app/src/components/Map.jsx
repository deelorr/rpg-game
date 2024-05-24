class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = Array.from({ length: height }, () => Array.from({ length: width }, () => null));
    }

    placeItem(item, x, y) {
        if (this.isValidPosition(x, y)) {
            this.grid[y][x] = item;
        }
    }

    placeEnemy(enemy, x, y) {
        if (this.isValidPosition(x, y)) {
            this.grid[y][x] = enemy;
        }
    }

    isValidPosition(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    getItem(x, y) {
        if (this.isValidPosition(x, y)) {
            return this.grid[y][x];
        }
        return null;
    }

    removeItem(x, y) {
        if (this.isValidPosition(x, y)) {
            this.grid[y][x] = null;
        }
    }
}

export default Map;