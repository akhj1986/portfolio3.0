import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    font-size: 14px;
    color: ${(props) => props.theme.primaryFont};
    font-family: ${(props) => props.theme.fontFamily};
    overflow: hidden;
`

type Props = {
    children: ReactNode
}

const Wrapper: React.FC<Props> = (props) => (
    <Container>{props.children}</Container>
)

export default Wrapper
