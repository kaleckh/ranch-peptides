import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#050505] text-foreground mt-auto border-t border-[#2a241b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#15110c] border border-primary/40 rounded-md flex items-center justify-center">
                <span className="text-primary font-black text-sm">HP</span>
              </div>
              <span className="text-lg font-black uppercase tracking-tight">Henry&apos;s Peptides</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              Premium research peptides with third-party verified purity. Trusted by researchers worldwide.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-primary mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/products/bpc-157" className="text-sm text-muted hover:text-primary transition-colors">BPC-157</Link></li>
              <li><Link href="/products/retatrutide" className="text-sm text-muted hover:text-primary transition-colors">Retatrutide</Link></li>
              <li><Link href="/products/tb-500" className="text-sm text-muted hover:text-primary transition-colors">TB-500</Link></li>
              <li><Link href="/products/mt-2" className="text-sm text-muted hover:text-primary transition-colors">MT-2</Link></li>
              <li><Link href="/products/mots-c" className="text-sm text-muted hover:text-primary transition-colors">MOTS-c</Link></li>
              <li><Link href="/products/pinealon" className="text-sm text-muted hover:text-primary transition-colors">Pinealon</Link></li>
              <li><Link href="/products/epitalon" className="text-sm text-muted hover:text-primary transition-colors">Epitalon</Link></li>
              <li><Link href="/products/ghk-cu" className="text-sm text-muted hover:text-primary transition-colors">GHK-Cu</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-primary mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/science" className="text-sm text-muted hover:text-primary transition-colors">Science & Research</Link></li>
              <li><Link href="/faq" className="text-sm text-muted hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/science#peptides-vs-steroids" className="text-sm text-muted hover:text-primary transition-colors">Peptides vs. Steroids</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-primary mb-4">Support</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-muted">support@henryspeptides.com</span></li>
              <li><span className="text-sm text-muted">Mon-Fri 9am-5pm CST</span></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-[#2a241b]">
          <p className="text-xs text-muted leading-relaxed max-w-4xl">
            <strong>Disclaimer:</strong> Products sold on this site are intended for laboratory and research use only.
            They are not intended for use in food, drugs, medical devices, or cosmetics. These products are not for human consumption.
            These statements have not been evaluated by the Food and Drug Administration. These products are not intended to
            diagnose, treat, cure, or prevent any disease. By purchasing from Henry&apos;s Peptides, you agree that these products
            will only be used for legitimate research purposes.
          </p>
          <p className="text-xs text-[#736a60] mt-4">
            &copy; {new Date().getFullYear()} Henry&apos;s Peptides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
