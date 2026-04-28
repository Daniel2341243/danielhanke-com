import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-screen px-6 md:px-12 lg:px-20 py-24 md:py-32">
      <p className="text-text-secondary">Home page — Block 4 follows.</p>
    </div>
  );
}
