import { useMemo, useState } from 'react';
import './App.css';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {

  const[posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'JavaScript is'},
    {id: 2, title: 'JavaScript', body: 'JavaScript is'}
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo(() => {
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className='App'>
      <PostForm create={createPost} />
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
      filter={filter} 
      setFilter={setFilter} 
      />
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='List of Posts' />
    </div>
  );
}

export default App;
