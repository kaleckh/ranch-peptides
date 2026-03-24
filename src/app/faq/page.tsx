import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Ranch Peptides",
  description: "Frequently asked questions about ordering research peptides, shipping, storage, and more.",
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What are research peptides?",
        a: "Research peptides are short chains of amino acids (typically 2-50 amino acids) synthesized for use in laboratory and scientific research. They are used to study biological signaling pathways, receptor interactions, and cellular mechanisms. All products sold by Ranch Peptides are for research use only.",
      },
      {
        q: "Are peptides the same as steroids?",
        a: "No. Peptides and anabolic steroids are fundamentally different. Peptides are amino acid chains that act as signaling molecules \u2014 they activate natural biological receptors and pathways. Steroids are synthetic derivatives of testosterone that directly override the endocrine system. Peptides have no androgenic or estrogenic activity and do not suppress natural hormone production. See our Science & Research page for a detailed comparison.",
      },
      {
        q: "Are these products legal to purchase?",
        a: "Yes. Research peptides are legal to purchase in the United States for laboratory and research purposes. They are not controlled substances. However, they are not approved by the FDA for human use, and we sell them strictly for research purposes only.",
      },
      {
        q: "Are these products for human consumption?",
        a: "No. All products sold by Ranch Peptides are intended for laboratory and research use only. They are not for human consumption, and they are not intended to diagnose, treat, cure, or prevent any disease. By purchasing, you agree to use them solely for legitimate research purposes.",
      },
    ],
  },
  {
    category: "Products & Quality",
    questions: [
      {
        q: "What purity are your peptides?",
        a: "All of our peptides are tested to 98%+ purity minimum. Most batches test at 99%+. Purity is verified via High-Performance Liquid Chromatography (HPLC) and confirmed with mass spectrometry. The exact purity percentage for each product is listed on its product page.",
      },
      {
        q: "Do you provide Certificates of Analysis (COA)?",
        a: "Yes. Every batch of every product is independently tested. A Certificate of Analysis showing HPLC purity results and mass spectrometry data is included with every order. COAs are also available for download on each product page.",
      },
      {
        q: "What form do the peptides come in?",
        a: "All peptides are supplied as lyophilized (freeze-dried) powder in sealed, sterile glass vials. Lyophilized peptides are more stable for long-term storage than reconstituted solutions.",
      },
      {
        q: "How should I store my peptides?",
        a: "Lyophilized (unreconstituted) peptides should be stored at -20\u00B0C for long-term storage or 2-8\u00B0C for short-term storage. Once reconstituted with bacteriostatic water, store at 2-8\u00B0C and use within 30 days. Keep away from direct light, especially MT-2 which is photosensitive.",
      },
      {
        q: "What is the shelf life?",
        a: "Lyophilized peptides stored at -20\u00B0C typically remain stable for 24+ months. Reconstituted peptides stored at 2-8\u00B0C should be used within 30 days. Always check the expiration date on your Certificate of Analysis.",
      },
    ],
  },
  {
    category: "Ordering & Shipping",
    questions: [
      {
        q: "Do you offer bulk discounts?",
        a: "Yes. All products have tiered pricing for orders of 3, 5, and 10+ vials. Bulk pricing is displayed on each product page. Discounts are automatically applied in your cart.",
      },
      {
        q: "How are orders shipped?",
        a: "All orders ship via insulated packaging to maintain product integrity during transit. Orders placed before 2pm CST on business days are shipped the same day. Standard shipping typically arrives within 2-5 business days.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently we ship within the United States only. Regulations regarding research peptides vary by country, and we want to ensure full compliance. We are evaluating international shipping and will announce availability when ready.",
      },
      {
        q: "What payment methods do you accept?",
        a: "Payment processing is coming soon. We are currently setting up our payment infrastructure. Check back shortly for available payment methods.",
      },
    ],
  },
  {
    category: "About Our Products",
    questions: [
      {
        q: "What is BPC-157?",
        a: "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide \u2014 15 amino acids long \u2014 derived from a protein naturally found in human gastric juice. It is one of the most studied peptides in preclinical research, with hundreds of animal studies examining its role in tissue repair, gastrointestinal protection, and nitric oxide modulation.",
      },
      {
        q: "What is Retatrutide?",
        a: "Retatrutide (LY-3437943) is a triple-agonist peptide developed by Eli Lilly that simultaneously targets GLP-1, GIP, and glucagon receptors. Its Phase 2 clinical trial, published in the New England Journal of Medicine in 2023, reported 24.2% mean body weight reduction at the highest dose \u2014 the largest reduction reported in any obesity pharmacotherapy trial at the time.",
      },
      {
        q: "What is TB-500?",
        a: "TB-500 is a synthetic version of Thymosin Beta-4, a 43-amino-acid peptide found naturally in virtually all human and animal cells. It plays key roles in cell migration, angiogenesis (blood vessel formation), and tissue repair. Published research in Nature (2004) demonstrated its ability to promote cardiac cell survival and migration.",
      },
      {
        q: "What is MT-2 (Melanotan II)?",
        a: "Melanotan II is a synthetic cyclic peptide analog of alpha-melanocyte-stimulating hormone (alpha-MSH), originally developed at the University of Arizona. It binds to melanocortin receptors (MC1R-MC5R) and has been studied for its roles in melanogenesis, appetite regulation, and sexual function. It has Phase I human trial data published in peer-reviewed journals.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-4 text-muted text-lg">
          Everything you need to know about ordering research peptides from Ranch Peptides.
        </p>

        {faqs.map((section) => (
          <div key={section.category} className="mt-12">
            <h2 className="text-xl font-bold mb-4">{section.category}</h2>
            <div className="space-y-3">
              {section.questions.map((faq) => (
                <details key={faq.q} className="group bg-white rounded-xl border border-border">
                  <summary className="cursor-pointer p-4 font-semibold text-sm flex items-center justify-between list-none">
                    {faq.q}
                    <svg
                      className="w-5 h-5 text-muted flex-shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div className="mt-16 p-8 bg-zinc-50 rounded-2xl text-center">
          <h2 className="text-xl font-bold">Still Have Questions?</h2>
          <p className="text-muted mt-2">
            Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <p className="mt-4 text-primary font-semibold">support@ranchpeptides.com</p>
        </div>

        {/* Related links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/science"
            className="flex-1 p-4 bg-white rounded-xl border border-border hover:border-primary/30 transition-colors text-center"
          >
            <p className="font-semibold text-sm">Science & Research</p>
            <p className="text-xs text-muted mt-1">Published studies & peptide vs steroid comparison</p>
          </Link>
          <Link
            href="/products"
            className="flex-1 p-4 bg-white rounded-xl border border-border hover:border-primary/30 transition-colors text-center"
          >
            <p className="font-semibold text-sm">Browse Products</p>
            <p className="text-xs text-muted mt-1">View all peptides with pricing & specs</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
