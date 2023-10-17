import { gql } from "../../deps.ts";

export const sbom = gql`
  query sbom($src: String!) {
    sbom(src: $src)
  }
`;
