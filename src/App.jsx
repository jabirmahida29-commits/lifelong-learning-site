const ROUTE_META = {
  "/": {
    title: "Lifelong Learning Centre | Licensed Daycare in Whitby, Ontario",
    description: "Licensed daycare in Whitby serving families across Durham Region since 2009. Toddler, preschool, pre-K, and school-age programs. Book a free tour today.",
    keywords: "daycare Whitby, Whitby daycare, licensed daycare Whitby Ontario, childcare Durham Region, daycare Oshawa Ajax Pickering, toddler program Whitby",
    canonical: "https://www.lifelonglearningcentre.com/",
  },
  "/about": {
    title: "About Us | Licensed Whitby Daycare Since 2009 | Lifelong Learning Centre",
    description: "Family-owned licensed daycare in Whitby, Ontario since 2009. Meet our certified educators and learn how we help children across Durham Region thrive.",
    keywords: "about Lifelong Learning Centre, Whitby daycare history, certified educators Whitby, family daycare Durham Region",
    canonical: "https://www.lifelonglearningcentre.com/about",
  },
  "/programs": {
    title: "Daycare Programs in Whitby | Toddler to School Age | Lifelong Learning Centre",
    description: "Toddler, preschool, pre-kindergarten, and school-age childcare programs in Whitby, Ontario. Serving Durham Region families. Ages 18 months to 7 years.",
    keywords: "toddler program Whitby, preschool Whitby Ontario, pre-kindergarten Durham Region, school age childcare Whitby, childcare programs Oshawa Ajax Pickering",
    canonical: "https://www.lifelonglearningcentre.com/programs",
  },
};

function SeoHead() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = ROUTE_META[pathname] || ROUTE_META["/"];

    // Title
    document.title = meta.title;

    // Description
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement("meta"); desc.setAttribute("name", "description"); document.head.appendChild(desc); }
    desc.setAttribute("content", meta.description);

    // Keywords
    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) { kw = document.createElement("meta"); kw.setAttribute("name", "keywords"); document.head.appendChild(kw); }
    kw.setAttribute("content", meta.keywords);

    // Canonical
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.setAttribute("rel", "canonical"); document.head.appendChild(canon); }
    canon.setAttribute("href", meta.canonical);

    // OG title + description (update dynamically for SPAs)
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", meta.description);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", meta.canonical);
  }, [pathname]);
  return null;
}