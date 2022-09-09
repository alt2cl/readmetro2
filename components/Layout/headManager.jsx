import React from 'react';
import { useState,  useEffect } from "react";
import { useSelector } from 'react-redux';

function HeadManager(){

    const stateMetaTitle = useSelector(state => state.metatags.title)


    return (
        <>
        <title>{stateMetaTitle}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"></link>
        </>
    )

}

export default HeadManager