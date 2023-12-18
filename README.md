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

- Add fake sample data
  - Add way to add custom fake data for a request
- Add Outbox
- Add the rest of the endpoints
- Refine doc

## Someday

- Create from swagger
- move away from mock-server?

## Notes

### OpenAPI/Swagger integration

Can not use out of the box integration due to not be able to specify the return data past one example in the swagger.

Refer to the ticket [https://jira.devops.va.gov/browse/MHV-52692](https://jira.devops.va.gov/browse/MHV-52692) for full breakdown.  
