import Link from "next/link";
import { ArrowIcon } from "./arrow-icon";
export function Footer() {
  return <footer className="site-footer"><div className="footer-top"><div><Link href="/" className="wordmark">SALT <span>N’</span> PEP</Link><p>Small compounds. Big curiosity.</p></div><nav aria-label="Footer navigation"><Link href="/products">The collection <ArrowIcon /></Link><Link href="/science">The research <ArrowIcon /></Link><Link href="/faq">Good to know <ArrowIcon /></Link></nav></div><div className="footer-bottom"><p>For laboratory and research use only. Not for human consumption. Products are not intended to diagnose, treat, cure, or prevent any disease.</p><span>© {new Date().getFullYear()} SALT N’ PEP</span></div></footer>;
}
