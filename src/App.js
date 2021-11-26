import { useEffect, useState } from 'react';
import PostService from './API/PostService';
import './App.css';
import { useFetching } from './components/hooks/useFetching';
import { usePosts } from './components/hooks/usePosts';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyLoader from './components/UI/loader/MyLoader';
import MyModal from './components/UI/modal/MyModal';
import MyPagination from './components/UI/pagination/MyPagination';
import { getPageCount } from './components/utils/pages';

function App() {

  const[posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className='App'>
      <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create user
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
      filter={filter} 
      setFilter={setFilter} 
      />
      {postError &&
        <h2 style={{color: 'red', margin: 50, textAlign: 'center'}}>Error! {postError}.</h2>
      }
      {isPostsLoading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 200}}><MyLoader /></div>
      : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='List of Posts' />
      }
      <MyPagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default App;
