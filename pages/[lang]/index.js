import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'

function PaisesLanding(data) {

  const router = useRouter()
  const {lang} = router.query

  
  return (
    <>
      <Header />
      <h2>Idioma: {lang}</h2>
      <p>Esta es la home de readmetro en su idioma correspondiente.</p>
      <p><b>URL de ejemplo en readmetro: https://www.readmetro.com/en/</b></p>
      <hr/>
      <p>Seleccióne el pais:</p>
      <ul>
        {data.countries.map((country) => (
            <li key={country.idrmcountry}>
              <Link href={`/${lang}/${country.countryslug}`}>
                <a>{country.countryname}</a>
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
  const pathsEn = data.map((country) => ({
    params: { id: `/en/${country.countryslug}`, lang: 'en' },
  }))
  const pathsEs = data.map((country) => ({
    params: { id: `/es/${country.countryslug}`, lang: 'es' },
  }))
  const paths = pathsEs.concat(pathsEn);
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {


  const response = await fetch(
      'https://api.readmetro.com/country.json');

  const countries = await response.json();

  return {
    props: { countries },
  }
}

export default PaisesLanding
