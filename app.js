const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.set('view engine','ejs')

app.use(express.urlencoded({ extended:false }))



mongoose.connect('mongodb://localhost:27017/Fitness')
const broScheme = {
    name:String,
    age:Number,
    nickname:String,
    weight:Number,
    max:Number,
    category:String
}

const exersizeScheme = {
    name:String,
    invented:Number,
    recomended:Number,
    max:Number,
    category:String
}
const equipmentScheme = {
    name:String,
    invented:Number,
   
    recomended:Number,
    category:String
   
}

const suplementScheme = {
    name:String,
    invented:Number,
    dose:Number,
    price:Number,
    category:String
}

app.get('/',function(req,res){
res.render('index',{title:"Local Gym store"})

})


const Bro = mongoose.model('bros',broScheme)
const Exersize = mongoose.model('exersizes',exersizeScheme)
const Equipment = mongoose.model('equipment',equipmentScheme)
const Suplement = mongoose.model('suplement',suplementScheme)
let BROS=[]
let EXER=[]
let EQUIP=[]
let SUPL=[]
Bro.find({},(req,res)=>{
    
    BROS=res
   
    })

    Exersize.find({},(req,res)=>{
    
        EXER=res
       
        })
        Equipment.find({},(req,res)=>{
    
            EQUIP=res
           
            })
            Suplement.find({},(req,res)=>{
    
                SUPL=res
               
                })
app.get('/BodyBuilderForm',function(req,res){
    res.render('BodyBuilderForm',{title:"Create a new GYMBRO"})
    
    })
    app.get('/Exersize',function(req,res){
        res.render('Exersize',{title:"Create a new Exersize"})
        
        })
        
         app.get('/Suplements',function(req,res){
            res.render('Suplements',{title:"Create a new Suplement"})
            
            })
            
            app.get('/Equipment',function(req,res){
                res.render('Equipment',{title:"Create a new Equipment"})
                
                })
app.use(express.static('views'))


app.get('/showBro',  function(req,res){


    res.render('ShowBro',{title:"ALL BROS",arr:BROS})
    
})

app.get('/showExer',  function(req,res){


    res.render('ShowExer',{title:"ALL EXERSIZES",arr:EXER})
    
})
app.get('/showEquip',  function(req,res){


    res.render('ShowEquip',{title:"ALL EQUIPMENT",arr:EQUIP})
    
})
app.get('/showSupl',  function(req,res){


    res.render('ShowSupl',{title:"ALL SUPLEMENTS",arr:SUPL})
    
})

app.post('/BodyBuilderForm',function(req,res){
   
    let newBro = new Bro({
        name:req.body.name
        ,age:req.body.age
        ,nickname:req.body.nickname
        ,weight:req.body.weight
        ,max:req.body.maxbench,category:"Bro"
    })

    BROS.push(newBro)
    newBro.save()
   res.redirect('/')
})

app.post('/Exersize',function(req,res){
    console.log(req.body)
    let newExersize = new Exersize({
        name:req.body.exersizeName,
        invented:req.body.exersizeInvented,
        recomended:req.body.exersizeRecomended,
        max:req.body.exersizeMax,
        category:"Exersize"
    })

   EXER.push(newExersize)
    newExersize.save()
   res.redirect('/')
})

app.post('/Equipment',function(req,res){
   console.log(req.body)
    let newEquip = new Equipment({
        name:req.body.equipmentName,
        invented:req.body.equipmentInvented,
       
        recomended:req.body.equipmentSets,
   category:"Equipment"
    })
EQUIP.push(newEquip)
   
    newEquip.save()
   res.redirect('/')
})

app.post('/Suplements',function(req,res){
    console.log(req.body)
    let newSup = new Suplement({
        name:req.body.suplementName,
        invented:req.body.suplementInvented,
        dose:req.body.suplementDose,
        price:req.body.suplementPrice,
       
        category:"Suplement"
    })

   SUPL.push(newSup)
    newSup.save()
   res.redirect('/')
})


app.get('/Details/:id/:category',(req,res)=>{
    let item
if(req.params.category === "Bro"){
    Bro.findById(req.params.id).then(result=>{
        console.log(result)
        item = result
        res.render('Details',{title:"DETAILS OF",item:item
        })
    })
 
}
else if(req.params.category === "Exersize"){
    Exersize.findById(req.params.id).then(result=>{
        console.log(result)
        item = result
        res.render('Details',{title:"DETAILS OF",item:item
        })
    })
 
}
else if(req.params.category === "Equipment"){
    Equipment.findById(req.params.id).then(result=>{
        console.log(result)
        item = result
        res.render('Details',{title:"DETAILS OF",item:item
        })
    })
 
}
else if(req.params.category === "Suplement"){
    Suplement.findById(req.params.id).then(result=>{
        console.log(result)
        item = result
        res.render('Details',{title:"DETAILS OF",item:item
        })
    })
 
}

})

