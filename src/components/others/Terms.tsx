import React from 'react';
interface TermsProps {
  mobileView: boolean;
}

const Terms:React.FC<TermsProps> = ({ mobileView })=> {
    const proseSectionClass =
    "mb-6 bg-slate-100 dark:bg-slate-800 rounded-lg" +
    (mobileView ? " px-4 py-4 " : " p-8 text-justify");
  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg')" }}
      >
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Terms Of Use</h1>
        </div>
      </div>

      <div className={`container mx-auto ${mobileView ? 'px-2 py-4' : 'px-4 py-8'}`}>
        <p className="text-gray-500 text-sm">Home &gt; Terms Of Use</p>
        <div className="prose mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4">Terms and Conditions of Service and Use</h2>
            <section className={proseSectionClass}>
            <h3 className="text-xl font-bold mb-4">1. General</h3>
            <p>
              Escapenfly ("the Company") refers to Escapenfly and includes its legal heirs, representatives, administrators, successors, and assigns. These Terms of Service govern the use of the website www.escapenfly.com ("the Platform"). The Company is committed to protecting user privacy and outlines service terms in this document.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">2. Definitions</h3>
            <ul className="list-disc pl-6">
              <li><strong>We, Our, and Us:</strong> Refers to Escapenfly and/or the Platform.</li>
              <li><strong>User:</strong> Any individual or legal entity using the Platform, capable of making informed decisions.</li>
              <li><strong>Services:</strong> Includes tour packages, hotel bookings, ticketing (domestic & international), passport & visa assistance, forex services, travel insurance, and car rentals.</li>
              <li><strong>Third Parties:</strong> Refers to entities other than the Company and the User.</li>
              <li><strong>Platform:</strong> Refers to the website and its features, including blogs and guides.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-4">3. General Terms</h3>
            <ul className="list-disc pl-6">
              <li>Section headings are for reference and hold no legal weight.</li>
              <li>By using the Platform, the User agrees to the Terms and the Privacy Policy.</li>
              <li>These Terms are legally binding.</li>
              <li>The Company may update Terms without prior notice. Continued use implies acceptance.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-4">4. Service Overview</h3>
            <p>
              The Company provides booking and travel-related services and publishes informative travel content.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">5. Registration</h3>
            <p>
              Registration is optional for browsing. Users may link Facebook or Gmail accounts for personalized features.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">6. Eligibility</h3>
            <p>
              Users must be of sound mind. Guardians are responsible for minors’ activities on the Platform.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">7. Content</h3>
            <ul className="list-disc pl-6">
              <li>All content is copyrighted. User-submitted content may be published after review, with credit to the creator.</li>
              <li>The Platform reserves the right to suspend accounts for misleading or offensive content.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-4">8. Payment</h3>
            <ul className="list-disc pl-6">
              <li>Free registration; paid services require payment.</li>
              <li>Accepted methods: debit/credit cards, net banking, UPI, wallets, Tech Process.</li>
              <li>A 2.5% processing fee applies.</li>
              <li>Refunds are only processed in cases of duplicate payments.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-4">9. Indemnity</h3>
            <p>
              Users indemnify the Company against any liabilities from submitted content.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">10. Term & Termination</h3>
            <ul className="list-disc pl-6">
              <li>These Terms apply as long as services are accessed.</li>
              <li>Users or the Company may terminate access at any time.</li>
              <li>The Company may discontinue the Platform without notice.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-4">11. Communication</h3>
            <p>
              By providing contact info, Users consent to receive communications. Grievances can be emailed to <a href="mailto:vineet.b@escapenfly.com" className="text-blue-600 underline">vineet.b@escapenfly.com</a>.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">12. User Obligations</h3>
            <ul className="list-disc pl-6">
              <li>Provide truthful information.</li>
              <li>Use the Platform lawfully.</li>
              <li>Refrain from commercial use or sharing misleading/offensive content.</li>
              <li>Not infringe intellectual property rights.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-4">13. DOs and DON’Ts</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
              <h4 className="font-semibold mb-2">Do:</h4>
              <ul className="list-disc pl-6">
                <li>Comply with laws</li>
                <li>Use real identity</li>
                <li>Keep information accurate</li>
              </ul>
              </div>
              <div>
              <h4 className="font-semibold mb-2">Don’t:</h4>
              <ul className="list-disc pl-6">
                <li>Use fake profiles or bots</li>
                <li>Circumvent access controls</li>
                <li>Post viruses or illegal content</li>
                <li>Copy Platform IP or brand assets without permission</li>
              </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold mt-6 mb-4">14. Disclaimer</h3>
            <ul className="list-disc pl-6">
              <li>All service descriptions and pricing are indicative.</li>
              <li>Availability is not guaranteed.</li>
              <li>Ads and third-party information are for informational purposes only.</li>
            </ul>

            <h3 className="text-xl font-bold mt-6 mb-4">15. Intellectual Property</h3>
            <p>
              All content and branding belong to the Company. No rights are transferred without written agreement.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">16. Force Majeure</h3>
            <p>
              The Company is not liable for service delays caused by events beyond its control.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">17. Dispute Resolution</h3>
            <p>
              Disputes will first go to mediation. If unresolved, arbitration will be held in Mumbai under Indian law.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">18. Grievances</h3>
            <p>
              Grievances may be addressed via email: <a href="mailto:vineet.b@escapenfly.com" className="text-blue-600 underline">vineet.b@escapenfly.com</a>.
            </p>

            <h3 className="text-xl font-bold mt-6 mb-4">19. Miscellaneous</h3>
            <ul className="list-disc pl-6">
              <li>These Terms are the full agreement.</li>
              <li>Waivers must be in writing.</li>
              <li>Invalid clauses will be modified to the closest enforceable meaning.</li>
              <li>For questions, contact us <a href="/contact" className="text-blue-500 underline font-medium">
                        here
                    </a>.</li>
            </ul>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;