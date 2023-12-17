import React, { useState, useEffect } from "react";
import "./Blog.css";
import { db } from "../firebaseInit";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore"; 

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchBlogs = async () => {
    const blogsCollection = collection(db, 'blogs');
    const querySnapshot = await getDocs(blogsCollection);
    const fetchedBlogs = [];
    
    querySnapshot.forEach((doc) => {
      fetchedBlogs.push({ id: doc.id, ...doc.data() });
    });
    
    setBlogs(fetchedBlogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleAddBlog = async () => {
    if (title.trim() !== '' && content.trim() !== '') {
      const newBlog = {
        title: title,
        content: content,
        createdOn: new Date(),
      };

      try {
        const docRef = await addDoc(collection(db, 'blogs'), newBlog);
        setBlogs([...blogs, { id: docRef.id, ...newBlog }]);
        setTitle('');
        setContent('');
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      alert('Please enter both title and content for the blog.');
    }
  };
  
  const handleDeleteBlog = async (id, index) => {
    try {
      await deleteDoc(doc(db, 'blogs', id));
      const updatedBlogs = blogs.filter((blog, i) => i !== index);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <div className="Blog1">
      <h2>Write a Blog !!!</h2>
      <div className="title">
        <h3>Title:</h3>
        <input
          type="text"
          placeholder="Enter the title of the Blog here!!!"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="Content">
        <h3>Content:</h3>
        <input
          type="text"
          placeholder="Content of the Blog goes here!!"
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <br /><br />
      <button onClick={handleAddBlog}>Add</button>
      <br /><br />
      <div className="Blogs2">
        <h3>Blogs</h3>
        {blogs.map((blog, index) => (
          <div className="blogItem" key={blog.id}>
            <h4>{blog.title}</h4>
            <p>{blog.content}</p>
            <button onClick={() => handleDeleteBlog(blog.id, index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
