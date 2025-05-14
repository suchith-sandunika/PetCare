const Topics = ({ main, mainClass, mainStyles, img1, img2, img1Class, img1Styles, img1Alt, img2Alt, img2Class, img2Styles, spanClass, spanText }) => {
    return (
        main === 'h3' ? (
            <h3 className={mainClass} style={mainStyles}>
                <img src={img1} className={img1Class} style={img1Styles} alt={img1Alt}/>
                <span className={spanClass}>{spanText}</span>
                <img src={img2} className={img2Class} style={img2Styles} alt={img2Alt}/>
            </h3>
        ) : (
            <h2 className={mainClass} style={mainStyles}>
                <img src={img1} className={img1Class} style={img1Styles} alt={img1Alt}/>
                <span className={spanClass}>{spanText}</span>
                <img src={img2} className={img2Class} style={img2Styles} alt={img2Alt}/>
            </h2>
        )
    )
}

export default Topics;