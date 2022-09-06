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
export async function getServerSideProps(context) {
  return {
    props: {},
  }
}

export default PaginaLanding
