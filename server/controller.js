var KoaRouter = require("koa-router");

const router = new KoaRouter();

router
  .get("/counts", async (ctx) => {
    const allIdentifiers = await ctx.model.Identifier.findAll();
    const data = [];
    for await (const i of allIdentifiers) {
      const { count: value } = await ctx.model.Record.findAndCountAll({
        where: { identifierId: i.id },
      });
      data.push({ type: i.name, value });
    }
    ctx.body = {
      data: data.sort(({ _a, value: a }, { _b, value: b }) => b - a),
    };
  })
  .get("/records/:name", async (ctx) => {
    const { name } = ctx.params;
    const { id: identifierId } = await ctx.model.Identifier.findOne({
      where: { name },
    });
    const data = await ctx.model.Record.findAndCountAll({
      where: { identifierId },
    });
    ctx.body = {
      data,
    };
  });

module.exports = () => {
  return router.routes();
};
