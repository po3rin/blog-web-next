import Layout from "../components/Layout";
import Profile from "../components/Profile";
import GitHub from "../components/sns/GitHub";
import styles from "../styles/About.module.scss";

export default function About() {
  const repos = [
    {
      name: "GitHub Card Creator",
      url: "https://github.com/po3rin/github_link_creator",
      description:
        "ブログなどで GitHub リポジトリを共有する為に、OGP風画像を生成するツールです。CLIや、サーバーモード、WEB版もあります。",
      lang: "Go",
      langColor: "#00add8",
      star: 113,
    },
    {
      name: "gofmtmd",
      url: "https://github.com/po3rin/gofmtmd",
      description:
        "Markdown内のGoのコードを検知して gofmt をかけます。README.mdを書く際や、ブログをMarkdownで書く際に有用です。Vim プラグインもあります。",
      lang: "Go",
      langColor: "#00add8",
      star: 85,
    },
    {
      name: "gockerfile",
      url: "https://github.com/po3rin/gockerfile",
      description:
        "BuildKit Frontendとして数行のYAMLでマルチステージビルド済みのGoバイナリを含んだDocker Imageを生成します。",
      lang: "Go",
      langColor: "#00add8",
      star: 25,
    },
  ];

  const books = [
    {
      name: "Gopherの休日 2019秋",
      img: "/images/book7.png",
      description:
        "第2章「Goとベイズ理論でシンプルな記事分類を実装してみよう！」を寄稿",
      url: "https://techbookfest.org/product/5674890539565056",
    },
    {
      name: "Gopherの休日 2020冬",
      img: "/images/book8.png",
      description:
        "第4章「GoとコンセンサスアルゴリズムRaftによる分散システム構築入門」を寄稿",
      url: "https://techbookfest.org/product/6332688805920768",
    },
    {
      name: "Gopherの休日 2020夏",
      img: "/images/book9.jpeg",
      description:
        "第4章「Go+Burrows-Wheeler変換で入門する文字列解析の世界」を寄稿",
      url: "https://techbookfest.org/product/5139800384339968?productVariantID=5112838318194688",
    },
    {
      name: "エムスリーテックブック5",
      img: "/images/techbook5.png",
      description:
        "第4章「検索エンジンにおけるReindex後の差分反映問題への挑戦」を寄稿",
      url: "https://techbookfest.org/product/rpXewXTtekXgNPFBCWLrX4?productVariantID=nrAyYa0LsLwUZUk5Qee80X",
    },
    {
      name: "エムスリーテックブック6",
      img: "/images/techbook6.png",
      description:
        "第7章「LLM で作るテストコレクションで検索オフライン評価基盤を実現するための戦い」を寄稿",
      url: "https://techbookfest.org/product/1Awt0K23ct4LJQxFz6mQP1?productVariantID=ixQgNDGyL4gL3DD7CxYviw",
    },
    {
      name: "エムスリーテックブック7",
      img: "/images/techbook7.png",
      description:
        "第2章「Zoekt によるコード検索基盤開発と内部実装の読解」を寄稿",
      url: "https://techbookfest.org/product/g2gqKCQ96newVVkru0YgAm?productVariantID=rVnrwrVH1qJWm0qxss1Vpd",
    },
  ];

  const handleRepoClick = (url) => {
    window.open(url);
  };

  const handleBookClick = (url) => {
    window.open(url);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Profile />
        <p className={styles.section_title}>💻 OSS</p>
        <div>
          <div className={styles.cards}>
            {repos.map((repo) => (
              <div
                key={repo.name}
                className={styles.card}
                onClick={() => handleRepoClick(repo.url)}
              >
                <GitHub />
                <p className={styles.bold_txt}>{repo.name}</p>
                <p className={styles.thin_txt}>{repo.description}</p>
                <div className={styles.card_meta}>
                  <p className={styles.card_meta_item}>
                    <span className={styles.star}>★</span> {repo.star}
                  </p>
                  <p className={styles.card_meta_item}>
                    <span
                      className={styles.label_go}
                      style={{ color: repo.langColor }}
                    >
                      ●
                    </span>
                    {repo.lang}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className={styles.section_title}>📝 writting</p>
        <div className={styles.books}>
          {books.map((book) => (
            <div key={book.name} className={styles.book}>
              <a href={book.url} target="_blank" rel="noopener noreferrer">
                <img width="160" src={book.img} alt={book.name} />
              </a>
              <div className={styles.book_contents}>
                <p className={styles.bold_txt}>{book.name}</p>
                <div className={styles.line}></div>
                <p className={styles.thin_txt}>{book.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
