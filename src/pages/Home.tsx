import React from 'react';
import { Helmet } from 'react-helmet-async';
import EmailBox from '../components/EmailBox';
import AdUnit from '../components/AdUnit';
import { Shield, Clock, Lock, Mail } from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';

const Home: React.FC = () => {
  return (
    <ErrorBoundary>
      <Helmet>
        <title>Temp Mail - Temporary Disposable Email | Spam-Free SnapMails</title>
        <meta name="description" content="Get instant disposable email addresses with unique customization features. Protect your real inbox from spam with SnapMails's secure temporary email service." />
        <meta name="keywords" content="temporary email, disposable email, temp mail, anonymous email, spam protection, custom email, temporary mail service, secure email" />
        <link rel="canonical" href="https://snapmails.xyz" />
        <meta name="google-adsense-account" content="ca-pub-9774323877072715" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SnapMails - Secure & Customizable Temporary Email Service" />
        <meta property="og:description" content="Get instant disposable email addresses with unique customization features. Protect your real inbox from spam with SnapMails's secure temporary email service." />
        <meta property="og:url" content="https://snapmails.xyz" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://snapmails.xyz/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SnapMails - Secure Temporary Email Service" />
        <meta name="twitter:description" content="Get instant disposable email addresses with unique customization features. Protect your inbox from spam." />
        <meta name="twitter:image" content="https://snapmails.xyz/twitter-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "SnapMails",
            "description": "Secure and customizable disposable email service",
            "url": "https://snapmails.xyz",
            "applicationCategory": "Email Service",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <article className="relative">
        <div className="relative">
          <div className="text-center max-w-4xl mx-auto px-4 pt-20 pb-16">
            <h1 className="text-5xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600">
              Secure Temporary Email Service
            </h1>
            <p className="text-2xl font-medium text-gray-800 dark:text-gray-100 max-w-2xl mx-auto mb-6 leading-relaxed">
              Get instant, secure disposable email addresses to protect your privacy
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
              SnapMails provides temporary email addresses that help you avoid spam and protect your primary inbox. Perfect for sign-ups, testing, and temporary communications.
            </p>

            <div className="flex flex-wrap gap-6 justify-center mt-12 mb-12">
              <div className="flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Privacy Protected</span>
              </div>
              <div className="flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Instant Access</span>
              </div>
              <div className="flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">No Registration</span>
              </div>
            </div>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmailBox />
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose SnapMails?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Protect Your Privacy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Keep your primary email address private and avoid spam by using our disposable email service for temporary communications.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No registration required. Get an instant disposable email address and start receiving messages immediately.
              </p>
            </div>
          </div>
        </section>

        <AdUnit 
          slot="1234567890"
          format="auto"
          className="max-w-4xl mx-auto px-4 my-8"
        />

        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="prose prose-lg mx-auto">
            <ol className="space-y-4">
              <li>Get an instant temporary email address</li>
              <li>Use it for sign-ups, testing, or temporary communications</li>
              <li>Receive emails in real-time</li>
              <li>All emails are automatically deleted after 1 hour for privacy</li>
            </ol>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Features & Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Instant Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                No waiting or verification required. Get your temporary email address immediately.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Custom Domains</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose from multiple email domains to suit your needs.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive and view emails instantly as they arrive in your temporary inbox.
              </p>
            </div>
          </div>
        </section>
      </article>
    </ErrorBoundary>
  );
};

export default Home;