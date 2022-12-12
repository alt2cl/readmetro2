import { useState, useRef, useEffect } from "react";
// import Layout from '@/components/Layout/layout'

import Box from '@mui/material/Box';

import HeadSeo from '@/components/Layout/headSeo'
import siteMetadata from '@/src/siteMetadata'

import IntroText from "@/components/UI/Molecula/IntroText";
import CountryMap from '@/components/UI/Organismo/CountryMaps'
import Suscription from "@/components/UI/Organismo/Suscription";
import HeadMap from '@/components/UI/Atomo/HeadMap'
import {useSelector} from 'react-redux'






export default function Home({data}) {
  const originalData = typeof(data[0]) != "undefined" ?  data[0] :  data;
  const langData = useSelector(state => state.lang.dataCurrentLang)



  return (
    <>
      <HeadSeo
          title={`Index Your Awesome Title Here`}
          description={`Your description goes here on every page.
            Keep character count between 140 to 160 characters`}
          canonicalUrl={siteMetadata.siteUrl}
          ogTwitterImage={siteMetadata.siteLogoSquare}
          ogType={"website"}
      />
      <IntroText />

      <Suscription data={originalData} />

      <HeadMap title={langData.listWords.headSection.map} />
    
      <Box sx={{overflowX:'auto', marginLeft:['-15px', 'auto'], width:'calc(100% + 30px)'}}>
      <CountryMap />
      </Box>
      
    </>



  )
}

  export async function getServerSideProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://api.readmetro.com/country.json');
    const data = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data,
      },
    }
  }
