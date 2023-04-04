function generateTiles(maxWidth, maxHeight, ntiles, x_start, size){
    const tiles = [];
    const max_n_tiles = maxHeight / size;
    let n_tiles = ntiles > max_n_tiles ? max_n_tiles : ntiles;
    for(let i = 0; i < n_tiles; i++){
        let spawnHeight = maxHeight / n_tiles
        tiles.push({
            x: Math.floor(x_start + (Math.random() * (maxWidth))),
            y: Math.floor((spawnHeight * i + Math.random() * (spawnHeight - size))),
            color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        });
    }
    return tiles;
}

export default function drawRandomTiles(x_start, y_start, width , size, n_tiles){
    const canvas = document.getElementById('tileCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#a1681f";
    ctx.fillRect(x_start, 0, width, canvas.height);
    const tiles = generateTiles(width - size, canvas.height, n_tiles, x_start, size);
    for(let i = 0; i < tiles.length; i++){
        ctx.fillStyle = tiles[i].color;
        ctx.fillRect(tiles[i].x, tiles[i].y, size, size);
    }
    return tiles;
}