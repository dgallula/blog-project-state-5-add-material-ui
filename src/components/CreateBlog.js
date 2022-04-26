import { useState } from "react"
import { useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    textField_root: {
        color: 'red'
    },

});

const CreateBlog = () => {
    const classes = useStyles();
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [body, setBody] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        console.log("Submited!")

        const preparedBody = {
            title,
            author,
            body
        }
        console.log('preparedBody')
        console.log(preparedBody)

        fetch(`http://localhost:8000/blogs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(preparedBody)
        })
            .then(() => {
                // notify user that blog added
                alert("The blog was added successfuly")

                // reset form
                setTitle('')
                setAuthor('')
                setBody('')

                // move to homepage
                navigate('/home')
            })
            .catch(e => console.error(e))
    }

    return (
        <div className="CreateBlog-root">
            <br />
            <h1>CreateBlog</h1>
            <div className="CreatBlog-main-container">
                <form className="CreatBlog-form">
                    <TextField
                        id="craeteblog-title"
                        label="Title"
                        variant="outlined"
                        value={title}
                        multiline={false}
                        onChange={e => setTitle(e.target.value)}
                        classes={{ root: classes.textField_root }}
                    />
                    <br />
                    <label className="CreateBlog-input-label" htmlFor="blog-author">Author:</label>
                    <br />
                    <input
                        type="text"
                        id="blog-author"
                        required
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <br /><br />
                    <label className="CreateBlog-input-label" htmlFor="blog-body">Enter post body:</label>
                    <br />
                    <textarea
                        name="blog-body"
                        id="blog-body"
                        cols="30"
                        rows="10"
                        required
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    ></textarea>
                    <br /> <br />
                    <button
                        className="CreateBlog-submit-button"
                        type="submit"
                        onClick={handleSubmit}
                    >Submit</button>
                </form>
            </div>

        </div>
    )
}

export default CreateBlog