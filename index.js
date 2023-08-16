
const fs = require('fs')
console.log()
const recipesDir=fs.readdirSync('./recipes')

let recipes={
   crafting:[],
   smelting:[],
}

let itemNames=new Set()
let items=[]

class Item{
   constructor(name){
      this.name=name
      this.parents=new Set()
      this.children=new Set()
   }

   child(num){
      const chi=[...this.children][num]
      if(chi==undefined) throw "Undefined child"
      return chi
   }

   parent(num){
      const par=[...this.parents][num]
      if(par==undefined) throw "Undefined parent"
      return par
   }
}

recipesDir.forEach((recipeData)=>{
   const recipe=JSON.parse(fs.readFileSync(`./recipes/${recipeData}`).toString());

   //TODO: this lol
   if(recipe.type=="minecraft:smithing_trim"||recipe.type.startsWith("minecraft:crafting_special")||recipe.type=="minecraft:crafting_decorated_pot") return
   

   let usedItems=[]
   let outputItems=[]

   const {type} = recipe
   if(type=="minecraft:crafting_shaped"){
      const used=Object.values(recipe.key)
      used.forEach(itemData=>{
         if(Array.isArray(itemData)){
            //TODO: handle items using literal tags
         }
         else{
            keys=Object.keys(itemData)
         
            if(keys[0]=="item"){


               const result = recipe.result.item

               if(!itemNames.has(itemData.item)){
                  let i=new Item(itemData.item)
                  let child;

                  if(itemNames.has(result)){
                     child=items[[...itemNames].indexOf(result)]
                  }
                  else{
                     child=new Item(result)
                     itemNames.add(result)
                     items.push(child)
                  }
                  i.children.add(child)
                  child.parents.add(i)
                  items.push(i)
                  itemNames.add(itemData.item)
               }else{
                  let i = items[[...itemNames].indexOf(itemData.item)]
                  let child;

                  if(itemNames.has(result)){
                     child=items[[...itemNames].indexOf(result)]
                  }else{
                     child=new Item(result)
                     itemNames.add(result)
                     items.push(child)
                  }
                  i.children.add(child)
                  child.parents.add(i)
               }



               if(!itemNames.has(result)){
                  let i = new Item(result)
                  let parent;

                  if(itemNames.has(itemData.item)){
                     parent=items[[...itemNames].indexOf(itemData.item)]
                  }else{
                     parent = new Item(itemData.item) 
                     itemNames.add(itemData.item)
                     items.push(parent) 
                  }

                  i.parents.add(parent)
                  parent.children.add(i)
                  items.push(i)
                  itemNames.add(result)
               }else{
                  let i = items[[...itemNames].indexOf(result)]
                  let parent;

                  if(itemNames.has(itemData.item)){
                     parent=items[[...itemNames].indexOf(itemData.item)]
                  }else{
                     parent=new Item(itemData.item)
                     itemNames.add(itemData.item)
                     items.push(parent)
                  }

                  i.parents.add(parent)
                  parent.children.add(i)
               }
            }
            else if(keys[0]=="tag"){
               //TODO: handle items using tags
            }
            else{
               console.log(recipe)
            }
         }
      })
   }else{
      
   }   
})

console.log(items.length,itemNames.size)
console.log(items[[...itemNames].indexOf("minecraft:hay_block")])
