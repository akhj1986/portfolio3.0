import React from 'react'
import Wrapper from 'components/Wrapper'
import Header from 'components/Header'
import { ThemeProvider } from 'styled-components'

const theme: object = {
    primaryFont: '#3C3C3C',
    colorWhite: '#ffffff',
    fontFamily: 'Oxygen, sans-serif;',
}

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Wrapper>
                <Header />
            </Wrapper>
        </ThemeProvider>
    )
}

export default App
