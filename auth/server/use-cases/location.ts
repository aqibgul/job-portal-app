import { headers } from "next/headers";

const IP_HEADER_CANDIDATES = [
  "x-forwarded-for",
  "x-real-ip",
  "cf-connecting-ip",
  "fastly-client-ip",
  "true-client-ip",
  "x-client-ip",
  "x-cluster-client-ip",
  "x-forwarded",
  "forwarded-for",
  "forwarded",
];
export async function getUserIpAddress() {
  const headersList = await headers();
  for (const header of IP_HEADER_CANDIDATES) {
    const value = headersList.get(header);
    if (typeof value == "string") {
      const ip = value.split(",")[0].trim();
      if (ip) return ip;
    }
  }
  return "0.0.0.0";
}
