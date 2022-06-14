import React from 'react';
import styled from "styled-components";
import TenantForm from "./app/feature/TenantForm/TenantForm";

const AppWrapper = styled.div`
 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;`

function App() {
    return (
        <AppWrapper>
            <TenantForm/>
        </AppWrapper>
    )
}

export default App;
