import ESflag from '@/public/img/flags/ES@3x.png'
import FRflag from '@/public/img/flags/FR@3x.png'
import NEflag from '@/public/img/flags/NE@3x.png'
import PTflag from '@/public/img/flags/PT@3x.png'
import USflag from '@/public/img/flags/US@3x.png'

const configSite = {
    "introText": {
        "title":"¡Bienvenido a Read Metro! ",
        "subtitle":"Aquí encontrarás tus ediciones diarias de todos los Publimetro del mundo. ",
        "excerpt":"Enterate de que ocurre en el mundo un día como hoy...",
        "link":"",
        "logo":"",
    },
    "routeCountry": [
        {
            "link":"/es/mundo",
            "slug": "mundo",
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
        },
        {
            "link": "/es/usa",
            "slug": "usa",
            "name": "Estados Unidos",
            "externalLink": "https://www.metroworldnews.com/"
        },
        {
            "link": "/es/guatemala",
            "slug": "guatemala",
            "name": "Guatemala",
            "externalLink": "https://www.publinews.gt/"
        },
        {
            "link": "/es/puerto-rico",
            "slug": "puerto-rico",
            "name": "Puerto Rico",
            "externalLink": "https://www.metro.pr/"
        },
        {
            "link": "/es/italy",
            "slug": "italy",
            "name": "Italy",
            "externalLink": "https://metronews.it/"
        },
        {
            "link": "/es/russia",
            "slug": "russia",
            "name": "Russia",
            "externalLink": "https://www.metronews.ru/"
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

