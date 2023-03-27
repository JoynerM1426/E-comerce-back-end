const app = require("../app");
const request = require("supertest");
const Product = require("../models/Product");
require('../models')

let token;


beforeAll(async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /carts should create a cart", async () => {
  const product = await Product.create({ 
    title:"Iphone 12 plus",
    description:"Resistencia a las salpicaduras, al agua y al polvo 3 Clasificación IP68 (hasta 30 minutos a una profundidad máxima de 6 metros) según la norma IEC 60529 Chip Chip A15 BionicCámara Sistema de dos cámaras Grabación de videoCámara TrueDepthFace ID Seguridad Conexión celular e inalámbrica",
    price:"1100.00"
  });
  const cart = {
    quantity: 1,
    productId: product.id
  };
  const res = await request(app)
  .post("/carts")
  .send(cart)
  .set("Authorization", `Bearer ${token}`)
  await product.destroy()
  expect(res.status).toBe(201);
  expect(res.body.quantity).toBe(cart.quantity)
});

test("GET /carts should return all carts" , async() => {
  const res = await request(app)
  .get('/carts')
  .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})