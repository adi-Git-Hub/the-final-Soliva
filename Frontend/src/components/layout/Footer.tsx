import { Link } from "@tanstack/react-router";
import { SolivaLogo } from "@/components/SolivaLogo";

const groups: {
  title: string;
  links: { to: string; label: string; external?: boolean }[];
}[] = [
  {
    title: "Company",
    links: [
      { to: "/story", label: "About" },
      { to: "https://wa.me/917350640608", label: "Contact", external: true },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/login", label: "Sign in" },
      { to: "/register", label: "Create account" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="m-footer mt-16 sm:mt-24 border-t border-border/40 bg-background/60 safe-x">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 md:py-16 md:px-8">
        <div className="flex justify-center mb-10 md:mb-14">
          <Link to="/" aria-label="Soliva — Home">
            <SolivaLogo height={42} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground text-center">
                {g.title}
              </h4>
              <ul className="space-y-2 flex flex-col items-center">
                {g.links.map((l) =>
                  l.external ? (
                    <li key={l.to}>
                      <a
                        href={l.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[32px] items-center text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="inline-flex min-h-[32px] items-center text-sm text-foreground/80 transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 py-5 text-micro-lg text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-xs md:px-8 md:py-6 safe-bottom">
          <span>© 2026 Soliva. All rights reserved.</span>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  );
}