app.get('/Delete/:id/:category',function(req,res){
let arr = []
if(req.params.category === "Bro"){
 
    Bro.deleteOne({_id:req.params.id}).then(()=>{
BROS.forEach((item)=>{
    console.log(req.params.id)

    id = item._id.toString().slice(0,24)
    console.log(id)
    if( id !==req.params.id ){
        arr.push(item)
    }

})
BROS = arr
res.render('ShowBro',{title:"ALL BROS",arr:BROS})
    })
 
}
else if(req.params.category === "Exersize"){
    Exersize.deleteOne({_id:req.params.id}).then(()=>{
        EXER.forEach((item)=>{
            
    id = item._id.toString().slice(0,24)
            if(item._id !==req.params.id ){
                arr.push(item)
            }
        })
        EXER = arr
        res.render('ShowExer',{title:"ALL EXERSIZES",arr:EXER})
            })
         
}
else if(req.params.category === "Equipment"){
    Equipment.deleteOne({_id:req.params.id}).then(()=>{
        EQUIP.forEach((item)=>{
            
    id = item._id.toString().slice(0,24)
            if(item._id !==req.params.id ){
                arr.push(item)
            }
        })
        SUPL = arr
        res.render('ShowEquip',{title:"ALL EQUIPMENT",arr:SUPL})
            })    
          
}
else if(req.params.category === "Suplement"){
    Suplement.deleteOne({_id:req.params.id}).then(()=>{
        
    id = item._id.toString().slice(0,24)
        SUPL.forEach((item)=>{
            if(item._id !==req.params.id ){
                arr.push(item)
            }
        })
        SUPL = arr
        res.render('ShowSupl',{title:"ALL SUPLEMENTS",arr:SUPL})
            })
 
}
})

app.get('/Edit/:id/:category',function(req,res){
    let ITEM
    if(req.params.category === "Bro"){
 

    BROS.forEach((item)=>{
       
        id = item._id.toString().slice(0,24)

        if( id ===req.params.id ){
            ITEM= item
        }
    
    })

    res.render('UpdateBro',{title:"UPDATE BRO",item:ITEM})
     
     
    }
    if(req.params.category === "Exersize"){
 

        EXER.forEach((item)=>{
           
            id = item._id.toString().slice(0,24)
    
            if( id ===req.params.id ){
                ITEM= item
            }
        
        })
    
        res.render('UpdateExer',{title:"UPDATE EXERSIZE",item:ITEM})
         
         
        }
        if(req.params.category === "Equipment"){
 

            EQUIP.forEach((item)=>{
               
                id = item._id.toString().slice(0,24)
        
                if( id ===req.params.id ){
                    ITEM= item
                }
            
            })
        
            res.render('UpdateEquip',{title:"UPDATE Equipment",item:ITEM})
             
             
            }
            if(req.params.category === "Suplement"){
 

                SUPL.forEach((item)=>{
                   
                    id = item._id.toString().slice(0,24)
            
                    if( id ===req.params.id ){
                        ITEM= item
                    }
                
                })
            
                res.render('UpdateSupl',{title:"UPDATE Equipment",item:ITEM})
                 
                 
                }
})


