// Imports
    import axios from "axios";
    import React, { useEffect, useRef } from "react";
    import styled from "styled-components"
    import { toast } from "react-toastify";
    import { apiRoute } from "../App";

// Form style
    const FormContainer = styled.form`
        /*Position*/
            display: flex;
            align-items: flex-end;
            gap: 10px;
            flex-wrap: wrap;
            padding: 20px;

        /*Background*/
            background-color: white;
        
        /*Box Shadow*/
            box-shadow: 0px 0px 5px #ccc;

        /*Border*/
            border-radius: 5px;
    `

// InputArea style
    const InputArea = styled.div`
        
        /*Position*/
            display: flex;
            flex-direction: column;
    
    `

// Label style
    const Label = styled.label``

// Input style
    const Input = styled.input`

        /*Size*/   
            width: 120px; 
            height: 40px;

        /*Position*/
            padding: 0 10px;

        /*Border*/
            border: 1px solid #bbb;
            border-radius: 5px;
    `
// Button style
    const Button = styled.button`

        /*Position*/
            padding: 10px;

        /*Mouse*/
            cursor: pointer;

        /*Border*/
            border: none;
            border-radius: 5px;

        /*Background*/
            background-color: #2C73D2;

        /*Text*/
            color: white;

        /*Size*/
            height: 42px;
    `

const Form = ({ getUsers, onEdit, setOnEdit}) =>
{
    const ref = useRef();

    useEffect(() => 
    {
        // If edit funcion was being used, catch the data from the form
            if(onEdit)
            {
                // Ref of the form
                    const user = ref.current

                // Define Value to Inputs
                    user.nome.value = onEdit.nome
                    user.email.value = onEdit.email
                    user.fone.value = onEdit.fone
                    user.data_nascimento.value = onEdit.data_nascimento
            }
    }, [onEdit])

    // Check if is a Edit or a Create
        const handleSubmit = async (e) =>
        {
            // Prevent form of reload the page
                e.preventDefault()
                
            // Ref of the form
                const user = ref.current

            // Verify if the user filled in all inputs
                if(
                    !user.nome.value ||
                    !user.email.value ||
                    !user.fone.value ||
                    !user.data_nascimento.value
                )
                {
                    return toast.warn("Preencha todos os campos")
                }

                // If was a update
                    if(onEdit)
                    {
                        await axios
                            .put(apiRoute + onEdit.id, 
                            {
                                nome: user.nome.value,
                                email: user.email.value,
                                fone: user.fone.value,
                                data_nascimento: user.data_nascimento.value,
                            })
                            .then(({ data }) => toast.success(data))
                            .catch(({ data }) => toast.error(data))
                    }
                    else
                    {
                        await axios
                            .post(apiRoute, 
                            {
                                nome: user.nome.value,
                                email: user.email.value,
                                fone: user.fone.value,
                                data_nascimento: user.data_nascimento.value,
                            })
                            .then(({ data }) => toast.success(data))
                            .catch(({ data }) => toast.error(data))
                    }

                    // Define null values 
                        user.nome.value = ""
                        user.email.value = ""
                        user.fone.value = ""
                        user.data_nascimento.value = ""

                        setOnEdit(null)

                    // Update the read list
                        getUsers()
        }
    
    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>

            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>

            <InputArea>
                <Label>Email</Label>
                <Input name="email" />
            </InputArea>

            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" />
            </InputArea>

            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date"/>
            </InputArea>

            <Button type="submit">SALVAR</Button>

        </FormContainer>
    )
}

export default Form;