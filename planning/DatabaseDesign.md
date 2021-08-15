Version 2:
After working on the project, I saw that Version 1 's limitations would lead to overcomplicating server side operations. Other database options such as postgresql were considered but were ruled out due to being "overkill" for the task at hand. Nosql document based options such as mongoDB would still be applicable. A new schema was proposed:

```
Manga: {
  title: {
      type: String,
      required: true,
      minLength: 1
    },
  mainUrl: String,
}

User: {
  ObjectId
  name: String,
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3
  },
  password: String, <- hashed (not returned)
  mangas: [{
    manga: {
      ObjectId
      Ref: "Manga"
    }
    id: Number,
    chapter: Number,
    lastRead: String
    status: String
  }]
}
```

The advantages of this new design:
* Queries are simple to do as all user title's are returned at once, filtering can be done client side 
* Information of other users are never accessed, even on the server side
* Updating for single titles can be still be simple with ids

Version 1:
Based on the usage of my initial spreadsheet tracker, I observed the following:
* Updating current chapter: more than once per day (WRITE)
* Opening tracker: at least once per day (READ)
* Adding new manga to the to-be-read list: average once per week (WRITE)
* Moving manga from to-be-read to currently reading: average once per month (WRITE)
* Removing manga from any list: less than once per month (WRITE)

from the above observations I concluded that there would be more write than reading operations overall but looking up list of manga with status of currently reading occurs at least once per day, more than infrequent write operations. 

So the database should be designed such that:
1. Updating current chapter is done as efficiently as possible
2. Retrieving list of currently reading manga is done as efficiently as possible

A possible schema design that might satisfy the above requirements:

```
User: 
{
  ObjectId
  name: String,
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3
  },
  password: String, <- hashed (not returned)
  recent: [{
    ObjectId
    Ref: "Manga"
  }] <- array of recently read **Mangas** 
}

Manga:
{
  title: String,
  mainUrl: String,
  users: [{
    ObjectId,
    Ref: "User",
    chapter: Number,
    status: String, 
    lastRead: String,
  }] <- array of **Users** with status and last read date
} 
```

While all mangas beloning to a single user could potentially be stored in a single User document, it might not be an efficient solution. Given that it is of priority to retrieve list of currently reading manga as efficiently as possible, by including an array of only recently read titles, it reduces the need to iterate over entire arrays to search for titles that match last read dates. This also adheres to the recommendation that "data that is accessed together should be stored toegther". as the user is more likely to only need the currently reading list. 

Another advantage of this solution is that at scale this allows title and url info to be shared betweeen users and also prevents each individual User document from reaching impractical sizes. While it is possible that very popular titles might contain large "users" fields, this could be solved with "buckets". This would be less of an issue compared to using a similar approach for storing all titles in individual user documents. 