import Menu from '@/components/UI/Molecula/Menu/menu';
import Image from 'next/image'
import { Box, Container } from '@mui/system';
import Header from '@/components/UI/Organismo/Header'

function Layout( {children} ) {
    return (
        <>
            <Header />

            <main>
            <Container  maxWidth="xl">
                {children}
            </Container>

            </main>

            <footer>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                Powered by ->{' '}
                <span>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </span>
                </a>
            </footer>

        </>

      );
}

export default Layout;
