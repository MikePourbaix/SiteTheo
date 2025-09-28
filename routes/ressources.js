const express = require('express');
const router = express.Router();

const RSSParser = require('rss-parser');
const parser = new RSSParser;

router.get('/', async (req, res) => {
  try {
    const feed = await parser.parseURL("https://fr.investing.com/rss/market_overview_Opinion.rss");

    const articles = feed.items.map(item => ({
      title: item.title,
      summary: item.contentSnippet || item.content || "",
      link: item.link,
      image: item.enclosure?.url || (item['media:content'] ? item['media:content'].url : null)
    }));

    res.render('ressources.hbs', { articles, title: "Ressources / Blog" });
  } catch (err) {
    console.error("Erreur lors du chargement du flux RSS :", err);
    res.render('ressources.hbs', { articles: [], title: "Ressources / Blog" });
  }
});


module.exports = router;
