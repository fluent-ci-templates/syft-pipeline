import { gql } from "../../deps.ts";

export const sbom = gql`
  query sbom($src: String!, $image: String) {
    sbom(src: $src, image: $image)
  }
`;
