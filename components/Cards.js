import { useRouter } from 'next/router';
import styles from '../styles/Cards.module.scss';

export default function Cards({ blogs }) {
  const router = useRouter();

  const formatDate = (dateString) => {
    return dateString.split('T')[0].split('-').join(' / ');
  };

  const handleClick = (id) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div className={styles.cards}>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className={styles.card}
          onClick={() => handleClick(blog.id)}
        >
          <div
            className={styles.card_cover}
            style={{ backgroundImage: `url(${blog.cover})` }}
          />
          <div className={styles.card_body}>
            <p className={styles.card_title}>{blog.title}</p>
            <p className={styles.card_description}>{blog.description}</p>
          </div>
          <p className={styles.card_date}>{formatDate(blog.created_at)}</p>
          <p className={styles.card_tags}>{blog.tags.join(' / ')}</p>
        </div>
      ))}
    </div>
  );
}
