import React from 'react'
import './App.css'

const App = () => {
    const [text, setText] = React.useState("Python program to print Hello World");
    // const [response, setResponse] = React.useState("print('Hello World')");
    const [textArea, setTextArea] = React.useState({
        value: "print('Hello World')",
        rows: 1,
    });
    
    const fetchData = async (data = "cpp program to print n prime numbers") => {
        try {
            const response = await fetch("http://localhost:5000", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            response.json()
            .then(data => {
                // console.log(data);
                setTextArea({value: data.text});
            })
        }
        catch (error) {
            return ("Error Generating Code", error);
        }
    }

    const handleSubmit = async event => {
        setText("");
        event.preventDefault();
        try {
            await fetchData({ text })
        }
        catch (error) {
            console.error('fc sending data:', error);
        }
    }

    const handleTextAreaChange = event => {
        const textareaLineHeight = 24; // adjust to match your textarea styles
        const previousRows = event.target.rows;
        console.log(previousRows);
        event.target.rows = 1; // reset number of rows in textarea
        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }
        setTextArea({ value: event.target.value, rows: currentRows });
    }

    const handleChange = event => {
        setText(event.target.value);
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <label>Enter the text</label>
                <input type="text" name="text" onChange={handleChange} value={text} required className='size' />
                <textarea value={textArea.value} onChange={handleTextAreaChange} className="size" />
                <button type="submit">Generate Code</button>
            </form>
        </div>
    )
}

export default App