var utils = window.utils || {}

utils.Repository = (function(){
    var Repository = function(){
        this.items = [];
    };

    Repository.prototype.save = function(item){
        item = this.clone(item);

        if(item.id == null){
            item.id = this.newId();
            this.items.push(item);
        }
        else{
            var itemIndex = _.findIndex(this.items, {id: item.id});
            if(itemIndex == -1){
                throw new Error('Item with id ' + item.id + ' could not be found.');
            }

            this.items[itemIndex] = item;
        }

        return item;
    };

    Repository.prototype.getAll = function(){
        return this.items;
    };

    Repository.prototype.delete = function(item){
        var itemIndex = _.findIndex(this.items, {id: item.id});
        if(itemIndex == -1){
            throw new Error('Item with id ' + item.id + ' could not be found.');
        }

        this.items.splice(itemIndex, 1);
    };

    Repository.prototype.newId = function(){
        if(this.items.length == 0){
            return 101;
        }
        return this.items[this.items.length - 1].id + 1;
    };

    Repository.prototype.clone = function(obj){
        return JSON.parse(JSON.stringify(obj));
    };

    Repository.prototype.find = function (critaria) {
        return _.findWhere(this.items, critaria);
    };

    Repository.prototype.findAll = function (critaria) {
        return _.select(this.items, critaria);
    };

    return Repository;
})();