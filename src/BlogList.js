import { Link } from "react-router-dom";

const BlogList = ({blogs, title}) => {
    return ( 
        <div className="blog-list">
            <h2 className="h2">{ title }</h2>
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog._id}>
                    <Link to={`/blogs/${blog._id}`}>
                        <h2>{ blog.title }</h2>
                        <p>By { blog.author }</p>
                        <p>{ blog.body }</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default BlogList;