# Mock all the things

> Very much a work in progress

## Description

This can be used to mock the Oracle Health Messaging API. The Swagger is located at in[/swagger directory](./swagger/messaging-rest-swagger_v3.yaml)

### Build with

- [Mock-server](https://www.mock-server.com)
- Node & Docker
- Json

## Current state

Returns the sample data given by the BCG team and what is in the swagger docs

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
- create empty `.env` file in the project root
- run `docker-compose up --build`

## how to add data

>WIP

Currently, there needs to be some massaging of where the data is stored.

For know the get-message-by-id endpoints for outbox and inbox are set up to change data based on the message id passed in.

We are looking to expand how the data is stored to use the patient id as well to help build out data.

## Current Questions

- What are the Param formats/types, specifically:
  - Authority
  - Patient Id
  - Status
  - Personnel Id
  - Pool Id

- The URL in the sample data suggests something different that the url in the swagger. Who is right? (check out the id url, its not `/messaging/` its `/msvc-messaging-2.0/`)

- Just to confirm that headers === index route

- Which endpoints will be specifically be using?

- Do we need to mock the authentication as well?

## Next

- [ ] figure out the params
- [ ] add discovery endpoint
- [ ] refine logging
- [x] move to VA github
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

Can not use out of the box integration due to not binge able to specify the return data past one example in the swagger.

Refer to the ticket [MHV-52692](https://jira.devops.va.gov/browse/MHV-52692) for a full breakdown.  
