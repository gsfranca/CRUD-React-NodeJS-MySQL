import React from "react";
import axios from "axios"
import styled from "styled-components"
import { FaTrash, FaEdit} from "react-icons/fa" // Icons
import { toast } from "react-toastify"
import { apiRoute } from "../App";

// Table Style
    const Table = styled.table`
        /*Size*/
            width: 100%;
            max-width: 800px;

        /*Background*/
            background-color: white;

        /*Position*/
            padding: 20px;
            margin: 20px auto;

        /*Border*/
            box-shadow: 0px 0px 5px #ccc;
            border-radius: 5px;

        /*Text*/
            word-break: break-all;
    `

// Thead style
    export const Thead = styled.thead``

// Tbody style
    export const Tbody = styled.tbody``

// Tr style
    export const Tr = styled.tr``

// Th style
    export const Th = styled.th`
        /*Text*/
            text-align: start;

        /*Position*/   
            border-bottom: inset;
            padding-bottom: 5px;

        @media (orientation: portrait) 
        {
            ${(props) => props.onlyWeb && "display: none"}
        }
    `

// Td style
    export const Td = styled.td`
        /*Position*/   
          padding-top: 15px;

        /*Text*/
            text-align: ${(props) => (props.alignCenter ? "center" : "start")};

        /*Size*/
            width: ${(props) => (props.width ? props.width : "auto")};

        @media (orientation: portrait) 
        {
            ${(props) => props.onlyWeb && "display: none"}
        }
    `
const Grid = ({ users, setUsers, setOnEdit }) =>
{
    // Edit
        const handleEdit = (item) =>
        {
            setOnEdit(item)
        }        

    // Delete
        const handleDelete = async (id) =>
        {
            await axios
                .delete(apiRoute + id) // Call the DELETE function in the API
                .then(({ data }) => // Data return the text defined in the API (Sucess and Error)
                {
                    const newArray = users.filter((user) => user.id !== id) // Return all users, unless de deleted one (No-Refresh Need)

                    setUsers(newArray)
                    toast.success(data) // Show the sucess message
                })
                .catch(({ data }) => toast.error(data))

            setOnEdit(null)
        }
    return(
        <Table>

            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Fone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>

            <Tbody>
                {users.map(
                (item, i)  => 
                {
                    return(
                        <Tr key={i}>
                            <Td width="30%">{item.nome}</Td>
                            <Td width="30%">{item.email}</Td>
                            <Td width="20%" onlyWeb>{item.fone}</Td>
                            <Td alignCenter width="5%">
                                <FaEdit onClick={() => handleEdit(item)} />
                            </Td>
                            <Td alignCenter width="5%">
                                <FaTrash onClick={() => handleDelete(item.id)} />
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>

        </Table>
    )
}

export default Grid;