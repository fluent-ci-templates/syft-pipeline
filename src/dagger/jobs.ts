import Client, { connect } from "../../deps.ts";

export enum Job {
  sbom = "sbom",
}

export const exclude = [".git", ".fluentci", "node_modules"];

export const sbom = async (src = ".", image?: string, outputFile?: string) => {
  await connect(async (client: Client) => {
    const SYFT_IMAGE = Deno.env.get("SYFT_IMAGE") || image || src;
    const context = client.host().directory(src);
    let args = [SYFT_IMAGE];
    const SYFT_OUTPUT_FILE = Deno.env.get("SYFT_OUTPUT_FILE") || outputFile;

    if (SYFT_OUTPUT_FILE) {
      args = [...args, "--file", SYFT_OUTPUT_FILE];
    }

    const SYFT_OUTPUT_FORMAT = Deno.env.get("SYFT_OUTPUT_FORMAT");

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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "Done";
};

export type JobExec = (
  src?: string,
  image?: string,
  outputFile?: string
) =>
  | Promise<string>
  | ((
      src?: string,
      image?: string,
      outputFile?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.sbom]: sbom,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.sbom]: "Generate a software bill of materials",
};
