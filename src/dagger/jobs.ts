import Client, { Directory, File } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory } from "./lib.ts";

export enum Job {
  sbom = "sbom",
}

export const exclude = [".git", ".fluentci", "node_modules"];

/**
 * @function
 * @description Generate a software bill of materials
 * @param {Directory | string} src The context to run the job in
 * @param {string} outputFile The name of the output file
 * @param {string} image The image to run the job in
 * @param {string} output The output format
 * @returns {Promise<File | string>}
 */
export async function sbom(
  src: Directory | string,
  outputFile: string,
  image?: string,
  output?: string
): Promise<File | string> {
  let id = "";
  await connect(async (client: Client) => {
    const SYFT_IMAGE = Deno.env.get("SYFT_IMAGE") || image || ".";
    const context = getDirectory(client, src);
    let args = [SYFT_IMAGE];
    const SYFT_OUTPUT_FILE = Deno.env.get("SYFT_OUTPUT_FILE") || outputFile;

    if (SYFT_OUTPUT_FILE) {
      args = [...args, "--file", SYFT_OUTPUT_FILE];
    }

    const SYFT_OUTPUT_FORMAT =
      Deno.env.get("SYFT_OUTPUT_FORMAT") || output || "syft-table";

    if (SYFT_OUTPUT_FORMAT) {
      args = [...args, "--output", SYFT_OUTPUT_FORMAT];
    }

    const ctr = client
      .pipeline(Job.sbom)
      .container()
      .from("anchore/syft")
      .withDirectory("/app", context, { exclude })
      .withWorkdir("/app")
      .withExec(args);

    await ctr.stdout();
    id = await ctr.file(`/app/${SYFT_OUTPUT_FILE}`).id();
  });
  return id;
}

export type JobExec = (
  src: Directory | string,
  outputFile: string,
  image?: string
) => Promise<File | string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.sbom]: sbom,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.sbom]: "Generate a software bill of materials",
};
