const AWS = require('aws-sdk')
const keys = require('../config/keys')
const uuid = require('uuid/v1')
const requireLogin = require('../middlewares/requireLogin')

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
})

module.exports = app => {
    app.get('/api/upload', requireLogin,(res,req) => {
        const key = `${req.user.id}/${uudi()}.jpeg`
        s3.getSignedUrl('putObject', {
            Bucket: 'my-blog-bucket-123',
            ContentType: 'jpeg',
            Key: key
        },(err,url) => res.send({ key,url}))
    })
}