app.post('/Edit/:id/:category', async (req,res)=>{
let id
let newItem ={}
let arr =[]
let oldItem
/*
    name:String,
    invented:Number,
    recomended:Number,
    max:Number,
*/ 
    if(req.params.category === "Bro"){
 

        BROS.forEach((item)=>{
           
            id = item._id.toString().slice(0,24)
    
            if( id !==req.params.id ){
                arr.push(item)
            }else{
                oldItem = item
            }
        
        })
        if(req.body.age === undefined || req.body.age === null){
newItem = {...newItem,age:oldItem.age}
        }else{
            newItem = {...newItem,age:req.body.age}
        }
    


if(req.body.maxbench === undefined || req.body.maxbench === null){
newItem = {...newItem,max:oldItem.max}
}else{
newItem = {...newItem,max:req.body.maxbench}
}
                
if(req.body.weight === undefined || req.body.weight === null){
newItem = {...newItem,weight:oldItem.weight}
}else{
newItem = {...newItem,weight:req.body.weight}
}
                    

if(req.body.name === undefined || req.body.name === null){
newItem = {...newItem,name:oldItem.name}
}else{
newItem = {...newItem,name:req.body.name}
}
if(req.body.nickname === undefined || req.body.nickname === null){
newItem = {...newItem,nickname:oldItem.nickname}
}else{
newItem = {...newItem,nickname:req.body.nickname}
}
newItem =  {...newItem,category:"Bro",_id:oldItem._id}      


console.log(req.params)
await  Bro.findOneAndUpdate({_id:newItem._id},{name:newItem.name},
 {   age:newItem.age ,nickname:newItem.nickname,
    weight:newItem.weight,
    max:newItem.max},
  ).exec()
arr.push(newItem)
BROS = arr
        res.render('ShowBro',{title:"ALL BROS",arr:arr})
         
         
        }
        if(req.params.category === "Exersize"){
 

            EXER.forEach((item)=>{
               
                id = item._id.toString().slice(0,24)
        
                if( id !==req.params.id ){
                    arr.push(item)
                }else{
                    oldItem = item
                    console.log(oldItem)
                }
            
            })
            if(req.body.exersizeName === undefined || req.body.exersizeName === null){
    newItem = {...newItem,name:oldItem.name}
            }else{
                newItem = {...newItem,name:req.body.exersizeName}
            }
        
    
    
    if(req.body.exersizeInvented === undefined || req.body.exersizeInvented === null){
    newItem = {...newItem,invented:oldItem.invented}
    }else{
    newItem = {...newItem,invented:req.body.exersizeInvented}
    }
                    
    if(req.body.exersizeRecomended === undefined || req.body.exersizeRecomended === null){
    newItem = {...newItem,recomended:oldItem.recomended}
    }else{
    newItem = {...newItem,recomended:req.body.exersizeRecomended}
    }
                        
    
    if(req.body.exersizeMax === undefined || req.body.exersizeMax === null){
    newItem = {...newItem,max:oldItem.max}
    }else{
    newItem = {...newItem,max:req.body.exersizeMax}
    }

    newItem =  {...newItem,category:"Exersize",_id:oldItem._id}      
    
    
    console.log(req.params)
    await  Exersize.findOneAndUpdate({_id:newItem._id},{name:newItem.name},
     {   invented:newItem.invented ,
        recomended:newItem.recomended,
        max:newItem.max},
      ).exec()
    arr.push(newItem)
    BROS = arr
            res.render('ShowExer',{title:"ALL EXERSIZES",arr:arr})
             
             
            }
            if(req.params.category === "Equipment"){
 

                EQUIP.forEach((item)=>{
                   
                    id = item._id.toString().slice(0,24)
            
                    if( id !==req.params.id ){
                        arr.push(item)
                    }else{
                        oldItem = item
                        console.log(oldItem)
                    }
                
                })
                if(req.body.equipmentName === undefined || req.body.equipmentName === null){
        newItem = {...newItem,name:oldItem.name}
                }else{
                    newItem = {...newItem,name:req.body.equipmentName}
                }
            
        
        
        if(req.body.equipmentInvented === undefined || req.body.equipmentInvented === null){
        newItem = {...newItem,invented:oldItem.invented}
        }else{
        newItem = {...newItem,invented:req.body.equipmentInvented}
        }
                        
        if(req.body.equipmentSets === undefined || req.body.equipmentSets === null){
        newItem = {...newItem,recomended:oldItem.recomended}
        }else{
        newItem = {...newItem,recomended:req.body.equipmentSets}
        }
                            
        
      
    
        newItem =  {...newItem,category:"Equipment",_id:oldItem._id}      
        
        
        console.log(req.params)
        await  Equipment.findOneAndUpdate({_id:newItem._id},
         {  name:newItem.name,
             invented:newItem.invented ,
            recomended:newItem.recomended,
            },
          ).exec()
        arr.push(newItem)
        EQUIP = arr
                res.render('ShowEquip',{title:"ALL EQUPMENT",arr:arr})
                 
                 
                }
                if(req.params.category === "Suplement"){
 

                    SUPL.forEach((item)=>{
                       
                        id = item._id.toString().slice(0,24)
                
                        if( id !==req.params.id ){
                            arr.push(item)
                        }else{
                            oldItem = item
                            console.log(oldItem)
                        }
                    
                    })
                    if(req.body.suplementName === undefined || req.body.suplementName === null){
            newItem = {...newItem,name:oldItem.name}
                    }else{
                        newItem = {...newItem,name:req.body.suplementName}
                    }
                
            
            
            if(req.body.suplementDose === undefined || req.body.suplementDose === null){
            newItem = {...newItem,dose:oldItem.dose}
            }else{
            newItem = {...newItem,dose:req.body.suplementDose}
            }
                            
            if(req.body.suplementPrice === undefined || req.body.suplementPrice === null){
            newItem = {...newItem,price:oldItem.price}
            }else{
            newItem = {...newItem,price:req.body.suplementPrice}
            }
                                
            
          
        
            newItem =  {...newItem,category:"Suplement",_id:oldItem._id}      
            
            
            console.log(req.params)
            await  Equipment.findOneAndUpdate({_id:newItem._id},
             {  name:newItem.name,
                 invented:newItem.invented ,
                dose:newItem.dose,
                price:newItem.price
                },
              ).exec()
            arr.push(newItem)
            EQUIP = arr
                    res.render('ShowSupl',{title:"ALL SUPLEMENTS",arr:arr})
                     
                     
                    }
})

app.listen(3000)