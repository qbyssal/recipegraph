function createNode(item){
   const node=document.createElement('div')
   node.classList.add('node')
   node.setAttribute('data-item',item)
   const img=new Image()
   img.src=getTexture(item)
   node.appendChild(img)
   return node
}

function getTexture(item){
   let tex=TEXTURES[item]
   if(tex==undefined){
      tex=`./public/images/${item.replace('minecraft:','')}.png`
   }
   return tex
}

for(let [name,family] of Object.entries(recipes)){
   console.log(name)
   document.body.appendChild(createNode(name))
}
