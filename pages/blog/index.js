import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../components/Layout";
import Cards from "../../components/Cards";
import styles from "../../styles/BlogIndex.module.scss";

export default function BlogIndex({ blogs, total }) {
  const router = useRouter();
  const { page = "1", tags } = router.query;

  const prevPage = () => {
    const currentPage = parseInt(page);
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      const query = { page: newPage.toString() };
      if (tags) query.tags = tags;
      router.push({
        pathname: "/blog",
        query,
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const nextPage = () => {
    const currentPage = parseInt(page);
    if (total - currentPage * 6 > 0) {
      const newPage = currentPage + 1;
      const query = { page: newPage.toString() };
      if (tags) query.tags = tags;
      router.push({
        pathname: "/blog",
        query,
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        {tags && (
          <div className={styles.searched}>
            <p>
              🔍
              {tags.split(",").map((tag, i) => (
                <span key={i} className={styles.searched_label}>
                  {tag}
                </span>
              ))}
              タグの検索結果 !
            </p>
          </div>
        )}
        <Cards blogs={blogs} />
        <div className={styles.pager}>
          {page && page !== "1" && (
            <div className={styles.btn} onClick={prevPage}>
              前へ
            </div>
          )}
          {total - parseInt(page) * 6 > 0 && (
            <div className={styles.btn} onClick={nextPage}>
              次へ
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { page = "1", tags } = query;
  const pageSize = 6;

  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.API_BASE_URL
        : "http://localhost:8080";

    let url = `${baseUrl}/api/v1/post?size=${pageSize}`;

    if (tags) {
      url += `&tags=${tags}`;
    }

    if (page && page !== "0") {
      const from = parseInt(page);
      url += `&from=${(from - 1) * pageSize}`;
    }

    const res = await axios.get(url);

    return {
      props: {
        blogs: res.data.data || [],
        total: res.data.total || 0,
      },
    };
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return {
      props: {
        blogs: [],
        total: 0,
      },
    };
  }
}
