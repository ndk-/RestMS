RestMS v0.3
-----------
Online Restaurant Management System


Credits
-------
UNT Team from Summer 2013 CSCE 4930 (Usability Testing) for few design ideas.
Bootstrap: http://getbootstrap.com/
AngularJS: http://angularjs.org/
UI-Bootstrap: http://angular-ui.github.io/bootstrap/
Less: http://lesscss.org/
Angular-File-Upload: https://github.com/danialfarid/angular-file-upload
Bootstrap Magic: http://pikock.github.io/bootstrap-magic/
ArrestDB: https://github.com/alixaxel/ArrestDB


Requirements
------------
php
mySQL
Web Server


Unit Testing
------------
node.js
karma


Installation
------------
Copy application to the webserver accessible directory...
Change $dsn in RestMS/app/db.php to the corresponding database and credentials
Change $db in RestMS/app/login.php to the corresponding database and credentials
Change database name in RestMS/config/database.sql (global search and replace 'restms' to the corresponding database)
Execute RestMS/config/database.sql given parameters of your MySQL server.

For unit testing:
install node.js
install karma
Configure RestMS/config/karma.conf.js to your browser settings

Execute RestMS/scripts/test.sh


Structure of the application:
-----------------------------

Unit tests:
	RestMS/test/unit

Application directory:
	RestMS/app:
		index.html - main html file that parsed by AngularJS
		section/ - contains partial html files (aka views)
		js/ - contains application init, controllers, directives, filters and services
			app.js - initialization file
			controllers.js - controllers
			directives.js - directives
			filters.js - filters
			services.js - services (aka models)
			/directories/ - additional libraries 
		img/ - images directory (requires a proper permissions, so webserver can write inside this directory)
		less/ - LESS/CSS files (design)
		lib - AngularJS files (used for unit testing)











