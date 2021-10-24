const Koa = require("koa");
const fs = require("fs");
const readline = require("readline");
const db = require("./db");

const controller = require("./controller");

const start = async () => {
  const { model } = await db();
  const { Identifier, Record } = model;

  const fileStream = fs.createReadStream(
    "server/App_Privacy_Report_v4_2021-10-23T13_04_51.ndjson"
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const identifiersMap = new Map();
  for await (const line of rl) {
    const result = JSON.parse(line);
    if (result.accessor) {
      const {
        category,
        accessor: { identifier },
        timeStamp,
        type,
        kind,
      } = result;

      let identifierId;
      if (identifiersMap.has(identifier)) {
        identifierId = identifiersMap.get(identifier);
      } else {
        identifierId = (await Identifier.create({ name: identifier })).id;
        identifiersMap.set(identifier, identifierId);
      }

      await Record.create({ identifierId, category, timeStamp, type, kind });
    }
  }

  const app = new Koa();

  app.use((ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    ctx.set(
      "Access-Control-Allow-Headers",
      "x-requested-with, accept, origin, content-type"
    );
    ctx.set("Content-Type", "application/json;charset=utf-8");

    ctx.model = model;
    return next();
  });

  app.use(controller());

  app.listen(3001);
};

start();
