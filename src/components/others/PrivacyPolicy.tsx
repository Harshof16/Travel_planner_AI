import React from 'react';

interface TermsProps {
  mobileView: boolean;
}

const PrivacyPolicy :React.FC<TermsProps> = ({ mobileView })=> {
  const proseSectionClass =
    "mb-6 bg-slate-100 dark:bg-slate-800 rounded-lg" +
    (mobileView ? " px-4 py-4 " : " p-8 text-justify");
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184631/pexels-photo-3184631.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        </div>
      </div>

      <div className={`container mx-auto ${mobileView ? 'px-2 py-4' : 'px-4 py-8'}`}>
        <p className="text-gray-500 text-sm">Home &gt; Privacy Policy</p>
        <div className="prose mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment to Your Privacy</h2>
            <section className={proseSectionClass}>
            <h3 className="text-xl font-bold mb-2">Holiday Triangle Travel Private Limited ("we," "us," "our," or "ENF")</h3>
            <p className="mb-4">
              operates the website <a href="http://www.escapenfly.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.escapenfly.com</a> ("Website"). We uphold the highest standards for safeguarding user information and ensuring secure transactions. This Privacy Policy outlines how we collect, use, store, disclose, and protect your data.
            </p>
            <p className="mb-4">
              For questions, contact us <a href="/contact" className="text-blue-500 underline font-medium">
                        here
                    </a>.
            </p>

            <ol className="list-decimal pl-6 space-y-4">
              <li>
              <strong>Collection of Personal Data</strong>
              <ul className="list-disc pl-6">
                <li>Name, email, contact number, address</li>
                <li>Date of birth, payment details</li>
                <li>IP address and device information</li>
              </ul>
              <div className="mt-1 text-sm text-gray-600">
                Collected via bookings, subscriptions, competitions, surveys, and registration.
              </div>
              </li>
              <li>
              <strong>Use of Personal Data</strong>
              <ul className="list-disc pl-6">
                <li>Process bookings and transactions</li>
                <li>Resolve disputes and troubleshoot</li>
                <li>Send travel offers and updates</li>
                <li>Conduct marketing, audits, and surveys</li>
                <li>Customize your browsing experience</li>
              </ul>
              <div className="mt-1 text-sm">
                Opt out by unsubscribing from emails or contacting <a href="mailto:enf@escapenfly.com" className="text-blue-600 underline">enf@escapenfly.com</a>.
              </div>
              </li>
              <li>
              <strong>Use of Demographic and Profile Data</strong>
              <p>We analyze demographic data to improve our offerings. IP addresses help identify users and resolve issues.</p>
              </li>
              <li>
              <strong>Sharing of Personal Information</strong>
              <ul className="list-disc pl-6">
                <li>Internal teams, affiliates, and partners</li>
                <li>Legal and regulatory authorities (when required)</li>
                <li>Service providers, auditors, or legal advisors</li>
              </ul>
              </li>
              <li>
              <strong>Data Retention</strong>
              <p>Personal data is retained only as long as necessary to fulfill the purpose for which it was collected or as required by law.</p>
              </li>
              <li>
              <strong>Cookies</strong>
              <p>Cookies are used to enhance your browsing experience. Third-party vendors like Google may also use cookies for ad targeting.</p>
              </li>
              <li>
              <strong>Data Security</strong>
              <p>We employ strict measures to protect your data. Payment transactions are processed securely by authorized payment gateways.</p>
              </li>
              <li>
              <strong>Policy Changes</strong>
              <p>We reserve the right to change this Policy without prior notice. Continued use of our services implies acceptance of the updated Policy.</p>
              </li>
              <li>
              <strong>Traveler Photo/Video Submissions</strong>
              <p>By submitting content, you grant us global, non-exclusive rights to use them across our platforms.</p>
              </li>
              <li>
              <strong>Security Precautions</strong>
              <p>We use secure servers and follow industry-standard practices to safeguard user data. Payment data is handled by certified third-party gateways.</p>
              </li>
              <li>
              <strong>Opt-Out Options</strong>
              <p>You may opt out of non-essential communication or delete your account by contacting us at <a href="mailto:enf@escapenfly.com" className="text-blue-600 underline">enf@escapenfly.com</a>.</p>
              </li>
              <li>
              <strong>Advertising</strong>
              <p>Third-party advertisers may use cookies and access non-personal data to show relevant ads. We are not responsible for their privacy practices.</p>
              </li>
              <li>
              <strong>Transfer of Data Overseas</strong>
              <p>Your data may be transferred to and processed in countries outside of your own, including outside the EEA, to fulfill our service obligations.</p>
              </li>
              <li>
              <strong>EU Data Rights</strong>
              <ul className="list-disc pl-6">
                <li>Access, correct, or delete your data</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>File a complaint</li>
              </ul>
              <div className="mt-1 text-sm">
                For such requests, contact <a href="mailto:enf@escapenfly.com" className="text-blue-600 underline">enf@escapenfly.com</a>.
              </div>
              </li>
              <li>
              <strong>Confidentiality</strong>
              <p>All confidential data provided by users is protected and disclosed only as legally required or explicitly permitted.</p>
              </li>
              <li>
              <strong>Disclaimer</strong>
              <p>By using our platform, you accept this policy. If you disagree, please discontinue use.</p>
              </li>
              <li>
              <strong>Grievance Officer</strong>
              <div>
                <span className="block font-semibold">Mr. Abhishek Sharma</span>
                <span>Email: <a href="mailto:abhisheksharma@escapenfly.com" className="text-blue-600 underline">abhisheksharma@escapenfly.com</a></span>
              </div>
              </li>
            </ol>
            </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;