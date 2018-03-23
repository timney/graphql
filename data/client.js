const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: 'AKIAIOGEZUEIRO6625QA',
    secretAccessKey: '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',
    region: 'eu-west-1'
});

const db = new AWS.DynamoDB.DocumentClient()
const TableName = 'graphql'

const put = params => db.put({
    TableName,
    Item: params
}).promise()

const getById = id => db.get({
    TableName,
    Key: {
        'id': id.toString()
    }
}).promise()

const getAll = () => db.scan({
    TableName
}).promise()

module.exports = {
    getById,
    put,
    getAll
}