# Linkr Analysis Code #

Various database analysis code for the [linkr](http://linkr.cc) ([Github](https://github.com/patrickmccoy/linkr)) web application.

## Contents ##

- Links per user (links_per_user.js)
- Number of times a link was added (link_add_count.js)
- Time a link has spent in the unread state (link_wait_time.js)
- Average time links spend in the unread state (avg_link_read_time.js)
- Average time links spend in the unread state, grouped by user (avg_user_link_read_time.js)

## Using ##

Using these files to preform analysis on your MongoDB database is easy, just type the following command into your terminal:

	mongo linkr filename.js
 
This will connect to the linkr database and execute the code in filename.js

To do this using the links_per_user.js file:

	mongo linkr links_per_user.js

The result will be in the links_per_user collection in the linkr database.  To view this collection connect to the linkr database using the mongo shell and type the following to get a sorted list of links per user:

	db.links_per_user.find().sort({ "value.count": -1 });

