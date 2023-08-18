
import * as fs from 'node:fs'
import Item from './Item.js'
function registerItem(itemName){
   let i;
   if(!itemNames.has(itemName)){
      i=new Item(itemName)
      items.push(i)
      itemNames.add(itemName)
   }else{
      i = items[[...itemNames].indexOf(itemName)]
   }
   return i
}

function getItem(itemName){
   return items[[...itemNames].indexOf(itemName)]
}

function handleShaped(recipe){
   const used=Object.values(recipe.key)
   const result=recipe.result.item
   let child=registerItem(result)

   used.forEach(itemData=>{
      if(Array.isArray(itemData)){
         for(let entry of itemData){
            let dataType=Object.keys(entry)[0]
      
            if(dataType=="item"){
               let parent=registerItem(entry.item)
               parent.children.add(child)
               child.parents.add(parent)
            }else if(dataType=="tag"){
               const tag= tags[entry.tag]
               for(let item of tag){
                  let parent=registerItem(item)
                  parent.children.add(child)
                  child.parents.add(parent)
               }
            }
         }
      }
      else{
         let dataType=Object.keys(itemData)[0]
      
         if(dataType=="item"){
            let parent=registerItem(itemData.item)
            parent.children.add(child)
            child.parents.add(parent)
         }else if(dataType=="tag"){
            const tag= tags[itemData.tag]
            for(let item of tag){
               let parent=registerItem(item)
               parent.children.add(child)
               child.parents.add(parent)
            }
         }
      }
   })
}


const tagsDir=fs.readdirSync('./tags')
const recipesDir=fs.readdirSync('./recipes')

let itemNames=new Set()
let items=[]
let tags={}
let logUnhandled=false;

tagsDir.forEach((tagData)=>{
   const tag=JSON.parse(fs.readFileSync(`./tags/${tagData}`).toString())
   const tagName="minecraft:"+tagData.replace('.json','')
   tags[tagName]=tag.values
})

recipesDir.forEach((recipeData)=>{
   const recipe=JSON.parse(fs.readFileSync(`./recipes/${recipeData}`).toString());
   const {type} = recipe

   if(type=="minecraft:crafting_shaped"){
      handleShaped(recipe)
   }else{
      if(logUnhandled==true) console.log(`Recipe of type ${type} is unhandled`)
   }   
})

//console.log(items.length,itemNames.size)
//console.log(items[[...itemNames].indexOf("minecraft:stick")])

let data=Item.arrToObject(items)

fs.writeFileSync('./out.js',"const recipes="+JSON.stringify(data))
