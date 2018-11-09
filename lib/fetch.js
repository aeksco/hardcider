#!/usr/bin/env node
const puppeteer = require('puppeteer');
const HEADLESS = true // NOTE - change to `false` for dubugging

// Options for Puppeteer headless browser
const PUPPETEER_OPTIONS = {
  headless: HEADLESS,
  slowMo: 5,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--enable-logging',
    '--v=1'
  ]
}

// fetchCitation
// Fetches an individual citation from the server
module.exports = async function fetchCitation(citation_url, query) {

  // Instantiates new headless browser
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS);

  // Navigates to citation_url
  const page = await browser.newPage();
  await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: './' })
  await page.goto(citation_url, { waitUntil: 'domcontentloaded' });

  // Submitting form
  await page.waitFor('input[name=q]')
  await page.$eval('input[name=q]', (el, value) => el.value = value, query);
  await page.click('input[name=commit]');

  // Waiting for next page load
  await page.waitFor('button.select-result[type=submit]');
  await page.click('button.select-result[type=submit]');

  // Clicking "Final Step" button
  await page.waitFor('[alt="continue to final step"]');
  await page.click('[alt="continue to final step"]');

  // Clicking "Create Citation" button
  await page.waitFor('#create_citation');
  await page.click('#create_citation');

  // Waits for the DOM element that wraps the good stuff
  await page.waitFor('.bibliography-item-copy-text');

  // Isolates the element with the citation's text content
  // and pulls the citation text out of it
  const element = await page.$('.bibliography-item.most-recent')
  const citationText = await element.$eval('.bibliography-item-copy-text', node => node.innerText);

  // Closes the browser
  await browser.close();

  // Returns the inner text
  return citationText
}
