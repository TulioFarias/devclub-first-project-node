
/*
  -- Query params => meusite.com/user?nome=tulio&age=26 // filtrar
  -- Route params => /user/2  // buscar, deletar ou atualizar
  -- Request Body => {"name": "Tulio", "age":}
*/
// const express = require('express')
// const port = 3000

// const app = express()

// app.get('/users', (request, response) =>{
//     const name = request.query.name
//     const age = request.query.age

//     return response.json({ name: name, age: age})
// })

// app.listen(port, () => {
//     console.log('🚀 Server started on port 3000')
// })

// ========================================================

// const express = require('express')
// const port = 3000

// const app = express()

// app.get('/users', (request, response) =>{
//     const { id } = request.params

//     return response.json({id})
// })

// app.listen(port, () => {
//     console.log('🚀 Server started on port 3000')
// })

// -- Middlawere => INTERCEPTADOR => TEM PODER PARA ALTERAR OU PARA DADOS DA REQUISIÇÃO

// =============================================

const express = require('express')
const port = 3003
const uuid = require('uuid')

const app = express()



const users = []
app.use(express.json())

const checkUserId = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({error : "user not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

// const myFirstMiddleware = (request, response, next) =>{
//     console.log('fui chamado')

//     next()

//     console.log('finalizado')
// }

// app.use(myFirstMiddleware)

app.get('/users', (request, response) =>{
   
    const { name , age} = request.body
    
    return response.json({})
})

app.post('/users', (request, response) =>{
   
    const { name , age} = request.body

    const user = { id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', checkUserId, (request, response) => {

    const {name, age } = request.body

    const index =  request.userIndex

    const id = request.userId

    const updatedUser = { id, name, age}


    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId,(request, response) =>{
   
    const { id } = request.params


    users.splice(index, 1)

    return response.status(204).json({})
})















app.listen(port , () => {
    console.log(`🚀 server stated on port ${port} `)
})