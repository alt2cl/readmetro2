import React from 'react';
import { useState,  useEffect } from "react";
import Image from 'next/image';
import SectionBox from '@/components/Layout/sectionBox'
import HeadSection from '@/components/UI/Molecula/headSection'
import Dialogmodal from '@/components/UI/Molecula/Dialogmodal'
import SlideCarouselCountry from '@/components/UI/Organismo/SlideCarouselCountry'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import NewspaperBox from '@/components/UI/Organismo/NewspaperBox'
import Box from '@mui/material/Box';
import HeadSeo from '@/components/Layout/headSeo'
import siteMetadata from '@/src/siteMetadata'
//import { updateDialogSlice, closeDialog } from '@/redux/features/dialog/dialogSlice/'


function Landing(props) {

  const data = props.data

  const router = useRouter()

  console.log('la data___',router)

   

  
  const lang = router.query.lang
  const country = router.query.country[0]
  const city = router.query.country[1]
  const edition = router.query.country[2]
  const date = router.query.country[2]
  const page = router.query.country[3]
  //return false
  //const {slug} = router.query || []
  //const [lang, country, city, edition, page] = slug
  const routervalues = { lang: lang, country: country, city:city, edition:edition, page:page}
  const widthItem = 250
  const [imageError, setImageError] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const [titlehead, setTitleHead] = useState('')



  const dispatch = useDispatch();
  //dispatch(updateCountrySlice({countryName:country}))
  const dialogState = useSelector(state => state.dialog.open)
  const dialogImagesArrayState = useSelector(state => state.dialog.imagesvalues.arrayimages)
  const dialogPaginaArrayState = useSelector(state => state.dialog.imagesvalues.pagina)
  const dialogFechaArrayState = useSelector(state => state.dialog.imagesvalues.fecha)
  const dialogEdicionArrayState = useSelector(state => state.dialog.imagesvalues.edicion)
  const metatagsTitleState = useSelector(state => state.metatags.title)
  //console.log('dialogImagesArrayState', dialogImagesArrayState)
  //console.log('estado openModal', dialogState)

  //console.log('router values:', lang, country)

    const handleCloseModal = () => {
      console.log('router values: click modal')
      router.push(`/${lang}/${country}`)
      //dispatch(closeDialog())
      //router.back();
    };

 

    const listsections = data.cities.map((item, i) => {
      let selectOptions = []
      let todayEdition = item.allEditions ? item.allEditions[0] : null;
      const date = todayEdition && todayEdition.date ? todayEdition.date : null;
      const fecha = date != null ? date.replaceAll("-","/") : null;
      const slug = item.cityslug;
      const cantPages = todayEdition && todayEdition.pages;
      const imagenes = [];
      const bigimages = [];

      

        for (let index = 1; index < cantPages; index++) {
            imagenes.push(
                {
                foto:`https://rm.metrolatam.com/${fecha}/${slug}/thumb_${index}-${todayEdition.newcode}.webp`,
                link: `google.com`
                }
            )
        }

        const dataSlidePostCountry = imagenes.map((item, i) => {
            return (
                //imagenes a cargar en el carrusel
                <>
                <Box key={`section-${i}`}>
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

                </Box>
                    
            </>
            )
        })

        for (let index = 1; index < cantPages; index++) {
          bigimages.push(
              {
              foto:`https://rm.metrolatam.com/${fecha}/${slug}/full_${index}-${todayEdition.newcode}.webp`,
              link: `google.com`,
              recortes: item.allEditions.length > 0 && item.allEditions[0].recortes ? item.allEditions[0].recortes : null,
              }
          )
        }


        // if(city != null && edition != null && page != null) {
        //   dispatch(updateDialogSlice({
        //     arrayimages: bigimages,
        //     pagina: i + 1,
        //     fecha: item.allEditions[0].date.replaceAll('-',''),
        //     edicion: item.cityslug,
        //     recortes: item.allEditions[0].recortes.length > 0 ? item.allEditions[0].recortes : [],
        //   }))
        //   dispatch(openDialog())
      
        // }

      return(
        <SectionBox key={item.cityslug} >
          <HeadSection titleSection={item.cityname} slug={item.cityslug} colorBullet={"#ccc"} linksite={data.website} routervalues={routervalues}/>
          {item.allEditions.length > 0 &&  
          <SlideCarouselCountry 
          todayEdition={item.allEditions[0]} 
          widthItem={widthItem} 
          content={dataSlidePostCountry} 
          bigimages={bigimages} 
          data={item}
          />
          }
        </SectionBox>
      )

    })

    // const newspages = dialogImagesArrayState.map((item, i)=>{
    //   return(
    //     <NewspaperBox foto={item.foto} width={1354} height={1500} link={item.link} key={`news-${i}`} />
    //   )
    // })

    useEffect(()=>{
        //console.log('ciudad:', city, 'edition:',edition, 'page:', page)

      if(page != undefined && edition != undefined && city != undefined ){
        setOpenModal(true)
      } else {
        setOpenModal(false)
      }

      // if(country != undefined) {
      //   setTitleHead(`Title country ${country}`)
      // }
    
      // if(country != undefined && city != undefined ) {
      //   setTitleHead(`Title ciudad ${city}`)
      // }

    })

  return (
    <>
      <HeadSeo
          title={
            page ?  `ReadMetro - Página ${page}. Edición ${edition}. ${city}, ${country}` : 
            page == undefined && edition ? `ReadMetro - Edición ${edition}. ${city}, ${country}` :
            edition == undefined && city ? `ReadMetro - Edición ${city}, ${country}` :
            city == undefined && country ? `ReadMetro - ${country}` :
            'Readmetro'
          }
          description={`Description country`}
          canonicalUrl={siteMetadata.siteUrl}
          ogTwitterImage={siteMetadata.siteLogoSquare}
          ogType={"article"}
      />
     
      <h6>Idioma: {lang}</h6>
      <h6>Pais: {country}</h6>
      <h6>Ciudad: {city}</h6>
      <h6>Edicion: {edition}</h6>
      <h6>Pagina: {page}</h6>

      

 
        {data ? listsections : 'Cargando'}
     
        <Dialogmodal openModal={openModal} onCloseModal={()=>handleCloseModal()}>
            <h3>Modal de dialogo...</h3>
            {dialogImagesArrayState.map((item, i)=>(
                <NewspaperBox 
                foto={item.foto} 
                width={1354} 
                height={1500} 
                link={item.link} 
                key={`newspaper-${i}`} 
                pagina={i+1}
                audioContents={item.recortes}
                />
            ))}

        </Dialogmodal>
    </>
  )
}



