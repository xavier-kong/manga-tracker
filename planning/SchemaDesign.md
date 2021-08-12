Based on the usage of my initial spreadsheet tracker, I observed the following:
* Updating current chapter: more than once per day (WRITE)
* Opening tracker: at least once per day (READ)
* Adding new manga to the to-be-read list: average once per week (WRITE)
* Moving manga from to-be-read to currently reading: average once per month (WRITE)
* Removing manga from any list: less than once per month (wRITE)

from the above observations I concluded that there would be more write than reading operations overall but looking up list of manga with status of currently reading occurs at least once per day, more than infrequent write operations. 

So the database should be designed such that:
1. Updating current chapter is done as efficiently as possible
2. Retrieving list of currently reading manga is done as efficiently as possible

A possible schema design that might satisfy the above requirements:

```
Users: 
{
  ObjectId
  name: String,
  username: String,
  password: String, <- hashed
  recent: [{
    ObjectId,
    chapter: Number
  }] <- array of recently read mangas 
}
Mangas:
{
  title: String,
  mainUrl: String,
  users: [{
    ObjectId,
    chapter: Number,
    status: String, 
    lastRead: String,
  }] <- array of users with status and last read date
} 
```
