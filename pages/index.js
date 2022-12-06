import { useState, useRef, useEffect } from "react";
// import Layout from '@/components/Layout/layout'
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Image from 'next/image';
import fallback from '@/public/img/fallback.jpg'
//import Link from '@/src/Link';
import Link from 'next/link';
import Button from '@mui/material/Button';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import HeadSeo from '@/components/Layout/headSeo'
import siteMetadata from '@/src/siteMetadata'

import IntroText from "@/components/UI/Molecula/IntroText";
import { useDispatch,useSelector } from 'react-redux'
import { updateAnchorsectionSlice } from '@/redux/features/anchorsection/anchorsectionSlice';
import CountryMap from '@/components/UI/Organismo/CountryMaps'
import Suscription from "@/components/UI/Organismo/Suscription";






export default function Home({data}) {
  const originalData = typeof(data[0]) != "undefined" ?  data[0] :  data;



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

                <CountryMap />
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
