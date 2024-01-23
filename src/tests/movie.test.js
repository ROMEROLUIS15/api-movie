const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /movies should get all movies', async () => {
  const res = await request(app).get('/movies');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});


 test('POST /movies should add movie', async () => {
   const movie = {
    name: 'I Am Legend',
    image: 'https://lavenamisteriosa.com/wp-content/uploads/2019/05/portada-soy-leyenda-richard-matheson.jpg',
    synopsis: 'Robert Neville is the only survivor of a germ war that has devastated the planet and turned the rest of humanity into vampires.',
    releaseYear: '1954',
   }
   const res = await request(app).post('/movies').send(movie);
   id = res.body.id;
   expect(res.status).toBe(201);
   expect(res.body.id).toBeDefined();
   expect(res.body.name).toBe(movie.name);
 });

 
 test('PUT /movies/:id should update one movie', async () => {
   const movieUpdate = {
    name: 'I Am Legend update',
   }
   const res = await request(app).put(`/movies/${id}`).send(movieUpdate);
   expect(res.status).toBe(200);
   expect(res.body.name).toBe(movieUpdate.name);
 });


  test('POST /movies/:id/actors should insert actor by movie', async () => {
    const actor = await Actor.create({
      firstName: 'Clint',
      lastName: "Eastwood",
      nationality: 'United States',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Clint_Eastwood_at_2010_New_York_Film_Festival.jpg/200px-Clint_Eastwood_at_2010_New_York_Film_Festival.jpg',
      birthday: '1930-05-31',
    });
    const res = await request(app)
      .post(`/movies/${id}/actors`)
      .send([ actor.id ]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });


  test('POST /movies/:id/directors should insert director by movie', async () => {
    const director = await Director.create({
      firstName: 'Steven',
      lastName: "Spielberg",
      nationality: 'United States',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg/270px-MKr25425_Steven_Spielberg_%28Berlinale_2023%29.jpg',
      birthday: '1946-12-18',
    });
    const res = await request(app)
      .post(`/movies/${id}/directors`)
      .send([ director.id ]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });


  test('POST /movies/:id/genres should insert genre by movie', async () => {
    const genre = await Genre.create({
      name: 'Drama',
    });
    const res = await request(app)
      .post(`/movies/${id}/genres`)
      .send([ genre.id ]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });


 test('DELETE /movies/:id should delete one movie', async () => {
   const res = await request(app).delete(`/movies/${id}`)
   expect(res.status).toBe(204);
 });
 
