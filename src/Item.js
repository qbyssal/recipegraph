export default class Item{
   constructor(name){
      this.name=name
      this.parents=new Set()
      this.children=new Set()
   }

   getChild(num){
      const child=[...this.children][num]
      if(child==undefined) throw "Undefined child"
      return child
   }

   getParent(num){
      const parent=[...this.parents][num]
      if(parent==undefined) throw "Undefined parent"
      return parent
   }

   static arrToObject(arr){
      let obj={}
      for(let item of arr){
         obj[item.name]={}
         obj[item.name]["parents"]=[...item.parents].map(i=>i.name)
         obj[item.name]["children"]=[...item.children].map(i=>i.name)
      }
      return obj
   }
}
