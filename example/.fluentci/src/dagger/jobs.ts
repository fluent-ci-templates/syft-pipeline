/**
 * @module syft
 * @description Generate a software bill of materials (SBOM) using the syft tool
 */

import { Directory, File, dag, env } from "../../deps.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  sbom = "sbom",
}

export const exclude = [".git", ".fluentci", "node_modules"];

/**
 * Generate a software bill of materials
 *
 * @function
 * @description Generate a software bill of materials
 * @param {Directory | string} src The context to run the job in
 * @param {string} outputFile The name of the output file
 * @param {string} image The image to run the job in
 * @param {string} outputFormat The output format
 * @returns {Promise<File | string>}
 */
export async function sbom(
  src: Directory | string,
  outputFile: string,
  image?: string,
  outputFormat?: string
): Promise<File | string> {
  const SYFT_IMAGE = env.get("SYFT_IMAGE") || image || ".";
  const context = await getDirectory(src);
  let args = [SYFT_IMAGE];
  const SYFT_OUTPUT_FILE = env.get("SYFT_OUTPUT_FILE") || outputFile;

  if (SYFT_OUTPUT_FILE) {
    args = [...args, "--file", SYFT_OUTPUT_FILE];
  }

  const SYFT_OUTPUT_FORMAT =
    env.get("SYFT_OUTPUT_FORMAT") || outputFormat || "syft-table";

  if (SYFT_OUTPUT_FORMAT) {
    args = [...args, "--output", SYFT_OUTPUT_FORMAT];
  }

  const ctr = dag
    .pipeline(Job.sbom)
    .container()
    .from("anchore/syft")
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withExec(args);

  await ctr.stdout();
  await ctr.file(`/app/${SYFT_OUTPUT_FILE}`).export(SYFT_OUTPUT_FILE);
  return ctr.file(`/app/${SYFT_OUTPUT_FILE}`).id();
}

export type JobExec = (
  src: Directory | string,
  outputFile: string,
  image?: string,
  outputFormat?: string
) => Promise<File | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.sbom]: sbom,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.sbom]: "Generate a software bill of materials",
};
