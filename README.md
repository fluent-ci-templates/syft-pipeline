# Syft Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fsyft_pipeline&query=%24.version)](https://pkg.fluentci.io/syft_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/syft-pipeline)](https://codecov.io/gh/fluent-ci-templates/syft-pipeline)

A ready-to-use CI/CD Pipeline for generating a software bill of materials (SBOM) using syft.

## 🚀 Usage

Run the following command:

```bash
dagger run fluentci syft_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t syft
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

## Environment variables

| Variable                | Description                                       |
| ----------------------- | ------------------------------------------------- |
| SYFT_IMAGE              | The image to scan. Defaults to `.`                                 |
| SYFT_OUTPUT_FILE        | The output file. Defaults to STDOUT                                    |
| SYFT_OUTPUT_FORMAT      | The output format. Can be: syft-json, github-json, syft-table, syft-text, template, cyclonedx-xml, cyclonedx-json, spdx-tag-value, spdx-json   |

## Jobs

| Job      | Description                  |
| -------- | ---------------------------- |
| scan     | Scan for vulnerabilities     |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import Client, { connect } from "https://sdk.fluentci.io/v0.1.9/mod.ts";
import { sbom } from "https://pkg.fluentci.io/syft_pipeline@v0.1.0/mod.ts";

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await sbom(client, src);
  });
}

pipeline();
```
