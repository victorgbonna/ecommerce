const chai= require('chai')
const chaiHttp= require('chai-http')
const app=require('../index')

chai.use(chaiHttp)
chai.should()


describe('Make sure login is returning login page', ()=>{
    it('should return login 200 page', done =>{
        chai.request(app)
            .get('/login')
            .end((err, res)=>{
                if(err) return done(err)
                res.should.have.status(200)
                done()
            })
    })
})

describe('Make sure login fails on no data', ()=>{
    it('should return validation errors', done =>{
        const agent= chai.request.agent(app)
        agent
            .post('/login')
            .end((err, res)=>{
                if (err) return done(err)
                res.text.should. contain('Missing credentials')
                // console.log(res.text)
                // res.should.have.status(400)
                // res.should.be.a('object')
                done()
            })
    })
})

describe('Make sure login is successful with valid data', ()=>{
    const email=`john${new Date().getTime()}@example.com`
    it('should return success', done =>{
        const agent= chai.request.agent(app)
        agent
            .post('/login')
            .type('form')
            .send({
                email:'test@test.com',
                password:'test',
            })
            .end((err, res)=>{
                if (err) return done(err)
                res.text.should.contain('welcome')
                // console.log(res.text)
                res.should.have.status(200)
                // res.should.be.a('object')
                done()
            })
    })
})
describe('Make sure it rejects when you put it an invalid email', ()=>{
    const email=`john${new Date().getTime()}@example.com`
    it('should return email errors', done =>{
        const agent= chai.request.agent(app)
        agent
            .post('/login')
            .type('form')
            .send({
                email,
                password:'test',
            })
            .end((err, res)=>{
                if (err) return done(err)
                res.text.should.contain('Incorrect Email')
                // console.log(res.text)
                res.should.have.status(200)
                // res.should.be.a('object')
                done()
            })
    })
})

describe('Make sure login rejects when the password is false', ()=>{
    // const email=`john${new Date().getTime()}@example.com`
    it('should return password errors', done =>{
        const agent= chai.request.agent(app)
        agent
            .post('/login')
            .type('form')
            .send({
                email:'test2@test.com',
                password:'test2ee2',
            })
            .end((err, res)=>{
                if (err) return done(err)
                // console.log(res.text)
                res.text.should.contain('Incorrect Password')
                // console.log(res.text)
                res.should.have.status(200)
                // res.should.be.a('object')
                done()
            })
    })
})
