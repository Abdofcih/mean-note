require('../db/mongoose');
const Task = require('../models/task')

// Task.findByIdAndDelete("5dc6e68cad676f4b48903633").then((result) => {
//     console.log(result)
//     return Task.countDocuments({completed: false})
// }).then((result)=>{
// console.log(result)
// }).catch((err) => {
    
// });

const deleteAndCount = async(id)=>{
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({completed: false})
  return  {task,uncompleted:count}
}
deleteAndCount("5dc6e68cad676f4b48903633").then((result) => {
    console.log(result)
}).catch((err) => {
     console.log(err)
});



// const add =(a,b)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(a+b)
//         },2000)
//     })
// }
// const doWork = async()=>{
//     console.log("2 sec")
//      const  sum =  await add(5,7) // const  sum =   add(5,7)
//      console.log("2 sec")
//      const  sum2 =  await add(sum,3) //  const  sum2 =  await add(sum,3)
//      console.log("2 sec")
//      const  sum3 =  await add(sum2,5) // const  sum3 =  await add(sum2,5)

//       return sum3
// }


// doWork().then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log("Error")
// });
