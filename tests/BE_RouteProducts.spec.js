//placeholder for all route products test specs

const ProductsRoute = require('../server/api/products.js')
const {expect} = require('chai')
const request = require('supertest')
const db = require('../server/db')
const app = require('../server/index.js')
const agent = request.agent(app)
const ProductModel = db.model('products')
const seed = require('../script/seed')




describe('Product Routes /api/products', () =>{
    beforeEach( async() =>{
        await seed()
    })

    describe('Gets all products: GET /api/products', () =>{
        it('gets all products and ensures non-null first result name', async () => {
           
            const res = await agent
            .get('/api/products')
            .expect(200)
        expect(res.body).to.be.an('array')
        expect(res.body[0].name).not.equal(null)
        //expect((res.body[0].name).length).not.equal(0)
        })
    })

    describe('Gets single product:  GET /api/products/1', ()=>{
        it('gets one and only one result and has non-null name', async()=>{
            const res = await agent
            .get('/api/products/1')
            .expect(200)
            
            expect(res.body).to.be.an('object')
            expect(res.body.name).not.equal(null)
        
        })
    })

    //describe('PUT ....)

    //describe('POST')

    // describe("DELETE")
})


/* global describe beforeEach it */

