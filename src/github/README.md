# Github Actions

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fsyft_pipeline&query=%24.version)](https://pkg.fluentci.io/syft_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/syft-pipeline)](https://codecov.io/gh/fluent-ci-templates/syft-pipeline)

The following command will generate a `.github/workflows/ci.yml` file in your project:

```bash
fluentci gh init -t syft_pipeline
```

Or, if you already have a `.fluentci` folder (generated from `fluentci init -t syft`) in your project:

```bash
fluentci gh init
```

Generated file:

```yaml
# Do not edit this file directly. It is generated by https://deno.land/x/fluent_github_actions

name: Syft
on:
  push:
    branches:
      - main
jobs:
  sbom:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: denoland/setup-deno@v1
        with:
          syft-version: v1.36
      - name: Setup Fluent CI CLI
        run: deno install -A -r https://cli.fluentci.io -n fluentci
      - name: Setup Dagger
        run: |
            curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.8.1 sh
            sudo mv bin/dagger /usr/local/bin
            dagger version
      - name: Run Dagger Pipelines
        run: fluentci run syft_pipeline
```

Feel free to edit the template generator at `.fluentci/src/github/config.ts` to your needs.
