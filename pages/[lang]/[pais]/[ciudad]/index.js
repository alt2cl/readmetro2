import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'

function CiudadLanding(args) {
  const router = useRouter()
  const {lang,pais,ciudad} = router.query


  return (
    <>
      <Header />
      <Link href={`/${lang}/${pais}`}>
        <a>Volver</a>
      </Link>
      <h2>Idioma: {lang}</h2>
      <h2>Pais: {pais}</h2>
      <h2>Ciudad: {ciudad}</h2>
      <p>Esta es la home del pais y la ciudad en su idioma correspondiente</p>
      <p><b>URL de ejemplo en readmetro:  https://www.readmetro.com/en/chile/santiago/</b></p>
      <hr/>
      <p>Seleccióne la fecha de la edición:</p>
      <ul>
        {args.country.allEditions.map((_, i)=><li key={i}><Link href={`/${lang}/${pais}/${ciudad}/${_.date.replaceAll("-","")}`}><a>{_.date}</a></Link></li>)}
      </ul>
    </>
  )
}
export async function getStaticPaths(context) {

  const response = await fetch(
      'https://api.readmetro.com/country.json');

  const data = await response.json();

  let paths = [];

  const pathsEn = data.map(function (country) {
    return country.cities.map(function (city) {
        paths.push( { params: { id: `/es/${country.countryslug}/${city.cityslug}`, pais: country.countryslug, ciudad: city.cityslug, lang: 'es' } } );
        paths.push( { params: { id: `/en/${country.countryslug}/${city.cityslug}`, pais: country.countryslug, ciudad: city.cityslug, lang: 'en' } } );
    });
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(args) {

  const fullResponse = await fetch(`https://api.readmetro.com/${args.params.pais}/${args.params.ciudad}/full.json`);
  const country = await fullResponse.json();


  return {
    props: { country },
  }
}

export default CiudadLanding
