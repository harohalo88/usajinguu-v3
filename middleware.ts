import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['ja', 'en', 'zh-TW', 'zh-CN', 'ko'],

  // Used when no locale matches
  defaultLocale: 'ja',
  
  // Set locale prefix behavior (always include the prefix in the URL)
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match the root '/'
    '/',
    // Match all pathnames with supported locale prefixes
    '/(ja|en|zh-TW|zh-CN|ko)/:path*',
    // Avoid matching internal routes or asset files (handled by Next)
    '/((?!api|_next|_vercel|images|favicon.ico|.*\\..*).*)'
  ]
};
