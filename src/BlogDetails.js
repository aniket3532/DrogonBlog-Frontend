import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import axios from "axios";

// const BlogDetails = () => {
//     const { id } = useParams();
//     const { data: blog, isPending, error } = useFetch('http://localhost:8000/blogs/' + id);
//     const navigate = useNavigate();

//     const handleDelete = () => {
//         fetch('http://localhost:8000/blogs/' + blog.id, {
//             method: 'DELETE'
//         }).then(() => {
//             console.log('Blog deleted');
//             navigate('/');
//         })
//     }

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch(`https://drog-blog.onrender.com/blogs/${id}`);
    const navigate = useNavigate();

    const handleDelete = async () => {
        await axios.delete(`https://drog-blog.onrender.com/blogs/${blog._id}`).then(() => {
            alert(`${blog.title} deleted`);
            navigate('/');
        }).catch(error => {
            console.error(error);
            alert(`${error}`);
        })
    }
    console.log(blog);

    return ( 
        <>
            <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            {  blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleDelete}>delete</button>
                </article>
            )}
        </div>
        </>
  
     );
}
 
export default BlogDetails;