// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {

    const {data: blogs, loading : isLoading, error} = useFetch('https://drog-blog.onrender.com/');
    // const [blogData, setBlogData] = useState();
    // const navigate = useNavigate();
    return (
        <div className="home">
            { error && <div>{ error }</div> }
            { error === null && isLoading && <h3>Loading blogs...</h3>}
            { blogs && <BlogList blogs={blogs} title = "All Blogs!"/>}
        </div>
    );
}
    
export default Home;
