// run a Map/Reduce job on the links collection to extract the number of times a link was added to linkr and save it in the link_add_count collection

map = function () {
    if (this.link) {
        emit(this.link, {count:1});
    }
}
reduce = function (key, values) {
    var total = 0;
    for (var i = 0; i < values.length; i++) {
        total += values[i].count;
    }
    return {count:total};
}

res = db.links.mapReduce(map, reduce, { out: "link_add_count" } );