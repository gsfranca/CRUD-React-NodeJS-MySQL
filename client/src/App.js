// Personal
  import GlobalStyle from "./styles/global"
  import Form from "./components/Form.js"
  import Grid from "./components/Grid.js"

// Import useState
  import { useEffect, useState } from "react"

// Import AXIOS
  import axios from "axios"
  
// Import Styled-components
  import styled from "styled-components"

// Style for warning popups
  import { toast, ToastContainer} from "react-toastify"
  import "react-toastify/dist/ReactToastify.css"

// Container Style
  const Container = styled.div`

    /*Size*/
      width: 100%;
      max-width: 800px;
    
    /*Position*/  
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

  `
// Container Title
  const Title = styled.h2`
  `

// API ROUTE
  export const apiRoute = "http://localhost:8800/"

function App() 
{
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () =>
  {
    try
    {
      // Await a response from Database
        const res = await axios.get(apiRoute)

      // Set to setUsers and organize in A-Z
        setUsers(res.data.sort((a, b) => (a.nome > b.nome) ? 1 : -1))
    }
    catch (error)
    {
      toast.error(error);
    }
  }

  // Restart evertime you set an user
    useEffect( () => { getUsers() }, [setUsers] )

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
      </Container>

      {/*Configuration*/}
        <GlobalStyle />
        <ToastContainer autoClose={3000} position="bottom-left" />
    </>
  );
}

export default App;
