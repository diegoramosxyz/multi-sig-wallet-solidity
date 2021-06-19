import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html className="bg-trueGray-900 text-trueGray-200">
        <Head />
        {/* Import ethers using a CDN */}
        {/* <script
          src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
          type="application/javascript"
        ></script> */}
        {/* Must  */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
