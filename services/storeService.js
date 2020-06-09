var Store = require('../models/store');

class StoreService {

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

    async storeFindByName(_name) {
        return new Promise((resolve, reject) => {
            Store.find({name: _name})
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    async storeFindByAddress(_address) {
        return new Promise((resolve, reject) => {
            Store.find({address: _address})
            .then(docs => {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

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