import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesFilterClient from "@/app/notes/NotesFilter.client";

export const dynamic = 'force-dynamic';

export default async function NotesFilterPage({ params }: { params: { tag?: string[] } }) {
  const tags = params?.tag || [];
  const tag = tags[0];

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", 1, "", tag || ""],
      queryFn: () => fetchNotes(1, "", tag),
    });
  } catch (err) {
    console.error('Prefetch error', err);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterClient initialTag={tag} />
    </HydrationBoundary>
  );
}
