# hardcider
:beer: Create citations for websites quickly from the command line

<img src="https://raw.githubusercontent.com/aeksco/hardcider/master/demo.gif" width="100%"/>

### Installation
Run the following command to install `refa` - requires Node.js 8.x and higher

```bash
npm install -g hardcider
```

### Usage
Use the `hardcider website` command to create a citation. Example:

```bash
hardcider website --ieee https://www.merriam-webster.com/dictionary/cat
```

**Flags**

- `--ieee` - returns an IEEE Formatted Citation
- `--mla` - returns an MLA Formatted Citation

### Thanks

Built with [commanderjs](https://github.com/tj/commander.js/), [chalk](https://github.com/chalk/chalk), [puppeteer](https://github.com/GoogleChrome/puppeteer/), and [citationmachine.net](http://www.citationmachine.net/). Open Source under the [MIT License](https://opensource.org/licenses/MIT).
