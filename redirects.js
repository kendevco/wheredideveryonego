const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Redirect old wdeg-book route to new book route for backward compatibility
  const BookViewerRedirect = {
    source: '/wdeg-book/:path*',
    destination: '/book/:path*',
    permanent: true,
  }

  const redirects = [internetExplorerRedirect, BookViewerRedirect]

  return redirects
}

export default redirects
