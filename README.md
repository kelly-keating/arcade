# Assessr

## Sick as project

Making a site where students can view their progress towards assessments, submit assessments, and where teachers can view the progress of the cohort and review work.

[Currently deployed version](https://everybody-does-assessments.herokuapp.com)


## Setup

Create a `.env` file in the main directory and add:

```sh
JWT_SECRET="something super secret that you come up with"
```

Feel free to add an appropriately personal secret.

Run the following commands in your terminal:

```sh
npm install
npx knex migrate:latest
npx knex seed:run
npm run dev
```

The site should then be available on http://localhost:3000

## User Stories

### MVP

As a student user:
- [x] I want to view a list of all assessments
- [x] I want to see which assessments I have completed
- [ ] I want to be able to sort assessments by complete vs incomplete
- [ ] I want to be able to see when this assessment should be completed
- [x] I want to be able to submit a link to a repo I believe completes an assessment
- [ ] I want to see a list of recommended repos for a given assessment

As a teacher user:
- [ ] I want to be able to classify a new user as student or teacher
- [ ] I want to be able to match a new student user to their records
- [x] I want to see a list of submitted links
- [x] I want to be able to tick a given assessment off for a student
- [ ] I want to be able to add a comment as to what is missing on an assessment after reviewing a submission
- [ ] I want to see a list of current students
- [x] I want to be able to see a specific student's assessment progress
- [ ] I want to be able to access json of current assessment data
- [ ] I want to be able to provide json data of students assessments to be included in the database
- [ ] I want to be able to add evidence for a given student's assessment

### Stretch

As a student user:
- [ ] I want to be able to see what assessments I have completed vs in progress or incomplete
- [ ] I want to be able to see what pieces are necessary to complete a given assessment
- [ ] I want to be able to see what pieces of an assessment I have completed
- [ ] I want to see which pieces are still necessary for this assessment when submitting
- [ ] I want to be able to submit reflections for the Human Skills assessments via the site

As a teacher user:
- [ ] I want to be able to tick a student off for specific parts of an assessment
- [ ] I want to be able to sort a student's completed work by complete vs incomplete
- [ ] I want to be able to see assessment progress for the entire cohort
- [ ] I want to be able to download a transcript of the cohorts results
- [ ] I want to be able to see results for previous students/cohorts
- [ ] I want to be able to view current foundations students separate from bootcamp students
- [ ] Graphs!


## Views
  | name | user | purpose |
  | --- | --- | --- |
  | Login | * | View for user to enter their login credentials |
  | Register | * | View for user to sign up for the App |
  | Assessments | Student | View all my assessments and submit links for them |
  | Student | Teacher | See completion of a student |
  | Cohort | Teacher | See stats on individual cohorts |
  | Submissions | Teacher | Page containing list of all submissions |
  | Marking | Teacher | Place to review link and tick off completion |


## Reducers

  | name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |


## API 

All these routes should be protected

| Method | Endpoint | User | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /api/auth/login | Log In a User | The Users JWT Token |
| Post | /api/auth/register | Register a User | The Users JWT Token |
| TBC |


## Data
  Users, cohorts, assessments, and modules are all part of MVP. Elements are stretch.

### DATAFILE

```js
const modules = [
  {
    id: 1,
    title: 'Foundations: Tech',
    prefix: 'FT',
    course: 'Foundations',
    assessments: [
      {
        code: 'FT01',
        module_id: 1,
        title: 'Use Git and terminal commands to manage a code base',
        elements: [
          {
            id: 'FT01-1',
            assessment_code: 'FT01',
            text: 'Clone a repo'
          },
          ...
        ]
      },
      ...
    ]
  },
  ...
]
```

### DB - users
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | int | Unique identifier |
  | user_type | string |
  | user_name | string |
  | hash | text | 
  
### DB - students
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | user_id | int |
  | actual_name | string | Name of student matching EDA records |
  | cohort_ id | int |

### DB - cohorts
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | int | Unique identifier |
  | name | string |
  | campus | string |

### DB - submissions
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | student_assessment_id | int |
  | evidence | string |

### DB - users_assessments
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | int |
  | student_id | int |
  | assessment_code | int |
  | status | string |
  
### DB - users_elements (Stretch)
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | int |
  | student_assmt_id | int |
  | element_id | int |
