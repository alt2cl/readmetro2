
import Layout from '@/components/Layout/layout'
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'





export default function Home({data}) {
  

    const listCountry = data.map((item) => {

        // console.log('valor item desde el index:', item)
        let selectOptions = []
        let defaultSelectoption =""

        item.cities.map((ele,i)=>{
          if(i == 0) {
            defaultSelectoption = {'item':`${ele.cityname}`, 'link': `/${ele.cityslug}`}
          } else {
            selectOptions.push(
              {'item':`${ele.cityname}`, 'link': `/${ele.cityslug}`}
            )
          }
        } 
        )
      
        return(<SectionBox key={item.countryname}>
          <HeadSection titleSection={item.countryname} slug={item.countryslug} linksite={item.website} linkedition 
          // options={
          //   <>
          //   <Select defaultValue={defaultSelectoption} options={selectOptions} />
          //   </>
          // } 
          colorBullet={'green'} 
          data={item}
          pretext={'Hoy en: '}
          />

          <SlideCarouselCountry cities={item.cities} widthItem={250}/>

        </SectionBox>)


        });

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
