import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'

export default function PostPageLang() {
  const router = useRouter()
  const {lang} = router.query

  return (
    <>
      <Header />
      <h1>Post: {lang}</h1>
      <ul>
        <li>
          <Link href={`/${lang}/chile`}>
            <a>First comment</a>
          </Link>
        </li>
        <li>
          <Link href={`/${lang}/chile`}>
            <a>Second comment</a>
          </Link>
        </li>
      </ul>
    </>
  )
}