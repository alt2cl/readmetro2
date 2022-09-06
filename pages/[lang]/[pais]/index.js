import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'


function PaisLanding({ data }) {
  const router = useRouter()
  const {lang,pais} = router.query

  return (
    <>
      <Header />
      <Link href={`/${lang}`}>
        <a>Volver</a>
      </Link>
      <h2>Idioma: {lang}</h2>
      <h2>Pais: {pais}</h2>
      <p>Esta es la home del pais de readmetro en su idioma correspondiente.</p>
      <p><b>URL de ejemplo en readmetro: https://www.readmetro.com/es/chile/</b></p>
      <hr/>
      <p>Seleccióne la ciudad:</p>
      <ul>
        <li>
          <Link href={`/${lang}/${pais}/santiago`}>
            <a>Santiago</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/${pais}/nuevamujer`}>
            <a>Nueva Mujer</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/${pais}/publimetro`}>
            <a>Mexico City</a>
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

export default PaisLanding
