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
        if (collection.collectionName == "products") {
            /* Delete all existing products from previous test */
            await collection.deleteMany({});
            /* Insert a dummy product with a specific ID */
            collection.insertOne(
                {
                    _id: mongoose.Types.ObjectId('6556968f7e9d7029520d0f5f'),
                    type: "dummy",
                    size: "20"
                }
            )
        }
    }
});

/* Closing database connection after all test. */
afterAll(async () => {

    await mongoose.connection.close();
});


/*
        ----------------------------------------
                 POST PRODUCT - TESTING 
        ----------------------------------------
*/


describe("POST /api/products", () => {
    it("should create a product", async () => {
        const res = await request(uri + port).post("/api/products").send({
            type: "box grand modele",
            size: "20",
            sizeDescriptor: "pieces",
            flavours:
                [
                    "nems"
                ],
            shape: "rectangulaire"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.type).toBe("box grand modele");
    });
});

describe("POST /api/products", () => {
    it("should throw a conflict error (409) for trying to create an already existing product", async () => {
        const res = await request(uri + port).post("/api/products").send({
            type: "box grand modele",
            size: "20",
            sizeDescriptor: "pieces",
            flavours:
                [
                    "chocolate",
                    "strawberry"
                ],
            shape: "rectangulaire"
        });
        expect(res.statusCode).toBe(409);
        //  expect(res.body.type).toBe("kidzy");
    });
});

describe("POST /api/products", () => {
    it("should throw a bad request error on field size", async () => {
        const res = await request(uri + port).post("/api/products").send({
            type: "box",
            size: "lol",
            sizeDescriptor: "pieces",
            flavours:
                [
                    "nems"
                ],
            shape: "rectangulaire"
        });
        expect(res.statusCode).toBe(400);
    });
});

describe("POST /api/products", () => {
    it("should throw a bad request error for not providing a required field", async () => {
        const res = await request(uri + port).post("/api/products").send({
            size: "20",
            sizeDescriptor: "pieces",
            flavours:
                [
                    "nems"
                ],
            shape: "rectangulaire"
        });
        expect(res.statusCode).toBe(400);
        //  expect(res.body.type).toBe("kidzy");
    });
});

describe("POST /api/products", () => {
    it("should create a product when facultative fields are not provided", async () => {
        const res = await request(uri + port).post("/api/products").send({
            type: "box petit modele",
            size: "10",
            flavours:
                [
                    "chocolate",
                    "strawberry"
                ],

        });
        expect(res.statusCode).toBe(201);
        //  expect(res.body.type).toBe("kidzy");
    });
});
/*
        ----------------------------------------
             GET PRODUCT BY ID - TESTING 
        ----------------------------------------
*/
describe("GET /api/products/PRODUCT_ID", () => {
    it("should return an existing product", async () => {
        const res = await request(uri + port).get("/api/products/6556968f7e9d7029520d0f5f").send();
        expect(res.statusCode).toBe(200);
        expect(res.body.type).toBe("dummy");
    });
});

describe("GET /api/products/PRODUCT_ID", () => {
    it("should return no product after a valid non existing id is provided", async () => {
        const res = await request(uri + port).get("/api/products/6556968f7e9d7029520d0f51").send();
        expect(res.statusCode).toBe(204);
        expect(res.body).toEqual({});
    });
});

describe("GET /api/products/PRODUCT_ID", () => {
    it("should throw an error after an invalid mongo ID is provided", async () => {
        const res = await request(uri + port).get("/api/products/6556968f7e9d7029520d0fx4").send();
        expect(res.statusCode).toBe(500);
    });
});


/*
        ----------------------------------------
             GET ALL PRODUCTS - TESTING 
        ----------------------------------------
*/
describe("GET /api/products/", () => {
    it("should return an non-empty list of all products", async () => {
        const res = await request(uri + port).get("/api/products/").send();
        expect(res.statusCode).toBe(200); // check if the function has a status code 200
        expect(res.body).toHaveLength(3); // check if exactly the 3 elements inserted are all there
        expect(res.body[0].type).toBe('dummy'); // check if the dummy element is returned at first position
    });
});

/*
        ----------------------------------------
            UPDATE A PRODUCT - TESTING 
        ----------------------------------------
*/
describe("PUT /api/products/PRODUCT_ID", () => {
    it("should update the dummy product", async () => {
        const res = await request(uri + port).put("/api/products/6556968f7e9d7029520d0f5f").send({
            type: "dummy-updated",
            size: "20",
            sizeDescriptor: "parts",
            flavours:
                [
                    "cranberry"
                ],
            shape: "circular"
        });

        expect(res.statusCode).toBe(200); // check if the operation was successful
        expect(res.body.type).toBe("dummy-updated"); // check if the type has been updated

    });
});

describe("PUT /api/products/PRODUCT_ID", () => {
    it("should throw a conflict error trying to update a product with the same type as another one", async () => {
        const res = await request(uri + port).put("/api/products/6556968f7e9d7029520d0f5f").send({
            type: "box petit modele",
            size: "20",
            sizeDescriptor: "parts",
            flavours:
                [
                    "cranberry"
                ],
            shape: "circular"
        });

        expect(res.statusCode).toBe(409); // check if the operation was successful


    });
});


describe("PUT /api/products/PRODUCT_ID", () => {
    it("should throw an error trying to update a product with an invalid mongo ID", async () => {
        const res = await request(uri + port).get("/api/products/6556968f7e9d7029520d0fx4").send();
        expect(res.statusCode).toBe(500);
    });
});

describe("PUT /api/products/PRODUCT_ID", () => {
    it("should return no product while updating a non existing ID", async () => {
        const res = await request(uri + port).put("/api/products/6556968f7e9d7029520d0f51").send();
        expect(res.statusCode).toBe(204);
        expect(res.body).toEqual({});
    });
});

/*
        ----------------------------------------
            DELETE A PRODUCT - TESTING 
        ----------------------------------------
*/

describe("DELETE /api/products/PRODUCT_ID", () => {
    it("should delete an existing product(dummy)", async () => {
        const res = await request(uri + port).delete("/api/products/6556968f7e9d7029520d0f5f").send();
        expect(res.statusCode).toBe(200); // check if the operation was a success

    });
});
/*
describe("GET /api/products/PRODUCT_ID", () => {
    it("should return no product after a valid non existing id is provided", async () => {
        const res = await request(uri + port).delete("/api/products/6556968f7e9d7029520d0f51").send();
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /api/products/PRODUCT_ID", () => {
    it("should throw an error after an invalid mongo ID is provided", async () => {
        const res = await request(uri + port).get("/api/products/6556968f7e9d7029520d0fx4").send();
        expect(res.statusCode).toBe(500);
    });
});*/