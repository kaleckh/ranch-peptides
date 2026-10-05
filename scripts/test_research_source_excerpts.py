import unittest
from research_source_excerpts import abstract_hash, excerpt_snapshot, source_excerpt


class SourceExcerptTests(unittest.TestCase):
    def test_preserves_qualified_conclusion_and_limits_quote(self):
        sentence = "These preliminary results suggest possible activity in rats, but additional studies are required before human efficacy or safety can be established under any clinical circumstances, and the mechanisms underlying these observations remain uncertain."
        excerpt = source_excerpt({"abstract": [{"label": "CONCLUSIONS", "text": sentence}]})
        self.assertEqual(excerpt["kind"], "conclusion")
        self.assertTrue(excerpt["truncated"])
        self.assertLessEqual(len(excerpt["text"].split()), 25)
        self.assertTrue(sentence.startswith(excerpt["text"]))
        self.assertIn("preliminary", excerpt["text"])
        self.assertIn("but additional studies", excerpt["text"])

    def test_unstructured_excerpt_is_not_promoted_to_conclusion(self):
        excerpt = source_excerpt({"abstract": [{"label": "", "text": "Researchers studied rats. Human evaluation is still needed."}]})
        self.assertEqual(excerpt["text"], "Human evaluation is still needed.")
        self.assertEqual(excerpt["kind"], "abstract")
        self.assertEqual(excerpt["position"], "closing")
        self.assertFalse(excerpt["truncated"])

    def test_prefers_explicit_conclusion_over_results(self):
        excerpt = source_excerpt({"abstract": [{"label": "RESULTS", "text": "Levels increased."}, {"label": "CONCLUSION", "text": "The treatment did not improve the primary outcome."}]})
        self.assertEqual(excerpt["text"], "The treatment did not improve the primary outcome.")

    def test_skips_copyright_registration_and_disclaimer(self):
        abstract = [{"label": "", "text": "The effect was observed in mice. Copyright © 2015 John Wiley & Sons, Ltd."}, {"label": "BENTHAM SCIENCE DISCLAIMER", "text": "By submitting a manuscript authors agree to transfer copyright."}]
        self.assertEqual(source_excerpt({"abstract": abstract})["text"], "The effect was observed in mice.")
        abstract = [{"label": "", "text": "No effect was detected. The ClinicalTrials.gov registration is NCT04881760 ."}]
        self.assertEqual(source_excerpt({"abstract": abstract})["text"], "No effect was detected.")

    def test_does_not_select_question_or_parenthetical_funding(self):
        excerpt = source_excerpt({"abstract": [{"label": "NEW FINDINGS", "text": "What is the central question of this study? Researchers tested the response in mice."}]})
        self.assertEqual(excerpt["text"], "Researchers tested the response in mice.")
        excerpt = source_excerpt({"abstract": [{"label": "CONCLUSIONS", "text": "No response was detected. (Funded by an institute.)"}]})
        self.assertEqual(excerpt["text"], "No response was detected.")

    def test_no_source_no_excerpt(self):
        self.assertIsNone(source_excerpt({"abstract": []}))
        self.assertIsNone(source_excerpt({"abstract": [{"label": "FUNDING", "text": "Supported by an institute."}]}))

    def test_skips_formatting_and_bibliographic_trailers(self):
        excerpt = source_excerpt({"abstract": [{"label": "", "text": "The response was observed in mice. Highlight."}]})
        self.assertEqual(excerpt["text"], "The response was observed in mice.")
        record = {"title": "Melanotan Tanning Injection: A Rare Cause of Priapism.", "authors": "Mallory CW, Lopategui DM, Cordon BH", "abstract": [{"label": "", "text": "Guidelines should consider priapism as a possible side effect. CW. Mallory, DM Lopategui, BH. Cordon. Melanotan Tanning Injection: A Rare Cause of Priapism. Sex Med 2021;9:100298."}]}
        self.assertEqual(source_excerpt(record)["text"], "Guidelines should consider priapism as a possible side effect.")

    def test_reviewed_selection_must_still_match_source(self):
        sentence = "BPC 157 was shown to be effective in promoting corneal defects healing in rats."
        record = {"id": "16117343", "abstract": [{"label": "", "text": f"{sentence} Results were dose dependent."}]}
        self.assertEqual(source_excerpt(record)["text"], sentence)
        self.assertEqual(source_excerpt(record)["position"], "selected")
        record["abstract"][0]["text"] = "Results were dose dependent."
        with self.assertRaisesRegex(ValueError, "new source check"):
            source_excerpt(record)

    def test_only_selected_publications_and_source_fingerprint(self):
        sections = [{"label": "RESULTS", "text": "The result was negative."}]
        snapshot = excerpt_snapshot({"test": {"papers": [{"id": "1"}]}}, {"1": {"abstract": sections}, "2": {"abstract": sections}}, "2026-10-04")
        self.assertEqual(set(snapshot["excerpts"]), {"1"})
        self.assertEqual(snapshot["excerpts"]["1"]["sourceHash"], abstract_hash(sections))
        self.assertNotEqual(abstract_hash(sections), abstract_hash([{"label": "RESULTS", "text": "The result was positive."}]))

    def test_withdrawal_record_quotes_status_instead_of_publisher_policy(self):
        status = "The article has been withdrawn at the author's request from the website of the journal Current Neuropharmacology."
        record = {"id": "39865815", "abstract": [{"label": "", "text": f"{status} Bentham Science apologizes to the readers. The Bentham Editorial Policy on Article Withdrawal can be found at https://benthamscience.com/editorial-policies-main.php"}]}
        self.assertEqual(source_excerpt(record)["text"], status)
        self.assertEqual(source_excerpt(record)["kind"], "abstract")


if __name__ == "__main__":
    unittest.main()
