function generateTiles(maxWidth, maxHeight, ntiles, canvasHeight, widthCenter){
    const tiles = [];
    for(let i = 0; i < ntiles; i++){
        let spawnHeight = maxHeight / ntiles
        tiles.push({
            x: Math.floor(widthCenter + (Math.random() * maxWidth - maxWidth / 2)),
            y: Math.floor((spawnHeight * i + Math.random() * spawnHeight)),
            color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        });
    }
    return tiles;
}

export default function drawRandomTiles(x_start, width){
    const canvas = document.getElementById('tileCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const tiles = generateTiles(width, 2000, 5, canvas.height, x_start);
    for(let i = 0; i < tiles.length; i++){
        ctx.fillStyle = tiles[i].color;
        ctx.fillRect(tiles[i].x, tiles[i].y, 60, 60);
    }
    return tiles;
}