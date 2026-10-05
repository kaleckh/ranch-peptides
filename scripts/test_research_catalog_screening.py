"""Regression tests for relevance mistakes in the original broad import."""
import unittest
from research_catalog_screening import load_policy, screen_catalogs, select_publication


def publication(pmid, title, types=None):
    return {
        "id": pmid, "title": title, "types": types or ["Journal Article"],
        "category": "case-report" if types and "Case Reports" in types else "research",
        "year": 2026, "abstract": [{"text": "Background mentions BPC-157, Pinealon, GHK-Cu and melanotan II."}],
    }


class RelevanceRegressionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.policy = load_policy()

    def test_general_unregulated_peptide_and_policy_reviews_are_excluded(self):
        for pmid, title in [
            ("42757290", 'Dangers of Injectable Peptides and Other Unregulated "Biohacking" Drugs.'),
            ("42752426", "Synthetic Peptides in Pharmacy Compounding: Analysis of PCAC Recommendations and Industry Safety Standards."),
        ]:
            for slug in self.policy["include"]:
                paper, reason = select_publication(slug, publication(pmid, title, ["Journal Article", "Review"]), self.policy)
                self.assertIsNone(paper)
                self.assertTrue(reason)

    def test_actual_unregulated_exposure_case_and_negative_findings_stay(self):
        case = publication("28905366", "The unregulated use of melanotan-II is of public health interest to Australian dermatologists.", ["Case Reports", "Letter"])
        self.assertIsNotNone(select_publication("mt-2", case, self.policy)[0])
        negative = publication("35196505", "Activation of the melanocortin system in experimental uveitis.")
        paper, _ = select_publication("mt-2", negative, self.policy)
        self.assertEqual(paper["relevance"]["basis"], "reviewed-source")
        self.assertIn("lack of inflammation suppression", paper["relevance"]["reason"])

    def test_preparation_analysis_and_cases_with_broader_titles_stay(self):
        for slug, pmid in [("bpc-157", "42328738"), ("tb-500", "42328738"), ("mt-2", "33460908")]:
            paper, _ = select_publication(slug, publication(pmid, "Broader study title"), self.policy)
            self.assertEqual(paper["relevance"]["basis"], "reviewed-source")
            self.assertNotIn("abstract", paper)

    def test_reviewed_original_letters_stay_but_unreviewed_commentary_does_not(self):
        for slug, pmid in [("retatrutide", "42559975"), ("retatrutide", "40735804"), ("epitalon", "25535022")]:
            paper, _ = select_publication(slug, publication(pmid, "Compound-focused original letter", ["Letter"]), self.policy)
            self.assertEqual(paper["relevance"]["basis"], "reviewed-source")
            self.assertIn("no abstract", paper["relevance"]["reason"])
        self.assertIsNone(select_publication("retatrutide", publication("99999999", "Retatrutide commentary", ["Letter"]), self.policy)[0])

    def test_source_indexed_case_without_a_compound_alias_in_its_title_stays(self):
        paper, _ = select_publication("mt-2", publication("21564053", "Melanotan-associated melanoma.", ["Case Reports", "Letter"]), self.policy)
        self.assertEqual(paper["category"], "case-report")
        self.assertIn("does not establish causation", paper["relevance"]["reason"])

    def test_incidental_mentions_and_longer_peptide_sequences_do_not_qualify(self):
        for slug, title in [
            ("bpc-157", "Emerging treatments across many drug classes"),
            ("pinealon", "Effects of the Ala-Glu-Asp-Arg tetrapeptide"),
            ("pinealon", "Study of Cys-Pro-Ile-Glu-Asp-Arg-Pro-Met-Cys"),
            ("ghk-cu", "Copper-free GHK in skin"),
        ]:
            self.assertIsNone(select_publication(slug, publication("99999999", title), self.policy)[0])

    def test_non_biomedical_applications_do_not_qualify_despite_exact_name(self):
        for pmid, title in [
            ("34546033", "Polymer Solar Cells via Incorporating GHK-Cu"),
            ("42041438", "The Laccase-like Property of GHK-Cu and Its Applications in Colorimetric Sensing of Phenolic Compounds"),
        ]:
            self.assertIsNone(select_publication("ghk-cu", publication(pmid, title), self.policy)[0])

    def test_aliases_and_greek_beta_do_not_lose_direct_compound_papers(self):
        for slug, title in [
            ("bpc-157", "Safety evaluation of body protective compound 157"),
            ("retatrutide", "LY3437943 receptor activation"),
            ("tb-500", "Thymosin β4 in corneal repair"),
            ("ghk-cu", "Effects of glycyl-L-histidyl-L-lysine-Cu2+"),
        ]:
            self.assertIsNotNone(select_publication(slug, publication("99999999", title), self.policy)[0])

    def test_commentary_is_separate_from_focused_reviews_and_retraction_records(self):
        self.assertIsNone(select_publication("bpc-157", publication("99999999", "BPC-157", ["Editorial"]), self.policy)[0])
        for types in [["Review"], ["Retraction Notice"], ["Retracted Publication"]]:
            self.assertIsNotNone(select_publication("bpc-157", publication("99999999", "BPC-157", types), self.policy)[0])

    def test_complete_search_is_required_before_selection_and_counts_reconcile(self):
        records = {"1": publication("1", "BPC-157 in rats"), "2": publication("2", "General peptide opinion")}
        searches = {"bpc-157": {"query": "original search", "count": 2, "ids": ["1", "2"]}}
        catalogs, excluded = screen_catalogs(searches, records, self.policy)
        self.assertEqual(catalogs["bpc-157"]["count"], 1)
        self.assertEqual(catalogs["bpc-157"]["searchCount"], 2)
        self.assertEqual(catalogs["bpc-157"]["excludedCount"], len(excluded["bpc-157"]))
        searches["bpc-157"]["count"] = 3
        with self.assertRaises(ValueError):
            screen_catalogs(searches, records, self.policy)
        searches["bpc-157"]["count"] = 2
        with self.assertRaises(KeyError):
            screen_catalogs(searches, {"1": records["1"]}, self.policy)


if __name__ == "__main__":
    unittest.main()
