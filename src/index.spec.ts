import request from 'supertest';
import { server } from './index';
import { v4 as uuidv4 } from 'uuid';


describe('Scenario 1', () => {
  
  let idsArray: string[] = [];

  it('Get all record users with a GET api/users request (an empty array is expected)', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('Post new user', async () => {

    const res = await request(server).post('/api/users').send({
      username: 'first-user',
      age: 30,
      hobbies: ['reading', 'writing'],
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('first-user');
    expect(res.body.age).toEqual(30);
    expect(res.body.hobbies).toEqual(['reading', 'writing']);
    idsArray.push(res.body.id);
  });

  it('Get first-user by id (name: first-user, age: 30, hobbies: reading writing )', async () => {

    const res = await request(server).get(`/api/users/${idsArray[0]}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('first-user');
    expect(res.body.age).toEqual(30);
    expect(res.body.hobbies).toEqual(['reading', 'writing']);
  });

  it('Update first-user (name: update-first-user, age: 25, hobbies: sleeping )', async () => {

    const res = await request(server).put(`/api/users/${idsArray[0]}`).send({
      username: 'update-first-user',
      age: 25,
      hobbies: ['sleeping'],
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('update-first-user');
    expect(res.body.age).toEqual(25);
    expect(res.body.hobbies).toEqual(['sleeping']);
  });

  it('Delete first-user', async () => {
    const res = await request(server).delete(`/api/users/${idsArray[0]}`);
    expect(res.statusCode).toBe(204);
  });

  it('Get user that was deleted', async () => {
    const res = await request(server).get(`/api/users/${idsArray[0]}`);
    expect(res.statusCode).toBe(404);
  });  
})

describe('Scenario 2', () => {

  let idsArray: string[] = [];
  
  it('Get all record users with a GET api/users request (an empty array is expected)', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('Post new user', async () => {

    const res = await request(server).post('/api/users').send({
      username: 'new-user',
      age: 18,
      hobbies: ['working', 'playing'],
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('new-user');
    expect(res.body.age).toEqual(18);
    expect(res.body.hobbies).toEqual(['working', 'playing']);
    idsArray.push(res.body.id);
  });

  it('Post another new user', async () => {

    const res = await request(server).post('/api/users').send({
      username: 'another-new-user',
      age: 18,
      hobbies: ['sleeping'],
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('another-new-user');
    expect(res.body.age).toEqual(18);
    expect(res.body.hobbies).toEqual(['sleeping']);
    idsArray.push(res.body.id);
  });


  it('Post another new user with error (400 error is expected)', async () => {
    const res = await request(server).post('/api/users').send({
      age: 18,
      hobbies: ['working', 'playing'],
    });
    expect(res.statusCode).toBe(400);
  });

  it('Delete first-user', async () => {
    const res = await request(server).delete(`/api/users/${idsArray[0]}`);
    expect(res.statusCode).toBe(204);
  });

  it('Delete non-existent user', async () => {
    const res = await request(server).delete(`/api/users/${idsArray[0]}`);
    expect(res.statusCode).toBe(404);
  });
})

describe('Scenario 3', () => {

  let idsArray: string[] = [];

  it('Post new user', async () => {

    const res = await request(server).post('/api/users').send({
      username: 'new-user',
      age: 18,
      hobbies: ['working', 'playing'],
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('new-user');
    expect(res.body.age).toEqual(18);
    expect(res.body.hobbies).toEqual(['working', 'playing']);
    idsArray.push(res.body.id);
  });

  it('Post another new user', async () => {

    const res = await request(server).post('/api/users').send({
      username: 'another-new-user',
      age: 18,
      hobbies: ['sleeping'],
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toEqual('another-new-user');
    expect(res.body.age).toEqual(18);
    expect(res.body.hobbies).toEqual(['sleeping']);
    idsArray.push(res.body.id);
  });

  it('Update non-existent user (404 error is expected)', async () => {

    const res = await request(server).put(`/api/users/${uuidv4()}`).send({
      username: 'non-existent',
      age: 45,
      hobbies: ['none'],
    });

    expect(res.statusCode).toBe(404);
  });

  it('Update non-existent user with not valid ID (400 error is expected)', async () => {

    const res = await request(server).put(`/api/users/kfd31kkl-sf21slkj-ksl42-kjw1gs`).send({
      username: 'non-existent',
      age: 45,
      hobbies: ['none'],
    });

    expect(res.statusCode).toBe(400);
  });

  it('Delete non-existent user with not valid ID (400 error is expected)', async () => {
    const res = await request(server).delete(`/api/users/kfd31kkl-sf21slkj-ksl42-kjw1gs`);
    expect(res.statusCode).toBe(400);
  });

  it('Get user by non-existent id (400 error is expected)', async () => {

    const res = await request(server).get(`/api/users/kfd31kkl-sf21slkj-ksl42-kjw1gs`);
    expect(res.statusCode).toBe(400);
  });

});


