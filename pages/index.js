import * as React from "react"
import Head from 'next/head'

const PDFTRON_LICENSE_KEY = ""

let isInitializing = false;

function initializeWebViewer(dom) {
  if (isInitializing) {
    return;
  }

  if (!dom) {
    return
  }

  let WebViewer = null;

  isInitializing = true;

  import('@pdftron/webviewer').then((module) => {
    WebViewer = module.default;
  }).then(() => {
    WebViewer(
      {
        licenseKey: PDFTRON_LICENSE_KEY,
        path: '/webviewer',
        initialDoc: '/sample.pdf',
      },
      dom,
    ).then((instance) => {
      instance.Core.setCustomFontURL(window.location.origin + '/webviewer-fonts/');
      instance.UI.enableFeatures([instance.Feature.ContentEdit]);
    });
  });
}

export default function Home() {
    const viewer = React.useRef(null);

    React.useEffect(() => {
      initializeWebViewer(viewer.current);
    }, []);


  return (
    <>
      <Head>
        <title>Webviewerer error with licenseKey</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div id="viewer" ref={viewer} style={{ height: '100vh' }} />
      </main>
    </>
  )
}
