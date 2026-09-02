import fs from 'node:fs';

const html = fs.readFileSync('scratch/wisetitle_full.html', 'utf8');
const regex = /https?:\/\/[^\s"'><]+\.(?:png|jpg|jpeg|gif|webp|svg)[^\s"'><]*/gi;
const matches = html.match(regex) || [];
console.log('Unique Image URLs:');
console.log(Array.from(new Set(matches)));
