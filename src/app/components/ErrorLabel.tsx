import React, {ReactNode} from 'react';
import styled from "styled-components";


type Props = {
    children: ReactNode;
};

const ErrorWrapper = styled.div`
  color: red;
  font-size: 10px;
`

const ErrorLabel: React.FC<Props> = ({children}) => {
    return (
        <ErrorWrapper>{children}</ErrorWrapper>
    );
};

export default ErrorLabel;
