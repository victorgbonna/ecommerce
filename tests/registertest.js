const chai= require('chai')
const chaiHttp= require('chai-http')
const app=require('../index')

chai.use(chaiHttp)
chai.should()


describe('Make sure register is returning registration page', ()=>{
    it('should return 400', done =>{
        chai.request(app)
            .get('/register')
            .end((err, res)=>{
                if(err) return done(err)
                res.should.have.status(200)
                done()
            })
    })
})

describe('Make sure register fails on no data', ()=>{
    it('should return validation errors', done =>{
        const agent= chai.request.agent(app)
        agent
            .post('/register')
            .end((err, res)=>{
                if (err) return done(err)
                res.text.should.contain('Validation Errors')
                // console.log(res.text)
                // res.should.have.status(400)
                // res.should.be.a('object')
                done()
            })
    })
})

describe('Make sure register is successful with valid data', ()=>{
    const email=`john${new Date().getTime()}@example.com`
    it('should return validation errors', done =>{
        const agent= chai.request.agent(app)
        agent
            .post('/register')
            .type('form')
            .send({
                name: 'John Doe',
                email,
                password:'test',
                repeat_password:'test'
            })
            .end((err, res)=>{
                if (err) return done(err)
                res.text.should.not.contain('Validation Errors')
                // console.log(res.text)
                res.should.have.status(200)
                // res.should.be.a('object')
                done()
            })
    })
    it('should return unique email validation error', done =>{
        const agent= chai.request.agent(app)
        agent
            .post('/register') 
            .type('form')
            .send({
                name: 'John Doe',
                email,
                password:'test',
                repeat_password:'test'
            })
            .end((err, res)=>{
                if (err) return done(err)
                res.should.have.status(400)
                res.text.should.contain('Email already exists')
                res.text.should.contain('Validation Errors')
                // console.log(res.text)
                // res.should.be.a('object')
                done()
            })
    })
})

