var utils = window.utils || {}

utils.Repository = (function(){
    var Repository = function(){
        this.items = [];
    };

    Repository.prototype.save = function(item){
        item = this.clone(item);

        if(item.id == null){
            item.id = this.newId();
            this.items.unshift(item);
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

    Repository.prototype.statistics = function (critaria) {
        var activities = _.select(this.items, critaria);
        var stats = {totalActivities: activities.length, calories: 0, distance: 0, duration: 0};

        _.forEach(this.items, function(activity){
            if(_.isNumber(activity.calories))
                stats.calories += activity.calories;

            if(_.isNumber(activity.distance))
                stats.distance += activity.distance;

            if(_.isNumber(activity.duration))
                stats.duration += activity.duration;
        });

        //Weekly calories burn
        var weeklyBurning = {};
        _.forEach(moment.weekdaysShort(), function(day){
            weeklyBurning[day] = 0;
        });

        var currentWeek = new moment().week();
        var currentWeekActivities =_.filter(this.items, function(activity){
            return moment(activity.workoutDate).week() == currentWeek;
        });

        _.forEach(currentWeekActivities, function(activity){
            var workoutDate  = moment(activity.workoutDate);
            day = moment.weekdaysShort(workoutDate.isoWeekday());

            if(_.isNumber(activity.calories))
                weeklyBurning[day] += activity.calories;
        });

        stats.weeklyBurning = weeklyBurning;
        return stats;
    };

    return Repository;
})();