const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /directors should get all directors', async () => {
  const res = await request(app).get('/directors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});


 test('POST /directors should add director', async () => {
   const director = {
    firstName: 'Richard',
    lastName: 'Matheson',
    nationality: 'Estados unidos',
    image: 'https://es.wikipedia.org/wiki/Archivo:Richard_Matheson_(crop).jpg',
    birthday: '1926-02-20',
   }
   const res = await request(app).post('/directors').send(director);
   id = res.body.id;
   expect(res.status).toBe(201);
   expect(res.body.id).toBeDefined();
   expect(res.body.name).toBe(director.name);
 });

 
 test('PUT /directors/:id should update one director', async () => {
   const directorUpdate = {
    firstName: 'Richard actualizado',
   }
   const res = await request(app).put(`/directors/${id}`).send(directorUpdate);
   expect(res.status).toBe(200);
   expect(res.body.name).toBe(directorUpdate.name);
 });


 test('DELETE /directors/:id should delete one actor', async () => {
   const res = await request(app).delete(`/directors/${id}`)
   expect(res.status).toBe(204);
 });
