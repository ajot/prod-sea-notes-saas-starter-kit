import Script from 'next/script';

/**
 * Google Analytics and Tag Manager component for tracking user interactions.
 * Only loads when the respective environment variables are set.
 * This ensures analytics is optional and privacy-first by default.
 * 
 * Environment variables:
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID: Google Analytics Measurement ID
 * - NEXT_PUBLIC_GTM_ID: Google Tag Manager Container ID
 * 
 * @returns Google Analytics and GTM scripts or null if not configured
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  
  // Don't render anything if neither GA nor GTM is configured
  if (!gaId && !gtmId) {
    return null;
  }
  
  return (
    <>
      {/* Google Tag Manager - should be as high as possible in head */}
      {gtmId && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}
      
      {/* Google Analytics (gtag.js) */}
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}