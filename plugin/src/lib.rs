use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn scan(args: String) -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_packages(vec!["syft"])?
        .with_exec(vec!["syft", "scan", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn sbom(args: String) -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_packages(vec!["syft"])?
        .with_exec(vec!["syft", "scan", &args])?
        .stdout()?;
    Ok(stdout)
}
