# hardcider
:beer: Create citations from the command line

<img src="https://raw.githubusercontent.com/aeksco/hardcider/master/demo.gif" width="100%"/>


### Installation
Run the following command to install `hardcider` - requires Node.js 8.x and higher

```shell
npm install -g hardcider
```


### Usage

- **`hardcider website <url>`** - create a website citation from a URL. Example:

- **`hardcider book <isbn>`** - create a book citation from an ISBN. Example:


### Example

```shell
$ hardcider website --mla https://en.wikipedia.org/wiki/John_Coltrane

Fetching MLA citation...

“John Coltrane.” Wikipedia, Wikimedia Foundation, 24 Oct. 2018, en.wikipedia.org/wiki/John_Coltrane.
```


**Flags**

The following flags apply to both the `website` and `book` commands

- `--apa` - returns an APA Formatted Citation (default)
- `--mla` - returns an MLA Formatted Citation
- `--chicago` - returns a Chicago Formatted Citation
- `--ieee` - returns an IEEE Formatted Citation


### Thanks

Built with [commanderjs](https://github.com/tj/commander.js/), [chalk](https://github.com/chalk/chalk), [puppeteer](https://github.com/GoogleChrome/puppeteer/), and [citationmachine.net](http://www.citationmachine.net/). Open Source under the [MIT License](https://opensource.org/licenses/MIT).


### Note

This implementation uses [puppeteer](https://github.com/GoogleChrome/puppeteer/), a headless Chromium browser to navigate through a series of forms on [citationmachine.net](http://www.citationmachine.net/). It's faster than manually using any citation website I've come across, but it's admittedly a resource-intensive approach.