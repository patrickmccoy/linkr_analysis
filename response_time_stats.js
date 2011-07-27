// run a Map/Reduce job on the logs collection to extract the statistics about each requested uri and save it in the log_stats collection


map = function () {
	var url = this.url.split('?callback')[0];

	emit(url, { response: parseInt(this.response_time), count: 1 } );
}
reduce = function (key, values) {
	var total = 0,
		total_time = 0,
		average = 0,
		min = 1000000,
		max = 0;
	
	for (var i = 0; i < values.length; i++) {
		if (typeof values[i].response == 'number') {
			total_time += values[i].response;
			total ++;
			
			if (values[i].response < min ) {
				min = values[i].response;
			}
			if (values[i].response > max ) {
				max = values[i].response;
			}
		}
		
	}
	
	average = total_time/total;
	
	return { url: key, stats: { avg: {
										avg_time_millis: average, 
										avg_time_sec: average/1000 
									 },
								min: {
										min_time_millis: min,
										min_time_sec: min/1000
									 },
								max: {
										max_time_millis: max,
										max_time_sec: max/1000
									 },
								count: total
								}
							
			};
}

res = db.logs.mapReduce(map, reduce, { query: { url: { $exists: true }, response_time: { $exists: true, $ne: -1 } }, out: "log_stats" } );