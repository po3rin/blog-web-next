import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Cards from '../../components/Cards';
import Twitter from '../../components/sns/Twitter';
import styles from '../../styles/BlogPost.module.scss';

export default function BlogPost({ post, relational }) {
  const router = useRouter();

  useEffect(() => {
    // Prismを使用してコードハイライトを適用
    if (typeof window !== 'undefined' && post) {
      const Prism = require('prismjs');
      require('prismjs/components/prism-go');
      require('prismjs/components/prism-javascript');
      require('prismjs/components/prism-docker');
      require('prismjs/components/prism-diff');
      require('prismjs/components/prism-hcl');
      require('prismjs/components/prism-json');
      require('prismjs/components/prism-yaml');
      require('prismjs/components/prism-rust');
      require('prismjs/components/prism-python');
      require('prismjs/components/prism-java');
      Prism.highlightAll();
    }
  }, [post, router.asPath]);

  const formatDate = (dateString) => {
    return dateString.split('T')[0].split('-').join(' / ');
  };

  const postTwitter = () => {
    window.open(
      `https://twitter.com/share?url=https://po3rin.com/blog/${post.id}`,
      'SNS_window',
      'width=600, height=500, menubar=no, toolbar=no, scrollbars=no'
    );
  };

  // Markdownをレンダリングする関数
  const renderMarkdown = () => {
    if (typeof window === 'undefined' || !post || !post.body) return { __html: '' };
    
    try {
      const MarkdownIt = require('markdown-it');
      const md = new MarkdownIt();
      
      // 画像にlazy属性を追加
      const defaultRender = md.renderer.rules.image || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };
      md.renderer.rules.image = function(tokens, idx, options, env, self) {
        tokens[idx].attrPush(['loading', 'lazy']);
        return defaultRender(tokens, idx, options, env, self);
      };
      
      const content = post.body.split('---')[2] || post.body;
      return { __html: md.render(content) };
    } catch (error) {
      console.error('Markdown rendering error:', error);
      return { __html: '<p>記事の読み込みに失敗しました。</p>' };
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{`${post.title} - 好奇心に殺される。- pon のテックブログ`}</title>
        <meta name="description" content={post.description} />
        <meta property="og:url" content={`https://po3rin.com/blog/${post.id}`} />
        <meta property="og:title" content={`${post.title} - 好奇心に殺される。`} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.cover} />
        <meta property="og:image:alt" content="OGP image" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@po3rin" />
        <meta property="og:site_name" content={`${post.title} - 好奇心に殺される。`} />
        <meta property="og:locale" content="ja_JP" />
      </Head>
      <section>
        <div className={styles.post_header}>
          <div className={styles.post_header_info}>
            <div className={styles.post_header_info_body}>
              <p className={styles.post_header_tags}>
                {post.tags.join(' / ')}
              </p>
              <h1 className={styles.post_header_title}>{post.title}</h1>
              <p className={styles.post_header_desc}>{post.description}</p>
              <div className={styles.sns} onClick={postTwitter}>
                <Twitter />
              </div>
              <p className={styles.post_header_date}>
                {formatDate(post.created_at)}
              </p>
            </div>
          </div>
          <div
            className={styles.post_header_media}
            style={{ backgroundImage: `url(${post.cover})` }}
          />
        </div>

        <div className={styles.post}>
          <div dangerouslySetInnerHTML={renderMarkdown()} />
          <div className={styles.footer}>
            <div className={styles.footer_tags}>
              {post.tags.map((tag, i) => (
                <div key={i} className={styles.footer_tag}>
                  <a href={`/blog?tags=${tag}&page=1`}>{tag}</a>
                </div>
              ))}
            </div>
            <div className={styles.sns} onClick={postTwitter}>
              <Twitter />
            </div>
          </div>
        </div>
        <div className={styles.more}>
          <p className={styles.section_title}>🔍 more !!</p>
        </div>
        <Cards blogs={relational} />
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    // 記事の詳細を取得
    const res = await axios.get(`${process.env.BASE_URL}/api/v1/post/${params.id}`);
    const post = res.data.data;
    
    // 関連記事を取得
    let tagsQuery = '';
    if (post.tags && post.tags.length > 0) {
      tagsQuery = `&tags=${post.tags.join(',')}`;
    }
    
    const relationalRes = await axios.get(`${process.env.BASE_URL}/api/v1/post?size=3${tagsQuery}`);
    const relational = relationalRes.data.data.filter(d => d.id !== params.id);
    
    return {
      props: {
        post,
        relational
      }
    };
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return {
      notFound: true
    };
  }
}
