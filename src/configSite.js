import ESflag from '@/public/img/flags/ES@3x.png'
import FRflag from '@/public/img/flags/FR@3x.png'
import NEflag from '@/public/img/flags/NE@3x.png'
import PTflag from '@/public/img/flags/PT@3x.png'
import USflag from '@/public/img/flags/US@3x.png'

const configSite = {
    "routeCountry": [
        {
            "link":"/",
            "slug": "/",
            "name": "Mundo",
            "externalLink": "/"
        },
        {
            "link":"/es/chile",
            "slug": "chile",
            "name": "Chile",
            "externalLink": "https://www.publimetro.cl/"
        },
        {
            "link": "/es/colombia",
            "slug": "colombia",
            "name": "Colombia",
            "externalLink": "https://www.publimetro.co/"
        }, 
        {
            "link": "/es/ecuador",
            "slug": "ecuador",
            "name": "Ecuador",
            "externalLink": "https://www.metroecuador.com.ec/"
        },
         {
            "link": "/es/brazil",
            "slug": "brazil",
            "name": "Brazil",
            "externalLink": "https://www.metroworldnews.com.br/"
        },
        {
            "link": "/es/canada",
            "slug": "canada",
            "name": "Canada",
            "externalLink": "https://journalmetro.com/"
        },
        {
            "link": "/es/mexico",
            "slug": "mexico",
            "name": "México",
            "externalLink": "https://www.publimetro.com.mx/"
        },
        {
            "link": "/es/peru",
            "slug": "peru",
            "name": "Perú",
            "externalLink": "https://www.publimetro.pe/"
        } 
    ],
    "langOptions": [
        {
            "flagUrl":ESflag,
            "slug":"ES",
            "name": "Español"
        },
        {
            "flagUrl":FRflag,
            "slug":"FR",
            "name": "Frances"
        },
        {
            "flagUrl":NEflag,
            "slug":"NE",
            "name": "Nederlans"
        },
        {
            "flagUrl":PTflag,
            "slug":"PT",
            "name": "Portugues"
        },
        {
            "flagUrl":USflag,
            "slug":"EN",
            "name": "English"
        }

    ]
}

export default configSite

