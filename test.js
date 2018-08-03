const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const rp = require('request-promise');

describe('test', () => {
  it('should navigate and search', async () => {
    const searchField = '#lst-ib';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await page.type(searchField, 'testing tools');
    await page.keyboard.press('Enter');
    await page.waitForSelector('#tads .ads-visurl cite');
    const searchValue = await page.$eval('#tads .UdQCqe', (element) => {
      return element.innerHTML
    })
    await page.screenshot({path: 'example.png'});
    expect(searchValue).to.include('www.gurock.com');
    await browser.close();
  });

  it('should do api call', async () => {    
    const expectedResp = { 
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
       body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto' 
    };

    const response = await rp('https://jsonplaceholder.typicode.com/posts/1')
      .then(data => JSON.parse(data));
    console.log(response);
    expect(response).to.eql(expectedResp);
  });
});