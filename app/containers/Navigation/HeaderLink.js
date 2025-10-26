import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  background: white;
  border: 2px solid #41addd;
  border-radius: 4px;
  color: #41addd;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 1em;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: ${props => (props.$hasTopMargin ? `1em` : `0`)};
  outline: 0;
  padding: 0.25em 2em;
  text-decoration: none;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;

  &:active {
    background: #41addd;
    color: #fff;
  }
`;
