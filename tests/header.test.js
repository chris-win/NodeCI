// const sessionFactory = require('./factories/sessionFactory')
// const userFactory = require('./factories/userFactory')
const Page = require('./helpers/page')

let  page

beforeEach( async () => {
    page = await Page.build()
    await page.goto('localhost:3000')
})

afterEach(async () => {
    page.close()
})

test('Header has correct flow', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML)
    expect(text).toEqual('Blogster')
})

test('AuthenO is working', async () => {
    await page.click('.right a')
    const url = await page.url()
    expect(url).toMatch(/accounts\.google\.com/)
})

test('When signed in Logout button is visible', async () => {
    await page.login()
    await page.waitFor('a[href="/auth/logout"]')
    const text = await page.getContentsOf('a[href="/auth/logout"]')
    expect(text).toEqual('Logout')

})
