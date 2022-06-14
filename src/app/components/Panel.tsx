import React, {ReactNode} from 'react';
import styled from "styled-components";

type Props = { title: string; children: ReactNode };

const Wrapper = styled.div`
  border-radius: 6px;
  border: 2px solid black;
  position: relative;
  padding: 20px 15px;
  margin: 20px 0;
`
const LabelWrapper = styled.div`
  position: absolute;
  left: 20px;
  top: -13px;
  background: white;
  padding: 0 10px;
`

const Panel: React.FC<Props> = ({title, children}) => {
    return (
        <Wrapper>
            <LabelWrapper>{title}</LabelWrapper>
            {children}
        </Wrapper>
    );
};

export default Panel;
