function AudioPLayer(ruta,id,pagina,numaudio, title, play, pausa, next) {

    const audioElement = 
    <audio id={id} controls>
        <source src={ruta} type="audio/mpeg" />
    </audio>



    return(
        <>
        {audioElement}
        </>
    )

    
}

export default AudioPLayer;