import { siteConfig } from "@/data/site";

export function FloatingCall() {
  return <a className="floating-call" href={siteConfig.phoneHref} aria-label={`Pozovi organizatora: ${siteConfig.phone}`} title={`Pozovi ${siteConfig.phone}`}>
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16.4v2.7a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 5.2 2 2 0 0 1 5 3h2.7a2 2 0 0 1 2 1.7l.4 2.8a2 2 0 0 1-.6 1.8L7.8 11a14 14 0 0 0 5.2 5.2l1.7-1.7a2 2 0 0 1 1.8-.6l2.8.4a2 2 0 0 1 1.7 2.1Z" />
    </svg>
  </a>;
}
