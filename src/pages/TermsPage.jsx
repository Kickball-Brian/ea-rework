import usePageMeta from '../hooks/usePageMeta'
import PageHero from '../components/PageHero'

/*
  PLACEHOLDER — the live Terms & Conditions page (emailagency.com/terms-conditions/)
  contains two full legal agreements ("Terms & Conditions for Email Marketing
  Services" and "Leads and Data Terms & Conditions"). That copy must be migrated
  VERBATIM from the source — it has not been reproduced here because a paraphrased
  legal document must never ship as the real one.

  TODO(go-live):
    1. Paste the exact text of both agreements from the live page (or from legal).
    2. Confirm governing law / jurisdiction (live page states Palm Beach County,
       Florida) and any effective date.
    3. Remove this notice block.

  Section structure captured from the live page for reference:

  Terms & Conditions for Email Marketing Services
    1. Copy Approval              9.  Force Majeure
    2. Details of Broadcast       10. Assignment
    3. Hardware, Software and     11. Relationship of Parties
       Database List              12. Entire Agreement
    4. Payment                    13. Disputes
    5. Cancellation               14. Severability
    6. Indemnification            15. Headings
    7. Warranties
    8. Limitation of Liability

  Leads and Data Terms & Conditions
    1.  Payment Terms            10. Disclaimer of Warranties & Limited Warranty
    2.  Cancellation             11. Limitation of Liability
    3.  Credit/Debit Payments    12. Indemnification
        and Disputes            13. No Assignment by You
    4.  Ownership               14. Nature of the Contractual Relationship
    5.  License                 15. Termination
    6.  Limitations on Use      16. Governing Law & Jurisdiction
    7.  Your Responsibilities,  17. Entire Agreement, Amendment & Waiver
        Use of Email Data,      18. Execution & Counterparts
        Review and Audit
    8.  Client's Representations
    9.  Interruption in Provision of the Data & Force Majeure
*/
export default function TermsPage() {
  usePageMeta(
    'Terms & Conditions | Email Agency',
    'The terms and conditions governing Email Agency marketing services and leads and data services.'
  )

  return (
    <div>
      <PageHero minHeight="32vh">
        <span className="section-label">Legal</span>
        <h1 className="page-title">Terms &amp; Conditions</h1>
      </PageHero>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="legal-prose">
            <div className="legal-notice">
              <strong>This page is being migrated.</strong>
              <p>
                The full Terms &amp; Conditions are being brought over verbatim
                from our previous site. In the meantime, the current terms remain
                in effect and are available at{' '}
                <a href="https://emailagency.com/terms-conditions/" target="_blank" rel="noreferrer">
                  emailagency.com/terms-conditions
                </a>
                . For questions, contact{' '}
                <a href="mailto:info@emailagency.com">info@emailagency.com</a>.
              </p>
            </div>

            <h2>Terms &amp; Conditions for Email Marketing Services</h2>
            <p>Copy approval · Details of broadcast · Hardware, software and database list · Payment · Cancellation · Indemnification · Warranties · Limitation of liability · Force majeure · Assignment · Relationship of parties · Entire agreement · Disputes · Severability · Headings.</p>

            <h2>Leads and Data Terms &amp; Conditions</h2>
            <p>Payment terms · Cancellation · Credit/debit payments and disputes · Ownership · License · Limitations on use · Your responsibilities and audit rights · Client's representations · Interruption in provision of the data &amp; force majeure · Disclaimer of warranties · Limitation of liability · Indemnification · No assignment · Nature of the contractual relationship · Termination · Governing law &amp; jurisdiction (Palm Beach County, Florida) · Entire agreement, amendment &amp; waiver · Execution &amp; counterparts.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
