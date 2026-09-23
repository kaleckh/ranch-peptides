import Link from "next/link";
export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div><Link href="/" className="wordmark">SALT <span>N’</span> PEP<span className="brand-asterisk" aria-hidden="true">✳</span></Link><p>Small compounds. Big curiosity.</p></div><nav aria-label="Footer navigation"><Link href="/products">The collection ↗</Link><Link href="/science">The research ↗</Link><Link href="/faq">Good to know ↗</Link></nav></div><div className="footer-bottom"><p>For laboratory and research use only. Not for human consumption. Products are not intended to diagnose, treat, cure, or prevent any disease.</p><span>© {new Date().getFullYear()} SALT N’ PEP</span></div></footer>;
}
