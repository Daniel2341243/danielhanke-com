import { notFound } from "next/navigation";

// Unmatched paths render the localized not-found page inside the layout.
export default function CatchAllPage() {
  notFound();
}
