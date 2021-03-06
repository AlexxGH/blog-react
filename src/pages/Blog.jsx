import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Message } from "../components/Message/Message";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { BlogPosts } from "../components/BlogPosts/BlogPosts";
import { Button } from "../components/Common/Button";
import { Modal } from "../components/Modal/Modal";
import { BlogContext } from "../context/BlogContext";
import { getAllPosts } from "../service/service";
import { getCategories } from "../helper/helper";

export const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([null]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllPosts().then((res) => res.data);
            setPosts(res.resultData);
            setError(res.errorMessage);
            setCategories(() => getCategories(res.resultData)); 
        };
        fetchData();
    }, []);

    const [visible, setVisible] = useState(false);
    function toggle() {
        setVisible(!visible);
    }

    return (
        <div className="blog">
            <BlogContext.Provider value={{ posts, setPosts }}>
                <Layout>
                    <h1>Welcome to My Blog</h1>
                    <Message />
                    <Modal visible={visible} toggle={toggle} />
                    <Button
                        onClick={toggle}
                        className="add-post"
                        title="Add post"
                    />
                    <div className="flex-section">
                        <Sidebar categories={categories} />
                        <BlogPosts posts={posts} error={error} />
                    </div>
                </Layout>
            </BlogContext.Provider>
        </div>
    );
};
