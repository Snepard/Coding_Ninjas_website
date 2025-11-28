import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samel Dhingra",
};

export default function SamelDhingraPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/about"
          className="text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          ← Back to About
        </Link>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/images/team/jacob-jones.jpg"
              alt="Jacob Jones"
              width={400}
              height={400}
              className="rounded-2xl"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">Jacob Jones</h1>
            <p className="text-xl text-muted-foreground mb-6">CEO</p>
            <p className="text-lg leading-relaxed"></p>
          </div>
        </div>
      </div>
    </main>
  );
}
