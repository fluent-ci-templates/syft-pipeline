import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  nonNull,
} from "../../deps.ts";

import { sbom } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("sbom", {
      args: {
        src: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) => await sbom(args.src),
    });
  },
});

export const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});
