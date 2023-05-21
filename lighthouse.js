import fs from 'fs';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'
import open from 'open'

const argv = yargs(hideBin(process.argv)).argv;

(async () => {
    // Launch Chrome
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

    // Configure Lighthouse options
    const options = {
        logLevel: 'info',
        output: 'html',
        onlyCategories: [argv.onlyCategories],
        port: chrome.port
    };

    // Run Lighthouse
    const runnerResult = await lighthouse(argv.url, options);
    console.log(argv.url, argv.onlyCategories)
    // Extract necessary information
    const reportHtml = runnerResult.report;
    const testedUrl = runnerResult.lhr.finalDisplayedUrl;
    const dirName = testedUrl.replace(/^https?:\/\//, '');
    const baseDirectory = 'lighthousereports';
    const storeDirectory = `${baseDirectory}/${dirName}`;
    const finalDirectory = `${storeDirectory}/${argv.onlyCategories}`;

    // Helper function to create directories if they don't exist
    const createDirectoryIfNotExists = (directoryPath) => {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }
    };

    // Create necessary directories
    [baseDirectory, storeDirectory, finalDirectory].forEach(createDirectoryIfNotExists);

    // Write report file
    const fetchTime = runnerResult.lhr.fetchTime.replace(/:/g, "_");
    fs.writeFileSync(`${finalDirectory}/${fetchTime}.html`, reportHtml);

    // Calculate result score based on category
    const resultScore = runnerResult.lhr.categories[argv.onlyCategories]?.score * 100 || 0;

    // Output result information
    console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
    console.log('Performance score was', resultScore);

    // Close Chrome
   await chrome.kill();

   // Open the report in browser
open(`${finalDirectory}/${fetchTime}.html`);

})();
