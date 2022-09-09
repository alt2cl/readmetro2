import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'

function CiudadesLanding(data) {

  const router = useRouter()
  const {lang,pais} = router.query

  // console.log("pais",data.country[0]);
  return (
    <>
      <Header />
      <Link href={`/${lang}`}>
        <a>Volver</a>
      </Link>
      <h2>Idioma: {lang}</h2>
      <p>Esta es la home de readmetro en su idioma correspondiente.</p>
      <p><b>URL de ejemplo en readmetro: https://www.readmetro.com/en/</b></p>
      <hr/>
      <p>Seleccióne el pais:</p>
      <ul>
        {data.country[0].cities.map((city) => (
            <li key={city.idrmcity}>
              <Link href={`/${lang}/${pais}/${city.cityslug}`}>
                <a>{city.cityname}</a>
              </Link>
            </li>
        ))}

        <li>
          <Link href={`/${lang}/mexico`}>
            <a>Mexico</a>
          </Link>
        </li>
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
        paths.push( { params: { id: `/es/${country.countryslug}/${city.cityslug}`, pais: country.countryslug, lang: 'es' } } );
        paths.push( { params: { id: `/en/${country.countryslug}/${city.cityslug}`, pais: country.countryslug, lang: 'en' } } );
    });
  });
  
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(args) {

  const response = await fetch(
      'https://api.readmetro.com/country.json');

  const data = await response.json();

  const country = data.filter((country) => {
     return country.countryslug == args.params.pais
  })

  return {
    props: { country },
  }
}

export default CiudadesLanding
