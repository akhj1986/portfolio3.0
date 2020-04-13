import React, { useState, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import logo from 'assets/logo2.png'
import { animated, useSpring } from 'react-spring'

interface BannerProps {
    bannerOn: boolean
}

const Banner = styled.div<BannerProps>`
    display: flex;
    align-items: center;
    background-image: radial-gradient(
        circle at 90% 5%,
        rgba(255, 255, 255, 1) 0%,
        rgba(55, 204, 184, 1) 40%,
        rgba(55, 150, 204, 1) 100%
    );
    background-position: right top;
    opacity: ${(props) => (props.bannerOn ? 1 : 0.5)};
    flex: 1 1 auto;
    height: 100vh;
    width: 100vw;
    transition: opacity 2s;
    overflow: hidden;
`

interface LogoContainerProps {
    bannerOn: boolean
}

const LogoContainer = styled.div<LogoContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &:hover {
        cursor: pointer;
    }
`

interface Headers {
    shrink?: boolean
}

const Header1 = styled.h1<Headers>`
    color: ${(props) => props.theme.colorWhite};
    font-variant: small-caps;
    font-size: ${(props) => (props.shrink ? '0.9rem' : '1.3rem')};
    letter-spacing: 2px;
    margin-bottom: 10px;
    margin-right: 30px;
    @media (min-width: 450px) {
        font-size: ${(props) => (props.shrink ? '1.1rem' : '2rem')};
    }
`

const Header2 = styled.h2<Headers>`
    color: ${(props) => props.theme.colorWhite};
    font-size: ${(props) => (props.shrink ? '0.6rem' : '0.9rem')};
    letter-spacing: 1px;
    margin-bottom: 5px;
    @media (min-width: 450px) {
        font-size: ${(props) => (props.shrink ? '0.8rem' : '1.2rem')};
    }
`

const useWindowDimensions: () => [number, number] = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const updateValue: () => void = () => {
            setWindowHeight(window.innerHeight)
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', updateValue)

        return () => {
            window.removeEventListener('resize', updateValue)
        }
    })

    return [windowWidth, windowHeight]
}

const Header: React.FC = () => {
    const [logoOn, setLogoOn] = useState(false)
    const [bannerOn, setBannerOn] = useState(true)
    const [windowWidth, windowHeight] = useWindowDimensions()
    const logoPosition = windowHeight / 2

    useEffect(() => {
        setTimeout(() => {
            setLogoOn(true)
        }, 100)
    })

    const offsetLeft: () => number = () => {
        if (windowWidth < 375) {
            return 20
        }
        if (windowWidth < 450) {
            return 40
        }

        return 60
    }

    const logoStyles = useSpring({
        opacity: logoOn ? '0.8' : '0',
        position: 'absolute',
        bottom: bannerOn ? `${logoPosition}px` : `20px`,
        left: bannerOn ? `${offsetLeft()}px` : `${offsetLeft()}px`,
        borderRadius: '50%',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        height: bannerOn ? '200px' : '70px',
        width: bannerOn ? '200px' : '70px',
    })

    const bannerStyles = useSpring({
        position: 'absolute',
        top: bannerOn ? '0px' : `${windowHeight * -1 + 110}px`,
    })

    const imgStyles = useSpring({
        width: bannerOn ? '170px' : '60px',
        marginLeft: bannerOn ? '-10px' : '0px',
    })

    const bigTitleStyles = useSpring({
        position: 'absolute',
        bottom: bannerOn ? `${logoPosition - 80}px` : '25px',
        left: bannerOn ? `${offsetLeft() + 20}px` : '-600px',
        opacity: logoOn ? '0.8' : '0',
    })
    const smallTitleStyles = useSpring({
        position: 'absolute',
        bottom: bannerOn ? `${logoPosition - 100}px` : '25px',
        left: bannerOn ? '3000px' : `${offsetLeft() + 70}px`,
        opacity: logoOn ? '0.8' : '0',
    })

    const hideBanner: () => void = () => {
        setBannerOn(!bannerOn)
    }

    return (
        <animated.div style={{ ...bannerStyles, overflow: 'hidden' }}>
            <Banner bannerOn={bannerOn}>
                <animated.div style={logoStyles}>
                    <LogoContainer bannerOn={bannerOn} onClick={hideBanner}>
                        <animated.img src={logo} alt="AH" style={imgStyles} />
                    </LogoContainer>
                </animated.div>
                <animated.div
                    style={{
                        ...bigTitleStyles,
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                        minWidth: '275px',
                    }}
                >
                    <Header1>Alex Harris-Jedamski</Header1>
                    <Header2>Front-End Developer</Header2>
                </animated.div>
                <animated.div
                    style={{
                        ...smallTitleStyles,
                        display: 'flex',
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                        minWidth: '205px',
                    }}
                >
                    <Header1 shrink={true}>Alex Harris-Jedamski</Header1>
                    <Header2 shrink={true}>Front-End Developer</Header2>
                </animated.div>
            </Banner>
        </animated.div>
    )
}

export default Header
