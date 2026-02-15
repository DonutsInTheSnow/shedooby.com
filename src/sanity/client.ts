// import { createClient } from "next-sanity";

// export const client = createClient({
//   projectId: "k5i0ntx7",
//   dataset: "production",
//   apiVersion: "2024-01-01",
//   useCdn: false,
// });

// src/sanity/client.ts
import { createClient, type SanityClient } from "next-sanity";

export const client: SanityClient = createClient({
  projectId: "k5i0ntx7",
  dataset: "production",
  apiVersion: "2025-02-01",   // consider bumping to a more recent version, e.g. "2025-02-01"
  useCdn: false,              // good choice for draft/preview support
});