const Page = require('./helpers/page')

let  page

beforeEach( async () => {
    page = await Page.build()
    await page.goto('localhost:3000')
})

afterEach(async () => {
    page.close()
})

describe('When log in,', async () => {
    beforeEach(async () => {
        await page.login()
        await page.click('a.btn-floating')
    })
    test(' can see create form', async () => {
        const text = await page.getContentsOf('form label')
        expect(text).toEqual('Blog Title') 
    })

    describe('when invalid input is given', async ()=> {
        beforeEach(async() => {
            await page.click('form button')
        })

        test('shows error ', async( )=> {
            const titleError = await page.getContentsOf('.title .red-text')

            expect(titleError).toEqual('You must provide a value')
        })
        
    })

} )

describe('when user is not logged in', async ()=> {
    test('cannot create blog post', async() => {
        const result = await page.evaluate(() => {
            return fetch('/api/blogs', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({})
            }).then(res => res.json())
        })

        expect(result).toEqual({ error: 'You must log in!'})

    })
})