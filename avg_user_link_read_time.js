// run a Map/Reduce job on the links collection to extract the average time a link has spent in the unread state for each user and save it in the avg_user_link_read_time collection


map = function () {
    if (this.time && this.readTime) {
    	var start = this.time.getTime(),
    		end = this.readTime.getTime(),
    		diff = end - start;
    	
        emit(this.owner.toString(), { read_time: diff, count: 1 } );
    }
}
reduce = function (key, values) {
    var total = 0,
    	total_time = 0,
    	average = 0;
    
    for (var i = 0; i < values.length; i++) {
        total += values[i].count;
        total_time += values[i].read_time;
        
    }
    
    average = total_time/total;
    
    return { owner: key, stats: { 
    								avg_time_millis: average, 
    								avg_time_sec: average/1000, 
    								avg_time_mins: average/60000, 
    								avg_time_hours: average/3600000, 
    								avg_time_days: average/90000000 
    							}
    		};
}

res = db.links.mapReduce(map, reduce, { query: { read: 1 }, out: "avg_user_link_read_time" } );