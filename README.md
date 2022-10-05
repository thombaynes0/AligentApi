# Aligent Api task by Thomas Baynes

How to run code:
1. Start VSCode
2. Open the terminal and type: npm run dev
3. You can either go to postman and run the http requests i've provided, or you can go to the urls below
and look in google chrome developer tools and see the network responses.

URLS:
- http://localhost:6061/dates/daysbetween
- http://localhost:6061/dates/completeweeksbetween
- http://localhost:6061/dates/businessDaysBetween

Postman Tests:
I've provided the Postman requests (in 'Postman Requests' folder
OR here https://www.getpostman.com/collections/19bd2e40c8e3c9059b7d) which provide a body with the required
parameters for each API call.
To import the requests, open postman, open a workspace and press the import button up the top left.

Formats must be as so:
  - Dates: 2022-05-15
  - Times (24 Hour time): 24:00
  - TimeZones (List of timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones): Australia/Adelaide
  - convertTo possible options: seconds, minutes, hours, days, weeks, years

Assumed date/time/timezone would be passed from a datetime picker of sorts in a front end UI.

Libraries used:
  - Luxon: Used for dates, made finding intervals between dates easier.
  - Luxon-business-days: Addition for Luxon, giving the ability to check if a date is a business day.
  - Morgan: Used for easier reading of logs
  - Express: Used for parsing requests/responses.
  - Typescript
  - nodemon
  - ts-node