export async function getServerSideProps({ params }) {

  console.log('paramc:', params)

  // Fetch data from external API
  const res = await fetch(`https://api.readmetro.com/${params.country[0]}/index.json`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: {
    data
  }}
}

// export const getStaticPaths = async (context) => {
//   //const countries = ['chile', 'brasil', 'mexico', 'argentina']
  
//     console.log( '////el context:', context.params)
//     const res = await fetch('https://api.readmetro.com/country.json')
//     const data = await res.json();
//     const paths = data.map(({countryslug}) => ({params: { country: [`${countryslug}`] }}));


//     return {
//       paths,
//       fallback: 'blocking',
//     };
  
//   // try {
//   //   const res = await fetch('https://api.readmetro.com/country.json')
//   //   const data = await res.json();
//   //   const paths = data.map(({countryslug}) => ({params: { country: [`${countryslug}`] }}));
    
    
//   //   console.log('el B:', data)
//   //   //const a = data.map(({countryslug}) => ({params: { country: [`${countryslug}`] }}));
    

    

//   //   //const country = ['chile', 'brasil', 'mexico', 'argentina']
//   //   //const lang = ['es', 'en']

//   //   // const paths = [
//   //   //   ['lang','country','city','date','page'],
//   //   // ]

   
//   //   //   const paths = [
//   //   //     {
//   //   //       params: { country: [] },
//   //   //     },
//   //   //     // {
//   //   //     //   params: { country: ["lang"] },
//   //   //     // },
//   //   //     // {
//   //   //     //   params: { country: ["lang", "country"] },
//   //   //     // },
//   //   //     // {
//   //   //     //   params: { country: ["lang", "country", "city"] },
//   //   //     // },
//   //   //     // {
//   //   //     //   params: { country: ["lang", "country", "city", "date"] },
//   //   //     // },
//   //   //     // {
//   //   //     //   params: { country: ["lang", "country", "city", "date", "page"] },
//   //   //     // },
      
//   //   // ]

//   //   //console.log('el C:', params, paths)
//   //   return {
//   //     paths,
//   //     fallback: true,
//   //   };
//   // } catch (error) {
//   //   console.log(error)
//   // }
// }

// export async function getStaticProps({params}) {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   //console.log('paramxxxx:', params.country[1])
//   const res = await fetch(`https://api.readmetro.com/${params.country[1]}/index.json`)
//   const data = await res.json()

//   return {
//     props: {
//       data,
//       country: params.country
//     },
//     revalidate: 10,
   
//   }
// }








export default Landing