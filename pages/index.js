
import Layout from '@/components/Layout/layout'
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import Select from '@/components/UI/Atomo/Select'
import MoreOptions from '@/components/UI/Atomo/MoreOptions'
import Carousel from '@/components/UI/Organismo/Carousel'
import SlideCarousel from '@/components/UI/Organismo/SlideCarousel'



const widthItemSlide = '80%'


const arrayOptions = [
  {item:'Juan', link: '/link1'}, 
  {item:'Andres', link: '/link2'}
]




export default function Home() {

  return (
     
      <Layout>
        <SectionBox>
          <HeadSection titleSection={"Mexico"} options={
            <>
            <Select defaultValue={'Ciudad de México'} options={[
              {'item':'opcion1', 'link': '/link1'}, 
              {'item':'opcion2', 'link': '/link2'}]} />
              <MoreOptions options={arrayOptions} />
            </>
            
          } colorBullet={"#ccc"} />

          <Carousel />

        </SectionBox>
        <SectionBox>
          <HeadSection titleSection={"Chile"}  />
          <Carousel />

        </SectionBox>
        <SectionBox>
          <HeadSection titleSection={"Ecuadro"} options={"Opciones"}  colorBullet={'red'}/>

          {/* <Slide onScroll={listenerScroll} direction="right" in={true} mountOnEnter unmountOnExit >
          </Slide> */}

          <SlideCarousel />
             
          

        </SectionBox>


      </Layout>
    

  )
}
