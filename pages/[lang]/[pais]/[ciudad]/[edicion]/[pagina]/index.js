import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'

function PaginaLanding() {
  const router = useRouter()
  const {lang,pais,ciudad,edicion,pagina} = router.query

  const anio = edicion != undefined ? edicion.substr(0,4) : "no definida";
  const mes = edicion != undefined ? edicion.substr(4,2) : "no definida";
  const dia = edicion != undefined ? edicion.substr(6,2) : "no definida";

  const urlpdf = `https://rm.metrolatam.com/pdf/${anio}/${mes}/${dia}/${edicion}_${ciudad}.pdf#page=${pagina}`;


  return (
    <>
      <Header />
      <Link href={`/${lang}/${pais}/${ciudad}/${edicion}`}>
        <a>Volver</a>
      </Link>
      <h2>Idioma: {lang}</h2>
      <h2>Pais: {pais}</h2>
      <h2>Ciudad: {ciudad}</h2>
      <h2>Edición: {edicion} or {anio}-{mes}-{dia}</h2>
      <h2>Página: {pagina}</h2>
      <p>Esta es la home del pais, ciudad, edición y página en su idioma correspondiente.</p>
      <p><b>URL de ejemplo en readmetro: https://www.readmetro.com/en/chile/santiago/20220905/1/</b></p>
      <h1>Edición: </h1>
      <object data={urlpdf}
        type="application/pdf"
        width="800"
        height="900">
      </object>

    </>
  )
}
export async function getStaticPaths(context) {

  const response = await fetch('https://api.readmetro.com/country.json');
  const data = await response.json();

  let paths = [];

  await Promise.all(data.map(async (country) => {
    await Promise.all(country.cities.map(async (city) => {

      const fullResponse = await fetch(`https://api.readmetro.com/${country.countryslug}/${city.cityslug}/full.json`);
      const fullEditions = await fullResponse.json();
      await Promise.all(fullEditions.allEditions.map(async (edition) => {
        const edicion = edition.date.replaceAll("-","");
        for (var i = 1; i <= edition.pages; i++) {
          paths.push( { params: { id: `/es/${country.countryslug}/${city.cityslug}/${edicion}/${i}`, pais: country.countryslug, ciudad: city.cityslug, edicion: edicion, pagina: String(i), lang: 'es' } } );
          paths.push( { params: { id: `/en/${country.countryslug}/${city.cityslug}/${edicion}/${i}`, pais: country.countryslug, ciudad: city.cityslug, edicion: edicion, pagina: String(i), lang: 'en' } } );
        }

      }));

    }))

  }))



  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(args) {

  // console.log("jano context",`https://api.readmetro.com/${args.params.pais}/${args.params.ciudad}/${args.params.edicion}.json`);

  const response = await fetch(
      `https://api.readmetro.com/${args.params.pais}/${args.params.ciudad}/${args.params.edicion}.json`);

  const edition = await response.json();

  return {
    props: { edition },
  }
}

export default PaginaLanding
