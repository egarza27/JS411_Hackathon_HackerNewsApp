import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = async (e) => {
    console.log(e.target.value);

    if (!e.target.value.length) {
      return setSearchResults([]);
    }

    const result = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=${e.target.value}`
    );
    console.log("result:", result.data.hits);
    setSearchResults(result.data.hits);
  };

  return (
    <div className="main-body">
      <header className="header">
        <div className="header-logo">
          <a href="https://hn.algolia.com/">
            <img
              src="https://hn.algolia.com/packs/media/images/logo-hn-search-a822432b.png"
              alt="Hacker News Logo"
            />
          </a>

          <span className="header-title">
            Search
            <br></br>
            Hacker News
          </span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Search stories by title, url or author"
          />
        </div>
      </header>
      <div className="search-results">
        {searchResults.length ? (
          searchResults.map((article, index) => {
            return (
              <div key={index} className="article">
                <a>
                  <span className="article-title">{article.title}</span>
                </a>
                <a href={article.url} target="_blank">
                  <span className="article-url"> ({article.url})</span>
                </a>

                <br />
                <span className="article-details">
                  {article.points} points | {article.num_comments} comments |{" "}
                  {article.author} |{" "}
                  {new Date().getFullYear() -
                    parseInt(article.created_at.slice(0, 4))}{" "}
                  years ago
                </span>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
