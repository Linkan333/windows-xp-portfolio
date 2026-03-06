import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { readdir } from "node:fs/promises";
import path from "node:path";

export const metadata: Metadata = {
  title: "Icons | linkan.dev",
  description: "Browse all icon files in /images/icons.",
};

async function getIconNames() {
  const iconDirectory = path.join(process.cwd(), "public", "images", "icons");
  const entries = await readdir(iconDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".ico"))
    .map((entry) => entry.name)
    .sort((left, right) =>
      left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    );
}

export default async function IconsPage() {
  const iconNames = await getIconNames();

  return (
    <main className="min-h-screen bg-[url('/images/bliss.jpg')] bg-cover bg-center px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[10px] border border-[#0d2f84] bg-[#ECE9D8] shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
        <div className="flex items-center gap-3 bg-[linear-gradient(to_bottom,#0b56d0_0%,#1c62d9_12%,#3e83eb_58%,#1a57c5_100%)] px-4 py-3">
          <Image
            src="/images/Folder Closed.ico"
            alt=""
            width={18}
            height={18}
            unoptimized
            className="shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-[15px] font-bold text-white [text-shadow:1px_1px_0_rgba(0,0,0,0.45)]">
              Icon Browser
            </h1>
            <p className="text-[11px] text-[#dbe7ff]">
              Browse every <code>/images/icons/*.ico</code> asset.
            </p>
          </div>
          <Link
            href="/"
            className="ml-auto rounded-[3px] border border-[#0f3a98] bg-[linear-gradient(to_bottom,#fefefe_0%,#dce8ff_100%)] px-3 py-[3px] text-[11px] font-semibold text-[#234a9d] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-[linear-gradient(to_bottom,#ffffff_0%,#cddfff_100%)]"
          >
            Back to desktop
          </Link>
        </div>

        <div className="border-y border-[#b9b3a2] bg-[linear-gradient(to_bottom,#fbf8ef_0%,#ece4d0_100%)] px-4 py-3 text-[12px] text-[#3f4962]">
          <p>
            {iconNames.length} icons found in <code>public/images/icons</code>.
          </p>
          <p className="mt-1 text-[11px] text-[#5c6476]">
            Click any icon to open the raw <code>.ico</code> file in a new tab.
          </p>
        </div>

        <div className="max-h-[calc(100vh-156px)] overflow-auto bg-[linear-gradient(to_bottom,#ffffff_0%,#eff4ff_100%)] p-4 md:p-5">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3 md:gap-4">
            {iconNames.map((iconName) => {
              const iconPath = `/images/icons/${iconName}`;

              return (
                <a
                  key={iconName}
                  href={iconPath}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[6px] border border-transparent px-2 py-3 text-center transition-colors hover:border-[#6a8fd9] hover:bg-[#dfeaff]"
                >
                  <div className="mx-auto flex h-[58px] w-[58px] items-center justify-center rounded-[4px] border border-[#c8d4ef] bg-[linear-gradient(to_bottom,#ffffff_0%,#eaf1ff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <Image
                      src={iconPath}
                      alt={iconName}
                      width={40}
                      height={40}
                      unoptimized
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <p className="mt-2 break-all text-[11px] leading-[1.25] text-[#24324f]">
                    {iconName}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
