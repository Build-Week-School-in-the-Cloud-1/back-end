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
    
    describe("POST /api/auth/register", () => {
        let res = {};
        beforeAll(async () => {
            res = await request(server).post("/api/auth/register")
                            .send(testUser);
        });

        test("should return status 201 Created", () => {
            expect(res.status).toBe(201);
        });

        test("should return object a token property", () => {
            expect(res.body).toHaveProperty("token");
        });
    });

    describe("POST /api/auth/login", () => {
        let res = {};
        beforeAll(async () => {
            res = await request(server).post("/api/auth/login")
                            .send({email: testUser.email, password: testUser.password});
        });

        test("should return status 200 OK", () => {
            expect(res.status).toBe(200);
        });

        test("should return an object with a token property", () => {
            expect(res.body).toHaveProperty("token");
        });

        
    });

    describe("Put /api/auth/:id", () => {
        let res = {};
        beforeAll(async () => {
            res = await request(server).put("/api/auth/:id").where({id: 0})
                            .send({
                                fname: testUser.fname,
                                lname: testUser.lname,
                                email: testUser.email,
                                password: testUser.password,
                                username: testUser.username,
                                country: testUser.country,
                                role: testUser.role,
                                skill: testUser.skill,
                                bio: testUser.bio,
                                volunteer_time: testUser.volunteer_time,
                                student_time: testUser.student_time
                            });
        });

        test("should return status 200 OK", () => {
            expect(res.status).toBe(201);
        });   
    })

    describe("Delete /api/auth/:id", () => {
        let res = {};
        beforeAll(async () => {
            await request(server).post("/api/auth/register")
                            .send(testUser);
            res = await request(server).del(`/api/auth/:${1}`);
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