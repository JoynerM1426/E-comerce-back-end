const app = require("../app");
const request = require("supertest");
const Image = require("../models/Image");
require('../models')

let token;
let productId;

beforeAll(async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /products should create one product", async () => {
  const newproduct = { 
    
    title:"Iphone 12 plus",
    description:"Resistencia a las salpicaduras, al agua y al polvo 3 Clasificación IP68 (hasta 30 minutos a una profundidad máxima de 6 metros) según la norma IEC 60529 Chip Chip A15 BionicCámara Sistema de dos cámaras Grabación de videoCámara TrueDepthFace ID Seguridad Conexión celular e inalámbrica",
    price:"1100.00"
  
  };
  const res = await request(app)
    .post("/products")
    .send(newproduct)
    .set("Authorization", `Bearer ${token}`);
    productId= res.body.id;
    // console.log(res.body);
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newproduct.name);
});

test("GET /products should return all products", async () => {
  const res = await request(app).get("/products");
  // console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /products/:id should update one product", async () => {
  const body = {
    title:"Iphone 12 plus"
  };
  const res = await request(app).put(`/products/${productId}`).send(body)
  .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(body.title);
});

test("POST /products/:id/images should set the images", async () => {
  const image = await Image.create({url:"haskkkdf", filename:"hghsfda"})
  const res = await request(app).post(`/products/${productId}/images`)
  .send([image.id])
  .set('Authorization', `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("DELETE /products/:id should delete one product", async () => {
  const res = await request(app).delete(`/products/${productId}`)
  .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});
