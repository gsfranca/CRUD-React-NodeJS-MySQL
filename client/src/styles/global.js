// Importing from styled-components a function to make the style defined a global style
    import { createGlobalStyle } from "styled-components"

// Defining this global style and keeping it in a const   
    const Global = createGlobalStyle`
        *
        {
            /*Position*/
                margin: 0;
                padding: 0;

            /*Text*/
                font-family: 'Roboto', sans-serif;
        }

        body
        {
            /*Size*/
                width: 100vw;
                height: 100vh;

            /*Position*/
                display: flex;
                justify-content: center;

            /*Background*/
                background-color: #F2F2F2;
        }
    `
// Exporting the const
    export default Global