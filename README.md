RestMS v0.3
-----------
Online Restaurant Management System


Credits
-------
UNT Team from Summer 2013 CSCE 4930 (Usability Testing) for few design ideas. <br />
Bootstrap: http://getbootstrap.com/ <br />
AngularJS: http://angularjs.org/ <br />
UI-Bootstrap: http://angular-ui.github.io/bootstrap/ <br />
Less: http://lesscss.org/ <br />
Angular-File-Upload: https://github.com/danialfarid/angular-file-upload <br />
Bootstrap Magic: http://pikock.github.io/bootstrap-magic/ <br />
ArrestDB: https://github.com/alixaxel/ArrestDB <br />


Requirements
------------
php <br />
mySQL <br />
Web Server <br />


Requirements for Unit Testing
-----------------------------
node.js <br />
karma <br />


Installation
------------
Copy application to the webserver accessible directory... <br />
Change $dsn in RestMS/app/db.php to the corresponding database and credentials <br />
Change $db in RestMS/app/login.php to the corresponding database and credentials <br />
Change database name in RestMS/config/database.sql (global search and replace 'restms' to the corresponding database) <br />
Execute RestMS/config/database.sql given parameters of your MySQL server. <br />

For unit testing: <br />
install node.js <br />
install karma <br />
Configure RestMS/config/karma.conf.js to your browser settings <br />

Execute RestMS/scripts/test.sh


Structure of the application
----------------------------

Unit tests (few examples): <br />
&nbsp;&nbsp;&nbsp;RestMS/test/unit <br />

Application directory: <br />
&nbsp;&nbsp;&nbsp;RestMS/app: <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index.html - main html file that parsed by AngularJS <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;section/ - contains partial html files (aka views) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;js/ - contains application init, controllers, directives, filters and services <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app.js - initialization file <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;controllers.js - controllers <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;directives.js - directives <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;filters.js - filters <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;services.js - services (aka models) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/directories/ - additional libraries  <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;img/ - images directory (requires a proper permissions, so webserver can write inside this directory) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;less/ - LESS/CSS files (design) <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lib - AngularJS files (used for unit testing) <br />











