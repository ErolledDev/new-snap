import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - SnapMails</title>
        <meta name="description" content="Review SnapMails' terms of service to understand the rules and guidelines for using our temporary email service." />
        <meta name="keywords" content="terms of service, user agreement, service terms, email service terms" />
        <link rel="canonical" href="https://snapmails.xyz/terms" />
        
        <meta property="og:title" content="SnapMails Terms of Service" />
        <meta property="og:description" content="Review our terms of service and usage guidelines." />
        <meta property="og:url" content="https://snapmails.xyz/terms" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:title" content="SnapMails Terms of Service" />
        <meta name="twitter:description" content="Our service terms and guidelines." />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-16" role="main">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <p className="lead text-xl text-gray-600 mb-8">
            By using SnapMails, you agree to these terms of service. Please read them carefully.
          </p>

          <section aria-labelledby="service-description">
            <h2 id="service-description">1. Service Description</h2>
            <p>
              SnapMails provides temporary, disposable email addresses for receiving emails. The service is provided "as is" without any warranties.
            </p>
          </section>

          <section aria-labelledby="acceptable-use">
            <h2 id="acceptable-use">2. Acceptable Use</h2>
            <p>
              You agree not to use SnapMails for:
            </p>
            <ul role="list">
              <li>Illegal activities</li>
              <li>Spam or harassment</li>
              <li>Distribution of malware</li>
              <li>Phishing or fraud</li>
              <li>Violation of others' rights</li>
            </ul>
          </section>

          <section aria-labelledby="limitations">
            <h2 id="limitations">3. Service Limitations</h2>
            <p>
              We reserve the right to:
            </p>
            <ul role="list">
              <li>Modify or terminate the service at any time</li>
              <li>Block any user or IP address</li>
              <li>Delete any email content</li>
              <li>Limit service usage</li>
            </ul>
          </section>

          <section aria-labelledby="disclaimer">
            <h2 id="disclaimer">4. Disclaimer of Warranties</h2>
            <p>
              The service is provided on an "as is" and "as available" basis. We make no warranties about the reliability, availability, or accuracy of the service.
            </p>
          </section>

          <section aria-labelledby="liability">
            <h2 id="liability">5. Limitation of Liability</h2>
            <p>
              We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>
          </section>

          <section aria-labelledby="changes">
            <h2 id="changes">6. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. Continued use of the service constitutes acceptance of the new terms.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2 id="contact">7. Contact Information</h2>
            <p>
              For questions about these terms, please contact us at{' '}
              <a href="mailto:erolledph@gmail.com" aria-label="Contact legal team via email">
             erolledph@gmail.com
              </a>
              .
            </p>
          </section>

          <p className="text-sm text-gray-600 mt-8">
            Last updated: March 2025
          </p>
        </div>
      </main>
    </>
  );
}