import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Image from 'next/image';
import Grid from '@mui/material/Grid';

//https://www.npmjs.com/package/react-material-ui-carousel

export default function CarouselComponent(props)
{
    var items = [
        {
            country:'Mexico',
            name:'Publimetro Mexico',
            date: '16/09/2022',
            link: '',
            ediciones: [
                {
                    name: "Ciudad de México 01",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2022/08/05/publimetro/thumb_1-68909a8ee41bd2b32b3d53fe1e245750.webp',
                    link: 'https://www.readmetro.com/en/mexico/publimetro/20220805/',
                },
                {
                    name: "Quintana Roo 02",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2018/08/24/qroo/thumb_1-b7fca1d475b5500357da91fe11ddd51b.webp',
                    link: 'https://www.readmetro.com/en/mexico/qroo/20180824/',
                },
                {
                    name: "Ciudad de México 03",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2022/08/05/publimetro/thumb_1-68909a8ee41bd2b32b3d53fe1e245750.webp',
                    link: 'https://www.readmetro.com/en/mexico/publimetro/20220805/',
                },
                {
                    name: "Quintana Roo 04",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2018/08/24/qroo/thumb_1-b7fca1d475b5500357da91fe11ddd51b.webp',
                    link: 'https://www.readmetro.com/en/mexico/qroo/20180824/',
                },
                {
                    name: "Ciudad de México 05",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2022/08/05/publimetro/thumb_1-68909a8ee41bd2b32b3d53fe1e245750.webp',
                    link: 'https://www.readmetro.com/en/mexico/publimetro/20220805/',
                },
                {
                    name: "Quintana Roo 06",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2018/08/24/qroo/thumb_1-b7fca1d475b5500357da91fe11ddd51b.webp',
                    link: 'https://www.readmetro.com/en/mexico/qroo/20180824/',
                },
                {
                    name: "Quintana Roo 07",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2018/08/24/qroo/thumb_1-b7fca1d475b5500357da91fe11ddd51b.webp',
                    link: 'https://www.readmetro.com/en/mexico/qroo/20180824/',
                },
                {
                    name: "Ciudad de México 08",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2022/08/05/publimetro/thumb_1-68909a8ee41bd2b32b3d53fe1e245750.webp',
                    link: 'https://www.readmetro.com/en/mexico/publimetro/20220805/',
                },
                {
                    name: "Quintana Roo 09",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2018/08/24/qroo/thumb_1-b7fca1d475b5500357da91fe11ddd51b.webp',
                    link: 'https://www.readmetro.com/en/mexico/qroo/20180824/',
                }
            ]
        },
        {
            country:'Chile',
            name:'Publimetro Chile',
            date: '16/09/2022',
            link: '',
            ediciones: [
                {
                    name: "Santiago",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2022/08/05/publimetro/thumb_1-68909a8ee41bd2b32b3d53fe1e245750.webp',
                    link: 'https://www.readmetro.com/en/mexico/publimetro/20220805/',
                },
                {
                    name: "Nueva Mujer",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2018/08/24/qroo/thumb_1-b7fca1d475b5500357da91fe11ddd51b.webp',
                    link: 'https://www.readmetro.com/en/mexico/qroo/20180824/',
                },
                {
                    name: "Ciudad de México",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2022/08/05/publimetro/thumb_1-68909a8ee41bd2b32b3d53fe1e245750.webp',
                    link: 'https://www.readmetro.com/en/mexico/publimetro/20220805/',
                },
                {
                    name: "Quintana Roo",
                    description: "Probably the most random thing you have ever seen!",
                    image: 'https://rm.metrolatam.com/2018/08/24/qroo/thumb_1-b7fca1d475b5500357da91fe11ddd51b.webp',
                    link: 'https://www.readmetro.com/en/mexico/qroo/20180824/',
                }
            ]
        }
        
    ]

    return (
        <Carousel 
        autoPlay={false}
        animation="slide"
        height= {380}
        >
            {
                // <Item item={items[0].ediciones} cantviews={4} /> 
                item(items[0].ediciones, 4)
            }
        </Carousel>
    )
}

function item(item, cantviews)
{   
    let child = []
    let parent = []
    let counterslide = 0

    let nslides = Math.ceil(item.length / cantviews)

    //console.log('nslides', nslides)

      for (let i = 0; i < item.length; i++) {
        let data = item
       
        child.push((
        <Grid item xs={3}>
            <Paper>
                <h2>{data[i].name}</h2>
                <p>{data[i].description}</p>
                <Image src={data[i].image} width="120" height="200" alt={data[i].name} priority={i == 0 ? true : false}/>
                <Button className="CheckButton">
                    Check it out! {i}
                </Button>
            </Paper>
        </Grid>

        ))
        //if(i > 0 && (i % props.cantviews) == 0){
        if(child.length == cantviews){
            counterslide ++
            parent.push((
                <Grid container >
                    {child}
                   
                </Grid>
            ))
            child = []
        } else if (child.length < cantviews && (nslides - counterslide) == 1 ){
            parent.push((
                <Grid container >
                    {child}
                   
                </Grid>
            ))
        }
    }
    return (
            parent
    )
}