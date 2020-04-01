'use strict';

const AWS = require("aws-sdk")
const dynamodb = new AWS.DynamoDB.DocumentClient()
const defaultResults = process.env.defaultResults || 8
const tableName = process.env.restaurants_table

module.exports.handler = async event => {

    let req = JSON.parse(event.body)
    let restaurants = await FindRestaurantByTheme(req.theme, defaultResults)

    return {
        statusCode: 200,
        body: JSON.stringify(restaurants)
    }
};

async function FindRestaurantByTheme(theme, count) {
    let req = {
        TableName: tableName,
        Limit: count,
        FilterExpression: "contains(themes, :theme)",
        ExpressionAttributeValues: {":theme": theme}
    }
  
    let resp = await dynamodb.scan(req).promise()

    return resp.Items;
}
