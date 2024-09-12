const request = require("supertest");
const express = require("express");
const app = require("../../../server/server");

jest.mock("node-fetch", () => jest.fn());
const fetch = require("node-fetch");

fetch.mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("POST /api", () => {
  it("should return weather data and image URL for a valid destination", async () => {
    fetch.mockImplementation((url) => {
      if (url.includes("geonames")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              geonames: [{ lat: 40.7128, lng: -74.006 }],
            }),
        });
      } else if (url.includes("weatherbit")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              data: [{ weather: { description: "Clear sky" } }],
            }),
        });
      } else if (url.includes("pixabay")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              hits: [{ webformatURL: "https://example.com/image.jpg" }],
            }),
        });
      } else {
        return Promise.reject(new Error("Unknown API"));
      }
    });

    const response = await request(app)
      .post("/api")
      .send({ destination: "New York", date: "2024-09-15" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      city: "New York",
      date: "2024-09-15",
      weather: "Clear sky",
      imageUrl: "https://example.com/image.jpg",
    });
  });

  it("should return 500 if an error occurs", async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        statusText: "API Error",
      })
    );

    const response = await request(app)
      .post("/api")
      .send({ destination: "Invalid City", date: "2024-09-15" });

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBe("GeoNames API Error: API Error");
  });
});
