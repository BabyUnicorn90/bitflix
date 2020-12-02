import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  text-align: center;
  height: 50px;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const StyledLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 라우터에 의해 component가 교체되면 Header에 변화 주기 (탭 아래 파란색밑줄)
// 어떤 라우터로 이동하는지 알아야 하므로 withRouter 用
// unpacking 한번에 하기:
// ex. const obj = {a:{b:'c'}, d:{e:'f'}}
//     const {a:{b}} = obj
//     b <-- c
// 즉 withRouter의 props부분에서 {location:{pathname}} 한 것과
// const {location:{pathname}} = props; 는 같은 문법
export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <StyledLink to="/">Movies</StyledLink>
      </Item>
      <Item current={pathname === "/tv"}>
        <StyledLink to="/tv">TV</StyledLink>
      </Item>
      <Item current={pathname === "/search"}>
        <StyledLink to="/search">Search</StyledLink>
      </Item>
    </List>
  </Header>
));
