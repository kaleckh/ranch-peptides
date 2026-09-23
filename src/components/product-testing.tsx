import { batchReports } from "@/lib/batches";
import styles from "./product-testing.module.css";

export function ProductTesting({ slug, name, dosage }: { slug: string; name: string; dosage: string }) {
  const report = batchReports[slug];
  if (!report) return null;
  return (
    <section id="batch-report" className={styles.banner} aria-labelledby="testing-title">
      <div className={styles.status}>Example report / Inventory batch pending</div>
      <div className={styles.body}>
        <div>
          <p className={styles.eyebrow}>Lumira / {name} / {report.dosage} sample</p>
          <p className={styles.purity}>{report.purity}</p>
          <p className={styles.label}>Reported sample purity · HPLC</p>
        </div>
        <div className={styles.evidence}>
          <h2 id="testing-title">See the science.<br /><em>Read the report.</em></h2>
          <p>Third-party analysis by <strong>{report.lab}</strong>.<br />Report issued {report.issued}.</p>
          <a className={styles.cta} href={report.pdf} target="_blank" rel="noopener noreferrer">View lab report (PDF) <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <p className={styles.eyebrow}>Example batch / Peptaura registry</p>
          <a className={styles.batch} href={`https://www.peptaura.com/verify?batch=${encodeURIComponent(report.batch)}`} target="_blank" rel="noopener noreferrer">{report.batch} ↗</a>
          {report.reportLot && <p>PDF lot: {report.reportLot}</p>}
        </div>
        <div className={styles.scope}>
          <p>This is a reference report, not verification of SALT N’ PEP inventory. Results apply only to the tested samples.</p>
          {report.dosage !== dosage && <p className={styles.notice}>Different vial size: this report covers {report.dosage}; this product is {dosage}.</p>}
          {report.note && <p className={styles.notice}>{report.note}</p>}
          <p>Purity alone does not establish sterility, safety, or suitability for human use.</p>
        </div>
      </div>
    </section>
  );
}
