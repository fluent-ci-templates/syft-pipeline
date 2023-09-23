import Client, { connect } from "https://sdk.fluentci.io/v0.1.9/mod.ts";
import { sbom } from "https://pkg.fluentci.io/syft_pipeline@v0.1.1/mod.ts";

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await sbom(client, src);
  });
}

pipeline();
