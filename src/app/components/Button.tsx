import React from 'react';
import styled from "styled-components";
import Spinner from "./Spinner";

type Props = React.ButtonHTMLAttributes<any> & {
    styleType?: 'primary' | 'secondary';
    showSpinner?: boolean;
}

const StyledButton = styled.button<{ styleType?: 'primary' | 'secondary' }>`
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background: ${({styleType}) => styleType === 'primary' ? 'gray' : 'white'};
  box-shadow: 0 0.5px 1px 0 rgba(0, 0, 0, 0.5);
  height: 25px;
  width: 200px;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button: React.FC<Props> = ({onClick, title, type, showSpinner, ...rest}) => {
    return (
        <StyledButton onClick={onClick} type={type} {...rest}>
            <TitleWrapper>
                {showSpinner && <Spinner/>}
                {title && !showSpinner && <div>{title}</div>}
            </TitleWrapper>
        </StyledButton>
    );
};

export default Button;
