const contentful = require("contentful-management")
const client = contentful.createClient({
  accessToken: process.env.CONTENT_MANAGEMENT,
})

module.exports = function createComment(
  body,
  authorName,
  subjectId,
  parentCommentId = null
) 

{
  return client
    .getSpace(process.env.SPACE_ID)
    .then(space => space.getEnvironment("master"))
    .then(environment =>
      environment.createEntry("comment", {
        fields: {
          body: {
            "en-US": body,
          },
          author: {
            "en-US": authorName,
          },
          subject: {
            "en-US": subjectId,
          },
          parentComment: {
            "en-US": {
              sys: {
                type: "Link",
                linkType: "Entry",
                id: parentCommentId,
              },
            },
          },
        },
      })
    )
    .then(entry => entry.publish())
}
