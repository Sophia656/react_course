import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { useFetching } from '../components/hooks/useFetching';
import MyLoader from '../components/UI/loader/MyLoader';
import '../App.css';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading] = useFetching( async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data)
    });
    const [fetchComments, isComLoading] = useFetching( async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    console.log(params)
    return (
        <div className='comments'>
            <h1 className='com__items'>You have opened the post page with the id - {params.id}</h1>
            {isLoading
            ? <MyLoader />
            : <div>{post.id}. {post.title}</div>
            }
            <h1 className='com__items'>Comments</h1>
            {isComLoading
            ? <MyLoader />
            : <div>
                {comments.map(comm =>
                    <div key={comm.id} style={{marginTop: 20}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>    
                )}
            </div>
            }
        </div>
    );
};

export default PostIdPage;