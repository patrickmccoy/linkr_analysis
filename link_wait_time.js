// run a Map/Reduce job on the links collection to extract the time a link has spent in the unread state and save it in the link_wait_time collection

map = function () {
    if (this.readTime && this.time) {
    	var add = this.time.getTime(),
    		read = this.readTime.getTime(),
    		diff = read - add;
    	
        emit(diff, { count: 1 });
    }
}
reduce = function (key, values) {
    var total = 0;
    for (var i = 0; i < values.length; i++) {
        total += values[i].count;
    }
    return { count: total };
}

res = db.links.mapReduce(map, reduce, { query: { read: 1 }, out: "link_wait_time" } );