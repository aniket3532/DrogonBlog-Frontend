import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    //const [ title, setTitle ] = useState('');
    //const [ body, setBody ] = useState('');
    //const [ author, setAuthor ] = useState('Lannister');
    const [isPending, setIsPending ] = useState(false);
    const navigate = useNavigate();

    const [blog, setBlog ] = useState({
        title: "", body: "", author: ""
    });
    let prop,value;     
    const handleInputs = (e) => {
        e.preventDefault();
        //console.log(e);
        prop = e.target.name;
        value = e.target.value;
        setBlog({...blog, [prop]:value});
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { title, body, author } = blog;
        if(author === ""){
            window.alert(`Fill the author name!`);
            return;
        }
        setIsPending(true);
        const res = await fetch("https://drog-blog.onrender.com/create", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                title, body, author
            })
        });

        const data = await res.json();
        
        if(data.status === 422 || !data){
            setIsPending(false);
            window.alert('Blog not created properly!');
            console.log(`Blog creation error`);
        }
        else{
            window.alert('Blog added successfuly!');
            console.log(`Blog creation successful`);
            navigate('/');
        }
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const blog = { title, body, author};
    //     setIsPending(true);
        
    //     fetch('http://localhost:8000/blogs', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(blog)
    //     }).then(() => {
    //         console.log('New blog created');
    //         setIsPending(false);
    //         navigate('/');
    //     })
    // }

    return ( 
        <div className="create">
            <h2>Add a new blog</h2>
            <form method="POST">
                <label>Blog title:</label>
                <input
                    type="text" required name="title" value={blog.title} autoComplete="off" onChange= {handleInputs}
                />
                <label>Blog Body:</label>
                <textarea required name="body" value={blog.body} autoComplete="off" onChange= {handleInputs}>
                    
                </textarea>
                <label>Blog Author:</label>
                <select name="author" value={blog.author} autoComplete="off" onChange= {handleInputs}>
                    <option value="">Select an option</option>
                    <option value="Lannister">Lannister</option>
                    <option value="Stark">Stark</option>
                </select>
                {!isPending && <button onClick={PostData}>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
    );
}
export default Create;