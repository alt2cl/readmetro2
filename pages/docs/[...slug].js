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
import { updateDialogSlice, closeDialog } from '@/redux/features/dialog/dialogSlice/'


function Landing({data}) {

  const router = useRouter()
  const {slug} = router.query || []
  const [lang, country, city, edition, page] = slug
  const routervalues = { lang: lang, country: country, city:city, edition:edition, page:page}
  const widthItem = 250
  const [imageError, setImageError] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch();
  //dispatch(updateCountrySlice({countryName:country}))
  const dialogState = useSelector(state => state.dialog.open)
  const dialogImagesArrayState = useSelector(state => state.dialog.imagesvalues.arrayimages)
  const dialogPaginaArrayState = useSelector(state => state.dialog.imagesvalues.pagina)
  const dialogFechaArrayState = useSelector(state => state.dialog.imagesvalues.fecha)
  const dialogEdicionArrayState = useSelector(state => state.dialog.imagesvalues.edicion)

  //console.log('dialogImagesArrayState', dialogImagesArrayState)
  console.log('estado openModal', dialogState)

    const handleCloseModal = () => {
      router.push(`/docs/${lang}/${country}`)
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

      //console.log('todayEdition>>>>', item)
      //const [bigImages, setBigImages] =useState([])

      

      //console.log('value item', item.allEditions[0].recortes)

      // if(i == 0) {
      //   defaultSelectoption = {'item':`${item.cityname}`, 'link': `/${item.cityslug}`}
      // } else {
      //   selectOptions.push(
      //     {'item':`${item.cityname}`, 'link': `/${item.cityslug}`}
      //   )
      // }

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
        console.log('ciudad:', city, 'edition:',edition, 'page:', page)

      if(page != undefined && edition != undefined && city != undefined ){
        setOpenModal(true)
      } else {
        setOpenModal(false)
      }

    })

  return (
    <>
      <h6>Idioma: {lang}</h6>
      <h6>Pais: {country}</h6>
      <h6>Ciudad: {city}</h6>
      <h6>Edicion: {edition}</h6>
      <h6>Pagina: {page}</h6>

      

 
        {listsections}
     
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
  const pais = params.slug[1]

  

  // Fetch data from external API
  const res = await fetch(`https://api.readmetro.com/${pais}/index.json`)
  const data = await res.json()

  console.log('el slug pais', pais)

  // Pass data to the page via props
  return { props: {
    data
  } }
}

// export async function getStaticPaths(context){
//   //console.log('el contest:', slug)
//   try {
//     // const res = await fetch('https://api.readmetro.com/country.json');
//     // const data = await res.json();
//     // const paths = data.map(({countryslug}) => ({params: { slug: `${countryslug}`, lang:'es' }}));

//     return {
//       paths: [
//         { params: { slug: ["lang", "country", "city", "edition", "page"] } },
//       ],
//       //paths,
//       // paths: [
//       //   { params: { lang: slug[0] }},
//       //   {
//       //     params: { country: slug[1] },
//       //     // with i18n configured the locale for the path can be returned as well
//       //     //locale: "en",
//       //   },
//       //   { params: { city: slug[2] }},
//       //   { params: { edition: slug[3] }},
//       //   { params: { page: slug[4] }},
//       // ],
//       fallback: false,
//     };
//   } catch (error) {
//     console.log(error)
//   }
// }


// export async function getStaticProps({params, locales}) {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   console.log('parameatrosXXXX',params)
//   // const res = await fetch(`https://api.readmetro.com/${params.slug[1]}/index.json`);
//   // const country = await res.json()

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       //country,
//     }
   
//   }
// }

// export async function getStaticProps(context) {
//   console.log('parametros:', context)
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

export default Landing