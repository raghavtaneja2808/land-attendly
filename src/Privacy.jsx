import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="bg-[#111] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="text-[#FF9500] font-bold text-xl hover:opacity-80 transition">
            &larr; Attendly
          </Link>
          <span className="text-sm text-white/40">Privacy Policy</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-white/40 mb-10">Last updated: April 3, 2026</p>

        <div className="space-y-10 text-white/80 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              Welcome to Attendly. This Privacy Policy explains how we handle your personal information
              when you use our application. By using Attendly, you agree to the terms outlined in this
              policy. Please read it carefully before using the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Access</h2>
            <p className="mb-3">
              When you log in and use Attendly, you agree to provide and allow us to access the following
              information to deliver our services:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-white">Name</strong> &mdash; to personalize your experience and display on your profile.</li>
              <li><strong className="text-white">Email Address</strong> &mdash; for account identification and communication.</li>
              <li><strong className="text-white">Profile Photo</strong> &mdash; to display on your user profile within the app.</li>
              <li><strong className="text-white">Mobile Number</strong> &mdash; for account verification and support communication.</li>
            </ul>
            <p className="mt-3">
              This information is provided by you at the time of login and is used solely to operate the
              app and display your data back to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">
              Attendly is a read-only attendance tracking application. We use your information exclusively to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Display your profile details (name, photo) within the app.</li>
              <li>Fetch and show your attendance records, timetable, and related academic data.</li>
              <li>Provide personalized features such as skip budgets, attendance calculations, and alerts.</li>
              <li>Communicate important app updates or respond to your support requests.</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">We do not modify, alter, or change any of your data.</strong> Attendly
              only reads and displays your information as-is. No write operations are performed on your
              academic records or personal details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Storage &amp; Security</h2>
            <p>
              We take the security of your data seriously. Your login credentials are used only to
              authenticate your session and are not stored on our servers in plain text. We implement
              appropriate technical and organizational security measures to protect your information
              against unauthorized access, alteration, disclosure, or destruction. All data transmission
              is encrypted using industry-standard protocols.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Sharing &amp; Third Parties</h2>
            <p>
              We do not sell, trade, rent, or share your personal information with any third parties.
              Your data is never used for marketing, advertising, or analytics purposes. We only access
              your data to display it to you within the app &mdash; nothing more.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
            <p>
              Attendly does not permanently store your personal or academic data on external servers.
              Your information is fetched in real-time when you use the app and is only cached locally
              on your device for performance purposes. You can clear this local data at any time by
              logging out or clearing the app data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p className="mb-3">As a user, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Access and review the personal data displayed within the app.</li>
              <li>Log out at any time to end your session and revoke access.</li>
              <li>Request deletion of any locally cached data.</li>
              <li>Contact us with questions or concerns about how your data is handled.</li>
              <li>Withdraw consent at any time by simply discontinuing use of the app.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Consent &amp; Terms of Use</h2>
            <p>
              By logging into and using Attendly, you consent to sharing your name, email address,
              profile photo, and mobile number with us for the purposes described in this policy. You
              acknowledge that Attendly is a read-only tool that displays your attendance and academic
              data for your personal convenience. Continued use of the application constitutes your
              acceptance of these terms. If you do not agree with this policy, please discontinue use
              of the application immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Children's Privacy</h2>
            <p>
              Attendly is intended for use by students aged 13 and above. We do not knowingly collect
              personal information from children under the age of 13. If you believe we have
              inadvertently accessed such information, please contact us so we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected on this
              page with an updated revision date. We encourage you to review this page periodically. Your
              continued use of Attendly after any changes constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your
              personal data, please reach out to our support team at:
            </p>
            <p className="mt-3">
              <a
                href="mailto:meesha140203@gmail.com"
                className="text-[#FF9500] hover:underline font-medium"
              >
                meesha140203@gmail.com
              </a>
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/30 text-sm">
          <p>&copy; {new Date().getFullYear()} Attendly. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
