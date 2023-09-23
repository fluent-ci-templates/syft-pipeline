import Client from "../../deps.ts";

export enum Job {
  sbom = "sbom",
}

export const exclude = [".git", ".fluentci", "node_modules"];

export const sbom = async (client: Client, src = ".") => {
  const SYFT_IMAGE = Deno.env.get("SYFT_IMAGE") || src;
  const context = client.host().directory(src);
  let args = [SYFT_IMAGE];
  const SYFT_OUTPUT_FILE = Deno.env.get("SYFT_OUTPUT_FILE");

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
};

export type JobExec = (
  client: Client,
  src?: string
) =>
  | Promise<void>
  | ((
      client: Client,
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<void>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.sbom]: sbom,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.sbom]: "Generate a software bill of materials",
};
