import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/UI/Organismo/Header'

export default function PostPage() {
  const router = useRouter()
  const {country} = router.query

  console.log('lang', country)

  return (
    <>
      <Header />
      <h1>Post: {country}</h1>
      <ul>
        <li>
          <Link href={`/${country}/chile`}>
            <a>First comment</a>
          </Link>
        </li>
        <li>
          <Link href={`/${country}/chile`}>
            <a>Second comment</a>
          </Link>
        </li>
      </ul>
    </>
  )
}