import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { cookieName, fallbackLng, languages } from './app/i18n/settings';
import { permanentRedirect } from 'next/navigation';

acceptLanguage.languages(languages);

export function middleware(req: any) {
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
    // const redirectUrl = new URL(`/${lng}${req.nextUrl.pathname}`, req.url);
    // if (redirectUrl) {
    //   return permanentRedirect(redirectUrl.toString(), req.url);
    // }
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer'));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // '/:lng*'
  // matcher: ['*'],
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
