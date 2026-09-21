import Link from "next/link";
import { siteConfig } from "@/config/site";
import { apps } from "@/config/apps";

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-6">
        <span className="font-bold text-slate-800">{siteConfig.siteName}</span>
        <nav className="flex gap-5 text-sm">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="text-slate-600 hover:text-slate-900 hover:underline"
            >
              {app.name}
            </Link>
          ))}
        </nav>
      </header>

      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="mb-12 leading-relaxed text-slate-500">
          {siteConfig.operatorName}
          は、テクノロジーで暮らしを支えるアプリを開発・運営しています。
        </p>

        <div className="space-y-4">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="block rounded-lg border border-slate-200 p-5 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <h2 className="mb-1 text-lg font-semibold text-slate-800">
                {app.name}
              </h2>
              <p className="text-sm text-slate-500">{app.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
