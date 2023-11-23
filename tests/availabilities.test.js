const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const port = process.env.PORT || 3000;
const uri = process.env.URI;


/* Connecting to the database before all test. */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_CRED);

    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
        if (collection.collectionName == "availabilities") {
            console.log("Let's insert: " + collection.collectionName);
            /* Delete all existing products from previous test */
            await collection.deleteMany({});
            /* Insert a dummy availability with a specific ID */
            let myDate = new Date("2027-01-01T00:00:00Z");
            await collection.insertOne(
                {
                    _id: mongoose.Types.ObjectId('65580c7e5c05dead1f8b050a'),
                    availableDate: myDate,
                    spots: "5",
                    isFull: false
                });


        }
    }
});

/* Closing database connection after all test. */
afterAll(async () => {

    await mongoose.connection.close();
});

/*
        ----------------------------------------
                 POST AVAILABILITY - TESTING 
        ----------------------------------------
*/

describe("POST /api/products", () => {
    it("should create an availability", async () => {
        const res = await request(uri + port).post("/api/availabilities").send({
            availableDate: "2025-01-03",
            spots: 2
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.availableDate).toBe("2025-01-03T00:00:00.000Z");
        expect(res.body.spots).toBe(2);
        expect(res.body.isFull).toBe(false);
    });
});

describe("POST /api/products", () => {
    it("should throw a forbidden error when creating availability on a past date", async () => {
        const res = await request(uri + port).post("/api/availabilities").send({
            availableDate: "2015-01-03",
            spots: 2
        });
        expect(res.statusCode).toBe(403);
    });
});

describe("POST /api/products", () => {
    it("should throw a duplicate error when creating availability when an availability with the same date exists", async () => {
        const res = await request(uri + port).post("/api/availabilities").send({
            availableDate: "2025-01-03",
            spots: 2
        });
        expect(res.statusCode).toBe(409);
    });
});

describe("POST /api/products", () => {
    it("should throw a bad request error when creating an availability without a required field", async () => {
        const res = await request(uri + port).post("/api/availabilities").send({
            spots: 2
        });
        expect(res.statusCode).toBe(400);
    });
});

/*
        ----------------------------------------
             GET AVAILABILITY BY ID - TESTING 
        ----------------------------------------
*/

describe("GET /api/products/AVAILABILITY_ID", () => {
    let myDate = new Date("2027-01-01T00:00:00Z"); // dummy availability date
    it("should return an existing availability", async () => {
        const res = await request(uri + port).get("/api/availabilities/65580c7e5c05dead1f8b050a").send();
        expect(res.statusCode).toBe(200);
        expect(new Date(res.body.availableDate)).toEqual(myDate);
    });
});

describe("GET /api/products/AVAILABILITY_ID", () => {
    it("should return no availability after a valid non existing id is provided", async () => {
        const res = await request(uri + port).get("/api/availabilities/6556968f7e9d7029520d0f51").send();
        expect(res.statusCode).toBe(204);
        expect(res.body).toEqual({});
    });
});

describe("GET /api/products/AVAILABILITY_ID", () => {
    it("should throw an error after an invalid mongo ID is provided", async () => {
        const res = await request(uri + port).get("/api/availabilities/6556968f7e9d7029520d0fx4").send();
        expect(res.statusCode).toBe(500);
    });
});

/*
        ----------------------------------------
             GET ALL AVAILABILITYS - TESTING 
        ----------------------------------------
*/
describe("GET /api/availabilities/", () => {
    it("should return an non-empty list of all availabilities", async () => {
        const res = await request(uri + port).get("/api/availabilities/").send();
        expect(res.statusCode).toBe(200); // check if the function has a status code 200
        expect(res.body).toHaveLength(2); // check if exactly the 2 elements inserted are all there expect(new Date(res.body[0].availableDate)).toEqual(new Date("2027-01-01T00:00:00Z")); // check if the dummy element is returned at first position
    });
});

/*
        ----------------------------------------
             UPDATE AVAILABILITY - TESTING 
        ----------------------------------------
*/

describe("PUT /api/products/AVAILABILITY_ID", () => {
    let myDate = new Date("2028-03-31T00:00:00Z");
    it("should update the dummy availability", async () => {
        const res = await request(uri + port).put("/api/availabilities/65580c7e5c05dead1f8b050a").send({
            availableDate: "2028-03-31",
            spots: 20,

        });

        expect(res.statusCode).toBe(200); // check if the operation was successful
        expect(res.body.spots).toEqual(20);
        expect(new Date(res.body.availableDate)).toEqual(myDate); // check if the type has been updated

    });
});

describe("PUT /api/products/AVAILABILITY_ID", () => {
    it("should throw a bad request error when trying to pass a non-parsable as date string as availableDate", async () => {
        const res = await request(uri + port).put("/api/availabilities/65580c7e5c05dead1f8b050a").send({
            availableDate: "dateTest",
            spots: 15,

        });

        expect(res.statusCode).toBe(500); // check if the operation was successful

    });
});

describe("PUT /api/products/AVAILABILITY_ID", () => {
    it("should throw a bad request error when trying to pass a non-integer value as spots", async () => {
        const res = await request(uri + port).put("/api/availabilities/65580c7e5c05dead1f8b050a").send({
            availableDate: "2028-03-31",
            spots: "TEST",

        });

        expect(res.statusCode).toBe(500); // check if the operation was successful

    });
});

describe("PUT /api/products/AVAILABILITY_ID", () => {
    it("should throw a duplicate error when trying to update an availability with an existing date", async () => {
        const res = await request(uri + port).put("/api/availabilities/65580c7e5c05dead1f8b050a").send({
            availableDate: "2025-01-03",
            spots: 12,

        });

        expect(res.statusCode).toBe(409); // check if the operation was successful

    });
});

/*
        ----------------------------------------
            DELETE AN AVAILABILITY - TESTING 
        ----------------------------------------
*/

describe("DELETE /api/products/AVAILABILITY_ID", () => {
    it("should delete an existing product(dummy)", async () => {
        const res = await request(uri + port).delete("/api/availabilities/65580c7e5c05dead1f8b050a").send();
        expect(res.statusCode).toBe(204);

    });
});
