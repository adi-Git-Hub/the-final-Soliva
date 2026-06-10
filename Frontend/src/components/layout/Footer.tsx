import { Link } from "@tanstack/react-router";

const groups: {
  title: string;
  links: { to: string; label: string; external?: boolean }[];
}[] = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All products" },
      { to: "/search", label: "Search" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/story", label: "About" },
      { to: "https://wa.me/917350640608", label: "Contact", external: true },
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
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:gap-10 sm:py-14 md:grid-cols-3 md:py-16 md:px-8">
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {g.title}
            </h4>
            <ul className="space-y-2">
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

      <div className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 py-5 text-micro-lg text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-xs md:px-8 md:py-6 safe-bottom">
          <span>© 2026 Soliva. All rights reserved.</span>
          <span>Made with care</span>
        </div>
      </div>
    </footer>
  );
}
