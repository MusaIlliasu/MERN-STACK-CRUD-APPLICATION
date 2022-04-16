import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const Design = (top, right, borderRadius, backgroundColor) => {
        const style = {
            top,
            right,
            borderRadius,
            backgroundColor
        }
        return <div className="design" style={style}></div>;
    }
    
    return (
            <React.Fragment>
                <div className="home_section">
                    <div className="banner_overlay"></div>

                    { Design(0, 0, "50% 0 50% 0", "red") }
                    { Design(0, 0, "50% 0 50% 50%", "red") }

                    <div className="container">
                        <div className="home_banner">
                            <div className="home_banner_content">
                                <h2>MERN STACK BLOG POST <strong className="text-white">➕</strong> REDUX</h2>
                                <p>MongoDB, ExpressJs, React and NodeJs Blog Post.</p>
                                <Link to="/posts" className="btn btn-danger btn-lg">Blog Posts</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
}

export default Home;