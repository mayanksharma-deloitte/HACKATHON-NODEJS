# HACKATHON-NODEJS

## APIS : 

### Register a employee: /auth/register
      Body : {
               "username": "",
               "email": "",
               "password": "",
          }


### login the employee: /auth/login
      Body : {
               "username": "",
               "password": "",
          }          

 ### create hackathon (Only organiser can create): /organiser/createHackathon
      Body : {
                 "name": "",
                 "company": "",
                "startDate": "",
                "endDate": "",
                 "maxSlots": ,
                 "minExperienceLevel": "",
                 "requiredTechnologyStack": ["JavaScript", "React"],
                  "registrationOpen":"true",
                 "registrationEndDate": ""
                 }
             
### Register for a hackathon : /employee/register
      Body : {
               "hackathonName":"",
              "employeeUsername":""
             }

  ### get hackathon status (active,past,upcoming) : 
      /employee/hackathons/past
    
 ### search hackathon by company name or tech stack : 
     /employee/search?technologyStack=React

### view all participants of a hackathon (only hackathon organiser can see) : /organiser/participants/Hackathon Name

### organiser filter participants using tech and experience and business unit : /organiser/filterParticipants/Hackathon Name?experienceLevel=Junior&technologyStack=React
### participants view participated hackathons : /employee/participatedHackathons
### all hackathons status dynamic concept : /employee/allHackathonsStatus

### update a hackathon : organiser/hackathons/:hackathonName
### delete a hackathon : organiser/hackathons/:hackathonName


