###
### Take the tab-separated key=value rows generated from the linkr web application and put the data into MongoDB for analysis using Map/Reduce
###

from datetime import datetime

import pymongo

from pymongo import Connection
connection = Connection('localhost', 27017)

db = connection.linkr

logs = []
count = 0

with open('./production.log') as f:
    for line in f:
		fields = line.rstrip('\n').split('\t')
		
		record = {}
		
		int_vals = ['status','response_time']
		strip_quotes = ['user_agent','date']
		
		for field in fields:
			key,_,val = field.partition('=')
			
			# Do something with each key and val
			
			if (key in strip_quotes):
				val = val.strip('"')
			
			## Parse the date into a datetime object from the following format:
			## Tue, 26 Jul 2011 22:33:52 GMT
			if (key == 'date'):
				val = datetime.strptime(val,'%a, %d %b %Y %H:%M:%S %Z')
			
			if (key == 'response_time' and val == '-'):
				val = -1
			
			if (key in int_vals):
				val = int(val)
			
			record[key] = val
			
		## Push to the logs variable for bulk import
		logs.append(record)
		count += 1


## Insert the new logs into MongoDB
result = db.logs.insert(logs)

print '{0} lines from the log parsed. {1} lines inserted into MongoDB.'.format(count, len(result))

