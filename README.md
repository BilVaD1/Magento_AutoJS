# This is project with automation tests based on the webdriverIO for the site: https://magento.softwaretestingboard.com


<h3>How to start tests?</h3>

npm run wdio

<h2 align="center">This project works with the Allure reporter</h2>

<h3>How to open Allure Reporter?</h3>

npm run allure_open

<h3>How to update tests in the Allure Reporter?</h3>

npm run allure_update_results

<h3>How to clear Allure results?</h3>

npm run allure_delete_results

<h2>You can specify the Product Listing page from the CL.</h2> 
For that enter a value into the ListingPage variable(package.json > scripts > wdio > ListingPage). For example: ListingPage=women_Jackets then the page: https://magento.softwaretestingboard.com/women/tops-women/jackets-women.html will be opened. By default is the "women_HoodiesAndSweatshirts"(if you left the ListingPage empty)

For specifing Hoodies & Sweatshirts use "HoodiesAndSweatshirts"; For Fitness Equipment: "gear_FitnessEquipment"
