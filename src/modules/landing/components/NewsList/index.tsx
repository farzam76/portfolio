import React, { useEffect } from "react";
import "./styles.css";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

// Stub types for NewsList component (not currently used)
interface NewsArticle {
  top_image: string;
  site: string;
  title: string;
  clean_summary: string;
  tags: string[];
  url: string;
}

// Stub hook for NewsList component (not currently used)
const useNewsGridStore = () => ({
  trendingArticles: { data: null as { results: NewsArticle[] } | null },
  fetchTrendingByCountry: (_params: { countryCode: string }) => {},
});
const MockNewsCard = (article: NewsArticle) => {
  const cardBackgroundStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease-in-out",
  };

  const hoverStyle = {
    transform: "scale(1.02)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  };
  return (
    <div
      className="news-card"
      style={{ ...cardBackgroundStyle, ...hoverStyle }}
    >
      <img
        src={article.top_image}
        alt={article.site}
        style={{ width: 200 }}
        className="news-card-image"
      />
      <h3>{article.title}</h3>
      <p>{article.clean_summary}</p>
      <div className="tags">
        {article.tags.map((tag: string, index: number) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};
const NewsCardListComponent: React.FC = () => {
  const newsGridStore = useNewsGridStore();
  let { countryCode } = useParams();
  
  useEffect(() => {
    newsGridStore.fetchTrendingByCountry({ countryCode: countryCode ? countryCode : "IN" });
  }, []);
  return newsGridStore.trendingArticles.data ? (
    <div className="news-card-list">
      <div className="scroll-container">
        {newsGridStore.trendingArticles.data?.results.map((news: NewsArticle, index: number) => (
          <MockNewsCard key={index} {...news} />
        ))}
      </div>
    </div>
  ) : (
    <span>LOADING.....</span>
  );
};

export const NewsCardList = observer(NewsCardListComponent);
