import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'
import Image from 'next/image'


function EdicionLanding(args) {
  const router = useRouter()
  const {lang,pais,ciudad,edicion} = router.query




  let listado = [];
  for (var i = 1; i <= args.edition.pages; i++) {

    listado.push(
    <li key={$i} style={{ listStyle:'none',position: 'relative', float: 'left', border: 'solid 1px', paddingTop:'10px', margin: '5px' }}>
      <Link href={`/${lang}/${pais}/${ciudad}/${edicion}/${i}`}>
        <a>
          <Image alt={`${ciudad} ${args.edition.date} Pagina:${i}`} src={`https://rm.metrolatam.com/${args.edition.date.replaceAll("-","/")}/${ciudad}/thumb_${i}-${args.edition.newcode}.webp`} />
          <div style={{ position: 'absolute', left: '160px', top: '-4px' }}> Página {i}</div>
        </a>
      </Link>
    </li>);

  }
  return (
    <>

      <Header />
      <Link href={`/${lang}/${pais}/${ciudad}`}>
        <a>Volver</a>
      </Link>
      <h2>Idioma: {lang}</h2>
      <h2>Pais: {pais}</h2>
      <h2>Ciudad: {ciudad}</h2>
      <h2>Edición: {edicion}</h2>
      <p>Esta es la home del pais, ciudad y edición en su idioma correspondiente.</p>
      <p><b>URL de ejemplo en readmetro:  https://www.readmetro.com/en/chile/santiago/20220905/</b></p>
      <hr/>
      <p>Seleccióne la fecha de la edición:</p>
      <ul>

        {listado}


      </ul>
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
        console.log("URL Detectada =>",`/es/${country.countryslug}/${city.cityslug}/${edicion}`);
        console.log("URL Detectada =>",`/en/${country.countryslug}/${city.cityslug}/${edicion}`);
        paths.push( { params: { id: `/es/${country.countryslug}/${city.cityslug}/${edicion}`, pais: country.countryslug, ciudad: city.cityslug, edicion: edicion, lang: 'es' } } );
        paths.push( { params: { id: `/en/${country.countryslug}/${city.cityslug}/${edicion}`, pais: country.countryslug, ciudad: city.cityslug, edicion: edicion, lang: 'en' } } );
      }));

    }))

  }))


  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(args) {



  const response = await fetch(
      `https://api.readmetro.com/${args.params.pais}/${args.params.ciudad}/${args.params.edicion}.json`);

  const edition = await response.json();

  return {
    props: { edition },
  }
}

export default EdicionLanding
