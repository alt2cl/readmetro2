import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'

function IdiomaLanding(ssrData) {

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
        <li>
          <Link href={`/${lang}/chile`}>
            <a>Chile</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/mexico`}>
            <a>Mexico</a>
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

export default IdiomaLanding
