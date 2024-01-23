const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /actors should get all actors', async () => {
  const res = await request(app).get('/actors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});


 test('POST /actors should add actor', async () => {
   const actor = {
    firstName: 'Willard',
    lastName: " Smith",
    nationality: 'Estados unidos',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCthKtJcdGS9nEz8qnM5rd-0qbDI0tfMOTHohbSAq&s',
    birthday: '1968-09-25',
   }
   const res = await request(app).post('/actors').send(actor);
   id = res.body.id;
   expect(res.status).toBe(201);
   expect(res.body.id).toBeDefined();
   expect(res.body.name).toBe(actor.name);
 });

 
 test('PUT /actors/:id should update one actor', async () => {
   const actorUpdate = {
    firstName: 'Willard actualizado',
   }
   const res = await request(app).put(`/actors/${id}`).send(actorUpdate);
   expect(res.status).toBe(200);
   expect(res.body.name).toBe(actorUpdate.name);
 });


 test('DELETE /actors/:id should delete one actor', async () => {
   const res = await request(app).delete(`/actors/${id}`)
   expect(res.status).toBe(204);
 });
