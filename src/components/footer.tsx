import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RP</span>
              </div>
              <span className="text-lg font-bold">RanchPeptides</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Premium research peptides with third-party verified purity. Trusted by researchers worldwide.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/products/bpc-157" className="text-sm text-zinc-400 hover:text-white transition-colors">BPC-157</Link></li>
              <li><Link href="/products/retatrutide" className="text-sm text-zinc-400 hover:text-white transition-colors">Retatrutide</Link></li>
              <li><Link href="/products/tb-500" className="text-sm text-zinc-400 hover:text-white transition-colors">TB-500</Link></li>
              <li><Link href="/products/mt-2" className="text-sm text-zinc-400 hover:text-white transition-colors">MT-2</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/science" className="text-sm text-zinc-400 hover:text-white transition-colors">Science & Research</Link></li>
              <li><Link href="/faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/science#peptides-vs-steroids" className="text-sm text-zinc-400 hover:text-white transition-colors">Peptides vs. Steroids</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-zinc-400">support@ranchpeptides.com</span></li>
              <li><span className="text-sm text-zinc-400">Mon-Fri 9am-5pm CST</span></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-zinc-700">
          <p className="text-xs text-zinc-500 leading-relaxed max-w-4xl">
            <strong>Disclaimer:</strong> Products sold on this site are intended for laboratory and research use only.
            They are not intended for use in food, drugs, medical devices, or cosmetics. These products are not for human consumption.
            These statements have not been evaluated by the Food and Drug Administration. These products are not intended to
            diagnose, treat, cure, or prevent any disease. By purchasing from Ranch Peptides, you agree that these products
            will only be used for legitimate research purposes.
          </p>
          <p className="text-xs text-zinc-600 mt-4">
            &copy; {new Date().getFullYear()} Ranch Peptides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
