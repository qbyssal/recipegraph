import * as fs from 'node:fs'
const data= JSON.parse(fs.readFileSync('./rendered.json'))

const reparsed={}

for(let entry of data.items){
   reparsed["minecraft:"+entry.name.toLowerCase()]=entry.icon
}

fs.writeFileSync('textures.js',`const TEXTURES=${JSON.stringify(reparsed)}`)
console.log(reparsed)
