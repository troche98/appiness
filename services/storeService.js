var Store = require('../models/store');

class StoreService {

    // RETRIEVE ALL STORES
    async storeFind() {
        return new Promise((resolve, reject) => {
            Store.find({})
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    // RETRIEVE STORES BASED ON PARAMETERS
    async storeFindByParameters(query) {
        return new Promise((resolve, reject) => {
            Store.find({$or:[
                {address: query.address}, 
                {name: query.name}
            ]})
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    // RETRIEVE A STORE BASED ON ITS ID
    async storeFindById(id_store) {
        return new Promise((resolve, reject) => {
            Store.find({_id: id_store})
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    // CREATE A NEW STORE BASED ON A STORE MODEL
    async storeCreate(_newStore) {
        return new Promise((resolve, reject) => {
            var newStore = new Store(_newStore);
            newStore.save()
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    // UPDATE A STORE BASED ON HIS ID AND NEW VALUES
    async storeUpdate(id_store, newValues) {
        return new Promise((resolve, reject) => {
            Store.updateOne({_id: id_store}, newValues)
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

}

var storeService = new StoreService();

module.exports = storeService;