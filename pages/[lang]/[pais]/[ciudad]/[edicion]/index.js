import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'

function EdicionLanding() {
  const router = useRouter()
  const {lang,pais,ciudad,edicion} = router.query

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
        <li>
          <Link href={`/${lang}/${pais}/${ciudad}/${edicion}/1`}>
            <a>Página 1</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/${pais}/${ciudad}/${edicion}/2`}>
            <a>Página 2</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/${pais}/${ciudad}/${edicion}/3`}>
            <a>Página 3</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/${pais}/${ciudad}/${edicion}/4`}>
            <a>Página 4</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/${pais}/${ciudad}/${edicion}/5`}>
            <a>Página 5</a>
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

export default EdicionLanding
