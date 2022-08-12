
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


export default function Home({data}) {
    // console.log('la data', data)

    const listCountry = data.map((item) => (
        <SectionBox key={item.countryname}>
          <HeadSection titleSection={item.countryname} slug={item.countryslug} colorBullet={"#ccc"} />

          <Carousel />

        </SectionBox>


    ));

  return (
     
      <Layout>

        {listCountry}
        
       


      </Layout>
    

  )
}




  export async function getStaticProps() {
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
