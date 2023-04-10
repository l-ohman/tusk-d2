const { expect } = require("chai");
const { Op } = require("sequelize");
const { db, HeroMatchups } = require("../server/db");

describe("Testing tests", () => {
  it("It works", () => {
    expect(false).to.equal(false);
    expect(true).to.equal(true);
  })
})
