import AboutContent from "@/components/credits/AboutContent";

export default function About() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="relative z-10 flex flex-col">
        <AboutContent />
      </div>
    </main>
  );
}
