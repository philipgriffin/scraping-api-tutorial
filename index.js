const express = require("express");
const app = express();
const puppeteer = require("puppeteer");

app.listen(3000);

app.get("/philipgriffin/title", function(req, res) {
  void (async() => {
    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.goto("https://philip-griffin.com");
      const postTitleElement = await page.$(".post-title");
      const postTitle = await page.evaluate(postTitleElement => postTitleElement.textContent.trim(), postTitleElement);
      await browser.close();
      res.status(200).json({ postTitle: postTitle });
    } catch (e) {
      await browser.close();
      res.status(500).json({ error: "error" });
    }
  })();
});
