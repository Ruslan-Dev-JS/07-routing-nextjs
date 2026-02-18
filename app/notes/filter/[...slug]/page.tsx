import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesFilterClient from "./Notes.client";

export const dynamic = "force-dynamic";

export default async function NotesFilterPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slugs = params?.slug || [];
  const tag = slugs[0];

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", 1, "", tag || ""],
      queryFn: () => fetchNotes(1, "", tag),
    });
  } catch (err) {
    console.error("Prefetch error", err);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterClient initialTag={tag} />
    </HydrationBoundary>
  );
}

