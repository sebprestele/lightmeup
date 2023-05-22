# Lighthouse Report Generator

This package is a utility that generates Lighthouse reports for a given URL and specified categories. It utilizes the Lighthouse library to perform audits and generate HTML reports.

## Installation

To use this package, you need to have Node.js and npm (Node Package Manager) installed on your system. You can install this package by running the following command:

```
npm install lightmeup
```

##Usage

To generate a Lighthouse report, you can run the following command:

```
npx lightmeup --url <url> --onlyCategories <categories>
```

Replace <url> with the URL you want to audit, and <categories> with the specific categories you want to include in the report. Available categories are: performance, accessibility and seo.

For example, to generate a report for http://example.com and include the "performance" category, you would run:

```
npx lightmeup --url http://example.com --onlyCategories performance
```

The generated report will be saved in a directory with the structure url -> category

##Dependencies
This package relies on the following dependencies:

fs: File system module for reading and writing files.
lighthouse: Core Lighthouse library for performing audits and generating reports.
chrome-launcher: Utility for launching a headless Chrome instance.
yargs: Library for parsing command-line arguments.
glob: Library for matching file patterns.
open: Utility for opening the generated report in a browser.

##License
This package is provided under the MIT License.

##Contributing
Contributions to this package are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the GitHub repository.

##Credits
This package was created by Sebastian Prestele.
Built on top of https://github.com/GoogleChrome/lighthouse