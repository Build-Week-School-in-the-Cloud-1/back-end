const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/dbConfig.js");

const testUser = {
    fname:"Todd",
    lname: "Job",
    email: "Toddd@gmail.com",
    password: "jhgcjhgvk",
    username: "Tod420",
    country: "America",
    role: "Volunteer",
    skill: "math",
    bio:";lskdjf;lksajdf;lkjasd;flkjasd;lkfj;asdlkjf;",
    volunteer_time:"time",
    student_time: "time"
};

describe("Auth Router", () => {
    it("cleans the users table", async () => {
        await db("users").truncate();
    });

    let res = {};
    let id = null;
    let token = '';

    describe('POST /api/auth/register', () => {
        beforeAll(async () => {
          res = await request(server)
            .post('/api/auth/register')
            .set('Authorization', `Bearer ${token}`)
            .send(testUser);

            token = res.body.token;
            id = res.body.user.id
        });
    
        it('should return 200', () => {
          expect(res.status).toBe(201);
        });
    
        it('should return a JSON object', () => {
          expect(res.type).toBe('application/json');
        });

      });

    describe("POST /api/auth/login", () => {
        beforeAll(async () => {
          
            res = await request(server).post("/api/auth/login")
                .set('Authorization', `Bearer ${token}`)
                .send({email: testUser.email, password: testUser.password});
        });

        test("should return status 200 OK", () => {
            expect(res.status).toBe(200);
        });

        test("should return an object with a token property", () => {
            expect(res.body).toHaveProperty("token");
        });

        
    });

    describe('PUT /api/auth/:id', () => {
        beforeAll(async () => {    
        const newUser = await request(server)
            
          res = await request(server)
                .put(`/api/auth/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                email: 'changedEmail@gmail.com'
                });
        });

        test("Should return status 201", ()=> {
            expect(res.status).toBe(201)
        })
        
    });

    describe("Delete /api/auth/:id", () => {
        beforeAll(async () => {
           
            res = await request(server)
                .delete(`/api/auth/${id}`);
        });

        test("should return status 200 OK", () => {
            expect(res.status).toBe(200);
        }); 
         
    })

    describe("Get /api/auth/search", () => {
        let res = {};
        beforeAll(async () => {
            await request(server).post("/api/auth/register")
                            .send(testUser);
            res = await request(server).get("/api/auth/search").send({
                role:"Volunteer",
                skill: "math",
                country: "America"
            });
        });

        test("should return status 200 OK", () => {
            expect(res.status).toBe(201);
        });  

    })


    it("cleans out the users table", async () => {
        await db("users").truncate();
    });
    
    
});