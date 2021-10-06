import styled from "styled-components"
import ListItem from "@material-ui/core/ListItem"

export const HomeWrapper = styled.div`
  width: 75vw;
  height: 90vh;
  display: flex;
  flex-flow: column;
  margin: auto;
  padding: 8px;
`
export const StyledListItem = styled(ListItem)`
  &:hover {
    color: #f50057;
    cursor: pointer;
  },
`