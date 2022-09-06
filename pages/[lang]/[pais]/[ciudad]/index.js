import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'

function CiudadLanding() {
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
        <li>
          <Link href={`/${lang}/${pais}/${ciudad}/20220905`}>
            <a>2022-09-05</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/${pais}/${ciudad}/20220902`}>
            <a>2022-09-02</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/${pais}/${ciudad}/20220901`}>
            <a>2022-09-01</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/${pais}/${ciudad}/20220831`}>
            <a>2022-08-31</a>
          </Link>
        </li>
      </ul>
    </>
  )
}
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}

export default CiudadLanding
