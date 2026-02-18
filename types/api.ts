import type { Note } from "@/types/note";

export interface FetchNotesResponse {
  items: Note[];
  totalPages: number;
}
