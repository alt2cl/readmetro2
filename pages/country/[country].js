
import React from 'react';
import { useState, useEffect, useRef, useCallback } from "react";
import Layout from '@/components/Layout/layout';
import Image from 'next/image';
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'
import { css } from '@emotion/react';
import {useRouter} from 'next/router'


const widthItem = 250

export default function ListEdiciones({data}) {

  const router = useRouter();

  //console.log('router::::', router.query)

    const [imageError, setImageError] = useState(false);

    const listsections = data.cities.map((item, i) => {
      let selectOptions = []
      let defaultSelectoption = "";
      let todayEdition = item.allEditions ? item.allEditions[0] : null;
      const date = todayEdition && todayEdition.date ? todayEdition.date : null;
      const fecha = date != null ? date.replaceAll("-","/") : null;
      const slug = item.cityslug;
      const cantPages = todayEdition && todayEdition.pages;
      const imagenes = [];
      const bigimages = [];

      console.log('value item', item.allEditions[0].recortes)

      if(i == 0) {
        defaultSelectoption = {'item':`${item.cityname}`, 'link': `/${item.cityslug}`}
      } else {
        selectOptions.push(
          {'item':`${item.cityname}`, 'link': `/${item.cityslug}`}
        )
      }

      for (let index = 1; index < cantPages; index++) {
          imagenes.push(
              {
              foto:`https://rm.metrolatam.com/${fecha}/${slug}/thumb_${index}-${todayEdition.newcode}.webp`,
              link: `google.com`
              }
          )
      }

      for (let index = 1; index < cantPages; index++) {
        bigimages.push(
            {
            foto:`https://rm.metrolatam.com/${fecha}/${slug}/full_${index}-${todayEdition.newcode}.webp`,
            link: `google.com`,
            recortes: item.allEditions[0].recortes,
            }
        )
    }


      const dataSlidePostCountry = imagenes.map((item, i) => {
        return (
            //imagenes a cargar en el carrusel
            <>
                {imagenes != null ? 
                     <Image src={imageError ? fallback.src : item.foto} 
                     layout="responsive"
                     width={widthItem}
                     height={300}
                     alt={item.link}
                     priority = {i <= 2 ? 'true': 'false'}
                     onError={() => setImageError(true)}
                      />
                : <Image src={fallback.src} 
                layout="responsive"
                width={fallback.width}
                height={fallback.height}
                alt={'error'}
                />
                }
        </>
        )
    })

      return(
        <SectionBox key={item.cityslug}>
          <HeadSection titleSection={item.cityname} slug={item.cityslug} colorBullet={"#ccc"} linksite={data.website}/>
          {item.allEditions.length > 0 &&  
          <SlideCarouselCountry todayEdition={item.allEditions[0]} slug={item.cityslug} widthItem={widthItem} content={dataSlidePostCountry} bigimages={bigimages} data={item}/>
          }
        </SectionBox>
      )

    })
      

  return (
      <Layout data={data}>
        {listsections}
      </Layout>
  )
}



  export async function getStaticPaths(context){
    try {
      const res = await fetch('https://api.readmetro.com/country.json');
      const data = await res.json();
      const paths = data.map(({countryslug}) => ({params: { country: `${countryslug}`, lang:'es' }}));
      return {
        paths,
        fallback: false,
      };
    } catch (error) {
      console.log(error)
    }
  }


  export async function getStaticProps({params, locales}) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch(`https://api.readmetro.com/${params.country}/index.json`);
    const data = await res.json()
  
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        data,
      },
      revalidate: 10,
     
    }
  }
