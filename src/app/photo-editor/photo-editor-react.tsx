import {
  CustomToolbarItemProps,
  AdvancedUIToolbarItem,
} from "demo-vai/no-polyfills";
import React from "react";
import styled, { css } from "styled-components";

export default async function generateToolbarItems() {

  
  const Item = styled(AdvancedUIToolbarItem)`
    height: 48px;
    width: 48px;
    margin: 4px;
    * button {
      border-radius: 50%;
      background: transparent;
      color: ${(props) => props.theme.foreground};
    }
    ${(props) => {
      if (props.isActive) {
        return css`
          * button {
            background: #3f3f3f;
          }
        `;
      }
      return "";
    }}
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 160px;
    cursor: pointer;
    :hover{
      background-color: #1F1F1F60;
    }
  `;

  const Label = styled.div`
    max-width: 100%;
    text-align: start;
    font-size: 12px;
    margin-right: 4px;
    margin-left: 10px;

 
  `;

  
  const ToolbarItem: React.FC<CustomToolbarItemProps> = ({
    label,
    isActive,
    ...props
  }) => {

    return (
      <Container onClick={() => { console.log(props); props.onClick()}}>
        <Item id={label} label={label}  isActive={isActive} {...props} />
        <Label>{label}</Label>
      </Container>
    );
  };



  return ToolbarItem

}
