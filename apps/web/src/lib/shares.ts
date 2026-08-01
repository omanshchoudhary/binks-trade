import type { Share } from "@binks/types";
import { api } from "./api";

export function getShares() {
  return api.get<Share[]>("/shares");
}
