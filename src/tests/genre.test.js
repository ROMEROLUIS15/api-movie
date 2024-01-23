const request = require('supertest')
const app = require('../app')
require('../models')

let id;


test("GET /genres should bring all genres", async () => {
    const res = await request(app).get('/genres')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})


test("POST /genres should create a genre ", async () => {
    const newGenre = {
        name: 'science fiction',
    }
    const res = await request(app).post('/genres').send(newGenre)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newGenre.name)
    expect(res.body.id).toBeDefined()
})


test('PUT /genres:id should update genre', async () => {
    const genre = {
        name: 'science fiction update'
    }
    const res = await request(app).put(`/genres/${id}`).send(genre)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genre.name)
})


test('DELETE /genres:id must delete one genre', async () => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204)
})