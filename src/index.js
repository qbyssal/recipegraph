
import * as fs from 'node:fs'
import Item from './Item.js'

const tagsDir=fs.readdirSync('./tags')
const recipesDir=fs.readdirSync('./recipes')

let itemNames=new Set()
let items=[]

let logUnhandled=false;


recipesDir.forEach((recipeData)=>{
   const recipe=JSON.parse(fs.readFileSync(`./recipes/${recipeData}`).toString());
   const {type} = recipe

   if(type=="minecraft:crafting_shaped"){
      handleShaped(recipe)
   }else{
      if(logUnhandled==true) console.log(`Recipe of type ${type} is unhandled`)
   }   
})



function handleShaped(recipe){
   const used=Object.values(recipe.key)
   const result=recipe.result.item

   used.forEach(itemData=>{
      if(Array.isArray(itemData)){
         //TODO: handle items using literal tags
      }
      else{
         let dataType=Object.keys(itemData)[0]
      
         if(dataType=="item"){
            let parent=registerItem(itemData.item)
            let child=registerItem(result);

            parent.children.add(child)
            child.parents.add(parent)
         }else if(dataType=="tag"){
            //TODO: handle items using tags
         }
      } 
   })
}

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
console.log(items.length,itemNames.size)
console.log(items[[...itemNames].indexOf("minecraft:stick")])
