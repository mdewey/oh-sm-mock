# Mock all the things

> Very much a work in progress

## Endpoints Created

> note this do not return sample data yet, just responses from the swagger

- GET {authority}/patients/{patientId}/inbox/messages
- GET {authority}/patients/{patientId}/inbox/messages/{messageId}
- DELETE {authority}/patients/{patientId}/inbox/messages/{messageId}
- PUT {authority}/patients/{patientId}/inbox/messages/{messageIds}/status/{status}
- GET {authority}/patients/{patientId}/outbox/messages
- POST {authority}/patients/{patientId}/outbox/messages
- GET {authority}/patients/{patientId}/outbox/messages/{messageIds}
- GET {authority}/personnel/{personnelIds}/recipient-access
- GET {authority}/pools
- GET {authority}/pools/{poolIds}
- GET {authority}/pools/{poolIds}/recipient-access

## How to run

- clone
- create empty .env file
- run `docker-compose up --build`

## how to add data

TBD

## Questions

- Param formats/types
- The URL in the sample data suggests something different that the url in the swagger. Who is right? (check out the id url, its not `/messaging/` its `/msvc-messaging-2.0/`)
- confirm that headers === index route

## Next

- [ ] figure out the params
- [ ] Refine doc
  - [ ] add discovery endpoint
- [ ] refine logging
- [ ] move to VA github
  - [ ] convert these to tickets
- [ ] test suite
- [ ] move times to route of mock
- [ ] add port to env variable
- [ ] add linting

## Someday

- [ ] mimic auth?
- [ ] add a in memory db to manipulate data?
- [ ] Create from swagger
- [ ] move away from mock-server?
- [ ] add atom push endpoint?

## Notes

### OpenAPI/Swagger integration

Can not use out of the box integration due to not be able to specify the return data past one example in the swagger.

Refer to the ticket [https://jira.devops.va.gov/browse/MHV-52692](https://jira.devops.va.gov/browse/MHV-52692) for full breakdown.  
