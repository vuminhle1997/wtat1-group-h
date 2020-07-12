const request = require('supertest');
const app = require('../app');

let APP, submitter, report;

beforeAll(() => {
    APP = app;
    submitter = "5f0213bd5269aa449cd2b6f3";
    report = "5f0217b8db076c4e6044eb27";
})

describe("report route test", () => {
    it("get reports", async() => {
        const res = await request(APP).get("/api/v1.0/reports");

        expect(res.status).toEqual(200);
        expect(res.body.reports).not.toBeNull();
        expect(res.body.reports.length).toBeGreaterThan(0);
    });
    it("get report by one user", async() => {
        const res = await request(APP).get("/api/v1.0/reports/user?id=" + submitter);

        expect(res.status).toEqual(200);
        expect(res.body.reports).not.toBeNull();
        expect(res.body.reports.length).toBeGreaterThan(0);
    }); 
})