
import React from 'react';
import Layout from '@/components/Layout/layout'
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'


const arrayOptions = [
  {item:'Juan', link: '/link1'}, 
  {item:'Andres', link: '/link2'}
]


export default function ListEdiciones({data}) {

    // console.log('la data', data)

    const listsections = data.cities.map((item, i) => {

      let selectOptions = []
      let defaultSelectoption = "";

      if(i == 0) {
        defaultSelectoption = {'item':`${item.cityname}`, 'link': `/${item.cityslug}`}
      } else {
        selectOptions.push(
          {'item':`${item.cityname}`, 'link': `/${item.cityslug}`}
        )
      }

      return(
        <SectionBox key={item.cityslug}>
        <HeadSection titleSection={item.cityname} slug={item.cityslug} colorBullet={"#ccc"} data={item}/>
        {item.allEditions.length > 0 &&  <SlideCarouselCountry todayEdition={item.allEditions[0]} slug={item.cityslug}/>}
      </SectionBox>
      )

    })
      

  return (
      <Layout>
        {listsections}
      </Layout>
  )
}



  export async function getStaticPaths(){
    try {
      const res = await fetch('https://api.readmetro.com/country.json');
      const data = await res.json();
      const paths = data.map(({countryslug}) => ({params: {country: `${countryslug}`}}));
      return {
        paths,
        fallback: false,
      };
    } catch (error) {
      console.log(error)
      
    }
  }


  export async function getStaticProps({params}) {
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
    }
  }
