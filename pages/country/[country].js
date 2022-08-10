
import Layout from '@/components/Layout/layout'
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import Select from '@/components/UI/Atomo/Select'
import MoreOptions from '@/components/UI/Atomo/MoreOptions'
import Carousel from '@/components/UI/Organismo/Carousel'
import SlideCarousel from '@/components/UI/Organismo/SlideCarousel'


const arrayOptions = [
  {item:'Juan', link: '/link1'}, 
  {item:'Andres', link: '/link2'}
]


export default function Country({data}) {

  console.log('data', data.cities)

  // const datacities = data.cities.map((data) => (
  //   data

  // ))

  return (
      <Layout>
       <h1>{data.countryname}</h1>
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
