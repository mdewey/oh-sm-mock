# Mock all the things

> Very much a work in progress

## Endpoints Created

> note this do not return sample data yet, just responses

- GET {authority}/patients/{patientId}/inbox/messages
- GET {authority}/patients/{patientId}/inbox/messages/{messageId}
- DELETE {authority}/patients/{patientId}/inbox/messages/{messageId}
- PUT {authority}/patients/{patientId}/inbox/messages/{messageIds}/status/{status}

## How to run

- clone
- create empty .env file
- run `docker-compose up --build`

## how to add data

TBD

## Next

- Add Outbox
- Add the rest of the endpoints
- Refine doc
  - add discovery endpoint
- refine logging
- test suite

## Someday

- mimic auth?
- add linting and other dev UX stuff
- add a in memory db to manipluate data?
- Create from swagger
- move away from mock-server?
- add atom push endpoint?

## Notes

### OpenAPI/Swagger integration

Can not use out of the box integration due to not be able to specify the return data past one example in the swagger.

Refer to the ticket [https://jira.devops.va.gov/browse/MHV-52692](https://jira.devops.va.gov/browse/MHV-52692) for full breakdown.  
