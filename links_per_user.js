// run a Map/Reduce job on the links collection to extract the number of links per user and save it in the links_per_user collection

map = function () {
    if (this.owner) {
        emit(this.owner, {count:1});
    }
}
reduce = function (key, values) {
    var total = 0;
    for (var i = 0; i < values.length; i++) {
        total += values[i].count;
    }
    return {count:total};
}

res = db.links.mapReduce(map, reduce, { out: "links_per_user" } );