const chai= require('chai')
const chaiHttp= require('chai-http')
const app=require('../index')

chai.use(chaiHttp)
chai.should()
describe('Make sure it is 200', ()=>{
    it('should return 200', done =>{
        chai.request(app)
            .get('/')
            .end((err, res)=>{
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
    })
})



describe('Make sure register fails on no data', ()=>{
    it('should return 400', done =>{
        chai.request(app)
            .post('/register')
            .end((err, res)=>{
                res.should.have.status(400)
                done()
            })
    })
})