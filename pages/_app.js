
import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import Layout from '@/components/Layout/layout';
import theme from '@/src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { Provider } from 'react-redux'
import store from '@/redux/store.js'
import '../styles/globals.css'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps} = props;

  //const stateMetaTitle = useSelector(state => state.metatags.tags.title)
  return (
    <Provider store={store}>
     
    <CacheProvider value={emotionCache}>
      <Head >
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@300;400;600&display=swap" rel="stylesheet"></link>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
      
    </CacheProvider>
    </Provider>
   
    
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
