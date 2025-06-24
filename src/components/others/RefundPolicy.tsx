import React from "react";
interface TermsProps {
  mobileView: boolean;
}

const RefundPolicy :React.FC<TermsProps> = ({ mobileView })=> {
  const proseSectionClass =
    "mb-6 bg-slate-100 dark:bg-slate-800 rounded-lg" +
    (mobileView ? " px-4 py-4 " : " p-8 text-justify");
  return (
    <div className="relative">
      <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg')" }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Refund Policy</h1>
        </div>
      </div>
      <div className={`container mx-auto ${mobileView ? 'px-2 py-4' : 'px-4 py-8'}`}>
        <p className="text-gray-500 text-sm">Home &gt; Refund Policy</p>
        <div className="prose mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-4">Refund and Cancellation Policy of Escapenfly</h2>
            <section className={proseSectionClass}>
            <h3 className="text-xl font-bold mb-2">At Escapenfly, we aim to provide clarity and fairness in our refund and cancellation processes.</h3>
            <p>
              This policy applies to all services booked through Escapenfly, including tours, flights, hotels, visas, insurance, and other travel products.
            </p>

            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-1">1. Applicability</h4>
              <p>
              This policy governs all cancellations and refund requests for bookings made directly with Escapenfly.
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-1">2. Cancellation Requests</h4>
              <ul className="list-disc ml-6">
              <li>
                All cancellation requests must be made in writing via email to <a href="mailto:enf@escapenfly.com" className="text-blue-600 underline">enf@escapenfly.com</a>.
              </li>
              <li>
                The effective cancellation date is the date on which Escapenfly receives your written request.
              </li>
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-1">3. Cancellation Charges and Fee Structure</h4>
              <ul className="list-disc ml-6">
              <li>
                <span className="font-semibold">Booking to 15 Days Before Departure:</span> A <span className="font-semibold">non-refundable booking fee of ₹30,000 per person</span> applies upon confirmation of any service (airfare, hotels, cruises, etc.).
              </li>
              <li>
                <span className="font-semibold">14 Days to Departure (inclusive):</span> <span className="font-semibold text-red-600">100% non-refundable.</span> Any cancellations made within 14 days of the departure date will result in full forfeiture of the total booking cost.
              </li>
              <li>
                <span className="font-semibold">No-Show:</span> <span className="font-semibold text-red-600">Total amount forfeited</span> and <span className="font-semibold">no refund</span> will be provided for no-shows.
              </li>
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-1">4. Refund Processing</h4>
              <ul className="list-disc ml-6">
              <li>Refunds (if applicable) are processed within <span className="font-semibold">14 business days</span> from the date of cancellation confirmation.</li>
              <li>Funds will be returned via the original payment method. Banking or gateway processing times may apply.</li>
              <li>A standard processing fee of <span className="font-semibold">₹500 per booking</span> will be deducted from the refunded amount, unless exempted by special promotion.</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-1">5. Non-Refundable Components</h4>
              <p>Certain fees and services are non-refundable once paid, including but not limited to:</p>
              <ul className="list-disc ml-6">
              <li>Non-cancellable airline tickets</li>
              <li>Embassy or consulate visa application fees</li>
              <li>Event, cruise, or group booking confirmation charges</li>
              <li>Third-party service fees explicitly stated as non-refundable</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-1">6. Force Majeure</h4>
              <p>
              In cases of natural disasters, strikes, pandemics, or other uncontrollable events, Escapenfly will attempt to secure refunds or credits from suppliers. Any recoverable amount, minus administrative fees, will be passed on to you. If no refund is available, you may receive travel credits valid for 12 months from cancellation.
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-1">7. Amendments and Date Changes</h4>
              <ul className="list-disc ml-6">
              <li>Date or itinerary changes are treated as cancellations and new bookings. Applicable cancellation fees and fresh supplier rates will apply.</li>
              <li>Amendment fees may be charged in addition to any supplier-imposed fees.</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-1">8. Group Bookings</h4>
              <ul className="list-disc ml-6">
              <li>Custom cancellation terms apply to group bookings (5+ pax) as per the group contract.</li>
              <li>Cancellation charges for group bookings will be outlined at the time of booking and agreed upon in writing.</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-1">9. Dispute Resolution</h4>
              <p>
              If you disagree with a refund decision, please escalate to our Grievance Officer at <a href="mailto:enf@escapenfly.com" className="text-blue-600 underline">enf@escapenfly.com</a> within <span className="font-semibold">30 days</span> of notification. Unresolved disputes will follow the resolution process outlined in our Terms &amp; Conditions.
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-lg mb-1">10. Contact Us</h4>
              <p>
              For any questions or assistance regarding cancellations or refunds, reach out to our support team:
              </p>
              <div className="ml-6">
              <div><span className="font-semibold">Customer Support</span></div>
              <div>Email: <a href="mailto:enf@escapenfly.com" className="text-blue-600 underline">enf@escapenfly.com</a></div>
              <div>Phone: <a href="https://wa.me/+919851739851?utm_source=web" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">+91-9851-73-9851</a></div>
              </div>
            </div>

            <p className="mt-6">
              We appreciate your understanding and thank you for choosing Escapenfly.
            </p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;