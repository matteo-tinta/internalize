# How to integrate Internalize in your flow
> [!ATTENTION]
> __**Internalize do not provide an authentication to itself!**__ 
> It must be rendered behind a reverse proxy which will handle it's authentication.
> otherwise your internalize instance will be open to the entire world! :smile:

## Backend Flow
Internalize does not provide any authentication nor authorization out of the box.

This must handled by you following this path:

![be flow](../_media/flows/be-flow.png)

#### Roles and actions
Some actor ask for roles or actions about it's role

#### Interrogation Call
Your be already knows who the user is so why not to ask your be who the user is! :smile:

Compile a url (from your service) including an `interrogate` query parameter which is the endpoint where the headers you will send will be sent again to

> [!WARNING]
> Keep in mind loops, if you ask internalize an authorized route which call again internalize you will have a loop. There are no spam protections

```http
GET https://internalize.be.dev/users/api?interrogate=https://your-be.dev/users/user-id
PUBLIC_KEY: YOUR_RSA_PUBLIC_KEY
Authorization: Bearer xyz
Cookie: 
...
```

#### Interrogation Callback Response
Interrogation url will be called with all the previous request headers you decided to send:
```http
GET https://your-be.dev/users/user-id
Authorization: Bearer xyz
Cookie: 

# Response must be the following
# Which this base64 encoded json, encrypted with the public key of internalize:
#{
#  "userId": "user_id_that_will_match_internalize_user_id",
#  "roles": [
#    "optional_user_roles"
#  ]
# }

ewogICJ1c2VySWQiOiAidXNlcl9pZF90aGF0X3dpbGxfbWF0Y2hfaW50ZXJuYWxpemVfdXNlcl9pZCIsCiAgInJvbGVzIjogWwogICAgIm9wdGlvbmFsX3VzZXJfcm9sZXMiCiAgXQp9

```

#### Internalize response
Internalize will decrypt and decode your data and will return you a base64 encoded json with the `PUBLIC_KEY` that has been passed to it in the first place so you can keep your private tokens secret:

```
# this will be the callback response
ewogICJ1c2VySWQiOiAidXNlcl9pZF90aGF0X3dpbGxfbWF0Y2hfaW50ZXJuYWxpemVfdXNlcl9pZCIsCiAgInJvbGVzIjogWwogICAgewogICAgICAibmFtZSI6ICJhZG1pbiIsCiAgICAgICJhY3Rpb25zIjogWyJ5b3VyIiwgImNvbmZpZ3VyZWQiLCAiYWN0aW9ucyJdCiAgICB9CiAgXQp9

# which is this base64 RSA encrypted json
#{
#  "userId": "user_id_that_will_match_internalize_user_id",
#  "roles": [
#    {
#      "name": "admin",
#      "actions": ["your", "configured", "actions"]
#    }
#  ]
#}
```

#### Conclusion
Now it's up to you and your configuration to cache the results or change the interrogation callback to create on-scope roles (roles available only on specific resources based on your application logic).

This of course will force your application to remember the user role of a specific path (ie: reporter role on a specific jira ticket, and viewer role in another)

**Internalize will never behave as resource server or role provider** this will be managed by your application and infrastructure