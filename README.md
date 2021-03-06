# hardcider
:beer: Create citations from the command line

<p align="center">
  <a href="https://npmcharts.com/compare/hardcider?minimal=true"><img src="https://img.shields.io/npm/dm/hardcider.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/hardcider"><img src="https://img.shields.io/npm/v/hardcider.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/hardcider"><img src="https://img.shields.io/npm/l/hardcider.svg" alt="License"></a>
</p>

<img src="https://raw.githubusercontent.com/aeksco/hardcider/master/demo.gif" width="100%"/>


### Installation
Run the following command to install `hardcider` - requires Node.js 8.x and higher

```shell
npm install -g hardcider
```


### Usage

- **`hardcider website <url>`** - create a website citation from a URL

- **`hardcider book <isbn>`** - create a book citation from an ISBN-10 or ISBN-13


### Example

```shell
$ hardcider website --mla https://en.wikipedia.org/wiki/John_Coltrane

Fetching MLA citation...

“John Coltrane.” Wikipedia, Wikimedia Foundation, 24 Oct. 2018, en.wikipedia.org/wiki/John_Coltrane.
```


**Flags**

The following flags apply to both the `website` and `book` commands

- `--mla` - returns an [MLA](https://owl.purdue.edu/owl/research_and_citation/mla_style/mla_style_introduction.html) Formatted Citation (default)
- `--apa` - returns an [APA](https://owl.purdue.edu/owl/research_and_citation/apa_style/apa_style_introduction.html) Formatted Citation
- `--chicago` - returns a [Chicago](https://www.chicagomanualofstyle.org/home.html) Formatted Citation
- `--ieee` - returns an [IEEE](https://pitt.libguides.com/citationhelp/ieee) Formatted Citation
- `--bibtex` - returns an [BibTeX](http://www.bibtex.org/) Formatted Citation


### Thanks

Built with [commanderjs](https://github.com/tj/commander.js/), [chalk](https://github.com/chalk/chalk), [puppeteer](https://github.com/GoogleChrome/puppeteer/), and [citationmachine.net](http://www.citationmachine.net/). Open Source under the [MIT License](https://opensource.org/licenses/MIT).


### Note

This implementation uses [puppeteer](https://github.com/GoogleChrome/puppeteer/), a headless Chromium browser to navigate through a series of forms on [citationmachine.net](http://www.citationmachine.net/). It's faster than manually using any citation website I've come across, but it's admittedly a resource-intensive approach.