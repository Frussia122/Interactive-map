import styled from 'styled-components';

export const Wrapper = styled.ul`
  margin-top: 80px;
  padding: 0;
  overflow-y: scroll;
  margin-bottom: 50px;
  height: 700px;
`;
export const Title = styled.h4`
  font-weight: semi-bold;
  margin: 0;
  font-size: 20px;
  color: #333333;
  transition: color 0.2s;
`;

export const PlaceItem = styled.li`
  list-style: none;
  padding: 20px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover ${Title} {
    color: #0052cc;
  }
  &:hover{
    background-color: #e9e9e9;
  }
`;

export const Street = styled.span`
  font-size: 12px;
  margin: 5px 0;
  color: gray;
`;

export const PlaceLink = styled.a`
  margin: 5px 0;
  color: #999999;
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #0077cc;
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }

  &:visited {
    color: purple;
  }
`;

export const HoursInfo = styled.div`
  color: black;
  margin-top: 5px;
  font-size: 12px;
`;
