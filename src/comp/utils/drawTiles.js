import blue from '../../img/blocks/blue_new.webp';
import green from '../../img/blocks/green_new.webp';
import red from '../../img/blocks/red_new.webp';
import yellow from '../../img/blocks/yellow_new.webp';
import purple from '../../img/blocks/purple_new.webp';
import orange from '../../img/blocks/orange_new.webp';
import cyan from '../../img/blocks/cyan_new.webp';

import { tile_size, begin, space_btwn_tiles, limits } from './configs';


// function generateTiles(maxWidth, maxHeight, ntiles, x_start, size){
//     const tiles = [];
//     const max_n_tiles = maxHeight / size;
//     let n_tiles = ntiles > max_n_tiles ? max_n_tiles : ntiles;
//     for(let i = 0; i < n_tiles; i++){
//         let spawnHeight = maxHeight / n_tiles
//         tiles.push({
//             x: Math.floor(x_start + (Math.random() * (maxWidth))),
//             y: Math.floor((spawnHeight * i + Math.random() * (spawnHeight - size))),
//             color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
//         });
//     }
//     return tiles;
// }



export default function drawRandomTiles(width, height) {
    return new Promise((resolve) => {
        const canvas = document.getElementById('tileCanvas');
        const ctx = canvas.getContext('2d');
        const tile_placed = [];
        for (let i = begin; i < width; i += space_btwn_tiles) {
            for (let j = begin; j < height; j += space_btwn_tiles) {
                if (i > limits.x.min && i < limits.x.max && j > limits.y.min && j < limits.y.max) continue;
                if (Math.random() < 0.1) {
                    let img = new Image(tile_size, tile_size);
                    img.src = [blue, green, red, yellow, purple, orange, cyan][Math.floor(Math.random() * 7)];
                    img.onload = () => {
                        let angleInRadians = Math.random() * 2 * Math.PI;
                        ctx.translate(i, j)
                        ctx.rotate(angleInRadians);
                        ctx.drawImage(img, -tile_size / 2, -tile_size / 2, tile_size, tile_size);
                        ctx.rotate(-angleInRadians);
                        ctx.translate(-i, -j)
                    }
                    tile_placed.push({ x: i - tile_size / 2, y: j - tile_size / 2 });
                }
            }
        }
        console.log(tile_placed);
        resolve(tile_placed);
    })
}