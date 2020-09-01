const COLLECTION = 'dojo';
const { ObjectId } = require('mongodb');

async function insert(payload) {
    return global.db
        .collection(COLLECTION)
        .insertOne(payload);
}

async function getById(_id) {
    return global.db
        .collection(COLLECTION)
        .findOne({ _id: ObjectId(_id) });
}

module.exports = { insert, getById }