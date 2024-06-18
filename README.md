# Syft Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/syft_pipeline)](https://pkg.fluentci.io/syft_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/syft)](https://jsr.io/@fluentci/syft)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/syft-pipeline)](https://codecov.io/gh/fluent-ci-templates/syft-pipeline)
[![ci](https://github.com/fluent-ci-templates/syft-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/syft-pipeline/actions/workflows/ci.yml)

A ready-to-use CI/CD Pipeline for generating a software bill of materials (SBOM) using [Syft](https://github.com/anchore/syft).

## 🚀 Usage

Run the following command:

```bash
fluentci run syft_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t syft
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) Module:

```bash
dagger install github.com/fluent-ci-templates/syft-pipeline@main
```

Call functions from the module:

```bash
dagger call sbom --src . \
  --output-file sbom-output \
  --image hashicorp/terraform:latest
```

## 🛠️ Environment variables

| Variable                | Description                                       |
| ----------------------- | ------------------------------------------------- |
| SYFT_IMAGE              | The image or filesystem to scan. Defaults to `.`                                 |
| SYFT_OUTPUT_FILE        | The output file. Defaults to STDOUT                                    |
| SYFT_OUTPUT_FORMAT      | The output format. Can be: syft-json, github-json, syft-table, syft-text, template, cyclonedx-xml, cyclonedx-json, spdx-tag-value, spdx-json   |

## ✨ Jobs

| Job      | Description                                   |
| -------- | --------------------------------------------- |
| sbom     | Generate a software bill of materials (SBOM). |

```typescript
sbom(
  src: Directory | string,
  outputFile: string,
  image?: string,
   outputFormat?: string
): Promise<File | string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```typescript
import { sbom } from "jsr:@fluentci/syft";

await sbom(".", "sbom-output");
```
